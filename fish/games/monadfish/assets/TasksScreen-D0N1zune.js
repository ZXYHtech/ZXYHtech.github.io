import { j as jsxRuntimeExports, C as Card, B as Button } from "./index-DPq5UnH7.js";
const taskTitle = (task, index) => (task == null ? void 0 : task.title) || (task == null ? void 0 : task.name) || (task == null ? void 0 : task.label) || `任务 ${index + 1}`;
const taskDescription = (task) => (task == null ? void 0 : task.description) || (task == null ? void 0 : task.desc) || (task == null ? void 0 : task.requirement) || "";
const taskStatus = (task) => String((task == null ? void 0 : task.status) || "").toLowerCase();
const TasksScreen = (props) => {
  const daily = Array.isArray(props.dailyTasks) ? props.dailyTasks : [];
  const special = Array.isArray(props.specialTasks) ? props.specialTasks : [];
  const weekly = props.weeklyMissionsEnabled && Array.isArray(props.weeklyMissions) ? props.weeklyMissions : [];
  const localTasks = [...daily, ...special, ...weekly];
  const claim = (task) => {
    var _a, _b;
    const id = task == null ? void 0 : task.id;
    if (!id) return;
    if (weekly.includes(task)) (_a = props.onClaimWeeklyMission) == null ? void 0 : _a.call(props, id);
    else (_b = props.onClaimTask) == null ? void 0 : _b.call(props, id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto bg-[#05060b] px-4 pb-28 pt-5 text-zinc-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-[0.18em] text-cyan-200/70", children: "本地成长" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-1 text-2xl font-black", children: "任务" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-sm leading-6 text-zinc-400", children: "完成钓鱼与成长任务获取游戏内奖励。钱包签到、链上转账和 MON 支付任务已从中文版移除。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: localTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-cyan-300/15 bg-black/65 p-5 text-center text-zinc-300", children: "当前没有可显示的本地任务，先去钓几条鱼吧。" }) : localTasks.map((task, index) => {
      const status = taskStatus(task);
      const completed = ["completed", "claimed", "done"].includes(status) || (task == null ? void 0 : task.claimed) === true;
      const claimable = (task == null ? void 0 : task.canClaim) === true || ["claimable", "ready"].includes(status);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-cyan-300/15 bg-black/65 p-4 text-zinc-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "block text-base text-cyan-100", children: taskTitle(task, index) }),
          taskDescription(task) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-6 text-zinc-400", children: taskDescription(task) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-zinc-500", children: [
            "状态：",
            completed ? "已完成" : claimable ? "可领取" : "进行中"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !claimable || completed, onClick: () => claim(task), className: "shrink-0 rounded-xl bg-cyan-300 text-black hover:bg-cyan-200", children: completed ? "已领取" : claimable ? "领取" : "进行中" })
      ] }) }, (task == null ? void 0 : task.id) || index);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: props.onOpenFish, variant: "outline", className: "mt-4 w-full rounded-xl border-cyan-300/20 bg-black text-cyan-100 hover:bg-zinc-950", children: "返回钓鱼" })
  ] }) });
};
export {
  TasksScreen as default
};
