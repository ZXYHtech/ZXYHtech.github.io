import { aE as createLucideIcon, r as reactExports, j as jsxRuntimeExports, p as publicAsset, o as Button, aT as ArrowLeft, a0 as cn, a3 as Lock } from "./index-tWfloERs.js";
import { G as GameScreenShell } from "./GameScreenShell-CkPXb6FN.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MapPin = createLucideIcon("MapPin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
]);
const mapTreasureVaultSrc = "/fish/games/monadfish/assets/map_treasure_vault_cutout-D2srnzi4.webp";
const mapSkullCoveSrc = "/fish/games/monadfish/assets/map_skull_cove_cutout-C8j1aliv.webp";
const mapCoralCastleSrc = "/fish/games/monadfish/assets/map_coral_castle_cutout-K5zaMxnp.webp";
const mapVolcanoGrillSrc = "/fish/games/monadfish/assets/map_volcano_grill_cutout-CZCRR8h4.webp";
const mapIslandMarketSrc = "/fish/games/monadfish/assets/map_island_market_cutout-CQ1lTMb3.webp";
const mapWheelPierSrc = "/fish/games/monadfish/assets/map_wheel_pier_cutout-B8mB1WMY.webp";
const locations = [
  {
    id: "vault",
    title: "Treasure Vault",
    hint: "Locked",
    image: mapTreasureVaultSrc
  },
  {
    id: "skull",
    title: "Skull Cove",
    hint: "Locked",
    image: mapSkullCoveSrc
  },
  {
    id: "castle",
    title: "Coral Castle",
    hint: "Locked",
    image: mapCoralCastleSrc
  },
  {
    id: "barbecue",
    title: "Volcano Grill",
    hint: "Locked",
    image: mapVolcanoGrillSrc
  },
  {
    id: "market",
    title: "Island Market",
    hint: "Locked",
    image: mapIslandMarketSrc
  },
  {
    id: "carnival",
    title: "Wheel Pier",
    hint: "Locked",
    image: mapWheelPierSrc
  }
];
const MapScreen = ({ onBack }) => {
  const [activeLocation, setActiveLocation] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GameScreenShell,
    {
      title: "Travel Map",
      subtitle: "Locked islands are coming soon. Hover or tap a place to preview it.",
      backgroundImage: publicAsset("assets/travel_board_reference.webp"),
      backgroundFit: "cover",
      overlayClassName: "bg-[radial-gradient(circle_at_50%_10%,rgba(255,204,91,0.08),transparent_38%),linear-gradient(180deg,rgba(5,4,3,0.12)_0%,rgba(4,3,2,0.30)_100%)]",
      headerHidden: true,
      shellPaddingClassName: "px-0 pb-[calc(var(--bottom-nav-clearance,6rem)+0.2rem)] pt-0",
      contentWrapperClassName: "mx-auto mt-0 min-h-0 w-full flex-1 overflow-hidden",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full min-h-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[4.2%] top-[3.4%] z-20 sm:left-[11.6%] sm:top-[8.2%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: onBack,
            className: "h-9 rounded-[0.8rem] border border-[#8f6a38]/70 bg-[rgba(18,11,7,0.84)] px-3 text-xs font-black uppercase tracking-[0.06em] text-[#f8dfab] shadow-[0_10px_24px_rgba(0,0,0,0.42)] hover:bg-[rgba(38,24,13,0.92)] sm:h-10 sm:px-4 sm:text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
              "Back"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-full max-w-[96rem] flex-col px-[5%] pb-[calc(var(--bottom-nav-clearance,6rem)+1.2rem)] pt-[12.6%] sm:px-[13.8%] sm:pb-[8.4%] sm:pt-[16.8%]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1 [touch-action:pan-y]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-full grid-cols-2 content-start gap-x-3 gap-y-4 pb-5 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-6 lg:gap-x-8", children: locations.map((location) => {
            const isActive = activeLocation === location.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: cn(
                  "group relative inline-flex min-w-0 bg-transparent text-left outline-none transition-all duration-200",
                  "drop-shadow-[0_12px_24px_rgba(0,0,0,0.38)] hover:scale-[1.02] focus-visible:scale-[1.02]",
                  isActive ? "scale-[1.02]" : ""
                ),
                onMouseEnter: () => setActiveLocation(location.id),
                onMouseLeave: () => setActiveLocation(null),
                onFocus: () => setActiveLocation(location.id),
                onBlur: () => setActiveLocation(null),
                onTouchStart: () => setActiveLocation(location.id),
                onTouchEnd: () => window.setTimeout(() => setActiveLocation(null), 500),
                "aria-label": `${location.title}, locked`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "pointer-events-none absolute inset-[4.5%] rounded-[1.4rem] opacity-0 transition-opacity duration-200 sm:rounded-[1.9rem]",
                        "bg-[radial-gradient(circle,rgba(250,204,21,0.22)_0%,rgba(245,158,11,0.16)_40%,rgba(245,158,11,0)_76%)]",
                        isActive ? "opacity-100" : "group-hover:opacity-75 group-focus-visible:opacity-75 group-active:opacity-75"
                      ),
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative block w-[10.25rem] max-w-full overflow-hidden rounded-[1.35rem] border border-[#6e4a25]/70 bg-[rgba(14,9,6,0.66)] shadow-[inset_0_0_0_1px_rgba(255,218,143,0.08)] sm:w-[15rem] sm:rounded-[1.9rem]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: location.image,
                      alt: "",
                      className: cn(
                        "block h-auto w-full transition-all duration-200",
                        isActive ? "grayscale-0 saturate-125 brightness-100" : "grayscale saturate-50 brightness-75 group-hover:grayscale-0 group-hover:saturate-125 group-hover:brightness-100 group-focus-visible:grayscale-0 group-focus-visible:saturate-125 group-focus-visible:brightness-100 group-active:grayscale-0 group-active:saturate-125 group-active:brightness-100"
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-1/2 top-1/2 inline-flex h-9 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-[#2c1a0c] bg-[#e6c781]/95 shadow-[0_8px_18px_rgba(0,0,0,0.5)] transition-transform duration-200 group-hover:scale-105 group-active:scale-95 sm:h-12 sm:w-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5 text-[#2a1708] sm:h-6 sm:w-6" }) })
                ]
              }
            ) }, location.id);
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-2 flex w-fit items-center gap-2 rounded-[0.85rem] border border-[#8f6a38]/55 bg-[rgba(15,10,7,0.78)] px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-[#f8dfab] shadow-xl backdrop-blur-md sm:mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-[#f1c36f]" }),
            "More islands unlock later"
          ] })
        ] })
      ] })
    }
  );
};
export {
  MapScreen as default
};
