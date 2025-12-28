import 'dotenv/config';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470';
const RPC_URL = process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1';

async function main() {
  const aptos = new Aptos(
    new AptosConfig({
      network: Network.CUSTOM,
      fullnode: RPC_URL,
    })
  );

  console.log('=== Debug Intents ===');
  console.log('Velox Address:', VELOX_ADDRESS);
  console.log('RPC URL:', RPC_URL);
  console.log('');

  // Get total intents count
  try {
    const totalResult = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::submission::get_total_intents` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS],
      },
    });
    const totalIntents = Number(totalResult[0]);
    console.log('Total Intents:', totalIntents);

    // Fetch each intent
    for (let i = 0; i < totalIntents; i++) {
      console.log(`\n--- Intent ${i} ---`);
      try {
        const intentResult = await aptos.view({
          payload: {
            function: `${VELOX_ADDRESS}::submission::get_intent` as `${string}::${string}::${string}`,
            typeArguments: [],
            functionArguments: [VELOX_ADDRESS, i.toString()],
          },
        });
        console.log('Raw intent data:', JSON.stringify(intentResult[0], null, 2));
      } catch (error) {
        console.log('Error fetching intent:', (error as Error).message);
      }
    }
  } catch (error) {
    console.error('Error getting total intents:', (error as Error).message);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
