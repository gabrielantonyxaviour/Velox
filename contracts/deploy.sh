#!/bin/bash
# Velox Contract Deployment Script
# Run this script after the Movement testnet is available

set -e

echo "=== Velox Contract Deployment ==="
echo ""

# Check if aptos CLI is installed
if ! command -v aptos &> /dev/null; then
    echo "Error: aptos CLI not found. Please install it first."
    exit 1
fi

# Check network status
echo "Checking Movement testnet status..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://aptos.testnet.porto.movementlabs.xyz/v1)
if [ "$HTTP_STATUS" != "200" ]; then
    echo "Error: Movement testnet is not available (HTTP $HTTP_STATUS)"
    echo "Please try again later."
    exit 1
fi
echo "Network is online!"
echo ""

# Initialize if needed
if [ ! -f .aptos/config.yaml ]; then
    echo "Initializing Aptos profile..."
    aptos init --network custom \
        --rest-url https://aptos.testnet.porto.movementlabs.xyz/v1 \
        --faucet-url https://faucet.testnet.porto.movementlabs.xyz \
        --assume-yes
fi

# Get account info
ACCOUNT=$(aptos account lookup-address --profile default 2>/dev/null | grep -o '"account_address": "[^"]*"' | cut -d'"' -f4)
echo "Deploying from account: $ACCOUNT"
echo ""

# Fund account if needed
echo "Requesting testnet tokens from faucet..."
aptos account fund-with-faucet --profile default --amount 100000000 || echo "Faucet may be unavailable, continuing..."
echo ""

# Compile
echo "Compiling contracts..."
aptos move compile --named-addresses velox=$ACCOUNT
echo ""

# Publish
echo "Publishing contracts..."
aptos move publish --named-addresses velox=$ACCOUNT --assume-yes
echo ""

# Initialize modules
echo "Initializing modules..."
echo ""

echo "1. Initializing submission module..."
aptos move run --function-id "${ACCOUNT}::submission::initialize" --assume-yes
echo ""

echo "2. Initializing solver_registry module..."
aptos move run --function-id "${ACCOUNT}::solver_registry::initialize" --assume-yes
echo ""

echo "3. Initializing fees module..."
aptos move run --function-id "${ACCOUNT}::fees::initialize" --assume-yes
echo ""

echo "4. Initializing test_tokens module..."
aptos move run --function-id "${ACCOUNT}::test_tokens::initialize" --assume-yes
echo ""

# Save deployment info
echo "=== Deployment Complete ==="
echo ""
echo "Deployed Address: $ACCOUNT"
echo ""

# Create deployment.json
cat > deployment.json << EOF
{
  "network": "movement-testnet",
  "address": "$ACCOUNT",
  "rest_url": "https://aptos.testnet.porto.movementlabs.xyz/v1",
  "modules": {
    "submission": "${ACCOUNT}::submission",
    "settlement": "${ACCOUNT}::settlement",
    "solver_registry": "${ACCOUNT}::solver_registry",
    "fees": "${ACCOUNT}::fees",
    "test_tokens": "${ACCOUNT}::test_tokens",
    "types": "${ACCOUNT}::types"
  },
  "deployed_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF

echo "Deployment info saved to deployment.json"
echo ""
echo "Next steps:"
echo "  1. Copy the address to frontend/constants/contracts.ts"
echo "  2. Mint test tokens using:"
echo "     aptos move run --function-id '${ACCOUNT}::test_tokens::mint_token_a' --args address:<USER> u64:1000000000000"
