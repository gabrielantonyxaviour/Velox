import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

// Movement network configurations
export const MOVEMENT_CONFIGS = {
  mainnet: {
    chainId: 126,
    name: "Movement Mainnet",
    fullnode: "https://full.mainnet.movementinfra.xyz/v1",
    explorer: "mainnet"
  },
  testnet: {
    chainId: 250,
    name: "Movement Testnet",
    fullnode: "https://testnet.movementnetwork.xyz/v1",
    explorer: "testnet"
  },
  bardock: {
    chainId: 250,
    name: "Bardock Testnet",
    fullnode: "https://testnet.movementnetwork.xyz/v1",
    explorer: "bardock+testnet"
  }
};

// Current network (change this to switch between networks)
export const CURRENT_NETWORK = 'bardock' as keyof typeof MOVEMENT_CONFIGS;

// Initialize Aptos SDK with current Movement network
export const aptos = new Aptos(
  new AptosConfig({
    network: Network.CUSTOM,
    fullnode: MOVEMENT_CONFIGS[CURRENT_NETWORK].fullnode,
  })
);

// Velox contract address on Movement testnet
export const VELOX_ADDRESS = '0x5cf7138d960b59b714b1d05774fdc2c26ae3f6d9f60808981f5d3c7e6004f840';

// Utility to convert Uint8Array to hex string
export const toHex = (buffer: Uint8Array): string => {
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

// Get explorer URL based on current network
// Handles both transaction hashes (0x...) and transaction versions (numeric)
export const getExplorerUrl = (txHashOrVersion: string): string => {
  const network = MOVEMENT_CONFIGS[CURRENT_NETWORK].explorer;
  // Check if it's a numeric version (no 0x prefix and all digits)
  const isVersion = /^\d+$/.test(txHashOrVersion);
  if (isVersion) {
    // Use version directly for version-based lookups
    return `https://explorer.movementnetwork.xyz/txn/${txHashOrVersion}?network=${network}`;
  }
  // For hashes, ensure 0x prefix
  const formattedHash = txHashOrVersion.startsWith('0x') ? txHashOrVersion : `0x${txHashOrVersion}`;
  return `https://explorer.movementnetwork.xyz/txn/${formattedHash}?network=${network}`;
};

// Token addresses for fungible assets
export const TOKEN_ADDRESSES = {
  tUSDC: '0xd28177fbf37d818e493963c11fe567e3f6dad693a1406b309847f850ba6c31f0',
  tMOVE: '0x23dc029a2171449dd3a00598c6e83ef771ca4567818cea527d4ec6dd48c9701d',
  MOVE: '0x1::aptos_coin::AptosCoin',
};

// Fetch balance for any token type (native MOVE or fungible assets)
export const fetchTokenBalance = async (
  tokenAddress: string,
  ownerAddress: string,
  decimals: number
): Promise<string> => {
  // Early return if no owner address
  if (!ownerAddress || !tokenAddress) {
    return '0';
  }

  try {
    if (tokenAddress === TOKEN_ADDRESSES.MOVE) {
      // Native MOVE uses CoinStore
      const resources = await aptos.getAccountResources({ accountAddress: ownerAddress });
      const coinResource = resources.find(
        (r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
      );
      if (coinResource) {
        const balance = (coinResource.data as any).coin.value;
        return (Number(balance) / Math.pow(10, decimals)).toFixed(4);
      }
      return '0';
    } else if (tokenAddress === TOKEN_ADDRESSES.tUSDC) {
      // Use contract view function for tUSDC
      const result = await aptos.view({
        payload: {
          function: `${VELOX_ADDRESS}::test_tokens::get_token_a_balance`,
          typeArguments: [],
          functionArguments: [VELOX_ADDRESS, ownerAddress],
        },
      });
      const balance = result[0] as string;
      return (Number(balance) / Math.pow(10, decimals)).toFixed(4);
    } else if (tokenAddress === TOKEN_ADDRESSES.tMOVE) {
      // Use contract view function for tMOVE
      const result = await aptos.view({
        payload: {
          function: `${VELOX_ADDRESS}::test_tokens::get_token_b_balance`,
          typeArguments: [],
          functionArguments: [VELOX_ADDRESS, ownerAddress],
        },
      });
      const balance = result[0] as string;
      return (Number(balance) / Math.pow(10, decimals)).toFixed(4);
    }
    return '0';
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
};
