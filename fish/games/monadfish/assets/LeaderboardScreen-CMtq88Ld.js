import { j as jsxRuntimeExports, T as Trophy, f as ChefHat } from "./index-BS_fjQJr.js";
import { G as GrillScoreInfoButton } from "./GrillScoreInfoButton-DGoEgkGx.js";
const LeaderboardScreen=({coins=0,grillScore=0,entries=[],currentPlayerId,nickname})=>{
  const currentEntry=entries.find(entry=>entry.id===currentPlayerId);
  const displayName=(currentEntry==null?void 0:currentEntry.name)||nickname||"游客厨师";
  return /* @__PURE__ */jsxRuntimeExports.jsx("div",{className:"h-full overflow-y-auto bg-[#071027] px-4 pb-28 pt-5 text-zinc-100",children:/* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"mx-auto w-full max-w-4xl",children:[
    /* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"mb-4 flex items-end justify-between gap-3",children:[
      /* @__PURE__ */jsxRuntimeExports.jsxs("div",{children:[/* @__PURE__ */jsxRuntimeExports.jsx("p",{className:"text-xs font-black uppercase tracking-[0.18em] text-yellow-200/70",children:"料理挑战"}),/* @__PURE__ */jsxRuntimeExports.jsx("h2",{className:"text-2xl font-black text-yellow-100",children:"烧烤排行榜"}),/* @__PURE__ */jsxRuntimeExports.jsx("p",{className:"mt-1 text-sm text-zinc-400",children:"制作料理获得积分，挑战更高名次。"})]}),
      /* @__PURE__ */jsxRuntimeExports.jsxs("span",{className:"rounded-full border border-amber-300/20 bg-black/55 px-3 py-1.5 text-xs font-bold text-amber-100",children:[coins," 金币"]})
    ]}),
    /* @__PURE__ */jsxRuntimeExports.jsx("div",{className:"grid gap-3 lg:grid-cols-[0.78fr_1.22fr]",children:/* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment,{children:[
      /* @__PURE__ */jsxRuntimeExports.jsxs("aside",{className:"rounded-2xl border border-cyan-300/20 bg-black/45 p-4 shadow-xl",children:[
        /* @__PURE__ */jsxRuntimeExports.jsx("div",{className:"inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-300 text-black",children:/* @__PURE__ */jsxRuntimeExports.jsx(Trophy,{className:"h-6 w-6"})}),
        /* @__PURE__ */jsxRuntimeExports.jsx("div",{className:"mt-4 text-4xl font-black text-yellow-100",children:Number(grillScore||0).toLocaleString()}),
        /* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"mt-1 inline-flex items-center gap-2 text-sm text-zinc-300",children:["你的烧烤积分",/* @__PURE__ */jsxRuntimeExports.jsx(GrillScoreInfoButton,{})]}),
        /* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"mt-4 rounded-xl border border-cyan-300/15 bg-[#08152d] p-3",children:[/* @__PURE__ */jsxRuntimeExports.jsx("b",{className:"text-cyan-100",children:displayName}),/* @__PURE__ */jsxRuntimeExports.jsx("p",{className:"mt-1 text-xs text-zinc-400",children:currentEntry?`已制作 ${Number(currentEntry.dishes||0)} 道料理`:"完成第一道料理后进入排行榜。"})]})
      ]}),
      /* @__PURE__ */jsxRuntimeExports.jsx("section",{className:"rounded-2xl border border-yellow-300/15 bg-black/45 p-3 shadow-xl sm:p-4",children:entries.length===0?/* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"flex min-h-[260px] flex-col items-center justify-center text-center",children:[/* @__PURE__ */jsxRuntimeExports.jsx(Trophy,{className:"h-12 w-12 text-yellow-300"}),/* @__PURE__ */jsxRuntimeExports.jsx("h3",{className:"mt-4 text-xl font-black text-yellow-100",children:"还没有排行记录"}),/* @__PURE__ */jsxRuntimeExports.jsx("p",{className:"mt-2 text-sm text-zinc-400",children:"完成第一道料理后，你的积分会显示在这里。"})]}):/* @__PURE__ */jsxRuntimeExports.jsx("div",{className:"grid gap-2",children:entries.slice(0,25).map((entry,index)=>{
        const isCurrent=entry.id===currentPlayerId;
        return /* @__PURE__ */jsxRuntimeExports.jsxs("article",{className:`grid grid-cols-[2.7rem_1fr_auto] items-center gap-3 rounded-xl border p-3 ${isCurrent?"border-cyan-300/35 bg-cyan-950/35":"border-yellow-300/12 bg-[#081229]"}`,children:[
          /* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"flex h-10 w-10 items-center justify-center rounded-lg bg-black/45 font-black text-yellow-100",children:["#",index+1]}),
          /* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"min-w-0",children:[/* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"truncate font-black text-white",children:[entry.name||"玩家",isCurrent&&/* @__PURE__ */jsxRuntimeExports.jsx("span",{className:"ml-2 text-xs text-cyan-200",children:"你"})]}),/* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"mt-1 text-xs text-zinc-400",children:[Number(entry.dishes||0)," 道料理"]})]}),
          /* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"text-right",children:[/* @__PURE__ */jsxRuntimeExports.jsx("div",{className:"text-xl font-black text-yellow-100",children:Number(entry.score||0).toLocaleString()}),/* @__PURE__ */jsxRuntimeExports.jsx("div",{className:"text-[10px] text-zinc-500",children:"积分"})]})
        ]},entry.id||index);
      })})})
    ]})}),
    /* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500",children:[/* @__PURE__ */jsxRuntimeExports.jsx(ChefHat,{className:"h-4 w-4"}),"尝试不同菜谱，可以更快积累烧烤积分。"]})
  ]})});
};
export { LeaderboardScreen as default };
