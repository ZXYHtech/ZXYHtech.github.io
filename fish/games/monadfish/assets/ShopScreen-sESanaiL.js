import { R as ROD_DATA, j as jsxRuntimeExports, a as CoinIcon, W as Worm, C as Card, b as BAIT_PACKAGES, B as Button, c as Coins } from "./index-DPq5UnH7.js";
const ShopScreen = ({ coins = 0, bait = 0, dailyFreeBait = 0, rodLevel = 0, onBuyBait, onBuyRod }) => {
  const totalBait = Math.max(0, Number(bait || 0)) + Math.max(0, Number(dailyFreeBait || 0));
  const rods = ROD_DATA.filter((rod) => rod.level > 0 && Number(rod.coinCost || 0) > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto bg-[#05060b] px-4 pb-28 pt-5 text-zinc-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-[0.18em] text-cyan-200/70", children: "本地商店" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black", children: "商店" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 text-xs font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full border border-amber-300/20 bg-black/70 px-3 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CoinIcon, { size: "sm" }),
          " ",
          coins,
          " 金币"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full border border-cyan-300/20 bg-black/70 px-3 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Worm, { className: "h-4 w-4" }),
          " ",
          totalBait,
          " 鱼饵"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-4 border-cyan-300/15 bg-black/65 p-4 text-zinc-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-lg font-black text-cyan-100", children: "购买鱼饵" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: BAIT_PACKAGES.map((pack, index) => {
        const amount = Number(pack.amount ?? pack.bait ?? pack.quantity ?? 0);
        const cost = Number(pack.cost ?? pack.coinCost ?? pack.coins ?? 0);
        const disabled = amount <= 0 || cost <= 0 || coins < cost;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled, onClick: () => onBuyBait == null ? void 0 : onBuyBait(amount, cost), className: "h-auto min-h-14 justify-between rounded-xl border border-cyan-300/15 bg-zinc-950 px-4 text-left hover:bg-zinc-900", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { className: "block text-cyan-100", children: [
              amount || "?",
              " 个鱼饵"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "text-zinc-400", children: "补充抛竿资源" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 font-black text-amber-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-4 w-4" }),
            cost || "?"
          ] })
        ] }, pack.id || index);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-cyan-300/15 bg-black/65 p-4 text-zinc-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-lg font-black text-cyan-100", children: "升级鱼竿" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: rods.map((rod) => {
        const cost = Number(rod.coinCost || 0);
        const owned = rod.level <= rodLevel;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "block", children: rod.name || `鱼竿 Lv.${rod.level}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { className: "text-zinc-400", children: [
              "等级 ",
              rod.level
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: owned || coins < cost, onClick: () => onBuyRod == null ? void 0 : onBuyRod(rod.level, cost), className: "rounded-xl bg-cyan-300 text-black hover:bg-cyan-200", children: owned ? "已拥有" : `${cost} 金币` })
        ] }, rod.id || rod.level);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-xs text-zinc-500", children: "中文版 Lite 已移除钱包、MON 支付、充值和提现入口。" })
  ] }) });
};
export {
  ShopScreen as default
};
