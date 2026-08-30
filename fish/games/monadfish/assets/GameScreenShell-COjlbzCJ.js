import { j as jsxRuntimeExports, H as HIGH_FETCH_PRIORITY_PROPS, a as CoinIcon } from "./index-DPq5UnH7.js";
const DEFAULT_OVERLAY = "bg-[radial-gradient(circle_at_50%_0%,rgba(124,92,255,0.26),transparent_34%),linear-gradient(180deg,rgba(16,16,44,0.45)_0%,rgba(8,9,20,0.50)_48%,rgba(5,7,13,0.65)_100%)]";
const DEFAULT_SHELL_PADDING = "px-3 pb-[calc(var(--bottom-nav-clearance,6rem)+1rem)] pt-3 sm:px-6 sm:pt-5";
const GameScreenShell = ({
  title,
  subtitle,
  coins,
  backgroundImage,
  backgroundFit = "cover",
  overlayClassName = DEFAULT_OVERLAY,
  contentScrollable = false,
  headerHidden = false,
  shellPaddingClassName = DEFAULT_SHELL_PADDING,
  contentWrapperClassName,
  children
}) => {
  const resolvedContentWrapperClassName = contentWrapperClassName ?? `mx-auto ${headerHidden ? "mt-0 max-w-none" : "mt-4 max-w-5xl sm:mt-6"} min-h-0 w-full flex-1 ${contentScrollable ? "overflow-y-auto overscroll-contain pr-1" : "overflow-hidden"}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "absolute inset-0 overflow-hidden bg-[#080914] text-white", children: [
    backgroundImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: backgroundImage,
        alt: "",
        "aria-hidden": "true",
        decoding: "async",
        ...HIGH_FETCH_PRIORITY_PROPS,
        className: `absolute inset-0 h-full w-full ${backgroundFit === "contain" ? "object-contain" : "object-cover"}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `pointer-events-none absolute inset-0 ${overlayClassName}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative z-10 flex h-full flex-col ${shellPaddingClassName}`, children: [
      !headerHidden && /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mx-auto flex w-full max-w-5xl items-start justify-between gap-3 rounded-xl border border-cyan-300/15 bg-black/65 px-3 py-2.5 shadow-xl shadow-black/30 backdrop-blur-md sm:px-4 sm:py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate text-2xl font-black tracking-normal text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] sm:text-4xl", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-2xl text-sm font-semibold text-cyan-50/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)] sm:text-base", children: subtitle })
        ] }),
        typeof coins === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-cyan-300/20 bg-black/70 px-3 text-sm font-bold text-cyan-100 backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoinIcon, { size: "md" }),
          coins.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: resolvedContentWrapperClassName, children })
    ] })
  ] });
};
export {
  GameScreenShell as G
};
