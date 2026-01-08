import 'dotenv/config';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

const VELOX_ADDRESS = '0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7';
const RPC_URL = process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1';

async function main() {
  const aptos = new Aptos(
    new AptosConfig({
      network: Network.CUSTOM,
      fullnode: RPC_URL,
    })
  );

  console.log('Checking Dutch auction for intent 12...');
  
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::auction::get_dutch_auction` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, '12'],
      },
    });
    
    console.log('Raw result:', JSON.stringify(result, null, 2));
    console.log('Result[0] type:', typeof result[0], result[0]);
    console.log('Result[1] type:', typeof result[1], result[1]);
    console.log('Result[2] type:', typeof result[2], result[2]);
    console.log('Result[3] type:', typeof result[3], result[3]);
    console.log('Result[4] type:', typeof result[4], result[4]);
    console.log('Result[5] type:', typeof result[5], result[5]);
    console.log('Result[6] type:', typeof result[6], result[6]);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
