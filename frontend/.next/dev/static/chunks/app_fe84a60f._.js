(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/lib/aptos.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CURRENT_NETWORK",
    ()=>CURRENT_NETWORK,
    "MOVEMENT_CONFIGS",
    ()=>MOVEMENT_CONFIGS,
    "TOKEN_ADDRESSES",
    ()=>TOKEN_ADDRESSES,
    "VELOX_ADDRESS",
    ()=>VELOX_ADDRESS,
    "aptos",
    ()=>aptos,
    "fetchTokenBalance",
    ()=>fetchTokenBalance,
    "getExplorerUrl",
    ()=>getExplorerUrl,
    "toHex",
    ()=>toHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ze__as__Aptos$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-76PXED26.mjs [app-client] (ecmascript) <export ze as Aptos>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$NCKJ7X57$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a__as__AptosConfig$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-NCKJ7X57.mjs [app-client] (ecmascript) <export a as AptosConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$P5HCJN3A$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__f__as__Network$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-P5HCJN3A.mjs [app-client] (ecmascript) <export f as Network>");
;
const MOVEMENT_CONFIGS = {
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
const CURRENT_NETWORK = 'bardock';
const aptos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ze__as__Aptos$3e$__["Aptos"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$NCKJ7X57$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a__as__AptosConfig$3e$__["AptosConfig"]({
    network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$P5HCJN3A$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__f__as__Network$3e$__["Network"].CUSTOM,
    fullnode: MOVEMENT_CONFIGS[CURRENT_NETWORK].fullnode
}));
const VELOX_ADDRESS = '0x5cf7138d960b59b714b1d05774fdc2c26ae3f6d9f60808981f5d3c7e6004f840';
const toHex = (buffer)=>{
    return Array.from(buffer).map((b)=>b.toString(16).padStart(2, '0')).join('');
};
const getExplorerUrl = (txHashOrVersion)=>{
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
const TOKEN_ADDRESSES = {
    tUSDC: '0xd28177fbf37d818e493963c11fe567e3f6dad693a1406b309847f850ba6c31f0',
    tMOVE: '0x23dc029a2171449dd3a00598c6e83ef771ca4567818cea527d4ec6dd48c9701d',
    MOVE: '0x1::aptos_coin::AptosCoin'
};
const fetchTokenBalance = async (tokenAddress, ownerAddress, decimals)=>{
    // Early return if no owner address
    if (!ownerAddress || !tokenAddress) {
        return '0';
    }
    try {
        if (tokenAddress === TOKEN_ADDRESSES.MOVE) {
            // Native MOVE uses CoinStore
            const resources = await aptos.getAccountResources({
                accountAddress: ownerAddress
            });
            const coinResource = resources.find((r)=>r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
            if (coinResource) {
                const balance = coinResource.data.coin.value;
                return (Number(balance) / Math.pow(10, decimals)).toFixed(4);
            }
            return '0';
        } else if (tokenAddress === TOKEN_ADDRESSES.tUSDC) {
            // Use contract view function for tUSDC
            const result = await aptos.view({
                payload: {
                    function: `${VELOX_ADDRESS}::test_tokens::get_token_a_balance`,
                    typeArguments: [],
                    functionArguments: [
                        VELOX_ADDRESS,
                        ownerAddress
                    ]
                }
            });
            const balance = result[0];
            return (Number(balance) / Math.pow(10, decimals)).toFixed(4);
        } else if (tokenAddress === TOKEN_ADDRESSES.tMOVE) {
            // Use contract view function for tMOVE
            const result = await aptos.view({
                payload: {
                    function: `${VELOX_ADDRESS}::test_tokens::get_token_b_balance`,
                    typeArguments: [],
                    functionArguments: [
                        VELOX_ADDRESS,
                        ownerAddress
                    ]
                }
            });
            const balance = result[0];
            return (Number(balance) / Math.pow(10, decimals)).toFixed(4);
        }
        return '0';
    } catch (error) {
        console.error('Error fetching balance:', error);
        return '0';
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/wallet-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletProvider",
    ()=>WalletProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/wallet-adapter-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$NCKJ7X57$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a__as__AptosConfig$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-NCKJ7X57.mjs [app-client] (ecmascript) <export a as AptosConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$P5HCJN3A$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__f__as__Network$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-P5HCJN3A.mjs [app-client] (ecmascript) <export f as Network>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function WalletProvider({ children }) {
    // Movement network configuration from aptos.ts
    const aptosConfig = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$NCKJ7X57$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a__as__AptosConfig$3e$__["AptosConfig"]({
        network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$P5HCJN3A$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__f__as__Network$3e$__["Network"].MAINNET,
        fullnode: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOVEMENT_CONFIGS"][__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURRENT_NETWORK"]].fullnode
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AptosWalletAdapterProvider"], {
        autoConnect: true,
        dappConfig: aptosConfig,
        onError: (error)=>{
            console.error("Wallet error:", error);
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/components/wallet-provider.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = WalletProvider;
var _c;
__turbopack_context__.k.register(_c, "WalletProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/sonner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
const Toaster = ({ ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: "dark",
        position: "bottom-right",
        className: "toaster group",
        icons: {
            success: null,
            error: null,
            info: null,
            warning: null,
            loading: null
        },
        toastOptions: {
            unstyled: true,
            classNames: {
                toast: "flex items-center gap-3 w-[356px] p-4 rounded-lg bg-[#1c1917] text-[#faf7f5] border border-[#c2956a]/50 shadow-xl",
                title: "text-sm font-medium text-[#faf7f5]",
                description: "text-sm text-[#a8a29e]",
                actionButton: "ml-auto px-3 py-1.5 text-sm font-medium rounded-md bg-[#c2956a] text-[#0c0a09] hover:bg-[#c2956a]/90 transition-colors",
                cancelButton: "px-3 py-1.5 text-sm rounded-md bg-[#292524] text-[#a8a29e]"
            }
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/sonner.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Toaster;
;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers,
    "isPrivyConfigured",
    ()=>isPrivyConfigured,
    "useMockCreateWallet",
    ()=>useMockCreateWallet,
    "useMockPrivy",
    ()=>useMockPrivy,
    "usePrivyAvailable",
    ()=>usePrivyAvailable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$NL2cPmJD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__H__as__PrivyProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/index-NL2cPmJD.mjs [app-client] (ecmascript) <export H as PrivyProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$wallet$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/wallet-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/sonner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// Get Privy App ID from environment
const PRIVY_APP_ID = ("TURBOPACK compile-time value", "cmjmydj7x0222lb0d8mmx2rpf");
const isPrivyConfigured = !!(PRIVY_APP_ID && PRIVY_APP_ID !== 'YOUR_PRIVY_APP_ID');
// Context to track if Privy is available
const PrivyAvailableContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(false);
const usePrivyAvailable = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PrivyAvailableContext);
};
_s(usePrivyAvailable, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const MockPrivyContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    ready: true,
    authenticated: false,
    user: null,
    login: ()=>{},
    logout: async ()=>{}
});
const useMockPrivy = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(MockPrivyContext);
};
_s1(useMockPrivy, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const MockCreateWalletContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    createWallet: async ()=>null
});
const useMockCreateWallet = ()=>{
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(MockCreateWalletContext);
};
_s2(useMockCreateWallet, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function Providers({ children }) {
    // If no Privy App ID is configured, render without PrivyProvider
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrivyAvailableContext.Provider, {
        value: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$wallet$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$index$2d$NL2cPmJD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__H__as__PrivyProvider$3e$__["PrivyProvider"], {
                appId: PRIVY_APP_ID,
                config: {
                    loginMethods: [
                        'email',
                        'google',
                        'twitter',
                        'discord',
                        'github'
                    ]
                },
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {}, void 0, false, {
                        fileName: "[project]/app/providers.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/providers.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/providers.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/providers.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_fe84a60f._.js.map