(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/button.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border bg-card text-card-foreground shadow", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/card.tsx",
        lineNumber: 48,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/card.tsx",
        lineNumber: 60,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/card.tsx",
        lineNumber: 68,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const Dialog = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const DialogTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const DialogPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"];
const DialogClose = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"];
const DialogOverlay = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/dialog.tsx",
        lineNumber: 21,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c = DialogOverlay;
DialogOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const DialogContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/app/components/ui/dialog.tsx",
                lineNumber: 37,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ui/dialog.tsx",
                                lineNumber: 48,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/app/components/ui/dialog.tsx",
                                lineNumber: 49,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/ui/dialog.tsx",
                        lineNumber: 47,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/ui/dialog.tsx",
                lineNumber: 38,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ui/dialog.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c2 = DialogContent;
DialogContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const DialogHeader = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/dialog.tsx",
        lineNumber: 60,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = DialogHeader;
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/dialog.tsx",
        lineNumber: 74,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = DialogFooter;
DialogFooter.displayName = "DialogFooter";
const DialogTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c5 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/dialog.tsx",
        lineNumber: 88,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c6 = DialogTitle;
DialogTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const DialogDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c7 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/dialog.tsx",
        lineNumber: 103,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c8 = DialogDescription;
DialogDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "DialogOverlay");
__turbopack_context__.k.register(_c1, "DialogContent$React.forwardRef");
__turbopack_context__.k.register(_c2, "DialogContent");
__turbopack_context__.k.register(_c3, "DialogHeader");
__turbopack_context__.k.register(_c4, "DialogFooter");
__turbopack_context__.k.register(_c5, "DialogTitle$React.forwardRef");
__turbopack_context__.k.register(_c6, "DialogTitle");
__turbopack_context__.k.register(_c7, "DialogDescription$React.forwardRef");
__turbopack_context__.k.register(_c8, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/separator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Separator",
    ()=>Separator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-separator/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const Separator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, orientation = "horizontal", decorative = true, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        decorative: decorative,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/separator.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Separator;
Separator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Separator$React.forwardRef");
__turbopack_context__.k.register(_c1, "Separator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/wallet-selection-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletSelectionModal",
    ()=>WalletSelectionModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/wallet-adapter-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$standard$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/wallet-standard/dist/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$standard$2f$dist$2f$esm$2f$chunk$2d$7OMCNXQ7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b__as__getAptosWallets$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/wallet-standard/dist/esm/chunk-7OMCNXQ7.mjs [app-client] (ecmascript) <export b as getAptosWallets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/providers.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
// Dynamically import Privy section only when needed
const PrivyLoginSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/app/components/PrivyLoginSection.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/app/components/PrivyLoginSection.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-7 bg-muted rounded w-40 mx-auto mb-2 animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/app/components/wallet-selection-modal.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-4 bg-muted rounded w-60 mx-auto animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/app/components/wallet-selection-modal.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/wallet-selection-modal.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-12 bg-muted rounded w-full animate-pulse"
                }, void 0, false, {
                    fileName: "[project]/app/components/wallet-selection-modal.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/wallet-selection-modal.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
});
_c = PrivyLoginSection;
function WalletSelectionModal({ children }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { wallets, connect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useWallet"])();
    const privyAvailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrivyAvailable"])();
    // Filter out unwanted wallets, remove duplicates, and sort with Nightly first
    const filteredWallets = wallets?.filter((wallet)=>{
        const name = wallet.name.toLowerCase();
        return !name.includes("petra") && !name.includes("google") && !name.includes("apple");
    }).filter((wallet, index, self)=>{
        return index === self.findIndex((w)=>w.name === wallet.name);
    }).sort((a, b)=>{
        if (a.name.toLowerCase().includes("nightly")) return -1;
        if (b.name.toLowerCase().includes("nightly")) return 1;
        return 0;
    });
    const handleWalletSelect = async (walletName)=>{
        try {
            if ("TURBOPACK compile-time truthy", 1) {
                const allWallets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$standard$2f$dist$2f$esm$2f$chunk$2d$7OMCNXQ7$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b__as__getAptosWallets$3e$__["getAptosWallets"])();
                const selectedWallet = allWallets.aptosWallets.find((w)=>w.name === walletName);
                if (selectedWallet?.features?.['aptos:connect']) {
                    const networkInfo = {
                        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOVEMENT_CONFIGS"][__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURRENT_NETWORK"]].chainId,
                        name: "custom",
                        url: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOVEMENT_CONFIGS"][__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURRENT_NETWORK"]].fullnode
                    };
                    try {
                        const result = await selectedWallet.features['aptos:connect'].connect(false, networkInfo);
                        if (result.status === "Approved") {
                            await connect(walletName);
                            setOpen(false);
                            return;
                        }
                    } catch  {
                    // Fallback to standard connection
                    }
                }
            }
            await connect(walletName);
            setOpen(false);
        } catch  {
        // Silent error - wallet adapter will handle error display
        }
    };
    const handleClose = ()=>setOpen(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: setOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTrigger"], {
                asChild: true,
                children: children
            }, void 0, false, {
                fileName: "[project]/app/components/wallet-selection-modal.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                className: "sm:max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "Connect Wallet"
                            }, void 0, false, {
                                fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                children: "Choose a wallet to connect to Movement Network"
                            }, void 0, false, {
                                fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/wallet-selection-modal.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            privyAvailable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrivyLoginSection, {
                                        onClose: handleClose
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative my-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                                lineNumber: 115,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-background px-2 text-xs text-muted-foreground",
                                                    children: "OR"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                                lineNumber: 116,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold mb-1",
                                                children: "Connect Native Wallet"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                                lineNumber: 126,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: "Use your existing Aptos wallet"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                                lineNumber: 127,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: filteredWallets?.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-6 px-4 border border-dashed rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground mb-2",
                                                    children: "No wallets detected"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Please install a supported Aptos wallet like Nightly"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                            lineNumber: 133,
                                            columnNumber: 17
                                        }, this) : filteredWallets?.map((wallet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "w-full justify-start h-12 hover:bg-accent",
                                                onClick: ()=>handleWalletSelect(wallet.name),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-3",
                                                    children: [
                                                        wallet.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: wallet.icon,
                                                            alt: wallet.name,
                                                            className: "w-6 h-6 rounded"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: wallet.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 21
                                                }, this)
                                            }, wallet.name, false, {
                                                fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                                lineNumber: 143,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/wallet-selection-modal.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/wallet-selection-modal.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/wallet-selection-modal.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/wallet-selection-modal.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(WalletSelectionModal, "ccOkHvUxwmImdsFpkh0PkJcSvrk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useWallet"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrivyAvailable"]
    ];
});
_c1 = WalletSelectionModal;
var _c, _c1;
__turbopack_context__.k.register(_c, "PrivyLoginSection");
__turbopack_context__.k.register(_c1, "WalletSelectionModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/LoginPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$wallet$2d$selection$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/wallet-selection-modal.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
function LoginPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: "text-center p-8 sm:p-12 lg:p-16 max-w-lg w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-2xl bg-primary flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-primary-foreground font-bold text-2xl",
                            children: "V"
                        }, void 0, false, {
                            fileName: "[project]/app/components/LoginPage.tsx",
                            lineNumber: 14,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/LoginPage.tsx",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/LoginPage.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight",
                    children: "Velox"
                }, void 0, false, {
                    fileName: "[project]/app/components/LoginPage.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground text-sm sm:text-base md:text-lg mb-8 sm:mb-12",
                    children: "Intent-Based Trading on Movement"
                }, void 0, false, {
                    fileName: "[project]/app/components/LoginPage.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$wallet$2d$selection$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletSelectionModal"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "lg",
                        className: "w-full text-base sm:text-lg",
                        children: "Connect Wallet"
                    }, void 0, false, {
                        fileName: "[project]/app/components/LoginPage.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/LoginPage.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-muted-foreground mt-8",
                    children: "Submit swap intents and let solvers compete for the best execution"
                }, void 0, false, {
                    fileName: "[project]/app/components/LoginPage.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/LoginPage.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/LoginPage.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/dropdown-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropdownMenu",
    ()=>DropdownMenu,
    "DropdownMenuCheckboxItem",
    ()=>DropdownMenuCheckboxItem,
    "DropdownMenuContent",
    ()=>DropdownMenuContent,
    "DropdownMenuGroup",
    ()=>DropdownMenuGroup,
    "DropdownMenuItem",
    ()=>DropdownMenuItem,
    "DropdownMenuLabel",
    ()=>DropdownMenuLabel,
    "DropdownMenuPortal",
    ()=>DropdownMenuPortal,
    "DropdownMenuRadioGroup",
    ()=>DropdownMenuRadioGroup,
    "DropdownMenuRadioItem",
    ()=>DropdownMenuRadioItem,
    "DropdownMenuSeparator",
    ()=>DropdownMenuSeparator,
    "DropdownMenuShortcut",
    ()=>DropdownMenuShortcut,
    "DropdownMenuSub",
    ()=>DropdownMenuSub,
    "DropdownMenuSubContent",
    ()=>DropdownMenuSubContent,
    "DropdownMenuSubTrigger",
    ()=>DropdownMenuSubTrigger,
    "DropdownMenuTrigger",
    ()=>DropdownMenuTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const DropdownMenu = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const DropdownMenuTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const DropdownMenuGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"];
const DropdownMenuPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"];
const DropdownMenuSub = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sub"];
const DropdownMenuRadioGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"];
const DropdownMenuSubTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, inset, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubTrigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent", inset && "pl-8", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                className: "ml-auto h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/app/components/ui/dropdown-menu.tsx",
                lineNumber: 37,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ui/dropdown-menu.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = DropdownMenuSubTrigger;
DropdownMenuSubTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubTrigger"].displayName;
const DropdownMenuSubContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubContent"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/dropdown-menu.tsx",
        lineNumber: 47,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = DropdownMenuSubContent;
DropdownMenuSubContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubContent"].displayName;
const DropdownMenuContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, sideOffset = 4, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/app/components/ui/dropdown-menu.tsx",
            lineNumber: 64,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/components/ui/dropdown-menu.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = DropdownMenuContent;
DropdownMenuContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const DropdownMenuItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, inset, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/dropdown-menu.tsx",
        lineNumber: 84,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = DropdownMenuItem;
DropdownMenuItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"].displayName;
const DropdownMenuCheckboxItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, children, checked, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckboxItem"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ui/dropdown-menu.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/components/ui/dropdown-menu.tsx",
                    lineNumber: 110,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/components/ui/dropdown-menu.tsx",
                lineNumber: 109,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ui/dropdown-menu.tsx",
        lineNumber: 100,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = DropdownMenuCheckboxItem;
DropdownMenuCheckboxItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CheckboxItem"].displayName;
const DropdownMenuRadioItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioItem"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                        className: "h-2 w-2 fill-current"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ui/dropdown-menu.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/components/ui/dropdown-menu.tsx",
                    lineNumber: 133,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/components/ui/dropdown-menu.tsx",
                lineNumber: 132,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ui/dropdown-menu.tsx",
        lineNumber: 124,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = DropdownMenuRadioItem;
DropdownMenuRadioItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioItem"].displayName;
const DropdownMenuLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c12 = ({ className, inset, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/dropdown-menu.tsx",
        lineNumber: 148,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c13 = DropdownMenuLabel;
DropdownMenuLabel.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"].displayName;
const DropdownMenuSeparator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c14 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("-mx-1 my-1 h-px bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/dropdown-menu.tsx",
        lineNumber: 164,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c15 = DropdownMenuSeparator;
DropdownMenuSeparator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"].displayName;
const DropdownMenuShortcut = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("ml-auto text-xs tracking-widest opacity-60", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/dropdown-menu.tsx",
        lineNumber: 177,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c16 = DropdownMenuShortcut;
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16;
__turbopack_context__.k.register(_c, "DropdownMenuSubTrigger$React.forwardRef");
__turbopack_context__.k.register(_c1, "DropdownMenuSubTrigger");
__turbopack_context__.k.register(_c2, "DropdownMenuSubContent$React.forwardRef");
__turbopack_context__.k.register(_c3, "DropdownMenuSubContent");
__turbopack_context__.k.register(_c4, "DropdownMenuContent$React.forwardRef");
__turbopack_context__.k.register(_c5, "DropdownMenuContent");
__turbopack_context__.k.register(_c6, "DropdownMenuItem$React.forwardRef");
__turbopack_context__.k.register(_c7, "DropdownMenuItem");
__turbopack_context__.k.register(_c8, "DropdownMenuCheckboxItem$React.forwardRef");
__turbopack_context__.k.register(_c9, "DropdownMenuCheckboxItem");
__turbopack_context__.k.register(_c10, "DropdownMenuRadioItem$React.forwardRef");
__turbopack_context__.k.register(_c11, "DropdownMenuRadioItem");
__turbopack_context__.k.register(_c12, "DropdownMenuLabel$React.forwardRef");
__turbopack_context__.k.register(_c13, "DropdownMenuLabel");
__turbopack_context__.k.register(_c14, "DropdownMenuSeparator$React.forwardRef");
__turbopack_context__.k.register(_c15, "DropdownMenuSeparator");
__turbopack_context__.k.register(_c16, "DropdownMenuShortcut");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/avatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar,
    "AvatarFallback",
    ()=>AvatarFallback,
    "AvatarImage",
    ()=>AvatarImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-avatar/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
const Avatar = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/avatar.tsx",
        lineNumber: 11,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Avatar;
Avatar.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
const AvatarImage = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('aspect-square h-full w-full', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/avatar.tsx",
        lineNumber: 26,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = AvatarImage;
AvatarImage.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"].displayName;
const AvatarFallback = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fallback"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex h-full w-full items-center justify-center rounded-full bg-muted', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/avatar.tsx",
        lineNumber: 38,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = AvatarFallback;
AvatarFallback.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fallback"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Avatar$React.forwardRef");
__turbopack_context__.k.register(_c1, "Avatar");
__turbopack_context__.k.register(_c2, "AvatarImage$React.forwardRef");
__turbopack_context__.k.register(_c3, "AvatarImage");
__turbopack_context__.k.register(_c4, "AvatarFallback$React.forwardRef");
__turbopack_context__.k.register(_c5, "AvatarFallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/hooks/use-move-balance.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMoveBalance",
    ()=>useMoveBalance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useMoveBalance(address) {
    _s();
    const [balance, setBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(BigInt(0));
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMoveBalance.useCallback[fetchBalance]": async ()=>{
            if (!address) {
                setBalance(BigInt(0));
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const resources = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].getAccountResource({
                    accountAddress: address,
                    resourceType: '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
                });
                const coinBalance = BigInt(resources.coin.value);
                setBalance(coinBalance);
            } catch (err) {
                // Account might not have MOVE yet
                if (err?.message?.includes('Resource not found')) {
                    setBalance(BigInt(0));
                } else {
                    setError(err);
                    console.error('Error fetching MOVE balance:', err);
                }
            } finally{
                setIsLoading(false);
            }
        }
    }["useMoveBalance.useCallback[fetchBalance]"], [
        address
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMoveBalance.useEffect": ()=>{
            fetchBalance();
        }
    }["useMoveBalance.useEffect"], [
        fetchBalance
    ]);
    // Format balance with 8 decimals (MOVE has 8 decimals)
    const formatted = (Number(balance) / 1e8).toFixed(4);
    return {
        balance,
        formatted,
        isLoading,
        error,
        refetch: fetchBalance
    };
}
_s(useMoveBalance, "mPshWzHLvVhaTznwa76jGWjSVNA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const labelVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(labelVariants(), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/label.tsx",
        lineNumber: 18,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Label;
Label.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Label$React.forwardRef");
__turbopack_context__.k.register(_c1, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/constants/tokens.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TOKENS",
    ()=>TOKENS,
    "TOKEN_LIST",
    ()=>TOKEN_LIST
]);
const TOKENS = {
    tUSDC: {
        address: '0xd28177fbf37d818e493963c11fe567e3f6dad693a1406b309847f850ba6c31f0',
        symbol: 'tUSDC',
        name: 'Test USDC',
        decimals: 8,
        icon: '/tokens/usdc.svg'
    },
    tMOVE: {
        address: '0x23dc029a2171449dd3a00598c6e83ef771ca4567818cea527d4ec6dd48c9701d',
        symbol: 'tMOVE',
        name: 'Test MOVE',
        decimals: 8,
        icon: '/tokens/move.svg'
    }
};
const TOKEN_LIST = Object.values(TOKENS);
_c = TOKEN_LIST;
var _c;
__turbopack_context__.k.register(_c, "TOKEN_LIST");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/hooks/use-wallet-context.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletContextContext",
    ()=>WalletContextContext,
    "useWalletContext",
    ()=>useWalletContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const defaultWalletContext = {
    walletAddress: null,
    isPrivy: false,
    isConnected: false,
    isReady: false,
    signRawHash: null,
    publicKeyHex: null,
    signAndSubmitTransaction: null
};
const WalletContextContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(defaultWalletContext);
function useWalletContext() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(WalletContextContext);
}
_s(useWalletContext, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/hooks/use-faucet.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFaucet",
    ()=>useFaucet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/use-wallet-context.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__W__as__AccountAuthenticatorEd25519$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-76PXED26.mjs [app-client] (ecmascript) <export W as AccountAuthenticatorEd25519>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Q__as__Ed25519PublicKey$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-76PXED26.mjs [app-client] (ecmascript) <export Q as Ed25519PublicKey>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__S__as__Ed25519Signature$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-76PXED26.mjs [app-client] (ecmascript) <export S as Ed25519Signature>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__gb__as__generateSigningMessageForTransaction$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-76PXED26.mjs [app-client] (ecmascript) <export gb as generateSigningMessageForTransaction>");
var _s = __turbopack_context__.k.signature();
;
;
;
;
// Get faucet function based on token
const getFaucetFunction = (token)=>{
    if (token.symbol === 'tUSDC') {
        return `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::test_tokens::faucet_token_a`;
    } else if (token.symbol === 'tMOVE') {
        return `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::test_tokens::faucet_token_b`;
    }
    throw new Error('Invalid token for faucet');
};
// Convert amount to smallest unit (8 decimals)
const toSmallestUnit = (amount, decimals)=>{
    const [whole, fraction = ''] = amount.split('.');
    const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
    return BigInt(whole + paddedFraction);
};
function useFaucet() {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [txHash, setTxHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { walletAddress, isPrivy, signRawHash, publicKeyHex, signAndSubmitTransaction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContext"])();
    const reset = ()=>{
        setStatus('idle');
        setError(null);
        setTxHash(null);
    };
    const mintWithNativeWallet = async (token, amount)=>{
        if (!walletAddress || !signAndSubmitTransaction) {
            throw new Error('Wallet not connected');
        }
        const amountInSmallest = toSmallestUnit(amount, token.decimals);
        const response = await signAndSubmitTransaction({
            sender: walletAddress,
            data: {
                function: getFaucetFunction(token),
                functionArguments: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                    amountInSmallest.toString()
                ]
            }
        });
        const executed = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].waitForTransaction({
            transactionHash: response.hash
        });
        if (!executed.success) {
            throw new Error('Transaction failed');
        }
        return response.hash;
    };
    const mintWithPrivy = async (token, amount)=>{
        if (!walletAddress || !signRawHash || !publicKeyHex) {
            throw new Error('Privy wallet not connected or missing signing function');
        }
        const amountInSmallest = toSmallestUnit(amount, token.decimals);
        const rawTxn = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].transaction.build.simple({
            sender: walletAddress,
            data: {
                function: getFaucetFunction(token),
                typeArguments: [],
                functionArguments: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                    amountInSmallest.toString()
                ]
            }
        });
        const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__gb__as__generateSigningMessageForTransaction$3e$__["generateSigningMessageForTransaction"])(rawTxn);
        const { signature: rawSignature } = await signRawHash({
            address: walletAddress,
            chainType: 'aptos',
            hash: `0x${(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(message)}`
        });
        let cleanPublicKey = publicKeyHex.startsWith('0x') ? publicKeyHex.slice(2) : publicKeyHex;
        if (cleanPublicKey.length === 66) {
            cleanPublicKey = cleanPublicKey.slice(2);
        }
        const senderAuthenticator = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__W__as__AccountAuthenticatorEd25519$3e$__["AccountAuthenticatorEd25519"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Q__as__Ed25519PublicKey$3e$__["Ed25519PublicKey"](cleanPublicKey), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__S__as__Ed25519Signature$3e$__["Ed25519Signature"](rawSignature.startsWith('0x') ? rawSignature.slice(2) : rawSignature));
        const committedTx = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].transaction.submit.simple({
            transaction: rawTxn,
            senderAuthenticator
        });
        const executed = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].waitForTransaction({
            transactionHash: committedTx.hash
        });
        if (!executed.success) {
            throw new Error('Transaction failed');
        }
        return committedTx.hash;
    };
    const mint = async (token, amount)=>{
        try {
            setStatus('loading');
            setError(null);
            const hash = isPrivy ? await mintWithPrivy(token, amount) : await mintWithNativeWallet(token, amount);
            setTxHash(hash);
            setStatus('success');
            return hash;
        } catch (err) {
            console.error('Faucet error:', err);
            setError(err?.message || 'Failed to mint tokens');
            setStatus('error');
            throw err;
        }
    };
    return {
        mint,
        status,
        error,
        txHash,
        reset
    };
}
_s(useFaucet, "Spsr/bQE/PZ41CLERl+dDjOBiGA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContext"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/toast.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dismissToast",
    ()=>dismissToast,
    "showError",
    ()=>showError,
    "showInfo",
    ()=>showInfo,
    "showLoading",
    ()=>showLoading,
    "showSuccess",
    ()=>showSuccess,
    "showTxSuccess",
    ()=>showTxSuccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
;
;
function showTxSuccess(message, txHash) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(message, {
        description: `Transaction confirmed`,
        action: {
            label: 'View TX',
            onClick: ()=>window.open((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExplorerUrl"])(txHash), '_blank')
        },
        duration: 5000
    });
}
function showSuccess(message, description) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(message, {
        description,
        duration: 4000
    });
}
function showError(message, description) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(message, {
        description,
        duration: 5000
    });
}
function showInfo(message, description) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(message, {
        description,
        duration: 4000
    });
}
function showLoading(message) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading(message);
}
function dismissToast(toastId) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].dismiss(toastId);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/FaucetDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FaucetDialog",
    ()=>FaucetDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/droplets.js [app-client] (ecmascript) <export default as Droplets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/tokens.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$faucet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/use-faucet.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/toast.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
function FaucetDialog({ open, onOpenChange, address }) {
    _s();
    const [selectedToken, setSelectedToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('100');
    const { mint, status, error, txHash, reset } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$faucet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFaucet"])();
    // Show toast notification when mint succeeds or fails
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FaucetDialog.useEffect": ()=>{
            if (status === 'success' && txHash && selectedToken) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showTxSuccess"])(`${amount} ${selectedToken.symbol} minted!`, txHash);
            } else if (status === 'error' && error) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showError"])('Mint failed', error);
            }
        }
    }["FaucetDialog.useEffect"], [
        status,
        txHash,
        amount,
        selectedToken,
        error
    ]);
    const handleMint = async ()=>{
        if (!selectedToken || !amount) return;
        await mint(selectedToken, amount);
    };
    const handleReset = ()=>{
        setSelectedToken(null);
        setAmount('100');
        reset();
    };
    const handleClose = ()=>{
        handleReset();
        onOpenChange(false);
    };
    // Filter to only show faucet-eligible tokens (tUSDC, tMOVE)
    const faucetTokens = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].filter((t)=>t.symbol === 'tUSDC' || t.symbol === 'tMOVE');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: handleClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
                                    className: "h-5 w-5 text-primary"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/FaucetDialog.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                "Token Faucet"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/FaucetDialog.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: "Mint free test tokens for testing on Movement testnet"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FaucetDialog.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/FaucetDialog.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                status === 'success' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SuccessView, {
                    amount: amount,
                    symbol: selectedToken?.symbol,
                    txHash: txHash,
                    onReset: handleReset
                }, void 0, false, {
                    fileName: "[project]/app/components/FaucetDialog.tsx",
                    lineNumber: 76,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MintForm, {
                    faucetTokens: faucetTokens,
                    selectedToken: selectedToken,
                    onSelectToken: setSelectedToken,
                    amount: amount,
                    onAmountChange: setAmount,
                    error: error,
                    status: status,
                    onMint: handleMint
                }, void 0, false, {
                    fileName: "[project]/app/components/FaucetDialog.tsx",
                    lineNumber: 83,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/FaucetDialog.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/FaucetDialog.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(FaucetDialog, "RKnt2/oLO/x/k1Cr10pzZ91eKAY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$faucet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFaucet"]
    ];
});
_c = FaucetDialog;
function SuccessView({ amount, symbol, txHash, onReset }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-4 py-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    className: "h-6 w-6 text-green-500"
                }, void 0, false, {
                    fileName: "[project]/app/components/FaucetDialog.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/FaucetDialog.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-medium",
                        children: "Tokens Minted!"
                    }, void 0, false, {
                        fileName: "[project]/app/components/FaucetDialog.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground mt-1",
                        children: [
                            amount,
                            " ",
                            symbol,
                            " sent to your wallet"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/FaucetDialog.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FaucetDialog.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExplorerUrl"])(txHash),
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-sm text-primary hover:underline",
                children: "View transaction"
            }, void 0, false, {
                fileName: "[project]/app/components/FaucetDialog.tsx",
                lineNumber: 122,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                onClick: onReset,
                variant: "outline",
                className: "mt-2",
                children: "Mint More"
            }, void 0, false, {
                fileName: "[project]/app/components/FaucetDialog.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/FaucetDialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c1 = SuccessView;
function MintForm({ faucetTokens, selectedToken, onSelectToken, amount, onAmountChange, error, status, onMint }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        children: "Select Token"
                    }, void 0, false, {
                        fileName: "[project]/app/components/FaucetDialog.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: faucetTokens.map((token)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onSelectToken(token),
                                className: `flex items-center gap-3 p-3 rounded-lg border transition-colors ${selectedToken?.symbol === token.symbol ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium",
                                        children: token.symbol.slice(0, 2)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/FaucetDialog.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium text-sm",
                                                children: token.symbol
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/FaucetDialog.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: token.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/FaucetDialog.tsx",
                                                lineNumber: 178,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/FaucetDialog.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, token.symbol, true, {
                                fileName: "[project]/app/components/FaucetDialog.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/FaucetDialog.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FaucetDialog.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        htmlFor: "amount",
                        children: "Amount"
                    }, void 0, false, {
                        fileName: "[project]/app/components/FaucetDialog.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        id: "amount",
                        type: "number",
                        placeholder: "100",
                        value: amount,
                        onChange: (e)=>onAmountChange(e.target.value),
                        min: "1",
                        step: "1"
                    }, void 0, false, {
                        fileName: "[project]/app/components/FaucetDialog.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            '10',
                            '100',
                            '1000'
                        ].map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "sm",
                                onClick: ()=>onAmountChange(preset),
                                className: "flex-1",
                                children: preset
                            }, preset, false, {
                                fileName: "[project]/app/components/FaucetDialog.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/FaucetDialog.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FaucetDialog.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 rounded-lg bg-destructive/10 text-destructive text-sm",
                children: error
            }, void 0, false, {
                fileName: "[project]/app/components/FaucetDialog.tsx",
                lineNumber: 213,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                onClick: onMint,
                disabled: !selectedToken || !amount || status === 'loading',
                className: "w-full",
                children: status === 'loading' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "mr-2 h-4 w-4 animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FaucetDialog.tsx",
                            lineNumber: 225,
                            columnNumber: 13
                        }, this),
                        "Minting..."
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
                            className: "mr-2 h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/app/components/FaucetDialog.tsx",
                            lineNumber: 230,
                            columnNumber: 13
                        }, this),
                        "Mint ",
                        amount,
                        " ",
                        selectedToken?.symbol || 'Tokens'
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/app/components/FaucetDialog.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-2 border-t",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground mb-2",
                        children: "Need native MOVE for gas fees?"
                    }, void 0, false, {
                        fileName: "[project]/app/components/FaucetDialog.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://faucet.movementnetwork.xyz/",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "inline-flex items-center gap-1 text-sm text-primary hover:underline",
                        children: [
                            "Get MOVE from public faucet",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/app/components/FaucetDialog.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/FaucetDialog.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FaucetDialog.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/FaucetDialog.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
_c2 = MintForm;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "FaucetDialog");
__turbopack_context__.k.register(_c1, "SuccessView");
__turbopack_context__.k.register(_c2, "MintForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/WalletButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletButton",
    ()=>WalletButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/droplets.js [app-client] (ecmascript) <export default as Droplets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$BWtc2XF$2d2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__ = __turbopack_context__.i("[project]/node_modules/@privy-io/react-auth/dist/esm/usePrivy-BWtc2XF-.mjs [app-client] (ecmascript) <export u as usePrivy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/wallet-adapter-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$move$2d$balance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/use-move-balance.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FaucetDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/FaucetDialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function WalletButton({ address }) {
    _s();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [faucetOpen, setFaucetOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { logout: privyLogout, authenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$BWtc2XF$2d2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"])();
    const { disconnect, connected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useWallet"])();
    const { formatted, isLoading: isBalanceLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$move$2d$balance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMoveBalance"])(address);
    const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
    // Generate DiceBear pixel-art avatar URL using address as seed
    const avatarUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WalletButton.useMemo[avatarUrl]": ()=>{
            if (!address) return null;
            return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${address}`;
        }
    }["WalletButton.useMemo[avatarUrl]"], [
        address
    ]);
    const handleCopy = async ()=>{
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    };
    const handleDisconnect = async ()=>{
        if (authenticated) {
            await privyLogout();
        } else if (connected) {
            disconnect();
        }
    };
    const handleViewExplorer = ()=>{
        const explorerUrl = `https://explorer.movementnetwork.xyz/account/${address}?network=testnet`;
        window.open(explorerUrl, '_blank');
    };
    if (!address) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    className: "h-10 px-3 gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: isBalanceLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "h-3 w-3 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletButton.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this) : `${formatted} MOVE`
                        }, void 0, false, {
                            fileName: "[project]/app/components/WalletButton.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-5 w-px bg-border"
                        }, void 0, false, {
                            fileName: "[project]/app/components/WalletButton.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                            className: "h-6 w-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                    src: avatarUrl || undefined,
                                    alt: "Wallet avatar"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/WalletButton.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                    className: "text-xs bg-primary text-primary-foreground",
                                    children: address?.slice(2, 4).toUpperCase()
                                }, void 0, false, {
                                    fileName: "[project]/app/components/WalletButton.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/WalletButton.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono text-sm hidden sm:inline",
                            children: shortAddress
                        }, void 0, false, {
                            fileName: "[project]/app/components/WalletButton.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/WalletButton.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/WalletButton.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "end",
                className: "w-52",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-2 py-1.5 text-xs text-muted-foreground font-mono break-all",
                        children: address
                    }, void 0, false, {
                        fileName: "[project]/app/components/WalletButton.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                        fileName: "[project]/app/components/WalletButton.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        onClick: handleCopy,
                        className: "gap-2 cursor-pointer",
                        children: [
                            copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                className: "h-4 w-4 text-green-500"
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletButton.tsx",
                                lineNumber: 96,
                                columnNumber: 21
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletButton.tsx",
                                lineNumber: 96,
                                columnNumber: 68
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: copied ? 'Copied!' : 'Copy Address'
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletButton.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/WalletButton.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        onClick: handleViewExplorer,
                        className: "gap-2 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletButton.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "View on Explorer"
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletButton.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/WalletButton.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        onClick: ()=>setFaucetOpen(true),
                        className: "gap-2 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletButton.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Faucet"
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletButton.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/WalletButton.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                        fileName: "[project]/app/components/WalletButton.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        onClick: handleDisconnect,
                        className: "gap-2 text-destructive focus:text-destructive cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletButton.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Disconnect"
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletButton.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/WalletButton.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/WalletButton.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FaucetDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaucetDialog"], {
                open: faucetOpen,
                onOpenChange: setFaucetOpen,
                address: address
            }, void 0, false, {
                fileName: "[project]/app/components/WalletButton.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/WalletButton.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(WalletButton, "8nRjtlNYTW6TbpGr8I4MsLm5B0s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$privy$2d$io$2f$react$2d$auth$2f$dist$2f$esm$2f$usePrivy$2d$BWtc2XF$2d2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__usePrivy$3e$__["usePrivy"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useWallet"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$move$2d$balance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMoveBalance"]
    ];
});
_c = WalletButton;
var _c;
__turbopack_context__.k.register(_c, "WalletButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/layout/header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$WalletButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/WalletButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const navLinks = [
    {
        href: '/',
        label: 'Trade'
    },
    {
        href: '/explorer',
        label: 'Explorer'
    },
    {
        href: '/solvers',
        label: 'Solvers'
    }
];
function Header({ address }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container flex h-16 items-center justify-between px-4 md:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/velox-logo.png",
                                    alt: "Velox",
                                    width: 32,
                                    height: 32,
                                    className: "rounded-lg"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/layout/header.tsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl font-bold",
                                    children: "Velox"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/layout/header.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/layout/header.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden md:flex items-center gap-1",
                            children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-3 py-2 rounded-md text-sm font-medium transition-colors', pathname === link.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'),
                                    children: link.label
                                }, link.href, false, {
                                    fileName: "[project]/app/components/layout/header.tsx",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/components/layout/header.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/layout/header.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$WalletButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletButton"], {
                    address: address
                }, void 0, false, {
                    fileName: "[project]/app/components/layout/header.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/layout/header.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/layout/header.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(Header, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/layout/footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/github.js [app-client] (ecmascript) <export default as Github>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
'use client';
;
;
;
const LINKS = [
    {
        label: 'Docs',
        href: 'https://docs.movementnetwork.xyz',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
    },
    {
        label: 'GitHub',
        href: 'https://github.com/movementlabsxyz',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__["Github"]
    },
    {
        label: 'Explorer',
        href: `https://explorer.movementnetwork.xyz/?network=${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOVEMENT_CONFIGS"][__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURRENT_NETWORK"]].explorer}`,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"]
    }
];
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "border-t border-border bg-background/50 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container flex items-center justify-center py-4 px-4 md:px-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex items-center gap-4 sm:gap-6",
                children: LINKS.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: link.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(link.icon, {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/layout/footer.tsx",
                                lineNumber: 38,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: link.label
                            }, void 0, false, {
                                fileName: "[project]/app/components/layout/footer.tsx",
                                lineNumber: 39,
                                columnNumber: 15
                            }, this)
                        ]
                    }, link.label, true, {
                        fileName: "[project]/app/components/layout/footer.tsx",
                        lineNumber: 31,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/layout/footer.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/layout/footer.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/layout/footer.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const Tabs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const TabsList = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/tabs.tsx",
        lineNumber: 14,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = TabsList;
TabsList.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"].displayName;
const TabsTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/tabs.tsx",
        lineNumber: 29,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = TabsTrigger;
TabsTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"].displayName;
const TabsContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/tabs.tsx",
        lineNumber: 44,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = TabsContent;
TabsContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "TabsList$React.forwardRef");
__turbopack_context__.k.register(_c1, "TabsList");
__turbopack_context__.k.register(_c2, "TabsTrigger$React.forwardRef");
__turbopack_context__.k.register(_c3, "TabsTrigger");
__turbopack_context__.k.register(_c4, "TabsContent$React.forwardRef");
__turbopack_context__.k.register(_c5, "TabsContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const Select = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const SelectGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"];
const SelectValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"];
const SelectTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                    className: "h-4 w-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/app/components/ui/select.tsx",
                    lineNumber: 29,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/components/ui/select.tsx",
                lineNumber: 28,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ui/select.tsx",
        lineNumber: 19,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = SelectTrigger;
SelectTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"].displayName;
const SelectScrollUpButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/app/components/ui/select.tsx",
            lineNumber: 47,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/components/ui/select.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c2 = SelectScrollUpButton;
SelectScrollUpButton.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"].displayName;
const SelectScrollDownButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/app/components/ui/select.tsx",
            lineNumber: 64,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/components/ui/select.tsx",
        lineNumber: 56,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = SelectScrollDownButton;
SelectScrollDownButton.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"].displayName;
const SelectContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, children, position = "popper", ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/app/components/ui/select.tsx",
                    lineNumber: 86,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/components/ui/select.tsx",
                    lineNumber: 87,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/app/components/ui/select.tsx",
                    lineNumber: 96,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/ui/select.tsx",
            lineNumber: 75,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/components/ui/select.tsx",
        lineNumber: 74,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = SelectContent;
SelectContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const SelectLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-2 py-1.5 text-sm font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/select.tsx",
        lineNumber: 106,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = SelectLabel;
SelectLabel.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"].displayName;
const SelectItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/app/components/ui/select.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/components/ui/select.tsx",
                    lineNumber: 127,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/components/ui/select.tsx",
                lineNumber: 126,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/app/components/ui/select.tsx",
                lineNumber: 131,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/ui/select.tsx",
        lineNumber: 118,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = SelectItem;
SelectItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"].displayName;
const SelectSeparator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("-mx-1 my-1 h-px bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/select.tsx",
        lineNumber: 140,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = SelectSeparator;
SelectSeparator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "SelectTrigger$React.forwardRef");
__turbopack_context__.k.register(_c1, "SelectTrigger");
__turbopack_context__.k.register(_c2, "SelectScrollUpButton");
__turbopack_context__.k.register(_c3, "SelectScrollDownButton");
__turbopack_context__.k.register(_c4, "SelectContent$React.forwardRef");
__turbopack_context__.k.register(_c5, "SelectContent");
__turbopack_context__.k.register(_c6, "SelectLabel$React.forwardRef");
__turbopack_context__.k.register(_c7, "SelectLabel");
__turbopack_context__.k.register(_c8, "SelectItem$React.forwardRef");
__turbopack_context__.k.register(_c9, "SelectItem");
__turbopack_context__.k.register(_c10, "SelectSeparator$React.forwardRef");
__turbopack_context__.k.register(_c11, "SelectSeparator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/token-selector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TokenSelector",
    ()=>TokenSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/label.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function TokenSelector({ selectedToken, onSelect, tokens, balance, balances = {}, label, disabled = false }) {
    const handleValueChange = (value)=>{
        const token = tokens.find((t)=>t.address === value);
        if (token) {
            onSelect(token);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1.5",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                className: "text-muted-foreground",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/intent/token-selector.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                value: selectedToken?.address || '',
                onValueChange: handleValueChange,
                disabled: disabled,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                        className: "w-[140px] h-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                            placeholder: "Select token",
                            children: selectedToken && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium",
                                        children: selectedToken.symbol.charAt(0)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/token-selector.tsx",
                                        lineNumber: 53,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: selectedToken.symbol
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/token-selector.tsx",
                                        lineNumber: 56,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/token-selector.tsx",
                                lineNumber: 52,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/token-selector.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/token-selector.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                        children: tokens.map((token)=>{
                            const tokenBalance = balances[token.address];
                            const hasBalance = tokenBalance && parseFloat(tokenBalance) > 0;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: token.address,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-3 w-full min-w-[180px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium",
                                                    children: token.symbol.charAt(0)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/intent/token-selector.tsx",
                                                    lineNumber: 69,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: token.symbol
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/intent/token-selector.tsx",
                                                            lineNumber: 73,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: token.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/intent/token-selector.tsx",
                                                            lineNumber: 74,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/intent/token-selector.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/intent/token-selector.tsx",
                                            lineNumber: 68,
                                            columnNumber: 19
                                        }, this),
                                        tokenBalance !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-sm font-medium ${hasBalance ? 'text-foreground' : 'text-muted-foreground'}`,
                                            children: tokenBalance
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/token-selector.tsx",
                                            lineNumber: 78,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/token-selector.tsx",
                                    lineNumber: 67,
                                    columnNumber: 17
                                }, this)
                            }, token.address, false, {
                                fileName: "[project]/app/components/intent/token-selector.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/token-selector.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/token-selector.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            selectedToken && balance !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground",
                children: [
                    "Balance: ",
                    balance,
                    " ",
                    selectedToken.symbol
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/token-selector.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/token-selector.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = TokenSelector;
var _c;
__turbopack_context__.k.register(_c, "TokenSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/amount-input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AmountInput",
    ()=>AmountInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function AmountInput({ value, onChange, token, balance, label, disabled = false, placeholder = '0.00' }) {
    const handleChange = (e)=>{
        const inputValue = e.target.value;
        if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
            onChange(inputValue);
        }
    };
    const handleMax = ()=>{
        if (balance) {
            onChange(balance);
        }
    };
    const numericBalance = balance ? parseFloat(balance) : 0;
    const numericValue = value ? parseFloat(value) : 0;
    const hasInsufficientBalance = numericValue > numericBalance && numericBalance > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1.5",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                className: "text-muted-foreground",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/intent/amount-input.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        type: "text",
                        inputMode: "decimal",
                        value: value,
                        onChange: handleChange,
                        placeholder: placeholder,
                        disabled: disabled || !token,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pr-16 text-lg font-medium h-12", hasInsufficientBalance && "border-destructive focus-visible:ring-destructive")
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/amount-input.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    balance && token && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        onClick: handleMax,
                        disabled: disabled,
                        className: "absolute right-1 top-1/2 -translate-y-1/2 h-8 px-2 text-xs font-medium text-primary hover:text-primary/80",
                        children: "MAX"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/amount-input.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/amount-input.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            hasInsufficientBalance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-destructive",
                children: "Insufficient balance"
            }, void 0, false, {
                fileName: "[project]/app/components/intent/amount-input.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/amount-input.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c = AmountInput;
var _c;
__turbopack_context__.k.register(_c, "AmountInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/velox/transactions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelIntent",
    ()=>cancelIntent,
    "cancelIntentNative",
    ()=>cancelIntentNative,
    "getDutchAuction",
    ()=>getDutchAuction,
    "getDutchPrice",
    ()=>getDutchPrice,
    "submitDCAIntent",
    ()=>submitDCAIntent,
    "submitDCAIntentNative",
    ()=>submitDCAIntentNative,
    "submitLimitOrderIntent",
    ()=>submitLimitOrderIntent,
    "submitLimitOrderIntentNative",
    ()=>submitLimitOrderIntentNative,
    "submitSwapIntent",
    ()=>submitSwapIntent,
    "submitSwapIntentNative",
    ()=>submitSwapIntentNative,
    "submitSwapWithAuction",
    ()=>submitSwapWithAuction,
    "submitSwapWithAuctionNative",
    ()=>submitSwapWithAuctionNative,
    "submitSwapWithDutchAuction",
    ()=>submitSwapWithDutchAuction,
    "submitSwapWithDutchAuctionNative",
    ()=>submitSwapWithDutchAuctionNative,
    "submitTWAPIntent",
    ()=>submitTWAPIntent,
    "submitTWAPIntentNative",
    ()=>submitTWAPIntentNative
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__W__as__AccountAuthenticatorEd25519$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-76PXED26.mjs [app-client] (ecmascript) <export W as AccountAuthenticatorEd25519>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Q__as__Ed25519PublicKey$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-76PXED26.mjs [app-client] (ecmascript) <export Q as Ed25519PublicKey>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__S__as__Ed25519Signature$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-76PXED26.mjs [app-client] (ecmascript) <export S as Ed25519Signature>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__gb__as__generateSigningMessageForTransaction$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/ts-sdk/dist/esm/chunk-76PXED26.mjs [app-client] (ecmascript) <export gb as generateSigningMessageForTransaction>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
;
;
// Helper to build and sign transactions with Privy
async function signAndSubmitWithPrivy(walletAddress, functionId, args, publicKeyHex, signRawHash) {
    const rawTxn = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].transaction.build.simple({
        sender: walletAddress,
        data: {
            function: functionId,
            typeArguments: [],
            functionArguments: args
        }
    });
    const message = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__gb__as__generateSigningMessageForTransaction$3e$__["generateSigningMessageForTransaction"])(rawTxn);
    const { signature: rawSignature } = await signRawHash({
        address: walletAddress,
        chainType: 'aptos',
        hash: `0x${(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(message)}`
    });
    let cleanPublicKey = publicKeyHex.startsWith('0x') ? publicKeyHex.slice(2) : publicKeyHex;
    if (cleanPublicKey.length === 66) {
        cleanPublicKey = cleanPublicKey.slice(2);
    }
    const senderAuthenticator = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__W__as__AccountAuthenticatorEd25519$3e$__["AccountAuthenticatorEd25519"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Q__as__Ed25519PublicKey$3e$__["Ed25519PublicKey"](cleanPublicKey), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$ts$2d$sdk$2f$dist$2f$esm$2f$chunk$2d$76PXED26$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__S__as__Ed25519Signature$3e$__["Ed25519Signature"](rawSignature.startsWith('0x') ? rawSignature.slice(2) : rawSignature));
    const committedTx = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].transaction.submit.simple({
        transaction: rawTxn,
        senderAuthenticator
    });
    const executed = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].waitForTransaction({
        transactionHash: committedTx.hash
    });
    if (!executed.success) {
        throw new Error('Transaction failed');
    }
    return committedTx.hash;
}
async function submitSwapIntent(walletAddress, inputToken, outputToken, amountIn, minAmountOut, deadline, signRawHash, publicKeyHex) {
    return signAndSubmitWithPrivy(walletAddress, `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::submit_swap`, [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
        inputToken,
        outputToken,
        amountIn.toString(),
        minAmountOut.toString(),
        deadline
    ], publicKeyHex, signRawHash);
}
async function submitSwapIntentNative(walletAddress, inputToken, outputToken, amountIn, minAmountOut, deadline, signAndSubmitTransaction) {
    const response = await signAndSubmitTransaction({
        sender: walletAddress,
        data: {
            function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::submit_swap`,
            functionArguments: [
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                inputToken,
                outputToken,
                amountIn.toString(),
                minAmountOut.toString(),
                deadline
            ]
        }
    });
    const executed = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].waitForTransaction({
        transactionHash: response.hash
    });
    if (!executed.success) {
        throw new Error('Transaction failed');
    }
    return response.hash;
}
async function submitLimitOrderIntent(walletAddress, inputToken, outputToken, amountIn, limitPrice, expiry, partialFillAllowed, signRawHash, publicKeyHex) {
    return signAndSubmitWithPrivy(walletAddress, `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::submit_limit_order`, [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
        inputToken,
        outputToken,
        amountIn.toString(),
        limitPrice.toString(),
        expiry,
        partialFillAllowed
    ], publicKeyHex, signRawHash);
}
async function submitLimitOrderIntentNative(walletAddress, inputToken, outputToken, amountIn, limitPrice, expiry, partialFillAllowed, signAndSubmitTransaction) {
    const response = await signAndSubmitTransaction({
        sender: walletAddress,
        data: {
            function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::submit_limit_order`,
            functionArguments: [
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                inputToken,
                outputToken,
                amountIn.toString(),
                limitPrice.toString(),
                expiry,
                partialFillAllowed
            ]
        }
    });
    const executed = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].waitForTransaction({
        transactionHash: response.hash
    });
    if (!executed.success) {
        throw new Error('Transaction failed');
    }
    return response.hash;
}
async function submitTWAPIntent(walletAddress, inputToken, outputToken, totalAmount, numChunks, intervalSeconds, maxSlippageBps, startTime, signRawHash, publicKeyHex) {
    return signAndSubmitWithPrivy(walletAddress, `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::submit_twap`, [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
        inputToken,
        outputToken,
        totalAmount.toString(),
        numChunks,
        intervalSeconds,
        maxSlippageBps,
        startTime
    ], publicKeyHex, signRawHash);
}
async function submitTWAPIntentNative(walletAddress, inputToken, outputToken, totalAmount, numChunks, intervalSeconds, maxSlippageBps, startTime, signAndSubmitTransaction) {
    const response = await signAndSubmitTransaction({
        sender: walletAddress,
        data: {
            function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::submit_twap`,
            functionArguments: [
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                inputToken,
                outputToken,
                totalAmount.toString(),
                numChunks,
                intervalSeconds,
                maxSlippageBps,
                startTime
            ]
        }
    });
    const executed = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].waitForTransaction({
        transactionHash: response.hash
    });
    if (!executed.success) {
        throw new Error('Transaction failed');
    }
    return response.hash;
}
async function submitDCAIntent(walletAddress, inputToken, outputToken, amountPerPeriod, totalPeriods, intervalSeconds, signRawHash, publicKeyHex) {
    return signAndSubmitWithPrivy(walletAddress, `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::submit_dca`, [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
        inputToken,
        outputToken,
        amountPerPeriod.toString(),
        totalPeriods,
        intervalSeconds
    ], publicKeyHex, signRawHash);
}
async function submitDCAIntentNative(walletAddress, inputToken, outputToken, amountPerPeriod, totalPeriods, intervalSeconds, signAndSubmitTransaction) {
    const response = await signAndSubmitTransaction({
        sender: walletAddress,
        data: {
            function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::submit_dca`,
            functionArguments: [
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                inputToken,
                outputToken,
                amountPerPeriod.toString(),
                totalPeriods,
                intervalSeconds
            ]
        }
    });
    const executed = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].waitForTransaction({
        transactionHash: response.hash
    });
    if (!executed.success) {
        throw new Error('Transaction failed');
    }
    return response.hash;
}
async function submitSwapWithAuction(walletAddress, inputToken, outputToken, amountIn, minAmountOut, deadline, auctionDuration, signRawHash, publicKeyHex) {
    return signAndSubmitWithPrivy(walletAddress, `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::submit_swap_with_auction`, [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
        inputToken,
        outputToken,
        amountIn.toString(),
        minAmountOut.toString(),
        deadline,
        auctionDuration
    ], publicKeyHex, signRawHash);
}
async function submitSwapWithAuctionNative(walletAddress, inputToken, outputToken, amountIn, minAmountOut, deadline, auctionDuration, signAndSubmitTransaction) {
    const response = await signAndSubmitTransaction({
        sender: walletAddress,
        data: {
            function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::submit_swap_with_auction`,
            functionArguments: [
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                inputToken,
                outputToken,
                amountIn.toString(),
                minAmountOut.toString(),
                deadline,
                auctionDuration
            ]
        }
    });
    const executed = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].waitForTransaction({
        transactionHash: response.hash
    });
    if (!executed.success) {
        throw new Error('Transaction failed');
    }
    return response.hash;
}
async function submitSwapWithDutchAuction(walletAddress, inputToken, outputToken, amountIn, minAmountOut, startPrice, deadline, auctionDuration, signRawHash, publicKeyHex) {
    return signAndSubmitWithPrivy(walletAddress, `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::submit_swap_with_dutch_auction`, [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
        inputToken,
        outputToken,
        amountIn.toString(),
        minAmountOut.toString(),
        startPrice.toString(),
        deadline,
        auctionDuration
    ], publicKeyHex, signRawHash);
}
async function submitSwapWithDutchAuctionNative(walletAddress, inputToken, outputToken, amountIn, minAmountOut, startPrice, deadline, auctionDuration, signAndSubmitTransaction) {
    const response = await signAndSubmitTransaction({
        sender: walletAddress,
        data: {
            function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::submit_swap_with_dutch_auction`,
            functionArguments: [
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                inputToken,
                outputToken,
                amountIn.toString(),
                minAmountOut.toString(),
                startPrice.toString(),
                deadline,
                auctionDuration
            ]
        }
    });
    const executed = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].waitForTransaction({
        transactionHash: response.hash
    });
    if (!executed.success) {
        throw new Error('Transaction failed');
    }
    return response.hash;
}
async function getDutchAuction(intentId) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
            payload: {
                function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::auction::get_dutch_auction`,
                functionArguments: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                    intentId.toString()
                ]
            }
        });
        const [startTime, startPrice, endPrice, duration, isActive, winner, acceptedPrice] = result;
        return {
            intentId,
            startTime: Number(startTime),
            startPrice: BigInt(startPrice),
            endPrice: BigInt(endPrice),
            duration: Number(duration),
            isActive: isActive,
            winner: winner,
            acceptedPrice: BigInt(acceptedPrice)
        };
    } catch  {
        return null;
    }
}
async function getDutchPrice(intentId) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
        payload: {
            function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::auction::get_dutch_price`,
            functionArguments: [
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                intentId.toString()
            ]
        }
    });
    return BigInt(result[0]);
}
async function cancelIntent(walletAddress, intentId, signRawHash, publicKeyHex) {
    return signAndSubmitWithPrivy(walletAddress, `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::cancel_intent`, [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
        intentId.toString()
    ], publicKeyHex, signRawHash);
}
async function cancelIntentNative(walletAddress, intentId, signAndSubmitTransaction) {
    const response = await signAndSubmitTransaction({
        sender: walletAddress,
        data: {
            function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::cancel_intent`,
            functionArguments: [
                __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                intentId.toString()
            ]
        }
    });
    const executed = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].waitForTransaction({
        transactionHash: response.hash
    });
    if (!executed.success) {
        throw new Error('Transaction failed');
    }
    return response.hash;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/pricing.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateSwapOutput",
    ()=>calculateSwapOutput,
    "formatPrice",
    ()=>formatPrice,
    "getAllTokenPrices",
    ()=>getAllTokenPrices,
    "getExchangeRate",
    ()=>getExchangeRate
]);
// Real-time pricing utility for token conversions
// Token identifiers for price APIs
const TOKEN_IDS = {
    // Movement MOVE - CoinGecko ID
    MOVE: 'movement',
    // Stablecoins are always $1
    tUSDC: 'usd-coin',
    USDC: 'usd-coin'
};
const priceCache = {};
const CACHE_DURATION_MS = 30000; // 30 seconds
/**
 * Fetch the USD price of a token from CoinGecko
 */ async function fetchTokenPriceUSD(tokenSymbol) {
    // Stablecoins are always $1
    if (tokenSymbol === 'tUSDC' || tokenSymbol === 'USDC') {
        return 1.0;
    }
    // tMOVE uses same price as MOVE
    const normalizedSymbol = tokenSymbol === 'tMOVE' ? 'MOVE' : tokenSymbol;
    const cacheKey = normalizedSymbol.toUpperCase();
    const cached = priceCache[cacheKey];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
        return cached.price;
    }
    // Map token symbol to CoinGecko ID
    const coinId = TOKEN_IDS[normalizedSymbol];
    if (!coinId) {
        console.warn(`No CoinGecko ID for token: ${tokenSymbol}`);
        return 0;
    }
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`, {
            headers: {
                'Accept': 'application/json'
            },
            next: {
                revalidate: 30
            }
        });
        if (!response.ok) {
            throw new Error(`CoinGecko API error: ${response.status}`);
        }
        const data = await response.json();
        const price = data[coinId]?.usd;
        if (typeof price === 'number') {
            priceCache[cacheKey] = {
                price,
                timestamp: Date.now()
            };
            return price;
        }
        throw new Error('Invalid price data');
    } catch (error) {
        console.error(`Error fetching price for ${tokenSymbol}:`, error);
        // Return cached price if available, even if stale
        if (cached) {
            return cached.price;
        }
        return 0;
    }
}
async function getExchangeRate(inputSymbol, outputSymbol) {
    // Same token = 1:1
    if (inputSymbol === outputSymbol) {
        return 1;
    }
    const [inputPriceUSD, outputPriceUSD] = await Promise.all([
        fetchTokenPriceUSD(inputSymbol),
        fetchTokenPriceUSD(outputSymbol)
    ]);
    if (inputPriceUSD === 0 || outputPriceUSD === 0) {
        console.warn(`Could not fetch prices for ${inputSymbol}/${outputSymbol}`);
        return 0;
    }
    // Exchange rate = inputPrice / outputPrice
    // e.g., if MOVE = $0.50 and USDC = $1.00, then 1 MOVE = 0.5 USDC
    return inputPriceUSD / outputPriceUSD;
}
async function calculateSwapOutput(inputAmount, inputSymbol, outputSymbol, slippagePercent = 0.5) {
    const exchangeRate = await getExchangeRate(inputSymbol, outputSymbol);
    if (exchangeRate === 0) {
        return {
            outputAmount: 0,
            exchangeRate: 0,
            priceImpact: 0
        };
    }
    const rawOutput = inputAmount * exchangeRate;
    // Apply slippage for minimum output
    const outputAmount = rawOutput * (1 - slippagePercent / 100);
    return {
        outputAmount,
        exchangeRate,
        priceImpact: 0
    };
}
async function getAllTokenPrices() {
    const symbols = [
        'MOVE',
        'tMOVE',
        'tUSDC'
    ];
    const prices = {};
    await Promise.all(symbols.map(async (symbol)=>{
        // tMOVE uses same price as MOVE
        const lookupSymbol = symbol === 'tMOVE' ? 'MOVE' : symbol;
        prices[symbol] = await fetchTokenPriceUSD(lookupSymbol);
    }));
    return prices;
}
function formatPrice(price, decimals = 4) {
    if (price === 0) return '0.00';
    if (price < 0.0001) return price.toExponential(2);
    return price.toFixed(decimals);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/swap-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwapForm",
    ()=>SwapForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/token-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/amount-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/tokens.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/use-wallet-context.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/transactions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/pricing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down-up.js [app-client] (ecmascript) <export default as ArrowDownUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
const DEADLINE_OPTIONS = [
    {
        label: '5m',
        value: 5 * 60
    },
    {
        label: '10m',
        value: 10 * 60
    },
    {
        label: '30m',
        value: 30 * 60
    },
    {
        label: '1h',
        value: 60 * 60
    }
];
const DEFAULT_SLIPPAGE = 0.5; // 0.5%
function SwapForm({ onSuccess, onError }) {
    _s();
    const { walletAddress, isPrivy, isConnected, signRawHash, publicKeyHex, signAndSubmitTransaction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContext"])();
    const [inputToken, setInputToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [outputToken, setOutputToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inputAmount, setInputAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [minOutputAmount, setMinOutputAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [deadline, setDeadline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEADLINE_OPTIONS[1].value); // Default 10m
    const [inputBalance, setInputBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [tokenBalances, setTokenBalances] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [exchangeRate, setExchangeRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLoadingQuote, setIsLoadingQuote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch token balance
    const fetchBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SwapForm.useCallback[fetchBalance]": async (token, address)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTokenBalance"])(token.address, address, token.decimals);
        }
    }["SwapForm.useCallback[fetchBalance]"], []);
    // Fetch all token balances when wallet connects
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SwapForm.useEffect": ()=>{
            const fetchAllBalances = {
                "SwapForm.useEffect.fetchAllBalances": async ()=>{
                    if (!walletAddress) {
                        setTokenBalances({});
                        return;
                    }
                    const balances = {};
                    await Promise.all(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].map({
                        "SwapForm.useEffect.fetchAllBalances": async (token)=>{
                            const bal = await fetchBalance(token, walletAddress);
                            balances[token.address] = bal;
                        }
                    }["SwapForm.useEffect.fetchAllBalances"]));
                    setTokenBalances(balances);
                }
            }["SwapForm.useEffect.fetchAllBalances"];
            fetchAllBalances();
        }
    }["SwapForm.useEffect"], [
        walletAddress,
        fetchBalance
    ]);
    // Update selected input balance when token changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SwapForm.useEffect": ()=>{
            if (inputToken && tokenBalances[inputToken.address]) {
                setInputBalance(tokenBalances[inputToken.address]);
            } else {
                setInputBalance('');
            }
        }
    }["SwapForm.useEffect"], [
        inputToken,
        tokenBalances
    ]);
    // Fetch real-time quote when tokens or amount change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SwapForm.useEffect": ()=>{
            const fetchQuote = {
                "SwapForm.useEffect.fetchQuote": async ()=>{
                    if (!inputToken || !outputToken || !inputAmount || parseFloat(inputAmount) <= 0) {
                        setMinOutputAmount('');
                        setExchangeRate(0);
                        return;
                    }
                    setIsLoadingQuote(true);
                    try {
                        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateSwapOutput"])(parseFloat(inputAmount), inputToken.symbol, outputToken.symbol, DEFAULT_SLIPPAGE);
                        setExchangeRate(result.exchangeRate);
                        if (result.outputAmount > 0) {
                            setMinOutputAmount(result.outputAmount.toFixed(6));
                        } else {
                            setMinOutputAmount('');
                        }
                    } catch (error) {
                        console.error('Error fetching quote:', error);
                        setMinOutputAmount('');
                        setExchangeRate(0);
                    } finally{
                        setIsLoadingQuote(false);
                    }
                }
            }["SwapForm.useEffect.fetchQuote"];
            // Debounce the quote fetch
            const timeoutId = setTimeout(fetchQuote, 300);
            return ({
                "SwapForm.useEffect": ()=>clearTimeout(timeoutId)
            })["SwapForm.useEffect"];
        }
    }["SwapForm.useEffect"], [
        inputAmount,
        inputToken,
        outputToken
    ]);
    const handleSwapTokens = ()=>{
        const temp = inputToken;
        setInputToken(outputToken);
        setOutputToken(temp);
        setInputAmount('');
        setMinOutputAmount('');
    };
    const validateForm = ()=>{
        if (!inputToken) return 'Select input token';
        if (!outputToken) return 'Select output token';
        if (inputToken.address === outputToken.address) return 'Tokens must be different';
        if (!inputAmount || parseFloat(inputAmount) <= 0) return 'Enter amount';
        const balance = parseFloat(inputBalance || '0');
        if (parseFloat(inputAmount) > balance) return 'Insufficient balance';
        return null;
    };
    const handleSubmit = async ()=>{
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        if (!walletAddress || !inputToken || !outputToken) return;
        setIsLoading(true);
        setError(null);
        try {
            const amountIn = BigInt(Math.floor(parseFloat(inputAmount) * Math.pow(10, inputToken.decimals)));
            const minAmountOut = BigInt(Math.floor(parseFloat(minOutputAmount) * Math.pow(10, outputToken.decimals)));
            const deadlineTimestamp = Math.floor(Date.now() / 1000) + deadline;
            let txHash;
            if (isPrivy && signRawHash && publicKeyHex) {
                txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitSwapIntent"])(walletAddress, inputToken.address, outputToken.address, amountIn, minAmountOut, deadlineTimestamp, signRawHash, publicKeyHex);
            } else if (signAndSubmitTransaction) {
                txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitSwapIntentNative"])(walletAddress, inputToken.address, outputToken.address, amountIn, minAmountOut, deadlineTimestamp, signAndSubmitTransaction);
            } else {
                throw new Error('No wallet connected');
            }
            // Reset form on success
            setInputAmount('');
            setMinOutputAmount('');
            onSuccess?.(txHash);
        } catch (err) {
            const errorMsg = err.message || 'Transaction failed';
            setError(errorMsg);
            onError?.(errorMsg);
        } finally{
            setIsLoading(false);
        }
    };
    const availableOutputTokens = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].filter((t)=>t.address !== inputToken?.address);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "w-full max-w-md mx-auto p-6 bg-card border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-semibold mb-6",
                children: "Swap"
            }, void 0, false, {
                fileName: "[project]/app/components/intent/swap-form.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmountInput"], {
                                    value: inputAmount,
                                    onChange: setInputAmount,
                                    token: inputToken,
                                    balance: inputBalance,
                                    label: "You pay",
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/swap-form.tsx",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/swap-form.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenSelector"], {
                                    selectedToken: inputToken,
                                    onSelect: setInputToken,
                                    tokens: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"],
                                    balance: inputBalance,
                                    balances: tokenBalances,
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/swap-form.tsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/swap-form.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/swap-form.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center -my-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            variant: "ghost",
                            size: "icon",
                            onClick: handleSwapTokens,
                            disabled: isLoading,
                            className: "rounded-full border border-border bg-background hover:bg-accent",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownUp$3e$__["ArrowDownUp"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/swap-form.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/swap-form.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/swap-form.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-muted-foreground",
                                            children: "You receive (min)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/swap-form.tsx",
                                            lineNumber: 239,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-12 px-3 flex items-center bg-muted/50 rounded-lg border border-border",
                                            children: isLoadingQuote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                className: "w-4 h-4 animate-spin text-muted-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/intent/swap-form.tsx",
                                                lineNumber: 242,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-medium text-muted-foreground",
                                                children: minOutputAmount || '0.00'
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/intent/swap-form.tsx",
                                                lineNumber: 244,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/swap-form.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/swap-form.tsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/swap-form.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenSelector"], {
                                    selectedToken: outputToken,
                                    onSelect: setOutputToken,
                                    tokens: availableOutputTokens,
                                    balances: tokenBalances,
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/swap-form.tsx",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/swap-form.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/swap-form.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this),
                    exchangeRate > 0 && inputToken && outputToken && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg",
                        children: [
                            "1 ",
                            inputToken.symbol,
                            " = ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(exchangeRate),
                            " ",
                            outputToken.symbol
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/swap-form.tsx",
                        lineNumber: 264,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm text-muted-foreground",
                                children: "Deadline"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/swap-form.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: DEADLINE_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: deadline === option.value ? 'default' : 'outline',
                                        size: "sm",
                                        onClick: ()=>setDeadline(option.value),
                                        disabled: isLoading,
                                        className: "flex-1",
                                        children: option.label
                                    }, option.value, false, {
                                        fileName: "[project]/app/components/intent/swap-form.tsx",
                                        lineNumber: 274,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/swap-form.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/swap-form.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-muted-foreground",
                        children: [
                            "Slippage tolerance: ",
                            DEFAULT_SLIPPAGE,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/swap-form.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 rounded-lg bg-destructive/10 border border-destructive/20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-destructive",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/swap-form.tsx",
                            lineNumber: 297,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/swap-form.tsx",
                        lineNumber: 296,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        onClick: handleSubmit,
                        disabled: isLoading || !isConnected,
                        className: "w-full h-12 text-base font-medium",
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-4 h-4 mr-2 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/swap-form.tsx",
                                    lineNumber: 310,
                                    columnNumber: 15
                                }, this),
                                "Submitting..."
                            ]
                        }, void 0, true) : !isConnected ? 'Connect Wallet' : 'Submit Swap Intent'
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/swap-form.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/swap-form.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/swap-form.tsx",
        lineNumber: 193,
        columnNumber: 5
    }, this);
}
_s(SwapForm, "bbZESVBzpD+qpllyTCmSXbze7PY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContext"]
    ];
});
_c = SwapForm;
var _c;
__turbopack_context__.k.register(_c, "SwapForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/switch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Switch",
    ()=>Switch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-switch/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const Switch = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
        ...props,
        ref: ref,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thumb"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0")
        }, void 0, false, {
            fileName: "[project]/app/components/ui/switch.tsx",
            lineNumber: 20,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/components/ui/switch.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Switch;
Switch.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Switch$React.forwardRef");
__turbopack_context__.k.register(_c1, "Switch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/price-input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PriceInput",
    ()=>PriceInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
'use client';
;
;
;
;
;
const ADJUSTMENT_BUTTONS = [
    {
        label: '-5%',
        multiplier: 0.95
    },
    {
        label: '-1%',
        multiplier: 0.99
    },
    {
        label: '+1%',
        multiplier: 1.01
    },
    {
        label: '+5%',
        multiplier: 1.05
    }
];
function PriceInput({ value, onChange, inputToken, outputToken, currentPrice = 0, isLoadingPrice = false, disabled = false }) {
    const handleChange = (e)=>{
        const inputValue = e.target.value;
        if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
            onChange(inputValue);
        }
    };
    const handleAdjust = (multiplier)=>{
        const basePrice = value ? parseFloat(value) : currentPrice;
        const newPrice = basePrice * multiplier;
        onChange(newPrice.toFixed(6));
    };
    const handleSetCurrentPrice = ()=>{
        onChange(currentPrice.toFixed(6));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-muted-foreground",
                        children: "Limit Price"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/price-input.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    isLoadingPrice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1 text-xs text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: "w-3 h-3 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/price-input.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this),
                            "Loading price..."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/price-input.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this) : currentPrice > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: "link",
                        size: "sm",
                        onClick: handleSetCurrentPrice,
                        disabled: disabled,
                        className: "h-auto p-0 text-xs",
                        children: [
                            "Use market price (",
                            currentPrice.toFixed(4),
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/price-input.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/price-input.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                type: "text",
                inputMode: "decimal",
                value: value,
                onChange: handleChange,
                placeholder: "0.00",
                disabled: disabled || !inputToken || !outputToken,
                className: "text-lg font-medium h-12"
            }, void 0, false, {
                fileName: "[project]/app/components/intent/price-input.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            inputToken && outputToken && value && parseFloat(value) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted-foreground",
                children: [
                    "1 ",
                    inputToken.symbol,
                    " = ",
                    value,
                    " ",
                    outputToken.symbol
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/price-input.tsx",
                lineNumber: 86,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: ADJUSTMENT_BUTTONS.map((btn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        onClick: ()=>handleAdjust(btn.multiplier),
                        disabled: disabled || !inputToken || !outputToken,
                        className: "flex-1 text-xs",
                        children: btn.label
                    }, btn.label, false, {
                        fileName: "[project]/app/components/intent/price-input.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/intent/price-input.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/price-input.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c = PriceInput;
var _c;
__turbopack_context__.k.register(_c, "PriceInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/limit-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LimitForm",
    ()=>LimitForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/token-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/amount-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$price$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/price-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/tokens.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/use-wallet-context.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/transactions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/pricing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const EXPIRY_OPTIONS = [
    {
        label: '1h',
        value: 60 * 60
    },
    {
        label: '4h',
        value: 4 * 60 * 60
    },
    {
        label: '24h',
        value: 24 * 60 * 60
    },
    {
        label: '7d',
        value: 7 * 24 * 60 * 60
    }
];
function LimitForm({ onSuccess, onError }) {
    _s();
    const { walletAddress, isPrivy, isConnected, signRawHash, publicKeyHex, signAndSubmitTransaction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContext"])();
    const [inputToken, setInputToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [outputToken, setOutputToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inputAmount, setInputAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [limitPrice, setLimitPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [expiry, setExpiry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(EXPIRY_OPTIONS[1].value);
    const [partialFill, setPartialFill] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [inputBalance, setInputBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [tokenBalances, setTokenBalances] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [exchangeRate, setExchangeRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLoadingPrice, setIsLoadingPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LimitForm.useCallback[fetchBalance]": async (token, address)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTokenBalance"])(token.address, address, token.decimals);
        }
    }["LimitForm.useCallback[fetchBalance]"], []);
    // Fetch all token balances when wallet connects
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LimitForm.useEffect": ()=>{
            const fetchAllBalances = {
                "LimitForm.useEffect.fetchAllBalances": async ()=>{
                    if (!walletAddress) {
                        setTokenBalances({});
                        return;
                    }
                    const balances = {};
                    await Promise.all(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].map({
                        "LimitForm.useEffect.fetchAllBalances": async (token)=>{
                            const bal = await fetchBalance(token, walletAddress);
                            balances[token.address] = bal;
                        }
                    }["LimitForm.useEffect.fetchAllBalances"]));
                    setTokenBalances(balances);
                }
            }["LimitForm.useEffect.fetchAllBalances"];
            fetchAllBalances();
        }
    }["LimitForm.useEffect"], [
        walletAddress,
        fetchBalance
    ]);
    // Update selected input balance when token changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LimitForm.useEffect": ()=>{
            if (inputToken && tokenBalances[inputToken.address]) {
                setInputBalance(tokenBalances[inputToken.address]);
            } else {
                setInputBalance('');
            }
        }
    }["LimitForm.useEffect"], [
        inputToken,
        tokenBalances
    ]);
    // Fetch exchange rate when tokens change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LimitForm.useEffect": ()=>{
            const fetchRate = {
                "LimitForm.useEffect.fetchRate": async ()=>{
                    if (!inputToken || !outputToken) {
                        setExchangeRate(0);
                        return;
                    }
                    setIsLoadingPrice(true);
                    try {
                        const rate = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExchangeRate"])(inputToken.symbol, outputToken.symbol);
                        setExchangeRate(rate);
                    } catch (error) {
                        console.error('Error fetching exchange rate:', error);
                        setExchangeRate(0);
                    } finally{
                        setIsLoadingPrice(false);
                    }
                }
            }["LimitForm.useEffect.fetchRate"];
            fetchRate();
        }
    }["LimitForm.useEffect"], [
        inputToken,
        outputToken
    ]);
    const expectedOutput = inputAmount && limitPrice && parseFloat(inputAmount) > 0 && parseFloat(limitPrice) > 0 ? (parseFloat(inputAmount) * parseFloat(limitPrice)).toFixed(6) : '';
    const validateForm = ()=>{
        if (!inputToken) return 'Select input token';
        if (!outputToken) return 'Select output token';
        if (inputToken.address === outputToken.address) return 'Tokens must be different';
        if (!inputAmount || parseFloat(inputAmount) <= 0) return 'Enter amount';
        if (!limitPrice || parseFloat(limitPrice) <= 0) return 'Enter limit price';
        const balance = parseFloat(inputBalance || '0');
        if (parseFloat(inputAmount) > balance) return 'Insufficient balance';
        return null;
    };
    const handleSubmit = async ()=>{
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        if (!walletAddress || !inputToken || !outputToken) return;
        setIsLoading(true);
        setError(null);
        try {
            const amountIn = BigInt(Math.floor(parseFloat(inputAmount) * Math.pow(10, inputToken.decimals)));
            // Price is scaled by 10000 (e.g., 25 output per 1 input = 25 * 10000 = 250000)
            const priceScaled = BigInt(Math.floor(parseFloat(limitPrice) * 10000));
            const expiryTimestamp = Math.floor(Date.now() / 1000) + expiry;
            let txHash;
            if (isPrivy && signRawHash && publicKeyHex) {
                txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitLimitOrderIntent"])(walletAddress, inputToken.address, outputToken.address, amountIn, priceScaled, expiryTimestamp, partialFill, signRawHash, publicKeyHex);
            } else if (signAndSubmitTransaction) {
                txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitLimitOrderIntentNative"])(walletAddress, inputToken.address, outputToken.address, amountIn, priceScaled, expiryTimestamp, partialFill, signAndSubmitTransaction);
            } else {
                throw new Error('No wallet connected');
            }
            setInputAmount('');
            setLimitPrice('');
            onSuccess?.(txHash);
        } catch (err) {
            const errorMsg = err.message || 'Transaction failed';
            setError(errorMsg);
            onError?.(errorMsg);
        } finally{
            setIsLoading(false);
        }
    };
    const availableOutputTokens = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].filter((t)=>t.address !== inputToken?.address);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "w-full max-w-md mx-auto p-6 bg-card border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-semibold mb-6",
                children: "Limit Order"
            }, void 0, false, {
                fileName: "[project]/app/components/intent/limit-form.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmountInput"], {
                                    value: inputAmount,
                                    onChange: setInputAmount,
                                    token: inputToken,
                                    balance: inputBalance,
                                    label: "Amount",
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/limit-form.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/limit-form.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenSelector"], {
                                    selectedToken: inputToken,
                                    onSelect: setInputToken,
                                    tokens: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"],
                                    balance: inputBalance,
                                    balances: tokenBalances,
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/limit-form.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/limit-form.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/limit-form.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-muted-foreground",
                                children: "For"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/limit-form.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenSelector"], {
                                selectedToken: outputToken,
                                onSelect: setOutputToken,
                                tokens: availableOutputTokens,
                                balances: tokenBalances,
                                disabled: isLoading
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/limit-form.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/limit-form.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$price$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PriceInput"], {
                        value: limitPrice,
                        onChange: setLimitPrice,
                        inputToken: inputToken,
                        outputToken: outputToken,
                        currentPrice: exchangeRate,
                        isLoadingPrice: isLoadingPrice,
                        disabled: isLoading
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/limit-form.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    expectedOutput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 rounded-lg bg-muted/50 border border-border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground",
                                children: "Expected to receive"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/limit-form.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-medium",
                                children: [
                                    expectedOutput,
                                    " ",
                                    outputToken?.symbol
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/limit-form.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/limit-form.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-muted-foreground",
                                children: "Expires in"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/limit-form.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: EXPIRY_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: expiry === option.value ? 'default' : 'outline',
                                        size: "sm",
                                        onClick: ()=>setExpiry(option.value),
                                        disabled: isLoading,
                                        className: "flex-1",
                                        children: option.label
                                    }, option.value, false, {
                                        fileName: "[project]/app/components/intent/limit-form.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/limit-form.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/limit-form.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-sm font-medium",
                                        children: "Allow partial fill"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/limit-form.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Order can be filled in multiple transactions"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/limit-form.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/limit-form.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                checked: partialFill,
                                onCheckedChange: setPartialFill,
                                disabled: isLoading
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/limit-form.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/limit-form.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 rounded-lg bg-destructive/10 border border-destructive/20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-destructive",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/limit-form.tsx",
                            lineNumber: 257,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/limit-form.tsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        onClick: handleSubmit,
                        disabled: isLoading || !isConnected,
                        className: "w-full h-12 text-base font-medium",
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-4 h-4 mr-2 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/limit-form.tsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this),
                                "Submitting..."
                            ]
                        }, void 0, true) : !isConnected ? 'Connect Wallet' : 'Submit Limit Order'
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/limit-form.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/limit-form.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/limit-form.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, this);
}
_s(LimitForm, "WC3QqCPuavJAX3w+cu3H2IouL34=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContext"]
    ];
});
_c = LimitForm;
var _c;
__turbopack_context__.k.register(_c, "LimitForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/twap-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TWAPForm",
    ()=>TWAPForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/token-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/amount-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/tokens.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/use-wallet-context.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/transactions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
const CHUNK_OPTIONS = [
    {
        label: '5',
        value: 5
    },
    {
        label: '10',
        value: 10
    },
    {
        label: '20',
        value: 20
    },
    {
        label: '50',
        value: 50
    }
];
const INTERVAL_OPTIONS = [
    {
        label: '5m',
        value: 5 * 60,
        display: '5 minutes'
    },
    {
        label: '15m',
        value: 15 * 60,
        display: '15 minutes'
    },
    {
        label: '1h',
        value: 60 * 60,
        display: '1 hour'
    },
    {
        label: '4h',
        value: 4 * 60 * 60,
        display: '4 hours'
    }
];
const SLIPPAGE_OPTIONS = [
    0.1,
    0.5,
    1.0,
    2.0
];
function TWAPForm({ onSuccess, onError }) {
    _s();
    const { walletAddress, isPrivy, isConnected, signRawHash, publicKeyHex, signAndSubmitTransaction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContext"])();
    const [inputToken, setInputToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [outputToken, setOutputToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [totalAmount, setTotalAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [numChunks, setNumChunks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [intervalSeconds, setIntervalSeconds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INTERVAL_OPTIONS[2].value);
    const [maxSlippageBps, setMaxSlippageBps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(50); // 0.5%
    const [inputBalance, setInputBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [tokenBalances, setTokenBalances] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TWAPForm.useCallback[fetchBalance]": async (token, address)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTokenBalance"])(token.address, address, token.decimals);
        }
    }["TWAPForm.useCallback[fetchBalance]"], []);
    // Fetch all token balances when wallet connects
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TWAPForm.useEffect": ()=>{
            const fetchAllBalances = {
                "TWAPForm.useEffect.fetchAllBalances": async ()=>{
                    if (!walletAddress) {
                        setTokenBalances({});
                        return;
                    }
                    const balances = {};
                    await Promise.all(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].map({
                        "TWAPForm.useEffect.fetchAllBalances": async (token)=>{
                            const bal = await fetchBalance(token, walletAddress);
                            balances[token.address] = bal;
                        }
                    }["TWAPForm.useEffect.fetchAllBalances"]));
                    setTokenBalances(balances);
                }
            }["TWAPForm.useEffect.fetchAllBalances"];
            fetchAllBalances();
        }
    }["TWAPForm.useEffect"], [
        walletAddress,
        fetchBalance
    ]);
    // Update selected input balance when token changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TWAPForm.useEffect": ()=>{
            if (inputToken && tokenBalances[inputToken.address]) {
                setInputBalance(tokenBalances[inputToken.address]);
            } else {
                setInputBalance('');
            }
        }
    }["TWAPForm.useEffect"], [
        inputToken,
        tokenBalances
    ]);
    const chunkAmount = totalAmount && parseFloat(totalAmount) > 0 ? (parseFloat(totalAmount) / numChunks).toFixed(4) : '0';
    const totalDurationMinutes = numChunks * intervalSeconds / 60;
    const formatDuration = (minutes)=>{
        if (minutes < 60) return `${minutes} minutes`;
        if (minutes < 1440) return `${(minutes / 60).toFixed(1)} hours`;
        return `${(minutes / 1440).toFixed(1)} days`;
    };
    const validateForm = ()=>{
        if (!inputToken) return 'Select input token';
        if (!outputToken) return 'Select output token';
        if (inputToken.address === outputToken.address) return 'Tokens must be different';
        if (!totalAmount || parseFloat(totalAmount) <= 0) return 'Enter total amount';
        const balance = parseFloat(inputBalance || '0');
        if (parseFloat(totalAmount) > balance) return 'Insufficient balance';
        return null;
    };
    const handleSubmit = async ()=>{
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        if (!walletAddress || !inputToken || !outputToken) return;
        setIsLoading(true);
        setError(null);
        try {
            const amount = BigInt(Math.floor(parseFloat(totalAmount) * Math.pow(10, inputToken.decimals)));
            // Add 60 second buffer to ensure startTime is in the future when tx executes
            const startTime = Math.floor(Date.now() / 1000) + 60;
            let txHash;
            if (isPrivy && signRawHash && publicKeyHex) {
                txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitTWAPIntent"])(walletAddress, inputToken.address, outputToken.address, amount, numChunks, intervalSeconds, maxSlippageBps, startTime, signRawHash, publicKeyHex);
            } else if (signAndSubmitTransaction) {
                txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitTWAPIntentNative"])(walletAddress, inputToken.address, outputToken.address, amount, numChunks, intervalSeconds, maxSlippageBps, startTime, signAndSubmitTransaction);
            } else {
                throw new Error('No wallet connected');
            }
            setTotalAmount('');
            onSuccess?.(txHash);
        } catch (err) {
            const errorMsg = err.message || 'Transaction failed';
            setError(errorMsg);
            onError?.(errorMsg);
        } finally{
            setIsLoading(false);
        }
    };
    const availableOutputTokens = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].filter((t)=>t.address !== inputToken?.address);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "w-full max-w-md mx-auto p-6 bg-card border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-semibold mb-6",
                children: "TWAP Order"
            }, void 0, false, {
                fileName: "[project]/app/components/intent/twap-form.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmountInput"], {
                                    value: totalAmount,
                                    onChange: setTotalAmount,
                                    token: inputToken,
                                    balance: inputBalance,
                                    label: "Total Amount",
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/twap-form.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenSelector"], {
                                    selectedToken: inputToken,
                                    onSelect: setInputToken,
                                    tokens: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"],
                                    balance: inputBalance,
                                    balances: tokenBalances,
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/twap-form.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-form.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-muted-foreground",
                                children: "Split into"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenSelector"], {
                                selectedToken: outputToken,
                                onSelect: setOutputToken,
                                tokens: availableOutputTokens,
                                balances: tokenBalances,
                                disabled: isLoading
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-form.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-muted-foreground",
                                children: "Number of Chunks"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: CHUNK_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: numChunks === option.value ? 'default' : 'outline',
                                        size: "sm",
                                        onClick: ()=>setNumChunks(option.value),
                                        disabled: isLoading,
                                        className: "flex-1",
                                        children: option.label
                                    }, option.value, false, {
                                        fileName: "[project]/app/components/intent/twap-form.tsx",
                                        lineNumber: 210,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-form.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-muted-foreground",
                                children: "Interval Between Chunks"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: INTERVAL_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: intervalSeconds === option.value ? 'default' : 'outline',
                                        size: "sm",
                                        onClick: ()=>setIntervalSeconds(option.value),
                                        disabled: isLoading,
                                        className: "flex-1",
                                        children: option.label
                                    }, option.value, false, {
                                        fileName: "[project]/app/components/intent/twap-form.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-form.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-muted-foreground",
                                children: "Max Slippage per Chunk"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: SLIPPAGE_OPTIONS.map((slippage)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: maxSlippageBps === slippage * 100 ? 'default' : 'outline',
                                        size: "sm",
                                        onClick: ()=>setMaxSlippageBps(slippage * 100),
                                        disabled: isLoading,
                                        className: "flex-1",
                                        children: [
                                            slippage,
                                            "%"
                                        ]
                                    }, slippage, true, {
                                        fileName: "[project]/app/components/intent/twap-form.tsx",
                                        lineNumber: 250,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-form.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 rounded-lg bg-muted/50 border border-border space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "Amount per chunk:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/twap-form.tsx",
                                        lineNumber: 268,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            chunkAmount,
                                            " ",
                                            inputToken?.symbol || '-'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/intent/twap-form.tsx",
                                        lineNumber: 269,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "Total duration:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/twap-form.tsx",
                                        lineNumber: 272,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: formatDuration(totalDurationMinutes)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/twap-form.tsx",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "Execution schedule:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/twap-form.tsx",
                                        lineNumber: 276,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Every ",
                                            INTERVAL_OPTIONS.find((o)=>o.value === intervalSeconds)?.display
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/intent/twap-form.tsx",
                                        lineNumber: 277,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/twap-form.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-form.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 rounded-lg bg-destructive/10 border border-destructive/20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-destructive",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/twap-form.tsx",
                            lineNumber: 284,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/twap-form.tsx",
                        lineNumber: 283,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        onClick: handleSubmit,
                        disabled: isLoading || !isConnected,
                        className: "w-full h-12 text-base font-medium",
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-4 h-4 mr-2 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/twap-form.tsx",
                                    lineNumber: 297,
                                    columnNumber: 15
                                }, this),
                                "Submitting..."
                            ]
                        }, void 0, true) : !isConnected ? 'Connect Wallet' : 'Create TWAP Order'
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/twap-form.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/twap-form.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/twap-form.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
_s(TWAPForm, "/oSHFHUggS1VA+gMEptWwDJw1j0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContext"]
    ];
});
_c = TWAPForm;
var _c;
__turbopack_context__.k.register(_c, "TWAPForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/dca-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DCAForm",
    ()=>DCAForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/token-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/amount-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/tokens.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/use-wallet-context.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/transactions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
const PERIOD_OPTIONS = [
    {
        label: '4',
        value: 4
    },
    {
        label: '12',
        value: 12
    },
    {
        label: '24',
        value: 24
    },
    {
        label: '52',
        value: 52
    }
];
const FREQUENCY_OPTIONS = [
    {
        label: 'Daily',
        value: 1,
        seconds: 24 * 60 * 60
    },
    {
        label: 'Weekly',
        value: 7,
        seconds: 7 * 24 * 60 * 60
    },
    {
        label: 'Bi-weekly',
        value: 14,
        seconds: 14 * 24 * 60 * 60
    },
    {
        label: 'Monthly',
        value: 30,
        seconds: 30 * 24 * 60 * 60
    }
];
function DCAForm({ onSuccess, onError }) {
    _s();
    const { walletAddress, isPrivy, isConnected, signRawHash, publicKeyHex, signAndSubmitTransaction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContext"])();
    const [inputToken, setInputToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [outputToken, setOutputToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [amountPerPeriod, setAmountPerPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [totalPeriods, setTotalPeriods] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(12);
    const [intervalDays, setIntervalDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(7);
    const [inputBalance, setInputBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [tokenBalances, setTokenBalances] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DCAForm.useCallback[fetchBalance]": async (token, address)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTokenBalance"])(token.address, address, token.decimals);
        }
    }["DCAForm.useCallback[fetchBalance]"], []);
    // Fetch all token balances when wallet connects
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DCAForm.useEffect": ()=>{
            const fetchAllBalances = {
                "DCAForm.useEffect.fetchAllBalances": async ()=>{
                    if (!walletAddress) {
                        setTokenBalances({});
                        return;
                    }
                    const balances = {};
                    await Promise.all(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].map({
                        "DCAForm.useEffect.fetchAllBalances": async (token)=>{
                            const bal = await fetchBalance(token, walletAddress);
                            balances[token.address] = bal;
                        }
                    }["DCAForm.useEffect.fetchAllBalances"]));
                    setTokenBalances(balances);
                }
            }["DCAForm.useEffect.fetchAllBalances"];
            fetchAllBalances();
        }
    }["DCAForm.useEffect"], [
        walletAddress,
        fetchBalance
    ]);
    // Update selected input balance when token changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DCAForm.useEffect": ()=>{
            if (inputToken && tokenBalances[inputToken.address]) {
                setInputBalance(tokenBalances[inputToken.address]);
            } else {
                setInputBalance('');
            }
        }
    }["DCAForm.useEffect"], [
        inputToken,
        tokenBalances
    ]);
    const totalInvestment = amountPerPeriod && parseFloat(amountPerPeriod) > 0 ? (parseFloat(amountPerPeriod) * totalPeriods).toFixed(2) : '0';
    const totalDurationDays = totalPeriods * intervalDays;
    const validateForm = ()=>{
        if (!inputToken) return 'Select input token';
        if (!outputToken) return 'Select output token';
        if (inputToken.address === outputToken.address) return 'Tokens must be different';
        if (!amountPerPeriod || parseFloat(amountPerPeriod) <= 0) return 'Enter amount per period';
        const balance = parseFloat(inputBalance || '0');
        const total = parseFloat(totalInvestment);
        if (total > balance) return 'Insufficient balance for total investment';
        return null;
    };
    const handleSubmit = async ()=>{
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        if (!walletAddress || !inputToken || !outputToken) return;
        setIsLoading(true);
        setError(null);
        try {
            const amount = BigInt(Math.floor(parseFloat(amountPerPeriod) * Math.pow(10, inputToken.decimals)));
            const intervalSeconds = intervalDays * 24 * 60 * 60;
            let txHash;
            if (isPrivy && signRawHash && publicKeyHex) {
                txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitDCAIntent"])(walletAddress, inputToken.address, outputToken.address, amount, totalPeriods, intervalSeconds, signRawHash, publicKeyHex);
            } else if (signAndSubmitTransaction) {
                txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitDCAIntentNative"])(walletAddress, inputToken.address, outputToken.address, amount, totalPeriods, intervalSeconds, signAndSubmitTransaction);
            } else {
                throw new Error('No wallet connected');
            }
            setAmountPerPeriod('');
            onSuccess?.(txHash);
        } catch (err) {
            const errorMsg = err.message || 'Transaction failed';
            setError(errorMsg);
            onError?.(errorMsg);
        } finally{
            setIsLoading(false);
        }
    };
    const availableOutputTokens = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].filter((t)=>t.address !== inputToken?.address);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "w-full max-w-md mx-auto p-6 bg-card border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-semibold mb-6",
                children: "DCA (Dollar Cost Average)"
            }, void 0, false, {
                fileName: "[project]/app/components/intent/dca-form.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmountInput"], {
                                    value: amountPerPeriod,
                                    onChange: setAmountPerPeriod,
                                    token: inputToken,
                                    balance: inputBalance,
                                    label: "Amount per Period",
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/dca-form.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-form.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenSelector"], {
                                    selectedToken: inputToken,
                                    onSelect: setInputToken,
                                    tokens: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"],
                                    balance: inputBalance,
                                    balances: tokenBalances,
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/dca-form.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-form.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-form.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-muted-foreground",
                                children: "To buy"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-form.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenSelector"], {
                                selectedToken: outputToken,
                                onSelect: setOutputToken,
                                tokens: availableOutputTokens,
                                balances: tokenBalances,
                                disabled: isLoading
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-form.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-form.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-muted-foreground",
                                children: "Total Periods"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-form.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: PERIOD_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: totalPeriods === option.value ? 'default' : 'outline',
                                        size: "sm",
                                        onClick: ()=>setTotalPeriods(option.value),
                                        disabled: isLoading,
                                        className: "flex-1",
                                        children: option.label
                                    }, option.value, false, {
                                        fileName: "[project]/app/components/intent/dca-form.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-form.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-form.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-muted-foreground",
                                children: "Frequency"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-form.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 flex-wrap",
                                children: FREQUENCY_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: intervalDays === option.value ? 'default' : 'outline',
                                        size: "sm",
                                        onClick: ()=>setIntervalDays(option.value),
                                        disabled: isLoading,
                                        className: "flex-1 min-w-[70px]",
                                        children: option.label
                                    }, option.value, false, {
                                        fileName: "[project]/app/components/intent/dca-form.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-form.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-form.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 rounded-lg bg-muted/50 border border-border space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "Total investment:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/dca-form.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            totalInvestment,
                                            " ",
                                            inputToken?.symbol || '-'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/intent/dca-form.tsx",
                                        lineNumber: 236,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/dca-form.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "Duration:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/dca-form.tsx",
                                        lineNumber: 239,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            totalDurationDays,
                                            " days"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/intent/dca-form.tsx",
                                        lineNumber: 240,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/dca-form.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "Next buy:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/dca-form.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Immediately after creation"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/dca-form.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/dca-form.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-form.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 bg-amber-500/10 text-amber-400 rounded-lg text-sm",
                        children: "DCA helps reduce the impact of volatility by spreading purchases over time."
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dca-form.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 rounded-lg bg-destructive/10 border border-destructive/20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-destructive",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/dca-form.tsx",
                            lineNumber: 256,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dca-form.tsx",
                        lineNumber: 255,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        onClick: handleSubmit,
                        disabled: isLoading || !isConnected,
                        className: "w-full h-12 text-base font-medium",
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-4 h-4 mr-2 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/dca-form.tsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this),
                                "Submitting..."
                            ]
                        }, void 0, true) : !isConnected ? 'Connect Wallet' : 'Start DCA'
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dca-form.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/dca-form.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/dca-form.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_s(DCAForm, "I0PrPfvxHwob4EsjB19atJ2x4gM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContext"]
    ];
});
_c = DCAForm;
var _c;
__turbopack_context__.k.register(_c, "DCAForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/velox/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Velox Intent Types - 4 core types
__turbopack_context__.s([
    "AuctionType",
    ()=>AuctionType,
    "getIntentTypeDisplay",
    ()=>getIntentTypeDisplay,
    "parseIntentStatus",
    ()=>parseIntentStatus,
    "parseIntentType",
    ()=>parseIntentType
]);
var AuctionType = /*#__PURE__*/ function(AuctionType) {
    AuctionType["SEALED_BID"] = "sealed-bid";
    AuctionType["DUTCH"] = "dutch";
    return AuctionType;
}({});
function parseIntentStatus(code) {
    switch(code){
        case 0:
            return 'pending';
        case 1:
            return 'partially_filled';
        case 2:
            return 'filled';
        case 3:
            return 'cancelled';
        case 4:
            return 'expired';
        default:
            return 'pending';
    }
}
function parseIntentType(variant) {
    const typeMap = {
        Swap: 'swap',
        LimitOrder: 'limit_order',
        TWAP: 'twap',
        DCA: 'dca'
    };
    return typeMap[variant] || 'swap';
}
function getIntentTypeDisplay(type) {
    const displayMap = {
        swap: 'Swap',
        limit_order: 'Limit Order',
        twap: 'TWAP',
        dca: 'DCA'
    };
    return displayMap[type];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/auction-type-selector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuctionTypeSelector",
    ()=>AuctionTypeSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gavel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gavel$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gavel.js [app-client] (ecmascript) <export default as Gavel>");
'use client';
;
;
;
;
function AuctionTypeSelector({ value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                className: "text-sm text-muted-foreground",
                children: "Auction Type"
            }, void 0, false, {
                fileName: "[project]/app/components/intent/auction-type-selector.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onChange(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID),
                        className: `flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors ${value === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID ? 'border-blue-500 bg-blue-500/10' : 'border-border bg-muted/50 hover:bg-muted'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gavel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gavel$3e$__["Gavel"], {
                                className: `h-6 w-6 mb-2 ${value === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID ? 'text-blue-400' : 'text-muted-foreground'}`
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-type-selector.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: "Sealed Bid"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-type-selector.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground text-center mt-1",
                                children: "Best offer wins"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-type-selector.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/auction-type-selector.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onChange(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].DUTCH),
                        className: `flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors ${value === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].DUTCH ? 'border-green-500 bg-green-500/10' : 'border-border bg-muted/50 hover:bg-muted'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                className: `h-6 w-6 mb-2 ${value === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].DUTCH ? 'text-green-400' : 'text-muted-foreground'}`
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-type-selector.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: "Dutch"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-type-selector.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground text-center mt-1",
                                children: "First taker wins"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-type-selector.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/auction-type-selector.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/auction-type-selector.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/auction-type-selector.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = AuctionTypeSelector;
var _c;
__turbopack_context__.k.register(_c, "AuctionTypeSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/dutch-params-input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DutchParamsInput",
    ()=>DutchParamsInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/label.tsx [app-client] (ecmascript)");
'use client';
;
;
const MULTIPLIER_OPTIONS = [
    {
        label: '1.1x',
        value: 110
    },
    {
        label: '1.2x',
        value: 120
    },
    {
        label: '1.5x',
        value: 150
    },
    {
        label: '2x',
        value: 200
    }
];
const DURATION_OPTIONS = [
    {
        label: '15s',
        value: 15
    },
    {
        label: '30s',
        value: 30
    },
    {
        label: '1m',
        value: 60
    },
    {
        label: '2m',
        value: 120
    }
];
function DutchParamsInput({ startPriceMultiplier, duration, onStartPriceChange, onDurationChange, basePrice }) {
    const startPrice = Number(basePrice) * startPriceMultiplier / 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 p-4 rounded-lg bg-green-500/5 border border-green-500/20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-medium text-green-400 flex items-center gap-2",
                children: "Dutch Auction Settings"
            }, void 0, false, {
                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-muted-foreground",
                                children: "Start Price Multiplier"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                children: [
                                    (startPriceMultiplier / 100).toFixed(1),
                                    "x"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-4 gap-2",
                        children: MULTIPLIER_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onStartPriceChange(option.value),
                                className: `py-2 px-3 rounded-lg text-sm font-medium transition-colors ${startPriceMultiplier === option.value ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`,
                                children: option.label
                            }, option.value, false, {
                                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-muted-foreground",
                                children: "Duration"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                children: duration < 60 ? `${duration}s` : `${duration / 60}m`
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-4 gap-2",
                        children: DURATION_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onDurationChange(option.value),
                                className: `py-2 px-3 rounded-lg text-sm font-medium transition-colors ${duration === option.value ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`,
                                children: option.label
                            }, option.value, false, {
                                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-2 border-t border-green-500/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Start Price:"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-green-400 font-mono",
                                children: (startPrice / 1e8).toFixed(4)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "End Price (Min):"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-red-400 font-mono",
                                children: (Number(basePrice) / 1e8).toFixed(4)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/dutch-params-input.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/dutch-params-input.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c = DutchParamsInput;
var _c;
__turbopack_context__.k.register(_c, "DutchParamsInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/auction-swap-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuctionSwapForm",
    ()=>AuctionSwapForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/token-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/amount-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$auction$2d$type$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/auction-type-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$dutch$2d$params$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/dutch-params-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/tokens.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/use-wallet-context.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/transactions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/pricing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down-up.js [app-client] (ecmascript) <export default as ArrowDownUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gavel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gavel$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gavel.js [app-client] (ecmascript) <export default as Gavel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const DEADLINE_OPTIONS = [
    {
        label: '10m',
        value: 10 * 60
    },
    {
        label: '30m',
        value: 30 * 60
    },
    {
        label: '1h',
        value: 60 * 60
    },
    {
        label: '4h',
        value: 4 * 60 * 60
    }
];
const SEALED_BID_DURATION_OPTIONS = [
    {
        label: '15s',
        value: 15
    },
    {
        label: '30s',
        value: 30
    },
    {
        label: '1m',
        value: 60
    },
    {
        label: '2m',
        value: 120
    }
];
const DEFAULT_SLIPPAGE = 0.5;
function AuctionSwapForm({ onSuccess, onError }) {
    _s();
    const { walletAddress, isPrivy, isConnected, signRawHash, publicKeyHex, signAndSubmitTransaction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContext"])();
    const [inputToken, setInputToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [outputToken, setOutputToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inputAmount, setInputAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [minOutputAmount, setMinOutputAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [deadline, setDeadline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEADLINE_OPTIONS[1].value);
    const [inputBalance, setInputBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [tokenBalances, setTokenBalances] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [exchangeRate, setExchangeRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLoadingQuote, setIsLoadingQuote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Auction type state
    const [auctionType, setAuctionType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID);
    const [sealedBidDuration, setSealedBidDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(SEALED_BID_DURATION_OPTIONS[1].value);
    const [dutchStartMultiplier, setDutchStartMultiplier] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(120);
    const [dutchDuration, setDutchDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(60);
    const minAmountOutBigInt = BigInt(Math.floor(parseFloat(minOutputAmount || '0') * 1e8));
    const fetchBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuctionSwapForm.useCallback[fetchBalance]": async (token, address)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTokenBalance"])(token.address, address, token.decimals);
        }
    }["AuctionSwapForm.useCallback[fetchBalance]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuctionSwapForm.useEffect": ()=>{
            const fetchAllBalances = {
                "AuctionSwapForm.useEffect.fetchAllBalances": async ()=>{
                    if (!walletAddress) {
                        setTokenBalances({});
                        return;
                    }
                    const balances = {};
                    await Promise.all(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].map({
                        "AuctionSwapForm.useEffect.fetchAllBalances": async (token)=>{
                            const bal = await fetchBalance(token, walletAddress);
                            balances[token.address] = bal;
                        }
                    }["AuctionSwapForm.useEffect.fetchAllBalances"]));
                    setTokenBalances(balances);
                }
            }["AuctionSwapForm.useEffect.fetchAllBalances"];
            fetchAllBalances();
        }
    }["AuctionSwapForm.useEffect"], [
        walletAddress,
        fetchBalance
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuctionSwapForm.useEffect": ()=>{
            if (inputToken && tokenBalances[inputToken.address]) {
                setInputBalance(tokenBalances[inputToken.address]);
            } else {
                setInputBalance('');
            }
        }
    }["AuctionSwapForm.useEffect"], [
        inputToken,
        tokenBalances
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuctionSwapForm.useEffect": ()=>{
            const fetchQuote = {
                "AuctionSwapForm.useEffect.fetchQuote": async ()=>{
                    if (!inputToken || !outputToken || !inputAmount || parseFloat(inputAmount) <= 0) {
                        setMinOutputAmount('');
                        setExchangeRate(0);
                        return;
                    }
                    setIsLoadingQuote(true);
                    try {
                        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateSwapOutput"])(parseFloat(inputAmount), inputToken.symbol, outputToken.symbol, DEFAULT_SLIPPAGE);
                        setExchangeRate(result.exchangeRate);
                        if (result.outputAmount > 0) {
                            setMinOutputAmount(result.outputAmount.toFixed(6));
                        } else {
                            setMinOutputAmount('');
                        }
                    } catch (err) {
                        console.error('Error fetching quote:', err);
                        setMinOutputAmount('');
                        setExchangeRate(0);
                    } finally{
                        setIsLoadingQuote(false);
                    }
                }
            }["AuctionSwapForm.useEffect.fetchQuote"];
            const timeoutId = setTimeout(fetchQuote, 300);
            return ({
                "AuctionSwapForm.useEffect": ()=>clearTimeout(timeoutId)
            })["AuctionSwapForm.useEffect"];
        }
    }["AuctionSwapForm.useEffect"], [
        inputAmount,
        inputToken,
        outputToken
    ]);
    const handleSwapTokens = ()=>{
        const temp = inputToken;
        setInputToken(outputToken);
        setOutputToken(temp);
        setInputAmount('');
        setMinOutputAmount('');
    };
    const validateForm = ()=>{
        if (!inputToken) return 'Select input token';
        if (!outputToken) return 'Select output token';
        if (inputToken.address === outputToken.address) return 'Tokens must be different';
        if (!inputAmount || parseFloat(inputAmount) <= 0) return 'Enter amount';
        const balance = parseFloat(inputBalance || '0');
        if (parseFloat(inputAmount) > balance) return 'Insufficient balance';
        return null;
    };
    const handleSubmit = async ()=>{
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        if (!walletAddress || !inputToken || !outputToken) return;
        setIsLoading(true);
        setError(null);
        try {
            const amountIn = BigInt(Math.floor(parseFloat(inputAmount) * Math.pow(10, inputToken.decimals)));
            const minAmountOut = BigInt(Math.floor(parseFloat(minOutputAmount) * Math.pow(10, outputToken.decimals)));
            const deadlineTimestamp = Math.floor(Date.now() / 1000) + deadline;
            let txHash;
            if (auctionType === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID) {
                if (isPrivy && signRawHash && publicKeyHex) {
                    txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitSwapWithAuction"])(walletAddress, inputToken.address, outputToken.address, amountIn, minAmountOut, deadlineTimestamp, sealedBidDuration, signRawHash, publicKeyHex);
                } else if (signAndSubmitTransaction) {
                    txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitSwapWithAuctionNative"])(walletAddress, inputToken.address, outputToken.address, amountIn, minAmountOut, deadlineTimestamp, sealedBidDuration, signAndSubmitTransaction);
                } else {
                    throw new Error('No wallet connected');
                }
            } else {
                // Dutch auction
                const startPrice = minAmountOut * BigInt(dutchStartMultiplier) / BigInt(100);
                if (isPrivy && signRawHash && publicKeyHex) {
                    txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitSwapWithDutchAuction"])(walletAddress, inputToken.address, outputToken.address, amountIn, minAmountOut, startPrice, deadlineTimestamp, dutchDuration, signRawHash, publicKeyHex);
                } else if (signAndSubmitTransaction) {
                    txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitSwapWithDutchAuctionNative"])(walletAddress, inputToken.address, outputToken.address, amountIn, minAmountOut, startPrice, deadlineTimestamp, dutchDuration, signAndSubmitTransaction);
                } else {
                    throw new Error('No wallet connected');
                }
            }
            setInputAmount('');
            setMinOutputAmount('');
            onSuccess?.(txHash);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Transaction failed';
            setError(errorMsg);
            onError?.(errorMsg);
        } finally{
            setIsLoading(false);
        }
    };
    const availableOutputTokens = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].filter((t)=>t.address !== inputToken?.address);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "w-full max-w-md mx-auto p-6 bg-card border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-6",
                children: [
                    auctionType === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gavel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gavel$3e$__["Gavel"], {
                        className: "w-5 h-5 text-blue-400"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                        className: "w-5 h-5 text-green-400"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold",
                        children: [
                            auctionType === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID ? 'Sealed-Bid' : 'Dutch',
                            " Auction Swap"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$auction$2d$type$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionTypeSelector"], {
                        value: auctionType,
                        onChange: setAuctionType
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `border rounded-lg p-3 ${auctionType === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID ? 'bg-blue-500/10 border-blue-500/20' : 'bg-green-500/10 border-green-500/20'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `text-sm ${auctionType === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID ? 'text-blue-400' : 'text-green-400'}`,
                            children: auctionType === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID ? 'Solvers submit sealed bids. Best offer wins after auction ends.' : 'Price drops from start to min. First solver to accept wins.'
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                            lineNumber: 267,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmountInput"], {
                                    value: inputAmount,
                                    onChange: setInputAmount,
                                    token: inputToken,
                                    balance: inputBalance,
                                    label: "You pay",
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                    lineNumber: 277,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenSelector"], {
                                    selectedToken: inputToken,
                                    onSelect: setInputToken,
                                    tokens: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"],
                                    balance: inputBalance,
                                    balances: tokenBalances,
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                    lineNumber: 287,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center -my-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            variant: "ghost",
                            size: "icon",
                            onClick: handleSwapTokens,
                            disabled: isLoading,
                            className: "rounded-full border border-border bg-background hover:bg-accent",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownUp$3e$__["ArrowDownUp"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm text-muted-foreground",
                                            children: "You receive (min)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                            lineNumber: 314,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-12 px-3 flex items-center bg-muted/50 rounded-lg border border-border",
                                            children: isLoadingQuote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                className: "w-4 h-4 animate-spin text-muted-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                                lineNumber: 317,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-medium text-muted-foreground",
                                                children: minOutputAmount || '0.00'
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                                lineNumber: 319,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                            lineNumber: 315,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                    lineNumber: 313,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$token$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenSelector"], {
                                    selectedToken: outputToken,
                                    onSelect: setOutputToken,
                                    tokens: availableOutputTokens,
                                    balances: tokenBalances,
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                    lineNumber: 327,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this),
                    exchangeRate > 0 && inputToken && outputToken && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg",
                        children: [
                            "1 ",
                            inputToken.symbol,
                            " = ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(exchangeRate),
                            " ",
                            outputToken.symbol
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 338,
                        columnNumber: 11
                    }, this),
                    auctionType === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm text-blue-400 flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gavel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gavel$3e$__["Gavel"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                        lineNumber: 347,
                                        columnNumber: 15
                                    }, this),
                                    " Sealed Bid Duration"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: SEALED_BID_DURATION_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: sealedBidDuration === option.value ? 'default' : 'outline',
                                        size: "sm",
                                        onClick: ()=>setSealedBidDuration(option.value),
                                        disabled: isLoading,
                                        className: "flex-1",
                                        children: option.label
                                    }, option.value, false, {
                                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                        lineNumber: 351,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                lineNumber: 349,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 345,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$dutch$2d$params$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DutchParamsInput"], {
                        startPriceMultiplier: dutchStartMultiplier,
                        duration: dutchDuration,
                        onStartPriceChange: setDutchStartMultiplier,
                        onDurationChange: setDutchDuration,
                        basePrice: minAmountOutBigInt
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 366,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm text-muted-foreground",
                                children: "Order Deadline"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: DEADLINE_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: deadline === option.value ? 'default' : 'outline',
                                        size: "sm",
                                        onClick: ()=>setDeadline(option.value),
                                        disabled: isLoading,
                                        className: "flex-1",
                                        children: option.label
                                    }, option.value, false, {
                                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                        lineNumber: 380,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                lineNumber: 378,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-muted-foreground",
                        children: [
                            "Slippage tolerance: ",
                            DEFAULT_SLIPPAGE,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 395,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 rounded-lg bg-destructive/10 border border-destructive/20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-destructive",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                            lineNumber: 401,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 400,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        onClick: handleSubmit,
                        disabled: isLoading || !isConnected,
                        className: `w-full h-12 text-base font-medium ${auctionType === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`,
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-4 h-4 mr-2 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                    lineNumber: 417,
                                    columnNumber: 15
                                }, this),
                                "Submitting..."
                            ]
                        }, void 0, true) : !isConnected ? 'Connect Wallet' : auctionType === __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionType"].SEALED_BID ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gavel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gavel$3e$__["Gavel"], {
                                    className: "w-4 h-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                    lineNumber: 424,
                                    columnNumber: 15
                                }, this),
                                "Create Sealed-Bid Auction"
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    className: "w-4 h-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                                    lineNumber: 429,
                                    columnNumber: 15
                                }, this),
                                "Create Dutch Auction"
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/auction-swap-form.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/auction-swap-form.tsx",
        lineNumber: 245,
        columnNumber: 5
    }, this);
}
_s(AuctionSwapForm, "WvK4DcI8tsn7k1adivpg7E9do3E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContext"]
    ];
});
_c = AuctionSwapForm;
var _c;
__turbopack_context__.k.register(_c, "AuctionSwapForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/intent-tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntentTabs",
    ()=>IntentTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$swap$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/swap-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$limit$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/limit-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$twap$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/twap-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$dca$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/dca-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$auction$2d$swap$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/auction-swap-form.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function IntentTabs({ onSuccess, onError }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-md mx-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
            defaultValue: "swap",
            className: "w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                    className: "grid w-full grid-cols-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                            value: "swap",
                            children: "Swap"
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/intent-tabs.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                            value: "auction",
                            children: "Auction"
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/intent-tabs.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                            value: "limit",
                            children: "Limit"
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/intent-tabs.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                            value: "twap",
                            children: "TWAP"
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/intent-tabs.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                            value: "dca",
                            children: "DCA"
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/intent-tabs.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/intent/intent-tabs.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                    value: "swap",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$swap$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwapForm"], {
                        onSuccess: onSuccess,
                        onError: onError
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/intent-tabs.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/intent/intent-tabs.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                    value: "auction",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$auction$2d$swap$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuctionSwapForm"], {
                        onSuccess: onSuccess,
                        onError: onError
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/intent-tabs.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/intent/intent-tabs.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                    value: "limit",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$limit$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LimitForm"], {
                        onSuccess: onSuccess,
                        onError: onError
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/intent-tabs.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/intent/intent-tabs.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                    value: "twap",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$twap$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TWAPForm"], {
                        onSuccess: onSuccess,
                        onError: onError
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/intent-tabs.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/intent/intent-tabs.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                    value: "dca",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$dca$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DCAForm"], {
                        onSuccess: onSuccess,
                        onError: onError
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/intent-tabs.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/intent/intent-tabs.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/intent/intent-tabs.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/intent/intent-tabs.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = IntentTabs;
var _c;
__turbopack_context__.k.register(_c, "IntentTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
            outline: "text-foreground",
            warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
            success: "border-primary/30 bg-primary/10 text-primary",
            info: "border-blue-500/30 bg-blue-500/10 text-blue-400",
            muted: "border-transparent bg-muted text-muted-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/badge.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/intent-status-badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntentStatusBadge",
    ()=>IntentStatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
const statusConfig = {
    pending: {
        label: 'Pending',
        variant: 'warning'
    },
    partially_filled: {
        label: 'Partial',
        variant: 'info'
    },
    filled: {
        label: 'Filled',
        variant: 'success'
    },
    cancelled: {
        label: 'Cancelled',
        variant: 'muted'
    },
    expired: {
        label: 'Expired',
        variant: 'destructive'
    }
};
function IntentStatusBadge({ status, className }) {
    const config = statusConfig[status];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        variant: config.variant,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs", className),
        children: config.label
    }, void 0, false, {
        fileName: "[project]/app/components/intent/intent-status-badge.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c = IntentStatusBadge;
var _c;
__turbopack_context__.k.register(_c, "IntentStatusBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/lib/velox/queries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearEventCache",
    ()=>clearEventCache,
    "clearPeriodFillCache",
    ()=>clearPeriodFillCache,
    "fetchIntentEvents",
    ()=>fetchIntentEvents,
    "fetchPeriodFillEvents",
    ()=>fetchPeriodFillEvents,
    "getActiveSolverCount",
    ()=>getActiveSolverCount,
    "getExecutableIntents",
    ()=>getExecutableIntents,
    "getIntent",
    ()=>getIntent,
    "getIntentEventData",
    ()=>getIntentEventData,
    "getPeriodFillTxHashes",
    ()=>getPeriodFillTxHashes,
    "getScheduledIntentInfo",
    ()=>getScheduledIntentInfo,
    "getSolverReputation",
    ()=>getSolverReputation,
    "getTokenBalance",
    ()=>getTokenBalance,
    "getTotalIntents",
    ()=>getTotalIntents,
    "getTotalOutputFromFills",
    ()=>getTotalOutputFromFills,
    "getTotalSolvers",
    ()=>getTotalSolvers,
    "getUserIntents",
    ()=>getUserIntents,
    "isSolverEligible",
    ()=>isSolverEligible
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/types.ts [app-client] (ecmascript)");
;
;
const eventCache = new Map();
// Helper to safely get string from unknown
const safeGetString = (obj, key)=>{
    if (!obj) return '0';
    const value = obj[key];
    if (value === undefined || value === null) return '0';
    return String(value);
};
// Helper to parse status from Move 2.0 enum format
function parseStatusFromMove(rawStatus) {
    if (typeof rawStatus === 'number') return rawStatus;
    if (typeof rawStatus === 'string') {
        const statusMap = {
            'pending': 0,
            'Pending': 0,
            'partially_filled': 1,
            'PartiallyFilled': 1,
            'filled': 2,
            'Filled': 2,
            'cancelled': 3,
            'Cancelled': 3,
            'expired': 4,
            'Expired': 4
        };
        return statusMap[rawStatus] ?? (parseInt(rawStatus, 10) || 0);
    }
    if (rawStatus && typeof rawStatus === 'object') {
        const statusObj = rawStatus;
        if ('__variant__' in statusObj) {
            const variant = statusObj.__variant__;
            const variantMap = {
                'Pending': 0,
                'PartiallyFilled': 1,
                'Filled': 2,
                'Cancelled': 3,
                'Expired': 4
            };
            return variantMap[variant] ?? 0;
        }
    }
    return 0;
}
async function getIntent(intentId) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
            payload: {
                function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::get_intent`,
                typeArguments: [],
                functionArguments: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                    intentId.toString()
                ]
            }
        });
        if (!result || !result[0]) return null;
        const record = result[0];
        const rawIntent = record.intent;
        if (!rawIntent) return null;
        // Extract Move 2.0 __variant__ for intent type
        const intentVariant = rawIntent.__variant__ || 'Swap';
        const intentType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseIntentType"])(intentVariant);
        // Common fields from intent
        const inputToken = String(rawIntent.input_token ?? rawIntent.input_coin ?? '');
        const outputToken = String(rawIntent.output_token ?? rawIntent.output_coin ?? '');
        // Get amount based on intent type
        let amountIn = '0';
        if (intentType === 'twap') {
            amountIn = safeGetString(rawIntent, 'total_amount');
        } else if (intentType === 'dca') {
            const perPeriod = BigInt(safeGetString(rawIntent, 'amount_per_period'));
            const periods = BigInt(safeGetString(rawIntent, 'total_periods'));
            amountIn = (perPeriod * periods).toString();
        } else {
            amountIn = safeGetString(rawIntent, 'amount_in') || safeGetString(rawIntent, 'amount');
        }
        // Parse deadline/expiry
        let deadline = 0;
        if (intentType === 'swap') {
            deadline = Number(safeGetString(rawIntent, 'deadline'));
        } else if (intentType === 'limit_order') {
            deadline = Number(safeGetString(rawIntent, 'expiry'));
        } else if (intentType === 'twap') {
            const startTime = Number(safeGetString(rawIntent, 'start_time'));
            const numChunks = Number(safeGetString(rawIntent, 'num_chunks'));
            const interval = Number(safeGetString(rawIntent, 'interval_seconds'));
            deadline = startTime + numChunks * interval;
        } else if (intentType === 'dca') {
            const nextExec = Number(safeGetString(rawIntent, 'next_execution'));
            const periods = Number(safeGetString(rawIntent, 'total_periods'));
            const interval = Number(safeGetString(rawIntent, 'interval_seconds'));
            deadline = nextExec + periods * interval;
        }
        // Parse status
        const statusCode = parseStatusFromMove(record.status);
        let status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseIntentStatus"])(statusCode);
        // Check if expired
        if (status === 'pending' && deadline > 0) {
            const nowSeconds = Math.floor(Date.now() / 1000);
            if (deadline < nowSeconds) status = 'expired';
        }
        const intentRecord = {
            id: BigInt(safeGetString(record, 'id')),
            user: String(record.user ?? ''),
            intentType,
            inputToken,
            outputToken,
            amountIn: BigInt(amountIn),
            status,
            filledAmount: BigInt(safeGetString(record, 'filled_amount')),
            createdAt: Number(record.created_at ?? 0),
            deadline: deadline > 0 ? deadline : undefined,
            solver: record.solver ? record.solver.vec?.[0] : undefined,
            executionPrice: record.execution_price ? BigInt(record.execution_price.vec?.[0] ?? '0') : undefined
        };
        // Add type-specific fields
        if (intentType === 'swap') {
            intentRecord.minAmountOut = BigInt(safeGetString(rawIntent, 'min_amount_out'));
        } else if (intentType === 'limit_order') {
            intentRecord.limitPrice = BigInt(safeGetString(rawIntent, 'limit_price'));
            intentRecord.partialFillAllowed = rawIntent.partial_fill_allowed === true;
        } else if (intentType === 'twap') {
            intentRecord.numChunks = Number(safeGetString(rawIntent, 'num_chunks'));
            intentRecord.intervalSeconds = Number(safeGetString(rawIntent, 'interval_seconds'));
            intentRecord.maxSlippageBps = Number(safeGetString(rawIntent, 'max_slippage_bps'));
        } else if (intentType === 'dca') {
            intentRecord.totalPeriods = Number(safeGetString(rawIntent, 'total_periods'));
            intentRecord.intervalSeconds = Number(safeGetString(rawIntent, 'interval_seconds'));
            intentRecord.amountPerPeriod = BigInt(safeGetString(rawIntent, 'amount_per_period'));
        }
        return intentRecord;
    } catch (error) {
        console.error('[Velox] Error fetching intent:', error);
        return null;
    }
}
async function getUserIntents(userAddress) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
            payload: {
                function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::get_user_intents`,
                typeArguments: [],
                functionArguments: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                    userAddress
                ]
            }
        });
        if (!result || !result[0]) return [];
        const ids = result[0];
        return ids.map((id)=>BigInt(id));
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('MISSING_DATA')) return [];
        console.error('[Velox] Error fetching user intents:', error);
        return [];
    }
}
async function getTotalIntents() {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
            payload: {
                function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::get_total_intents`,
                typeArguments: [],
                functionArguments: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]
                ]
            }
        });
        return BigInt(result[0]);
    } catch (error) {
        console.error('[Velox] Error fetching total intents:', error);
        return BigInt(0);
    }
}
async function getTotalSolvers() {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
            payload: {
                function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::solver_registry::get_total_solvers`,
                typeArguments: [],
                functionArguments: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]
                ]
            }
        });
        return Number(result[0]);
    } catch (error) {
        // MISSING_DATA is expected when registry hasn't been initialized
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (!errorMessage.includes('MISSING_DATA')) {
            console.warn('[Velox] Error fetching total solvers:', error);
        }
        return 0;
    }
}
async function getActiveSolverCount() {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
            payload: {
                function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::solver_registry::get_active_solver_count`,
                typeArguments: [],
                functionArguments: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]
                ]
            }
        });
        return Number(result[0]);
    } catch (error) {
        // MISSING_DATA is expected when registry hasn't been initialized
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (!errorMessage.includes('MISSING_DATA')) {
            console.warn('[Velox] Error fetching active solver count:', error);
        }
        return 0;
    }
}
async function getSolverReputation(solverAddress) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
            payload: {
                function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::solver_registry::get_reputation`,
                typeArguments: [],
                functionArguments: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                    solverAddress
                ]
            }
        });
        return Number(result[0]);
    } catch (error) {
        console.error('[Velox] Error fetching solver reputation:', error);
        return 0;
    }
}
async function isSolverEligible(solverAddress) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
            payload: {
                function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::solver_registry::is_solver_eligible`,
                typeArguments: [],
                functionArguments: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                    solverAddress
                ]
            }
        });
        return result[0] === true;
    } catch (error) {
        console.error('[Velox] Error checking solver eligibility:', error);
        return false;
    }
}
async function getTokenBalance(userAddress, tokenMetadata) {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
            payload: {
                function: '0x1::primary_fungible_store::balance',
                typeArguments: [],
                functionArguments: [
                    userAddress,
                    tokenMetadata
                ]
            }
        });
        return BigInt(result[0]);
    } catch (error) {
        console.error('[Velox] Error fetching token balance:', error);
        return BigInt(0);
    }
}
// ============ Event Fetching Functions ============
const RPC_URL = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOVEMENT_CONFIGS"][__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CURRENT_NETWORK"]].fullnode;
/**
 * Parse events from a list of transactions
 */ function parseEventsFromTransactions(transactions, intentIds) {
    for (const tx of transactions){
        if (!tx.events) continue;
        for (const event of tx.events){
            // Check for IntentCreated events
            if (event.type === `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::submission::IntentCreated`) {
                const data = event.data;
                const intentId = data.intent_id;
                if (intentIds.some((id)=>id.toString() === intentId)) {
                    const existing = eventCache.get(intentId) || {};
                    existing.submissionTxHash = tx.hash || tx.version;
                    eventCache.set(intentId, existing);
                }
            }
            // Check for IntentFilled events
            if (event.type === `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::settlement::IntentFilled`) {
                const data = event.data;
                const intentId = data.intent_id;
                if (intentIds.some((id)=>id.toString() === intentId)) {
                    const existing = eventCache.get(intentId) || {};
                    existing.settlementTxHash = tx.hash || tx.version;
                    existing.outputAmount = BigInt(data.output_amount);
                    eventCache.set(intentId, existing);
                }
            }
        }
    }
}
async function fetchIntentEvents(intentIds, userAddress) {
    if (intentIds.length === 0) return;
    try {
        // Fetch from multiple sources in parallel
        const fetchPromises = [];
        // 1. User transactions (for IntentCreated events - submission)
        if (userAddress) {
            fetchPromises.push(fetch(`${RPC_URL}/accounts/${userAddress}/transactions?limit=50`).then((res)=>res.ok ? res.json() : []).catch(()=>[]));
        }
        // 2. Contract transactions (for IntentFilled events - settlement by solver)
        fetchPromises.push(fetch(`${RPC_URL}/accounts/${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}/transactions?limit=100`).then((res)=>res.ok ? res.json() : []).catch(()=>[]));
        const results = await Promise.all(fetchPromises);
        // Parse events from all transaction sources
        for (const transactions of results){
            if (Array.isArray(transactions)) {
                parseEventsFromTransactions(transactions, intentIds);
            }
        }
    } catch (error) {
        console.warn('[Velox] Event fetching not available:', error);
    }
}
function getIntentEventData(intentId) {
    return eventCache.get(intentId.toString());
}
function clearEventCache() {
    eventCache.clear();
}
async function getScheduledIntentInfo(intentId) {
    try {
        const [scheduleResult, readyResult, completedResult] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
                payload: {
                    function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::scheduled::get_scheduled_intent`,
                    typeArguments: [],
                    functionArguments: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                        intentId.toString()
                    ]
                }
            }).catch(()=>null),
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
                payload: {
                    function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::scheduled::is_ready_for_execution`,
                    typeArguments: [],
                    functionArguments: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                        intentId.toString()
                    ]
                }
            }).catch(()=>[
                    false
                ]),
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
                payload: {
                    function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::scheduled::is_completed`,
                    typeArguments: [],
                    functionArguments: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"],
                        intentId.toString()
                    ]
                }
            }).catch(()=>[
                    false
                ])
        ]);
        if (!scheduleResult) return null;
        const [nextExecution, chunksExecuted, totalChunks, isTwap] = scheduleResult;
        return {
            nextExecution: Number(nextExecution),
            chunksExecuted: Number(chunksExecuted),
            totalChunks: Number(totalChunks),
            isTwap: isTwap === true,
            isReady: readyResult?.[0] === true,
            isCompleted: completedResult?.[0] === true
        };
    } catch (error) {
        console.error('[Velox] Error fetching scheduled intent info:', error);
        return null;
    }
}
async function getExecutableIntents() {
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aptos"].view({
            payload: {
                function: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::scheduled::get_executable_intents`,
                typeArguments: [],
                functionArguments: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]
                ]
            }
        });
        if (!result || !result[0]) return [];
        const ids = result[0];
        return ids.map((id)=>BigInt(id));
    } catch (error) {
        console.error('[Velox] Error fetching executable intents:', error);
        return [];
    }
}
// Cache for period fill transactions
const periodFillCache = new Map();
async function fetchPeriodFillEvents(intentId) {
    const cacheKey = intentId.toString();
    // Return cached if available and recent
    const cached = periodFillCache.get(cacheKey);
    if (cached) return cached;
    try {
        // Fetch transactions from the contract address
        const response = await fetch(`${RPC_URL}/accounts/${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}/transactions?limit=200`);
        if (!response.ok) return [];
        const transactions = await response.json();
        const fills = [];
        for (const tx of transactions){
            if (!tx.events) continue;
            for (const event of tx.events){
                // Check for DCAPeriodFilled events
                if (event.type === `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::settlement::DCAPeriodFilled`) {
                    const data = event.data;
                    if (data.intent_id?.toString() === intentId.toString()) {
                        fills.push({
                            txHash: tx.hash || tx.version,
                            periodNumber: Number(data.period_number || 0),
                            inputAmount: BigInt(String(data.period_input || '0')),
                            outputAmount: BigInt(String(data.period_output || '0')),
                            filledAt: Number(data.filled_at || 0)
                        });
                    }
                }
                // Check for TWAPChunkFilled events
                if (event.type === `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VELOX_ADDRESS"]}::settlement::TWAPChunkFilled`) {
                    const data = event.data;
                    if (data.intent_id?.toString() === intentId.toString()) {
                        fills.push({
                            txHash: tx.hash || tx.version,
                            periodNumber: Number(data.chunk_number || 0),
                            inputAmount: BigInt(String(data.chunk_input || '0')),
                            outputAmount: BigInt(String(data.chunk_output || '0')),
                            filledAt: Number(data.filled_at || 0)
                        });
                    }
                }
            }
        }
        // Sort by period number
        fills.sort((a, b)=>a.periodNumber - b.periodNumber);
        // Cache the result
        periodFillCache.set(cacheKey, fills);
        return fills;
    } catch (error) {
        console.error('[Velox] Error fetching period fill events:', error);
        return [];
    }
}
async function getPeriodFillTxHashes(intentId) {
    const fills = await fetchPeriodFillEvents(intentId);
    return fills.map((f)=>f.txHash);
}
async function getTotalOutputFromFills(intentId) {
    const fills = await fetchPeriodFillEvents(intentId);
    return fills.reduce((acc, f)=>acc + f.outputAmount, BigInt(0));
}
function clearPeriodFillCache() {
    periodFillCache.clear();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/progress.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Progress",
    ()=>Progress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-progress/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
const Progress = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, value, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative h-2 w-full overflow-hidden rounded-full bg-muted', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            className: "h-full w-full flex-1 bg-primary transition-all",
            style: {
                transform: `translateX(-${100 - (value || 0)}%)`
            }
        }, void 0, false, {
            fileName: "[project]/app/components/ui/progress.tsx",
            lineNumber: 19,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/components/ui/progress.tsx",
        lineNumber: 11,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Progress;
Progress.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Progress$React.forwardRef");
__turbopack_context__.k.register(_c1, "Progress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/dca-intent-row.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DCAIntentRow",
    ()=>DCAIntentRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/queries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/intent-status-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/progress.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/tokens.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/timer.js [app-client] (ecmascript) <export default as Timer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function formatAmount(amount, decimals) {
    const divisor = BigInt(10 ** decimals);
    const whole = amount / divisor;
    const fraction = amount % divisor;
    const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 4);
    return `${whole}.${fractionStr}`;
}
function getTokenSymbol(address) {
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].find((t)=>t.address === address);
    return token?.symbol || address.slice(0, 6) + '...';
}
function getTokenDecimals(address) {
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].find((t)=>t.address === address);
    return token?.decimals || 8;
}
function formatInterval(seconds) {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
}
function DCAIntentRow({ intent, onCancel, onClick, isCancelling }) {
    _s();
    const [scheduledInfo, setScheduledInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [periodFills, setPeriodFills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const inputSymbol = getTokenSymbol(intent.inputToken);
    const outputSymbol = getTokenSymbol(intent.outputToken);
    const inputDecimals = getTokenDecimals(intent.inputToken);
    const outputDecimals = getTokenDecimals(intent.outputToken);
    const isPending = intent.status === 'pending' || intent.status === 'partially_filled';
    // Fetch scheduled info and period fills
    const fetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DCAIntentRow.useCallback[fetchData]": async ()=>{
            const [info, fills] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScheduledIntentInfo"])(intent.id),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPeriodFillEvents"])(intent.id)
            ]);
            setScheduledInfo(info);
            setPeriodFills(fills);
            setLoading(false);
        }
    }["DCAIntentRow.useCallback[fetchData]"], [
        intent.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DCAIntentRow.useEffect": ()=>{
            fetchData();
            const interval = setInterval(fetchData, 10000);
            return ({
                "DCAIntentRow.useEffect": ()=>clearInterval(interval)
            })["DCAIntentRow.useEffect"];
        }
    }["DCAIntentRow.useEffect"], [
        fetchData
    ]);
    // Countdown timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DCAIntentRow.useEffect": ()=>{
            if (!scheduledInfo) return;
            const updateCountdown = {
                "DCAIntentRow.useEffect.updateCountdown": ()=>{
                    const now = Math.floor(Date.now() / 1000);
                    const diff = scheduledInfo.nextExecution - now;
                    if (diff <= 0) {
                        if (scheduledInfo.isReady) {
                            setCountdown('Ready to execute');
                        } else {
                            setCountdown('Waiting for solver...');
                        }
                        return;
                    }
                    const days = Math.floor(diff / 86400);
                    const hours = Math.floor(diff % 86400 / 3600);
                    const mins = Math.floor(diff % 3600 / 60);
                    const secs = diff % 60;
                    if (days > 0) {
                        setCountdown(`${days}d ${hours}h ${mins}m`);
                    } else if (hours > 0) {
                        setCountdown(`${hours}h ${mins}m ${secs}s`);
                    } else if (mins > 0) {
                        setCountdown(`${mins}m ${secs}s`);
                    } else {
                        setCountdown(`${secs}s`);
                    }
                }
            }["DCAIntentRow.useEffect.updateCountdown"];
            updateCountdown();
            const timer = setInterval(updateCountdown, 1000);
            return ({
                "DCAIntentRow.useEffect": ()=>clearInterval(timer)
            })["DCAIntentRow.useEffect"];
        }
    }["DCAIntentRow.useEffect"], [
        scheduledInfo
    ]);
    const periodsExecuted = scheduledInfo?.chunksExecuted ?? intent.periodsExecuted ?? periodFills.length;
    const totalPeriods = scheduledInfo?.totalChunks ?? intent.totalPeriods ?? 0;
    const progress = totalPeriods > 0 ? periodsExecuted / totalPeriods * 100 : 0;
    const isCompleted = scheduledInfo?.isCompleted || periodsExecuted >= totalPeriods;
    const amountPerPeriod = intent.amountPerPeriod ?? BigInt(0);
    const formattedPerPeriod = formatAmount(amountPerPeriod, inputDecimals);
    const totalInvestment = formatAmount(intent.amountIn, inputDecimals);
    // Calculate accumulated output from period fills
    const totalOutputReceived = periodFills.reduce((acc, f)=>acc + f.outputAmount, BigInt(0));
    const formattedOutput = formatAmount(totalOutputReceived, outputDecimals);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer",
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                className: "h-4 w-4 text-primary"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground uppercase font-medium",
                                children: "DCA"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-semibold",
                                children: [
                                    inputSymbol,
                                    " → ",
                                    outputSymbol
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntentStatusBadge"], {
                                status: "filled"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntentStatusBadge"], {
                                status: intent.status
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this),
                            isPending && !isCompleted && onCancel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    onCancel(intent.id);
                                },
                                disabled: isCancelling,
                                className: "h-7 w-7 p-0 text-muted-foreground hover:text-destructive",
                                children: isCancelling ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                    lineNumber: 172,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                    lineNumber: 174,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Progress"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: [
                                    periodsExecuted,
                                    " / ",
                                    totalPeriods,
                                    " periods"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                        value: progress,
                        className: "h-2"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-x-4 gap-y-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Per Period:"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1 font-medium",
                                children: [
                                    formattedPerPeriod,
                                    " ",
                                    inputSymbol
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Total:"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1 font-medium",
                                children: [
                                    totalInvestment,
                                    " ",
                                    inputSymbol
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Interval:"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1",
                                children: formatInterval(intent.intervalSeconds ?? 0)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Spent:"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1",
                                children: [
                                    formatAmount(amountPerPeriod * BigInt(periodsExecuted), inputDecimals),
                                    " ",
                                    inputSymbol
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            periodsExecuted > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "h-4 w-4 text-green-500"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 218,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-muted-foreground",
                                children: "Accumulated:"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 219,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-semibold text-green-500",
                        children: [
                            formattedOutput,
                            " ",
                            outputSymbol
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                lineNumber: 216,
                columnNumber: 9
            }, this),
            !isCompleted && isPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 p-2 rounded-md bg-primary/10 border border-primary/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__["Timer"], {
                        className: "h-4 w-4 text-primary"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-muted-foreground",
                        children: "Next buy in:"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 231,
                        columnNumber: 11
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "h-4 w-4 animate-spin text-primary"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 233,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-semibold text-primary",
                        children: countdown
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 235,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                lineNumber: 229,
                columnNumber: 9
            }, this),
            isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 p-2 rounded-md bg-green-500/10 border border-green-500/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-4 w-4 text-green-500"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 243,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-green-600",
                        children: [
                            "All ",
                            totalPeriods,
                            " periods completed!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                lineNumber: 242,
                columnNumber: 9
            }, this),
            periodFills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-border pt-3 mt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-muted-foreground mb-2 block",
                        children: "Period Fills:"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 251,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: periodFills.map((fill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExplorerUrl"])(fill.txHash),
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
                                onClick: (e)=>e.stopPropagation(),
                                title: `Period #${fill.periodNumber}: ${formatAmount(fill.outputAmount, outputDecimals)} ${outputSymbol}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "#",
                                            fill.periodNumber
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                        lineNumber: 263,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                        lineNumber: 264,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, fill.txHash, true, {
                                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                                lineNumber: 254,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                        lineNumber: 252,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                lineNumber: 250,
                columnNumber: 9
            }, this),
            intent.submissionTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 text-xs pt-2 border-t border-border/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExplorerUrl"])(intent.submissionTxHash),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                            className: "h-3 w-3"
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                            lineNumber: 281,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "Created: ",
                                intent.submissionTxHash.slice(0, 8),
                                "..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                            lineNumber: 282,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                    lineNumber: 274,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/intent/dca-intent-row.tsx",
                lineNumber: 273,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/dca-intent-row.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_s(DCAIntentRow, "FQCp4xhfxXT28yJZrFd+U9jorUM=");
_c = DCAIntentRow;
var _c;
__turbopack_context__.k.register(_c, "DCAIntentRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/twap-intent-row.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TWAPIntentRow",
    ()=>TWAPIntentRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/queries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/intent-status-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/progress.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/tokens.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/timer.js [app-client] (ecmascript) <export default as Timer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function formatAmount(amount, decimals) {
    const divisor = BigInt(10 ** decimals);
    const whole = amount / divisor;
    const fraction = amount % divisor;
    const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 4);
    return `${whole}.${fractionStr}`;
}
function getTokenSymbol(address) {
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].find((t)=>t.address === address);
    return token?.symbol || address.slice(0, 6) + '...';
}
function getTokenDecimals(address) {
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].find((t)=>t.address === address);
    return token?.decimals || 8;
}
function formatInterval(seconds) {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
}
function TWAPIntentRow({ intent, onCancel, onClick, isCancelling }) {
    _s();
    const [scheduledInfo, setScheduledInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chunkFills, setChunkFills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const inputSymbol = getTokenSymbol(intent.inputToken);
    const outputSymbol = getTokenSymbol(intent.outputToken);
    const inputDecimals = getTokenDecimals(intent.inputToken);
    const outputDecimals = getTokenDecimals(intent.outputToken);
    const isPending = intent.status === 'pending' || intent.status === 'partially_filled';
    const fetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TWAPIntentRow.useCallback[fetchData]": async ()=>{
            const [info, fills] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScheduledIntentInfo"])(intent.id),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPeriodFillEvents"])(intent.id)
            ]);
            setScheduledInfo(info);
            setChunkFills(fills);
            setLoading(false);
        }
    }["TWAPIntentRow.useCallback[fetchData]"], [
        intent.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TWAPIntentRow.useEffect": ()=>{
            fetchData();
            const interval = setInterval(fetchData, 10000);
            return ({
                "TWAPIntentRow.useEffect": ()=>clearInterval(interval)
            })["TWAPIntentRow.useEffect"];
        }
    }["TWAPIntentRow.useEffect"], [
        fetchData
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TWAPIntentRow.useEffect": ()=>{
            if (!scheduledInfo) return;
            const updateCountdown = {
                "TWAPIntentRow.useEffect.updateCountdown": ()=>{
                    const now = Math.floor(Date.now() / 1000);
                    const diff = scheduledInfo.nextExecution - now;
                    if (diff <= 0) {
                        setCountdown(scheduledInfo.isReady ? 'Ready to execute' : 'Waiting for solver...');
                        return;
                    }
                    const hours = Math.floor(diff / 3600);
                    const mins = Math.floor(diff % 3600 / 60);
                    const secs = diff % 60;
                    if (hours > 0) {
                        setCountdown(`${hours}h ${mins}m ${secs}s`);
                    } else if (mins > 0) {
                        setCountdown(`${mins}m ${secs}s`);
                    } else {
                        setCountdown(`${secs}s`);
                    }
                }
            }["TWAPIntentRow.useEffect.updateCountdown"];
            updateCountdown();
            const timer = setInterval(updateCountdown, 1000);
            return ({
                "TWAPIntentRow.useEffect": ()=>clearInterval(timer)
            })["TWAPIntentRow.useEffect"];
        }
    }["TWAPIntentRow.useEffect"], [
        scheduledInfo
    ]);
    const chunksExecuted = scheduledInfo?.chunksExecuted ?? intent.chunksExecuted ?? chunkFills.length;
    const totalChunks = scheduledInfo?.totalChunks ?? intent.numChunks ?? 0;
    const progress = totalChunks > 0 ? chunksExecuted / totalChunks * 100 : 0;
    const isCompleted = scheduledInfo?.isCompleted || chunksExecuted >= totalChunks;
    const totalAmount = intent.amountIn;
    const chunkAmount = totalChunks > 0 ? totalAmount / BigInt(totalChunks) : BigInt(0);
    const formattedChunk = formatAmount(chunkAmount, inputDecimals);
    const formattedTotal = formatAmount(totalAmount, inputDecimals);
    // Calculate accumulated output from chunk fills
    const totalOutputReceived = chunkFills.reduce((acc, f)=>acc + f.outputAmount, BigInt(0));
    const formattedOutput = formatAmount(totalOutputReceived, outputDecimals);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer",
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "h-4 w-4 text-primary"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground uppercase font-medium",
                                children: "TWAP"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-semibold",
                                children: [
                                    inputSymbol,
                                    " → ",
                                    outputSymbol
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntentStatusBadge"], {
                                status: "filled"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntentStatusBadge"], {
                                status: intent.status
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            isPending && !isCompleted && onCancel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    onCancel(intent.id);
                                },
                                disabled: isCancelling,
                                className: "h-7 w-7 p-0 text-muted-foreground hover:text-destructive",
                                children: isCancelling ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                    lineNumber: 161,
                                    columnNumber: 31
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                    lineNumber: 161,
                                    columnNumber: 78
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Progress"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: [
                                    chunksExecuted,
                                    " / ",
                                    totalChunks,
                                    " chunks"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                        value: progress,
                        className: "h-2"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-x-4 gap-y-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Per Chunk:"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1 font-medium",
                                children: [
                                    formattedChunk,
                                    " ",
                                    inputSymbol
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Total:"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1 font-medium",
                                children: [
                                    formattedTotal,
                                    " ",
                                    inputSymbol
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Interval:"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1",
                                children: formatInterval(intent.intervalSeconds ?? 0)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "Max Slippage:"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1",
                                children: [
                                    ((intent.maxSlippageBps ?? 0) / 100).toFixed(2),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            chunksExecuted > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                className: "h-4 w-4 text-green-500"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-muted-foreground",
                                children: "Accumulated:"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-semibold text-green-500",
                        children: [
                            formattedOutput,
                            " ",
                            outputSymbol
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 203,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, this),
            !isCompleted && isPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 p-2 rounded-md bg-primary/10 border border-primary/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__["Timer"], {
                        className: "h-4 w-4 text-primary"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-muted-foreground",
                        children: "Next chunk in:"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "h-4 w-4 animate-spin text-primary"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 215,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-semibold text-primary",
                        children: countdown
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 217,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                lineNumber: 211,
                columnNumber: 9
            }, this),
            isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 p-2 rounded-md bg-green-500/10 border border-green-500/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-4 w-4 text-green-500"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-green-600",
                        children: [
                            "All ",
                            totalChunks,
                            " chunks completed!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                lineNumber: 223,
                columnNumber: 9
            }, this),
            chunkFills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-border pt-3 mt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-muted-foreground mb-2 block",
                        children: "Chunk Fills:"
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: chunkFills.map((fill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExplorerUrl"])(fill.txHash),
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
                                onClick: (e)=>e.stopPropagation(),
                                title: `Chunk #${fill.periodNumber}: ${formatAmount(fill.outputAmount, outputDecimals)} ${outputSymbol}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "#",
                                            fill.periodNumber
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                        lineNumber: 244,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                        lineNumber: 245,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, fill.txHash, true, {
                                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                                lineNumber: 235,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                        lineNumber: 233,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                lineNumber: 231,
                columnNumber: 9
            }, this),
            intent.submissionTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 text-xs pt-2 border-t border-border/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExplorerUrl"])(intent.submissionTxHash),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                            className: "h-3 w-3"
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                            lineNumber: 261,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "Created: ",
                                intent.submissionTxHash.slice(0, 8),
                                "..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                            lineNumber: 262,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                    lineNumber: 254,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/intent/twap-intent-row.tsx",
                lineNumber: 253,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/twap-intent-row.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_s(TWAPIntentRow, "+1MUGMMmEHajeMa5Wu7Tt33oxOU=");
_c = TWAPIntentRow;
var _c;
__turbopack_context__.k.register(_c, "TWAPIntentRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/intent-row.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntentRow",
    ()=>IntentRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/intent-status-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$dca$2d$intent$2d$row$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/dca-intent-row.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$twap$2d$intent$2d$row$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/twap-intent-row.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/constants/tokens.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
'use client';
;
;
;
;
;
;
;
;
;
function formatAmount(amount, decimals) {
    const divisor = BigInt(10 ** decimals);
    const whole = amount / divisor;
    const fraction = amount % divisor;
    const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 4);
    return `${whole}.${fractionStr}`;
}
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
}
function formatTxHash(hash) {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}
function getTokenSymbol(address) {
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].find((t)=>t.address === address);
    return token?.symbol || address.slice(0, 6) + '...';
}
function getTokenDecimals(address) {
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$constants$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_LIST"].find((t)=>t.address === address);
    return token?.decimals || 8;
}
function IntentRow({ intent, onCancel, onClick, isCancelling, compact, periodFillTxHashes }) {
    // Use specialized row components for DCA and TWAP
    if (intent.intentType === 'dca') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$dca$2d$intent$2d$row$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DCAIntentRow"], {
            intent: intent,
            onCancel: onCancel,
            onClick: onClick,
            isCancelling: isCancelling,
            periodFillTxHashes: periodFillTxHashes
        }, void 0, false, {
            fileName: "[project]/app/components/intent/intent-row.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this);
    }
    if (intent.intentType === 'twap') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$twap$2d$intent$2d$row$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TWAPIntentRow"], {
            intent: intent,
            onCancel: onCancel,
            onClick: onClick,
            isCancelling: isCancelling,
            chunkFillTxHashes: periodFillTxHashes
        }, void 0, false, {
            fileName: "[project]/app/components/intent/intent-row.tsx",
            lineNumber: 73,
            columnNumber: 7
        }, this);
    }
    const inputSymbol = getTokenSymbol(intent.inputToken);
    const outputSymbol = getTokenSymbol(intent.outputToken);
    const inputDecimals = getTokenDecimals(intent.inputToken);
    const outputDecimals = getTokenDecimals(intent.outputToken);
    const formattedAmount = formatAmount(intent.amountIn, inputDecimals);
    const isPending = intent.status === 'pending' || intent.status === 'partially_filled';
    const isFilled = intent.status === 'filled';
    const formattedOutput = intent.outputAmount ? formatAmount(intent.outputAmount, outputDecimals) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2 p-3 rounded-lg bg-card border border-border hover:border-border/80 transition-colors cursor-pointer",
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-muted-foreground uppercase",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIntentTypeDisplay"])(intent.intentType)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-row.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium",
                                    children: [
                                        formattedAmount,
                                        " ",
                                        inputSymbol,
                                        " → ",
                                        formattedOutput ? `${formattedOutput} ` : '',
                                        outputSymbol
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-row.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/intent/intent-row.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/intent-row.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground",
                                children: formatTime(intent.createdAt)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/intent-row.tsx",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntentStatusBadge"], {
                                status: intent.status
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/intent-row.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            isPending && onCancel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    onCancel(intent.id);
                                },
                                disabled: isCancelling,
                                className: "h-7 w-7 p-0 text-muted-foreground hover:text-destructive",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-row.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/intent-row.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/intent-row.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/intent-row.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 text-xs flex-wrap",
                children: [
                    intent.submissionTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExplorerUrl"])(intent.submissionTxHash),
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/intent-row.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Submitted: ",
                                    formatTxHash(intent.submissionTxHash)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/intent-row.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/intent-row.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this),
                    isFilled && intent.settlementTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExplorerUrl"])(intent.settlementTxHash),
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center gap-1 text-primary hover:text-primary/80 transition-colors",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/intent-row.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Settled: ",
                                    formatTxHash(intent.settlementTxHash)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/intent-row.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/intent-row.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/intent-row.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/intent-row.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_c = IntentRow;
var _c;
__turbopack_context__.k.register(_c, "IntentRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/active-intents.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActiveIntents",
    ()=>ActiveIntents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$row$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/intent-row.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
'use client';
;
;
;
;
function ActiveIntents({ intents, loading, onCancel, cancellingId }) {
    const activeIntents = intents.filter((intent)=>intent.status === 'pending' || intent.status === 'partially_filled');
    // Only show when there are actual active intents
    if (activeIntents.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "border-primary/20 bg-primary/5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "pb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                    className: "text-lg flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                            className: "h-4 w-4 text-primary"
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/active-intents.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        "Active Intents",
                        loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "h-3 w-3 animate-spin text-muted-foreground"
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/active-intents.tsx",
                            lineNumber: 31,
                            columnNumber: 23
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-auto text-sm font-normal text-muted-foreground",
                            children: [
                                activeIntents.length,
                                " active"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/intent/active-intents.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/intent/active-intents.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/intent/active-intents.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: activeIntents.map((intent)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$row$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntentRow"], {
                            intent: intent,
                            onCancel: onCancel,
                            isCancelling: cancellingId === intent.id,
                            compact: true
                        }, intent.id.toString(), false, {
                            fileName: "[project]/app/components/intent/active-intents.tsx",
                            lineNumber: 40,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/components/intent/active-intents.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/intent/active-intents.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/active-intents.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = ActiveIntents;
var _c;
__turbopack_context__.k.register(_c, "ActiveIntents");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/constants/contracts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Velox contract addresses on Movement Bardock Testnet
__turbopack_context__.s([
    "NATIVE_MOVE",
    ()=>NATIVE_MOVE,
    "REGISTRY_ADDR",
    ()=>REGISTRY_ADDR,
    "TOKENS",
    ()=>TOKENS,
    "VELOX_ADDRESS",
    ()=>VELOX_ADDRESS
]);
const VELOX_ADDRESS = '0x5cf7138d960b59b714b1d05774fdc2c26ae3f6d9f60808981f5d3c7e6004f840';
const REGISTRY_ADDR = VELOX_ADDRESS; // Registry is at same address
const TOKENS = {
    tUSDC: {
        address: '0xd28177fbf37d818e493963c11fe567e3f6dad693a1406b309847f850ba6c31f0',
        symbol: 'tUSDC',
        name: 'Test USDC',
        decimals: 8
    },
    tMOVE: {
        address: '0x23dc029a2171449dd3a00598c6e83ef771ca4567818cea527d4ec6dd48c9701d',
        symbol: 'tMOVE',
        name: 'Test MOVE',
        decimals: 8
    }
};
const NATIVE_MOVE = '0x1::aptos_coin::AptosCoin';
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/intent-detail-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntentDetailDialog",
    ()=>IntentDetailDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/progress.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/queries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/aptos.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/timer.js [app-client] (ecmascript) <export default as Timer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
// Use app theme colors (primary: #c2956a golden/amber)
const TYPE_COLORS = {
    swap: 'bg-primary/10 text-primary',
    limit_order: 'bg-primary/10 text-primary',
    twap: 'bg-primary/10 text-primary',
    dca: 'bg-primary/10 text-primary'
};
const STATUS_COLORS = {
    pending: 'bg-muted text-muted-foreground',
    filled: 'bg-primary/10 text-primary',
    partially_filled: 'bg-primary/10 text-primary',
    cancelled: 'bg-muted text-muted-foreground',
    expired: 'bg-destructive/10 text-destructive'
};
function getTokenSymbol(address) {
    if (address === __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKENS"].tUSDC.address) return 'tUSDC';
    if (address === __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKENS"].tMOVE.address) return 'tMOVE';
    return address.slice(0, 8) + '...';
}
function formatAmount(amount) {
    return (Number(amount) / 1e8).toFixed(4);
}
function formatTime(timestamp) {
    if (!timestamp) return '--';
    return new Date(timestamp * 1000).toLocaleString();
}
function formatPrice(price) {
    return (Number(price) / 10000).toFixed(4);
}
function formatIntervalHuman(seconds) {
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
    return `${Math.floor(seconds / 86400)} days`;
}
function IntentDetailDialog({ intent, open, onOpenChange }) {
    _s();
    const [scheduledInfo, setScheduledInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [periodFills, setPeriodFills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const isScheduledIntent = intent?.intentType === 'dca' || intent?.intentType === 'twap';
    // Fetch scheduled info for DCA/TWAP intents
    const fetchScheduledData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "IntentDetailDialog.useCallback[fetchScheduledData]": async ()=>{
            if (!intent || !isScheduledIntent) return;
            const [info, fills] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScheduledIntentInfo"])(intent.id),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchPeriodFillEvents"])(intent.id)
            ]);
            setScheduledInfo(info);
            setPeriodFills(fills);
        }
    }["IntentDetailDialog.useCallback[fetchScheduledData]"], [
        intent,
        isScheduledIntent
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IntentDetailDialog.useEffect": ()=>{
            if (open && isScheduledIntent) {
                fetchScheduledData();
                const interval = setInterval(fetchScheduledData, 10000);
                return ({
                    "IntentDetailDialog.useEffect": ()=>clearInterval(interval)
                })["IntentDetailDialog.useEffect"];
            }
        }
    }["IntentDetailDialog.useEffect"], [
        open,
        isScheduledIntent,
        fetchScheduledData
    ]);
    // Countdown timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IntentDetailDialog.useEffect": ()=>{
            if (!scheduledInfo || !open) return;
            const updateCountdown = {
                "IntentDetailDialog.useEffect.updateCountdown": ()=>{
                    const now = Math.floor(Date.now() / 1000);
                    const diff = scheduledInfo.nextExecution - now;
                    if (diff <= 0) {
                        setCountdown(scheduledInfo.isReady ? 'Ready to execute' : 'Waiting for solver...');
                        return;
                    }
                    const days = Math.floor(diff / 86400);
                    const hours = Math.floor(diff % 86400 / 3600);
                    const mins = Math.floor(diff % 3600 / 60);
                    const secs = diff % 60;
                    if (days > 0) {
                        setCountdown(`${days}d ${hours}h ${mins}m`);
                    } else if (hours > 0) {
                        setCountdown(`${hours}h ${mins}m ${secs}s`);
                    } else if (mins > 0) {
                        setCountdown(`${mins}m ${secs}s`);
                    } else {
                        setCountdown(`${secs}s`);
                    }
                }
            }["IntentDetailDialog.useEffect.updateCountdown"];
            updateCountdown();
            const timer = setInterval(updateCountdown, 1000);
            return ({
                "IntentDetailDialog.useEffect": ()=>clearInterval(timer)
            })["IntentDetailDialog.useEffect"];
        }
    }["IntentDetailDialog.useEffect"], [
        scheduledInfo,
        open
    ]);
    if (!intent) return null;
    const periodsExecuted = scheduledInfo?.chunksExecuted ?? intent.periodsExecuted ?? periodFills.length;
    const totalPeriods = scheduledInfo?.totalChunks ?? intent.totalPeriods ?? intent.numChunks ?? 0;
    const progress = totalPeriods > 0 ? periodsExecuted / totalPeriods * 100 : 0;
    const isScheduledCompleted = scheduledInfo?.isCompleted || totalPeriods > 0 && periodsExecuted >= totalPeriods;
    const totalOutputReceived = periodFills.reduce((acc, f)=>acc + f.outputAmount, BigInt(0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                className: TYPE_COLORS[intent.intentType],
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIntentTypeDisplay"])(intent.intentType)
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Intent #",
                                    intent.id.toString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                        lineNumber: 142,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-muted-foreground",
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    className: STATUS_COLORS[intent.status],
                                    children: intent.status.replace('_', ' ').toUpperCase()
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-3 py-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg font-semibold",
                                            children: formatAmount(intent.amountIn)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: getTokenSymbol(intent.inputToken)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    className: "h-4 w-4 text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg font-semibold",
                                            children: intent.outputAmount ? formatAmount(intent.outputAmount) : '?'
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 171,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: getTokenSymbol(intent.outputToken)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this),
                        intent.filledAmount > BigInt(0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-muted-foreground",
                                    children: "Filled"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: formatAmount(intent.filledAmount)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                            lineNumber: 184,
                            columnNumber: 13
                        }, this),
                        intent.intentType === 'swap' && intent.minAmountOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-muted-foreground",
                                    children: "Min Output"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 193,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: formatAmount(intent.minAmountOut)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 194,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, this),
                        intent.intentType === 'limit_order' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                intent.limitPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted-foreground",
                                            children: "Limit Price"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 202,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: formatPrice(intent.limitPrice)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 203,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 201,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted-foreground",
                                            children: "Partial Fill"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: intent.partialFillAllowed ? 'Yes' : 'No'
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 208,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        intent.intentType === 'twap' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                intent.numChunks && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted-foreground",
                                            children: "Chunks"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 217,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                intent.chunksExecuted ?? 0,
                                                " / ",
                                                intent.numChunks
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 218,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 216,
                                    columnNumber: 17
                                }, this),
                                intent.intervalSeconds && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted-foreground",
                                            children: "Interval"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 223,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                intent.intervalSeconds,
                                                "s"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 224,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 222,
                                    columnNumber: 17
                                }, this),
                                intent.maxSlippageBps && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted-foreground",
                                            children: "Max Slippage"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 229,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                (intent.maxSlippageBps / 100).toFixed(2),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 230,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 228,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true),
                        intent.intentType === 'dca' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                totalPeriods > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "Progress"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: [
                                                        periodsExecuted,
                                                        " / ",
                                                        totalPeriods,
                                                        " periods"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 241,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                            value: progress,
                                            className: "h-2"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 245,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 240,
                                    columnNumber: 17
                                }, this),
                                !isScheduledCompleted && countdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between p-2 rounded-md bg-primary/10 border border-primary/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__["Timer"], {
                                                    className: "h-4 w-4 text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Next buy:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 252,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-primary",
                                            children: countdown
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 256,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 251,
                                    columnNumber: 17
                                }, this),
                                isScheduledCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 p-2 rounded-md bg-green-500/10 border border-green-500/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "h-4 w-4 text-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 263,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-green-600",
                                            children: [
                                                "All ",
                                                totalPeriods,
                                                " periods completed!"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 264,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 262,
                                    columnNumber: 17
                                }, this),
                                totalOutputReceived > BigInt(0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between p-2 rounded-md bg-muted/50 border border-border",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                    className: "h-4 w-4 text-green-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-muted-foreground",
                                                    children: "Accumulated:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 271,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-green-500",
                                            children: [
                                                formatAmount(totalOutputReceived),
                                                " ",
                                                getTokenSymbol(intent.outputToken)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 275,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 270,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 281,
                                    columnNumber: 15
                                }, this),
                                intent.amountPerPeriod && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted-foreground",
                                            children: "Per Period"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 285,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: formatAmount(intent.amountPerPeriod)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 286,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 284,
                                    columnNumber: 17
                                }, this),
                                intent.intervalSeconds && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted-foreground",
                                            children: "Interval"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 291,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: formatIntervalHuman(intent.intervalSeconds)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 292,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 290,
                                    columnNumber: 17
                                }, this),
                                periodFills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 299,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Period Fills:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                    lineNumber: 301,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: periodFills.map((fill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExplorerUrl"])(fill.txHash),
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "#",
                                                                        fill.periodNumber
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                                    lineNumber: 311,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                                    lineNumber: 312,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, fill.txHash, true, {
                                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                            lineNumber: 304,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                    lineNumber: 302,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 300,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                            lineNumber: 322,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-muted-foreground",
                                    children: "Created"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 326,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 328,
                                            columnNumber: 15
                                        }, this),
                                        formatTime(intent.createdAt)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 327,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                            lineNumber: 325,
                            columnNumber: 11
                        }, this),
                        intent.deadline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-muted-foreground",
                                    children: "Deadline"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 335,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: formatTime(intent.deadline)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 336,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                            lineNumber: 334,
                            columnNumber: 13
                        }, this),
                        (intent.submissionTxHash || intent.settlementTxHash) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 343,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        intent.submissionTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExplorerUrl"])(intent.submissionTxHash),
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "flex items-center justify-between text-sm hover:text-primary",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "Submission Tx"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-1 text-primary",
                                                    children: [
                                                        intent.submissionTxHash.slice(0, 8),
                                                        "...",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                            className: "h-3 w-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                            lineNumber: 355,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 346,
                                            columnNumber: 19
                                        }, this),
                                        intent.settlementTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$aptos$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExplorerUrl"])(intent.settlementTxHash),
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "flex items-center justify-between text-sm hover:text-primary",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: "Settlement Tx"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-1 text-primary",
                                                    children: [
                                                        intent.settlementTxHash.slice(0, 8),
                                                        "...",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                            className: "h-3 w-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                            lineNumber: 360,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                                    lineNumber: 344,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
            lineNumber: 140,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/intent/intent-detail-dialog.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
_s(IntentDetailDialog, "JOfj8g0Wq8bMmM3hm0qJD1c+G1o=");
_c = IntentDetailDialog;
var _c;
__turbopack_context__.k.register(_c, "IntentDetailDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/utils.ts [app-client] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("animate-pulse rounded-md bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/app/components/ui/skeleton.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Skeleton;
;
var _c;
__turbopack_context__.k.register(_c, "Skeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/intent/intent-history.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntentHistory",
    ()=>IntentHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$row$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/intent-row.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$detail$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/intent-detail-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function LoadingSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            ...Array(3)
        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 rounded-lg bg-muted/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-3 w-12"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-history.tsx",
                                    lineNumber: 25,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-4 w-32"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-history.tsx",
                                    lineNumber: 26,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/intent/intent-history.tsx",
                            lineNumber: 24,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            className: "h-5 w-16 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/intent-history.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/intent/intent-history.tsx",
                    lineNumber: 23,
                    columnNumber: 11
                }, this)
            }, i, false, {
                fileName: "[project]/app/components/intent/intent-history.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/components/intent/intent-history.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = LoadingSkeleton;
function EmptyState() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center py-8 text-muted-foreground",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                className: "h-8 w-8 mb-2 opacity-50"
            }, void 0, false, {
                fileName: "[project]/app/components/intent/intent-history.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm",
                children: "No intent history yet"
            }, void 0, false, {
                fileName: "[project]/app/components/intent/intent-history.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs mt-1",
                children: "Your submitted intents will appear here"
            }, void 0, false, {
                fileName: "[project]/app/components/intent/intent-history.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/intent/intent-history.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c1 = EmptyState;
function IntentHistory({ intents, loading, onCancel, cancellingId }) {
    _s();
    const [selectedIntent, setSelectedIntent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dialogOpen, setDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleIntentClick = (intent)=>{
        setSelectedIntent(intent);
        setDialogOpen(true);
    };
    if (loading && intents.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    className: "pb-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        className: "text-lg flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/app/components/intent/intent-history.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this),
                            "Intent History"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/intent/intent-history.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/intent/intent-history.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingSkeleton, {}, void 0, false, {
                        fileName: "[project]/app/components/intent/intent-history.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/intent/intent-history.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/intent/intent-history.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "pb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-history.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                "Intent History",
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-3 w-3 animate-spin text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/intent/intent-history.tsx",
                                    lineNumber: 78,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/intent/intent-history.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/intent-history.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: intents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {}, void 0, false, {
                            fileName: "[project]/app/components/intent/intent-history.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 max-h-[400px] overflow-y-auto",
                            children: intents.map((intent)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$row$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntentRow"], {
                                    intent: intent,
                                    onCancel: onCancel,
                                    onClick: ()=>handleIntentClick(intent),
                                    isCancelling: cancellingId === intent.id
                                }, intent.id.toString(), false, {
                                    fileName: "[project]/app/components/intent/intent-history.tsx",
                                    lineNumber: 87,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/components/intent/intent-history.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/intent/intent-history.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/intent/intent-history.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$detail$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntentDetailDialog"], {
                intent: selectedIntent,
                open: dialogOpen,
                onOpenChange: setDialogOpen
            }, void 0, false, {
                fileName: "[project]/app/components/intent/intent-history.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(IntentHistory, "XkpqeaXtZeLtVh0Oe8WybSP4C70=");
_c2 = IntentHistory;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "LoadingSkeleton");
__turbopack_context__.k.register(_c1, "EmptyState");
__turbopack_context__.k.register(_c2, "IntentHistory");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/hooks/use-user-intents.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUserIntents",
    ()=>useUserIntents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/queries.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const POLL_INTERVAL = 5000; // 5 seconds
function useUserIntents(userAddress) {
    _s();
    const [intents, setIntents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchIntents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUserIntents.useCallback[fetchIntents]": async (isInitial = false)=>{
            if (!userAddress) {
                setIntents([]);
                return;
            }
            try {
                if (isInitial) setLoading(true);
                setError(null);
                // Step 1: Get all intent IDs for this user
                const intentIds = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserIntents"])(userAddress);
                if (intentIds.length === 0) {
                    setIntents([]);
                    return;
                }
                // Step 2: Fetch event data for these intents (tx hashes, output amounts)
                // Pass userAddress to also fetch user's transactions for submission tx hashes
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchIntentEvents"])(intentIds, userAddress);
                // Step 3: Fetch each intent's details in parallel
                const intentPromises = intentIds.map({
                    "useUserIntents.useCallback[fetchIntents].intentPromises": (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIntent"])(id)
                }["useUserIntents.useCallback[fetchIntents].intentPromises"]);
                const intentResults = await Promise.all(intentPromises);
                // Step 4: Merge event data with intent records
                const validIntents = intentResults.filter({
                    "useUserIntents.useCallback[fetchIntents].validIntents": (intent)=>intent !== null
                }["useUserIntents.useCallback[fetchIntents].validIntents"]).map({
                    "useUserIntents.useCallback[fetchIntents].validIntents": (intent)=>{
                        const eventData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getIntentEventData"])(intent.id);
                        if (eventData) {
                            return {
                                ...intent,
                                submissionTxHash: eventData.submissionTxHash || intent.submissionTxHash,
                                settlementTxHash: eventData.settlementTxHash || intent.settlementTxHash,
                                outputAmount: eventData.outputAmount || intent.outputAmount
                            };
                        }
                        return intent;
                    }
                }["useUserIntents.useCallback[fetchIntents].validIntents"]).sort({
                    "useUserIntents.useCallback[fetchIntents].validIntents": (a, b)=>b.createdAt - a.createdAt
                }["useUserIntents.useCallback[fetchIntents].validIntents"]);
                setIntents(validIntents);
            } catch (err) {
                console.error('[Velox] Error fetching intents:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch intents');
            } finally{
                setLoading(false);
            }
        }
    }["useUserIntents.useCallback[fetchIntents]"], [
        userAddress
    ]);
    // Initial fetch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUserIntents.useEffect": ()=>{
            fetchIntents(true);
        }
    }["useUserIntents.useEffect"], [
        fetchIntents
    ]);
    // Poll for updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useUserIntents.useEffect": ()=>{
            if (!userAddress) return;
            const interval = setInterval({
                "useUserIntents.useEffect.interval": ()=>fetchIntents(false)
            }["useUserIntents.useEffect.interval"], POLL_INTERVAL);
            return ({
                "useUserIntents.useEffect": ()=>clearInterval(interval)
            })["useUserIntents.useEffect"];
        }
    }["useUserIntents.useEffect"], [
        userAddress,
        fetchIntents
    ]);
    return {
        intents,
        loading,
        error,
        refetch: ()=>fetchIntents(false)
    };
}
_s(useUserIntents, "kZUoq0XuFM9v6eFxw86ArIiFgCk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/hooks/use-wallet-context-native.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWalletContextNative",
    ()=>useWalletContextNative
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/wallet-adapter-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useWalletContextNative() {
    _s();
    const { account, connected, signAndSubmitTransaction: nativeSignAndSubmit } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useWallet"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useWalletContextNative.useMemo": ()=>{
            const isNativeConnected = connected && !!account?.address;
            const walletAddress = isNativeConnected ? account?.address.toString() : null;
            return {
                walletAddress,
                isPrivy: false,
                isConnected: isNativeConnected,
                isReady: true,
                signRawHash: null,
                publicKeyHex: null,
                signAndSubmitTransaction: isNativeConnected ? nativeSignAndSubmit : null
            };
        }
    }["useWalletContextNative.useMemo"], [
        connected,
        account,
        nativeSignAndSubmit
    ]);
}
_s(useWalletContextNative, "TbRRrMudyhOQmr5m6w8Kom7LaMg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useWallet"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/home/WalletOnlyHome.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WalletOnlyHome
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@aptos-labs/wallet-adapter-react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$LoginPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/LoginPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$layout$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/layout/header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$layout$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/layout/footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/intent-tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$active$2d$intents$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/active-intents.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$history$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/intent/intent-history.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$user$2d$intents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/use-user-intents.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2d$native$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/use-wallet-context-native.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/hooks/use-wallet-context.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/velox/transactions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/toast.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
function WalletOnlyHome() {
    _s();
    const { account, connected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useWallet"])();
    const [movementAddress, setMovementAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [cancellingId, setCancellingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const walletContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2d$native$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContextNative"])();
    const { intents, loading: intentsLoading, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$user$2d$intents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserIntents"])(movementAddress);
    const handleIntentSuccess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WalletOnlyHome.useCallback[handleIntentSuccess]": (txHash)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showTxSuccess"])('Intent submitted successfully!', txHash);
            refetch();
        }
    }["WalletOnlyHome.useCallback[handleIntentSuccess]"], [
        refetch
    ]);
    const handleIntentError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WalletOnlyHome.useCallback[handleIntentError]": (error)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showError"])('Transaction failed', error);
        }
    }["WalletOnlyHome.useCallback[handleIntentError]"], []);
    const handleCancelIntent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WalletOnlyHome.useCallback[handleCancelIntent]": async (intentId)=>{
            if (!walletContext.walletAddress || !walletContext.signAndSubmitTransaction) return;
            setCancellingId(intentId);
            try {
                const txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$velox$2f$transactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancelIntentNative"])(walletContext.walletAddress, intentId, walletContext.signAndSubmitTransaction);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showTxSuccess"])('Intent cancelled', txHash);
                refetch();
            } catch (err) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showError"])('Cancel failed', err instanceof Error ? err.message : 'Failed to cancel');
            } finally{
                setCancellingId(null);
            }
        }
    }["WalletOnlyHome.useCallback[handleCancelIntent]"], [
        walletContext,
        refetch
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WalletOnlyHome.useEffect": ()=>{
            if (connected && account?.address) {
                setMovementAddress(account.address.toString());
            }
        }
    }["WalletOnlyHome.useEffect"], [
        connected,
        account
    ]);
    if (!connected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$LoginPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
            lineNumber: 60,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletContextContext"].Provider, {
        value: walletContext,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex flex-col bg-background text-foreground",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$layout$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
                    address: movementAddress
                }, void 0, false, {
                    fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl md:text-3xl font-bold mb-2",
                                                children: "Intent-Based Trading"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                                                lineNumber: 71,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-muted-foreground text-sm md:text-base",
                                                children: "Submit your swap intent and let solvers compete for the best execution"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                                                lineNumber: 72,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntentTabs"], {
                                            onSuccess: handleIntentSuccess,
                                            onError: handleIntentError
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                                            lineNumber: 77,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden lg:block",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$active$2d$intents$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActiveIntents"], {
                                            intents: intents,
                                            loading: intentsLoading,
                                            onCancel: handleCancelIntent,
                                            cancellingId: cancellingId
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                                            lineNumber: 80,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-1 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "lg:hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$active$2d$intents$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActiveIntents"], {
                                            intents: intents,
                                            loading: intentsLoading,
                                            onCancel: handleCancelIntent,
                                            cancellingId: cancellingId
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                                            lineNumber: 90,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$intent$2f$intent$2d$history$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntentHistory"], {
                                        intents: intents,
                                        loading: intentsLoading,
                                        onCancel: handleCancelIntent,
                                        cancellingId: cancellingId
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$layout$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                    fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/home/WalletOnlyHome.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(WalletOnlyHome, "3hNSJp2iF0cS3TSr9FawtXbE1l0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aptos$2d$labs$2f$wallet$2d$adapter$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useWallet"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$wallet$2d$context$2d$native$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletContextNative"],
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$use$2d$user$2d$intents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserIntents"]
    ];
});
_c = WalletOnlyHome;
var _c;
__turbopack_context__.k.register(_c, "WalletOnlyHome");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/home/WalletOnlyHome.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/components/home/WalletOnlyHome.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_000984a9._.js.map