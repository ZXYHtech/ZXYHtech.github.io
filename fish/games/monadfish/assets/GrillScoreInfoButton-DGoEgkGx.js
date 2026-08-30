import { j as jsxRuntimeExports, P as Popover, h as PopoverTrigger, i as cn, k as PopoverContent } from "./index-BS_fjQJr.js";
const GrillScoreInfoButton = ({ className, contentClassName, side = "top" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
    type: "button",
    "aria-label": "烧烤积分说明",
    className: cn("inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#c79a57]/80 bg-[rgba(22,14,9,0.92)] text-[11px] font-black leading-none text-[#f8e8bf] shadow-[0_6px_12px_rgba(0,0,0,0.24)] transition-colors duration-200 hover:border-[#f3c777] hover:text-[#fff2cc]", className),
    children: "i"
  }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, {
    side,
    align: "center",
    className: cn("w-[min(20rem,calc(100vw-2rem))] rounded-[1rem] border border-[#8f6a38] bg-[linear-gradient(180deg,rgba(29,19,12,0.98),rgba(18,12,8,0.98))] p-3 text-[#f8e8bf] shadow-[0_18px_40px_rgba(0,0,0,0.42)]", contentClassName),
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#f3c777]", children: "烧烤积分说明" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-5 text-[#f8e8bf]/86", children: "制作料理会获得烧烤积分，不同菜谱提供的积分不同。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[0.8rem] border border-[#6f4928] bg-[rgba(11,7,5,0.72)] px-3 py-2 text-sm font-semibold text-[#fff0c5]", children: "料理越丰富，累计积分越高。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-5 text-[#f8e8bf]/78", children: "烧烤积分用于排行榜比较，也能记录你的料理成长进度。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-5 text-[#f8e8bf]/60", children: "建议先收集不同鱼种，再解锁更多菜谱组合。" })
    ] })
  })
] });
export { GrillScoreInfoButton as G };
