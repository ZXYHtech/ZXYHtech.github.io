import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, S as Sparkles, C as Card } from "./index-DPq5UnH7.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Box = createLucideIcon("Box", [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
]);
const prizeLabel = (prize) => {
  if (!prize) return "未知奖励";
  if (prize.label) return String(prize.label);
  if (prize.coins) return `${prize.coins} 金币`;
  if (prize.bait) return `${prize.bait} 鱼饵`;
  if (prize.fishId) return `鱼获：${prize.fishId}`;
  if (prize.rodLevel != null) return `鱼竿等级 ${prize.rodLevel}`;
  return "神秘奖励";
};
const WheelScreen = ({
  coins = 0,
  availableRolls = 0,
  dailyWheelRolls = 0,
  paidWheelRolls = 0,
  onRequestRoll,
  onResolveReward,
  onOpenTasks,
  onSpinStartSound,
  onRevealSound,
  onRewardSound
}) => {
  const [busy, setBusy] = reactExports.useState(false);
  const [lastPrize, setLastPrize] = reactExports.useState(null);
  const localRolls = Math.max(0, Number(availableRolls || 0));
  const spin = async () => {
    if (busy || localRolls <= 0) return;
    setBusy(true);
    setLastPrize(null);
    try {
      onSpinStartSound == null ? void 0 : onSpinStartSound();
      const roll = await (onRequestRoll == null ? void 0 : onRequestRoll());
      if (!(roll == null ? void 0 : roll.prize)) return;
      onRevealSound == null ? void 0 : onRevealSound();
      const resolved = await (onResolveReward == null ? void 0 : onResolveReward(roll.prize, roll.id));
      setLastPrize(resolved || roll.prize);
      onRewardSound == null ? void 0 : onRewardSound();
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto bg-[#05060b] px-4 pb-28 pt-6 text-zinc-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-[75vh] w-full max-w-2xl flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-[0.2em] text-violet-200/75", children: "本地奖励玩法" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-3xl font-black", children: "幸运魔方" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-md text-center text-sm leading-6 text-zinc-400", children: "使用游戏内获得的免费次数抽取奖励。中文版已移除连接钱包和付费购买额外次数。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-8 flex h-44 w-44 items-center justify-center rounded-[2rem] border border-violet-300/35 bg-[radial-gradient(circle_at_35%_30%,rgba(167,139,250,.5),rgba(17,24,39,.95)_62%)] shadow-[0_20px_70px_rgba(124,58,237,.25)] ${busy ? "animate-pulse" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: `h-20 w-20 text-violet-100 ${busy ? "animate-spin" : ""}` }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-2 text-xs font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-cyan-300/20 bg-black/70 px-3 py-1.5", children: [
        "可用次数：",
        localRolls
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-amber-300/20 bg-black/70 px-3 py-1.5", children: [
        "金币：",
        coins
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: spin, disabled: busy || localRolls <= 0, className: "mt-5 min-h-12 min-w-44 rounded-2xl bg-violet-300 px-7 text-base font-black text-black hover:bg-violet-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mr-2 h-5 w-5" }),
      busy ? "魔方转动中…" : localRolls > 0 ? "转动魔方" : "暂无可用次数"
    ] }),
    lastPrize && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-5 w-full max-w-sm border-cyan-300/20 bg-black/75 p-5 text-center text-zinc-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-[0.16em] text-cyan-200/70", children: "本次奖励" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xl font-black text-cyan-100", children: prizeLabel(lastPrize) })
    ] }),
    localRolls <= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onOpenTasks, variant: "outline", className: "mt-4 rounded-xl border-cyan-300/20 bg-black text-cyan-100 hover:bg-zinc-950", children: "去任务页获取游戏内次数" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-center text-xs text-zinc-600", children: [
      "上游字段中的 paidWheelRolls=",
      Number(paidWheelRolls || 0),
      " 不用于中文版购买入口；dailyWheelRolls=",
      Number(dailyWheelRolls || 0),
      "。"
    ] })
  ] }) });
};
export {
  WheelScreen as default
};
