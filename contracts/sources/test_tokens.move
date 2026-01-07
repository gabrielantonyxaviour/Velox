/// Test Tokens Module for Velox
/// Provides mock tokens for testing: tUSDC (TokenA) and tMOVE (TokenB)
/// Includes public faucet functions for anyone to mint test tokens
module velox::test_tokens {
    use std::signer;
    use std::string::{Self, String};
    use std::option;
    use aptos_framework::object::{Self, Object};
    use aptos_framework::fungible_asset::{Self, Metadata, MintRef, BurnRef, TransferRef};
    use aptos_framework::primary_fungible_store;

    // ============ Storage ============

    #[resource_group_member(group = aptos_framework::object::ObjectGroup)]
    struct TokenRefs has key {
        mint_ref: MintRef,
        burn_ref: BurnRef,
        transfer_ref: TransferRef
    }

    struct TokenRegistry has key {
        token_a: address,
        token_b: address,
        admin: address
    }

    // ============ Constants ============

    const DECIMALS: u8 = 8;

    // ============ Initialize ============

    /// Initialize both test tokens (admin only)
    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<TokenRegistry>(admin_addr), 1);

        // Create TokenA (tUSDC)
        let token_a_addr = create_token(
            admin,
            string::utf8(b"Test USDC"),
            string::utf8(b"tUSDC"),
            string::utf8(b"https://velox.dev/tokens/tusdc.png"),
            string::utf8(b"https://velox.dev")
        );

        // Create TokenB (tMOVE)
        let token_b_addr = create_token(
            admin,
            string::utf8(b"Test MOVE"),
            string::utf8(b"tMOVE"),
            string::utf8(b"https://velox.dev/tokens/tmove.png"),
            string::utf8(b"https://velox.dev")
        );

        move_to(admin, TokenRegistry {
            token_a: token_a_addr,
            token_b: token_b_addr,
            admin: admin_addr
        });
    }

    // ============ Internal Functions ============

    /// Create a new fungible token
    fun create_token(
        admin: &signer,
        name: String,
        symbol: String,
        icon_uri: String,
        project_uri: String
    ): address {
        let constructor_ref = object::create_named_object(admin, *string::bytes(&symbol));

        primary_fungible_store::create_primary_store_enabled_fungible_asset(
            &constructor_ref,
            option::none(), // No maximum supply
            name,
            symbol,
            DECIMALS,
            icon_uri,
            project_uri
        );

        let mint_ref = fungible_asset::generate_mint_ref(&constructor_ref);
        let burn_ref = fungible_asset::generate_burn_ref(&constructor_ref);
        let transfer_ref = fungible_asset::generate_transfer_ref(&constructor_ref);

        let token_signer = object::generate_signer(&constructor_ref);
        move_to(&token_signer, TokenRefs {
            mint_ref,
            burn_ref,
            transfer_ref
        });

        object::address_from_constructor_ref(&constructor_ref)
    }

    // ============ Entry Functions ============

    /// Mint TokenA to an address
    public entry fun mint_token_a(
        admin: &signer,
        to: address,
        amount: u64
    ) acquires TokenRegistry, TokenRefs {
        let admin_addr = signer::address_of(admin);
        let registry = borrow_global<TokenRegistry>(admin_addr);
        mint_internal(registry.token_a, to, amount);
    }

    /// Mint TokenB to an address
    public entry fun mint_token_b(
        admin: &signer,
        to: address,
        amount: u64
    ) acquires TokenRegistry, TokenRefs {
        let admin_addr = signer::address_of(admin);
        let registry = borrow_global<TokenRegistry>(admin_addr);
        mint_internal(registry.token_b, to, amount);
    }

    /// Internal mint function
    fun mint_internal(token_addr: address, to: address, amount: u64) acquires TokenRefs {
        let refs = borrow_global<TokenRefs>(token_addr);
        let fa = fungible_asset::mint(&refs.mint_ref, amount);
        primary_fungible_store::deposit(to, fa);
    }

    // ============ Public Faucet Functions ============

    /// Public faucet: Anyone can mint TokenA (tUSDC) to themselves
    public entry fun faucet_token_a(
        user: &signer,
        registry_addr: address,
        amount: u64
    ) acquires TokenRegistry, TokenRefs {
        let user_addr = signer::address_of(user);
        let registry = borrow_global<TokenRegistry>(registry_addr);
        mint_internal(registry.token_a, user_addr, amount);
    }

    /// Public faucet: Anyone can mint TokenB (tMOVE) to themselves
    public entry fun faucet_token_b(
        user: &signer,
        registry_addr: address,
        amount: u64
    ) acquires TokenRegistry, TokenRefs {
        let user_addr = signer::address_of(user);
        let registry = borrow_global<TokenRegistry>(registry_addr);
        mint_internal(registry.token_b, user_addr, amount);
    }

    // ============ View Functions ============

    #[view]
    /// Get TokenA (tUSDC) metadata address
    public fun get_token_a_address(registry_addr: address): address acquires TokenRegistry {
        let registry = borrow_global<TokenRegistry>(registry_addr);
        registry.token_a
    }

    #[view]
    /// Get TokenB (tMOVE) metadata address
    public fun get_token_b_address(registry_addr: address): address acquires TokenRegistry {
        let registry = borrow_global<TokenRegistry>(registry_addr);
        registry.token_b
    }

    #[view]
    /// Get TokenA metadata object
    public fun get_token_a_metadata(registry_addr: address): Object<Metadata> acquires TokenRegistry {
        let registry = borrow_global<TokenRegistry>(registry_addr);
        object::address_to_object<Metadata>(registry.token_a)
    }

    #[view]
    /// Get TokenB metadata object
    public fun get_token_b_metadata(registry_addr: address): Object<Metadata> acquires TokenRegistry {
        let registry = borrow_global<TokenRegistry>(registry_addr);
        object::address_to_object<Metadata>(registry.token_b)
    }

    #[view]
    /// Get balance of TokenA for an address
    public fun get_token_a_balance(
        registry_addr: address,
        owner: address
    ): u64 acquires TokenRegistry {
        let registry = borrow_global<TokenRegistry>(registry_addr);
        let metadata = object::address_to_object<Metadata>(registry.token_a);
        primary_fungible_store::balance(owner, metadata)
    }

    #[view]
    /// Get balance of TokenB for an address
    public fun get_token_b_balance(
        registry_addr: address,
        owner: address
    ): u64 acquires TokenRegistry {
        let registry = borrow_global<TokenRegistry>(registry_addr);
        let metadata = object::address_to_object<Metadata>(registry.token_b);
        primary_fungible_store::balance(owner, metadata)
    }

    #[view]
    /// Get the admin address of the registry
    public fun get_admin(registry_addr: address): address acquires TokenRegistry {
        let registry = borrow_global<TokenRegistry>(registry_addr);
        registry.admin
    }
}
