import { d as createLucideIcon, j as jsxRuntimeExports, p as publicAsset, T as Trophy, f as ChefHat, L as Lock } from "./index-BS_fjQJr.js";
import { G as GameScreenShell } from "./GameScreenShell-D0OeBHwl.js";
import { G as GrillScoreInfoButton } from "./GrillScoreInfoButton-DGoEgkGx.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wallet = createLucideIcon("Wallet", [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
]);
const LeaderboardScreen = ({
  coins,
  grillScore,
  entries,
  currentPlayerId,
  isConnected,
  walletAddress,
  nickname
}) => {
  const shortWallet = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "";
  const currentEntry = entries.find((entry) => entry.id === currentPlayerId);
  const displayName = (currentEntry == null ? void 0 : currentEntry.name) || nickname || shortWallet || "Guest griller";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GameScreenShell,
    {
      title: "Leaderboard",
      subtitle: "Grill score board. Cook a dish and climb the shared table.",
      coins,
      backgroundImage: publicAsset("assets/bg_leaderboard.jpg"),
      contentScrollable: true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[24px] border border-yellow-300/35 bg-[linear-gradient(180deg,rgba(7,14,35,0.88),rgba(7,22,52,0.84))] p-3 shadow-[0_0_0_1px_rgba(250,204,21,0.1),0_24px_70px_rgba(3,8,24,0.6)] backdrop-blur-md sm:p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[20px] border border-cyan-300/20 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.14),transparent_30%),linear-gradient(180deg,rgba(11,22,56,0.92),rgba(7,16,39,0.88))] p-3 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.08)] sm:p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 rounded-[18px] border border-yellow-300/35 bg-[linear-gradient(180deg,rgba(81,45,10,0.96),rgba(35,18,6,0.98))] px-4 py-3 shadow-[0_0_24px_rgba(250,204,21,0.16),inset_0_0_0_1px_rgba(253,224,71,0.12)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-yellow-200/40 bg-[linear-gradient(180deg,#facc15,#d97706)] text-slate-950 shadow-[0_0_18px_rgba(250,204,21,0.3)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "truncate text-2xl font-black text-yellow-100 drop-shadow-[0_2px_12px_rgba(250,204,21,0.28)] sm:text-3xl", children: "Top grillers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-yellow-100/70", children: "Shared leaderboard" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-yellow-200/35 bg-black/45 px-3 text-sm font-black text-yellow-100 shadow-[0_0_18px_rgba(250,204,21,0.12)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "h-4 w-4" }),
            entries.length
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 pb-1 lg:grid-cols-[0.8fr_1.2fr] lg:items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-[18px] border border-yellow-300/20 bg-[linear-gradient(180deg,rgba(12,20,52,0.96),rgba(8,11,26,0.95))] p-4 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.12),0_0_24px_rgba(56,189,248,0.08)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-200/30 bg-[linear-gradient(180deg,rgba(7,24,57,0.95),rgba(5,10,28,0.95))] text-cyan-100 shadow-[0_0_18px_rgba(56,189,248,0.18)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-4xl font-black text-yellow-100", children: grillScore.toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-cyan-50/75", children: "your grill score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(GrillScoreInfoButton, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-[16px] border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(8,12,28,0.95),rgba(7,20,48,0.88))] p-4 text-sm text-zinc-200 shadow-[0_0_18px_rgba(56,189,248,0.1)]", children: currentEntry ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-base font-black text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-yellow-300" }),
                displayName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-sm text-zinc-300", children: [
                currentEntry.dishes,
                " dishes cooked"
              ] })
            ] }) : isConnected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-bold text-cyan-50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4 text-yellow-300" }),
                "Ready to publish as ",
                displayName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-zinc-300", children: "Cook one dish and your score goes live on the board under your saved player name. Use the info button by your score to see how score share could be interpreted if the token launches later." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-bold text-cyan-50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-yellow-300" }),
                "Board entry unlocks after your first dish"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-zinc-300", children: "Wallet is optional. Guest grillers still appear on the board, and the score info button explains the future token-share idea without making promises." })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-[18px] border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(10,22,58,0.95),rgba(7,12,29,0.96))] p-3 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.12),0_0_32px_rgba(59,130,246,0.08)] sm:p-4", children: entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[280px] flex-col items-center justify-center rounded-[16px] border border-cyan-300/18 bg-[linear-gradient(180deg,rgba(5,10,24,0.95),rgba(12,28,66,0.9))] p-6 text-center shadow-[0_0_24px_rgba(56,189,248,0.08)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-12 w-12 text-yellow-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-2xl font-black text-yellow-100", children: "No grillers yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-md text-sm text-zinc-300", children: "Cook your first dish and your score will appear here." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: entries.slice(0, 25).map((entry, index) => {
            const isCurrent = entry.id === currentPlayerId;
            const wallet = entry.walletAddress ? `${entry.walletAddress.slice(0, 6)}...${entry.walletAddress.slice(-4)}` : "local player";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "article",
              {
                className: `grid grid-cols-[3rem_1fr_auto] items-center gap-3 rounded-[16px] border p-3 sm:p-4 ${isCurrent ? "border-cyan-300/35 bg-[linear-gradient(180deg,rgba(11,22,56,0.96),rgba(9,34,77,0.92))] shadow-[0_0_24px_rgba(56,189,248,0.18)]" : "border-yellow-300/15 bg-[linear-gradient(180deg,rgba(9,14,34,0.95),rgba(10,18,42,0.88))] shadow-[0_0_18px_rgba(250,204,21,0.06)]"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex h-11 w-11 items-center justify-center rounded-xl border text-base font-black ${isCurrent ? "border-cyan-200/35 bg-black/45 text-cyan-100" : "border-yellow-200/20 bg-black/40 text-yellow-100"}`, children: [
                    "#",
                    index + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate text-xl font-black text-white", children: [
                      entry.name,
                      isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-sm font-black text-cyan-100", children: "YOU" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 truncate text-sm text-zinc-300", children: [
                      entry.dishes,
                      " dishes - ",
                      wallet
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-black text-yellow-100", children: entry.score.toLocaleString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-zinc-300", children: "score" })
                  ] })
                ]
              },
              entry.id
            );
          }) }) })
        ] })
      ] }) })
    }
  );
};
export {
  LeaderboardScreen as default
};
