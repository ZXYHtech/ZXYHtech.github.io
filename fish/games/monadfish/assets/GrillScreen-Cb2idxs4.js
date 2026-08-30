import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, p as publicAsset, e as RecipeGrillIcon, S as Sparkles, f as ChefHat, G as GRILL_RECIPES, T as Trophy, F as FISH_DATA, g as FishIcon, B as Button } from "./index-BS_fjQJr.js";
import { G as GameScreenShell } from "./GameScreenShell-D0OeBHwl.js";
import { G as GrillScoreInfoButton } from "./GrillScoreInfoButton-DGoEgkGx.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Flame = createLucideIcon("Flame", [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
]);
const BOARD_ASPECTS = {
  desktop: 1536 / 1024,
  mobile: 853 / 1844
};
const BOARD_VIEWPORT = {
  desktop: {
    left: "12.75%",
    right: "12.75%",
    top: "16.1%",
    bottom: "8.8%"
  },
  mobile: {
    left: "17.8%",
    right: "17.8%",
    top: "15.1%",
    bottom: "11.6%"
  }
};
const QuestBoard = ({
  layout = "desktop",
  children,
  header,
  footer,
  headerPlacement = "fixed",
  footerPlacement = "fixed",
  viewportInsets
}) => {
  const isMobile = layout === "mobile";
  const containerRef = reactExports.useRef(null);
  const [containerSize, setContainerSize] = reactExports.useState({ width: 0, height: 0 });
  reactExports.useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const updateSize = () => {
      const rect = node.getBoundingClientRect();
      setContainerSize({
        width: rect.width,
        height: rect.height
      });
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(node);
    window.addEventListener("resize", updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  const coverStage = reactExports.useMemo(() => {
    if (!containerSize.width || !containerSize.height) return null;
    const sourceAspect = BOARD_ASPECTS[layout];
    const containerAspect = containerSize.width / containerSize.height;
    if (containerAspect > sourceAspect) {
      return {
        width: containerSize.width,
        height: containerSize.width / sourceAspect
      };
    }
    return {
      width: containerSize.height * sourceAspect,
      height: containerSize.height
    };
  }, [containerSize, layout]);
  const viewport = {
    ...BOARD_VIEWPORT[layout],
    ...(viewportInsets == null ? void 0 : viewportInsets[layout]) ?? {}
  };
  const headerInline = headerPlacement === "inline";
  const footerInline = footerPlacement === "inline";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "relative h-full w-full", children: coverStage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
      style: {
        width: coverStage.width,
        height: coverStage.height
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute",
          style: {
            left: viewport.left,
            right: viewport.right,
            top: viewport.top,
            bottom: viewport.bottom
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-auto flex h-full min-h-0 flex-col", children: [
            !headerInline && header ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: isMobile ? "shrink-0 pb-3" : "shrink-0 pb-4", children: header }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain ${isMobile ? "pr-1" : "pr-2"} [touch-action:pan-y]`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: isMobile ? "flex min-h-full flex-col gap-2.5" : "flex min-h-full flex-col gap-3", children: [
              headerInline && header ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: header }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0", children }),
              footerInline && footer ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: footer }) : null
            ] }) }),
            !footerInline && footer ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 pt-3", children: footer }) : null
          ] })
        }
      )
    }
  ) }) });
};
const QuestBoardCard = ({ children, className = "" }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "article",
    {
      className: `relative flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[1.05rem] border border-[#725130] bg-[linear-gradient(180deg,rgba(38,25,16,0.95)_0%,rgba(31,21,14,0.92)_100%)] p-2.5 text-[#f0d09b] shadow-[inset_0_0_0_1px_rgba(255,215,150,0.06),0_12px_24px_rgba(0,0,0,0.34)] transition-colors duration-200 hover:border-[#9d7141] md:min-h-[13.75rem] md:rounded-[1.7rem] md:p-4 ${className}`,
      children
    }
  );
};
const COOKING_ANIMATION_MS = 1650;
const COOKING_RESULT_MS = 2300;
const inventoryCount = (inventory, fishId) => {
  var _a;
  return ((_a = inventory.find((item) => item.fishId === fishId)) == null ? void 0 : _a.quantity) ?? 0;
};
const GrillScreen = ({ inventory, onCook, onCookStartSound }) => {
  const [cookPhase, setCookPhase] = reactExports.useState("idle");
  const [activeRecipe, setActiveRecipe] = reactExports.useState(null);
  const [cookProgress, setCookProgress] = reactExports.useState(0);
  const [isMobileLayout, setIsMobileLayout] = reactExports.useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const cookingTimerRef = reactExports.useRef(null);
  const resultTimerRef = reactExports.useRef(null);
  const cookingLocked = cookPhase !== "idle";
  reactExports.useEffect(() => () => {
    if (cookingTimerRef.current) window.clearTimeout(cookingTimerRef.current);
    if (resultTimerRef.current) window.clearTimeout(resultTimerRef.current);
  }, []);
  reactExports.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event) => setIsMobileLayout(event.matches);
    setIsMobileLayout(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  const boardViewportInsets = isMobileLayout ? {
    mobile: {
      left: "16.4%",
      right: "16.4%",
      top: "16.0%",
      bottom: "18.6%"
    }
  } : {
    desktop: {
      left: "13.4%",
      right: "13.2%",
      top: "18.4%",
      bottom: "12.4%"
    }
  };
  const startCooking = (recipe) => {
    if (cookingLocked) return;
    if (cookingTimerRef.current) window.clearTimeout(cookingTimerRef.current);
    if (resultTimerRef.current) window.clearTimeout(resultTimerRef.current);
    setActiveRecipe(recipe);
    setCookPhase("cooking");
    setCookProgress(0);
    onCookStartSound == null ? void 0 : onCookStartSound();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setCookProgress(100));
    });
    cookingTimerRef.current = window.setTimeout(() => {
      void (async () => {
        const cooked = await onCook(recipe);
        if (!cooked) {
          setCookPhase("idle");
          setActiveRecipe(null);
          setCookProgress(0);
          return;
        }
        setCookPhase("result");
        setCookProgress(0);
        resultTimerRef.current = window.setTimeout(() => {
          setCookPhase("idle");
          setActiveRecipe(null);
        }, COOKING_RESULT_MS);
      })();
    }, COOKING_ANIMATION_MS);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GameScreenShell,
    {
      title: "Grill",
      subtitle: "Cook fish into grill stuff. Score goes to the leaderboard, and everything is saved in Inventory -> Grill Stuff for later selling.",
      backgroundImage: isMobileLayout ? publicAsset("assets/grill_board_mobile_reference.webp") : publicAsset("assets/grill_board_reference.webp"),
      backgroundFit: "cover",
      overlayClassName: "bg-[linear-gradient(180deg,rgba(8,6,3,0.14)_0%,rgba(10,8,5,0.18)_48%,rgba(6,5,3,0.24)_100%)]",
      headerHidden: true,
      shellPaddingClassName: "px-0 pb-[calc(var(--bottom-nav-clearance,6rem)+0.35rem)] pt-0",
      contentWrapperClassName: "mx-auto mt-0 min-h-0 w-full flex-1 overflow-hidden",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full", children: [
        cookPhase !== "idle" && activeRecipe && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-30 flex items-center justify-center bg-black/62 p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md rounded-2xl border border-amber-300/25 bg-black/82 p-5 text-center shadow-[0_0_45px_rgba(0,0,0,0.5)] backdrop-blur-md", children: cookPhase === "cooking" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RecipeGrillIcon, { recipe: activeRecipe, size: "modal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs font-black uppercase tracking-[0.2em] text-amber-200/80", children: "Cooking" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-2xl font-black text-white", children: activeRecipe.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-semibold text-zinc-300", children: "The grill is firing up. Your dish is almost ready." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 overflow-hidden rounded-full border border-amber-300/18 bg-zinc-950", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-3 rounded-full bg-[linear-gradient(90deg,#f59e0b,#fb7185,#facc15)] transition-[width] ease-linear",
              style: { width: `${cookProgress}%`, transitionDuration: `${COOKING_ANIMATION_MS}ms` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-3 text-amber-200/85", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5 animate-bounce [animation-delay:-0.2s]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "h-5 w-5 animate-bounce [animation-delay:-0.1s]" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RecipeGrillIcon, { recipe: activeRecipe, size: "modal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs font-black uppercase tracking-[0.2em] text-cyan-100/80", children: "Dish ready" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-2xl font-black text-white", children: activeRecipe.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-4xl font-black text-amber-300", children: [
            "+",
            activeRecipe.score
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300/80", children: "Grill score added" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm font-semibold text-white/75", children: [
            "Saved to Inventory ",
            "->",
            " Grill Stuff. Sell it there later for gold."
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          QuestBoard,
          {
            layout: isMobileLayout ? "mobile" : "desktop",
            viewportInsets: boardViewportInsets,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2.5 md:grid-cols-2 md:gap-3", children: GRILL_RECIPES.map((recipe) => {
              const canCook = Object.entries(recipe.ingredients).every(([fishId, amount]) => inventoryCount(inventory, fishId) >= amount);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(QuestBoardCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 sm:gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RecipeGrillIcon, { recipe }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[0.95rem] font-black leading-tight text-[#f8e8bf] sm:text-lg", children: recipe.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[0.76rem] leading-5 text-[#f8e8bf]/70 sm:text-sm sm:leading-6", children: recipe.description })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#8f6a38]/70 bg-[rgba(16,11,8,0.84)] px-1.5 py-1 text-xs font-black text-[#f3c777] sm:px-2 sm:text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
                      recipe.score,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(GrillScoreInfoButton, { side: "bottom", className: "ml-0.5 h-4.5 w-4.5 text-[10px] sm:ml-1" })
                    ] })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2 sm:mt-4", children: Object.entries(recipe.ingredients).map(([fishId, amount]) => {
                  const fish = FISH_DATA.find((item) => item.id === fishId);
                  const owned = inventoryCount(inventory, fishId);
                  if (!fish) return null;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "inline-flex items-center gap-2 rounded-lg border border-[#6f4928] bg-[rgba(15,10,7,0.72)] px-2 py-1.5 text-xs text-[#f8e8bf]",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FishIcon, { fish, size: "sm" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fish.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: owned >= amount ? "text-emerald-300" : "text-red-300", children: [
                          owned,
                          "/",
                          amount
                        ] })
                      ]
                    },
                    fishId
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    disabled: !canCook || cookingLocked,
                    onClick: () => startCooking(recipe),
                    className: "mt-auto h-10 w-full rounded-[1rem] border border-[#7f5227] bg-[linear-gradient(180deg,#8c531f_0%,#6e4117_42%,#4f2f14_100%)] text-[0.82rem] font-black uppercase tracking-[0.04em] text-[#f8db9a] shadow-[inset_0_1px_0_rgba(255,220,160,0.22),0_10px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:brightness-110 disabled:border-[#3a2817] disabled:bg-[linear-gradient(180deg,#2f241c_0%,#231b15_100%)] disabled:text-[#8c7b63] disabled:shadow-none sm:h-11 sm:text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "mr-2 h-4 w-4" }),
                      cookingLocked && (activeRecipe == null ? void 0 : activeRecipe.id) === recipe.id ? "Cooking..." : "Cook dish"
                    ]
                  }
                )
              ] }) }, recipe.id);
            }) })
          }
        )
      ] })
    }
  );
};
export {
  GrillScreen as default
};
