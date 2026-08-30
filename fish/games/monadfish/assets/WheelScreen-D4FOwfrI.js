var _a;
import { j as jsxRuntimeExports, ah as createContextScope, ai as createDialogScope, r as reactExports, aj as Trigger, ak as Overlay, al as useComposedRefs, am as WarningProvider, an as Content, ao as composeEventHandlers, ap as Title, aq as Description, ar as Close, as as Root, at as Portal, au as createSlottable, a0 as cn, av as buttonVariants, aw as WHEEL_PRIZES, D as MON_CUBE_SPIN_PACKAGES, p as publicAsset, h as getHighestOwnedRodLevel, d as canUseMonadPaymentIdentity, u as useSendTransaction, ax as restoreBackgroundMusic, ay as ConnectButton, az as MonadCelebrationFireworks, i as MonadIcon, y as monadPriceLabel, aA as ROD_CUBE_DROP_CONFIG, f as formatMonAmount, aB as CUBE_REBALANCE_CONFIG, aC as RARITY_COLORS, s as ROD_RARITY_COLORS, Z as FishIcon, a as ROD_DISPLAY_INFO, S as ShipWheel, l as Sparkles, C as CoinIcon, I as sendMonadPayment, J as MON_MARKET_RECEIVER_ADDRESS, G as ue, M as MONAD_SHOP_TEST_MODE_ENABLED, L as isUserRejectedError, aD as duckBackgroundMusic, c as FISH_DATA, R as ROD_DATA, q as ROD_RARITY_NAMES } from "./index-tWfloERs.js";
import { G as GameScreenShell } from "./GameScreenShell-CkPXb6FN.js";
const WheelActionIconButton = ({
  src,
  alt,
  label,
  onClick,
  disabled = false,
  badge,
  shape = "square"
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "button",
  {
    type: "button",
    onClick,
    disabled,
    className: `group relative isolate overflow-visible bg-transparent outline-none transition-all duration-200 ${disabled ? "cursor-not-allowed opacity-55 saturate-50" : "hover:scale-105 focus-visible:scale-105 active:scale-95"}`,
    "aria-label": label,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: "absolute inset-[12%] rounded-[1.5rem] bg-[radial-gradient(circle,rgba(250,204,21,0.28),rgba(15,23,42,0)_72%)] blur-md"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src,
          alt,
          className: `relative z-[1] block object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.36)] transition-transform duration-300 group-hover:scale-[1.02] ${shape === "banner" ? "w-56 sm:w-72" : "w-24 sm:w-28"}`,
          draggable: false
        }
      ),
      badge ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-1 -top-1 z-[2] rounded-full border border-yellow-200/80 bg-yellow-300 px-2 py-1 text-[10px] font-black leading-none text-black shadow-lg", children: badge }) : null
    ]
  }
);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext, createAlertDialogScope] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a2;
              event.preventDefault();
              (_a2 = cancelRef.current) == null ? void 0 : _a2.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a2;
    const hasDescription = document.getElementById(
      (_a2 = contentRef.current) == null ? void 0 : _a2.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
const AlertDialog = Root2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Title2, { ref, className: cn("text-lg font-semibold", className), ...props }));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Description2, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
const CUBE_TILE_COLORS = [
  "#22d3ee",
  "#a78bfa",
  "#facc15",
  "#34d399",
  "#fb7185",
  "#60a5fa",
  "#f472b6",
  "#a3e635"
];
const CUBE_SIDES = ["front", "back", "right", "left", "top", "bottom"];
const FACE_TRANSFORMS = {
  front: "rotateY(0deg) translateZ(var(--cube-half))",
  back: "rotateY(180deg) translateZ(var(--cube-half))",
  right: "rotateY(90deg) translateZ(var(--cube-half))",
  left: "rotateY(-90deg) translateZ(var(--cube-half))",
  top: "rotateX(90deg) translateZ(var(--cube-half))",
  bottom: "rotateX(-90deg) translateZ(var(--cube-half))"
};
const BASE_REVEAL_ROTATION = { x: -18, y: -28, z: 0 };
const FACE_ALIGNMENT_OFFSETS = [
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 180, z: 0 },
  { x: 0, y: -90, z: 0 },
  { x: 0, y: 90, z: 0 },
  { x: -90, y: 0, z: 0 },
  { x: 90, y: 0, z: 0 }
];
const FACE_TILE_COUNT = 25;
const SPIN_DURATION_MS = 2400;
const SPIN_SETTLE_BUFFER_MS = 90;
const SELECTION_SETTLE_FALLBACK_MS = 28e3;
const ROLL_HARD_FALLBACK_MS = SPIN_DURATION_MS + SELECTION_SETTLE_FALLBACK_MS + 4e3;
const REWARD_RESOLVE_TIMEOUT_MS = 12e3;
const LIGHT_STEP_START_MS = 55;
const LIGHT_STEP_INCREMENT_MS = 7;
const FISH_TILE_RATIO = CUBE_REBALANCE_CONFIG.enabled ? CUBE_REBALANCE_CONFIG.fishTileRatio : 0.42;
const MON_TILE_COUNT = CUBE_REBALANCE_CONFIG.enabled ? CUBE_REBALANCE_CONFIG.monTileCount : 2;
const BAIT_TILE_RATIO = CUBE_REBALANCE_CONFIG.enabled ? 0.28 : 0;
const COIN_PRIZES = WHEEL_PRIZES.filter((item) => item.type === "coins");
const BAIT_PRIZES = WHEEL_PRIZES.filter((item) => item.type === "bait");
const MON_PRIZES = WHEEL_PRIZES.filter((item) => item.type === "mon" && Number(item.mon ?? 0) > 0);
const SHOWCASE_COIN_PRIZES = [...COIN_PRIZES].filter((item) => Number(item.coins ?? 0) > 0).sort((a, b) => Number(b.coins ?? 0) - Number(a.coins ?? 0));
const SHOWCASE_BAIT_PRIZES = [...BAIT_PRIZES].filter((item) => Number(item.bait ?? 0) > 0).sort((a, b) => Number(b.bait ?? 0) - Number(a.bait ?? 0));
const SHOWCASE_MON_PRIZES = [...MON_PRIZES].filter((item) => Number(item.mon ?? 0) > 0).sort((a, b) => Number(b.mon ?? 0) - Number(a.mon ?? 0));
const FALLBACK_MON_PRIZE = {
  id: "secret_mon_0_5",
  type: "mon",
  label: `${CUBE_REBALANCE_CONFIG.monPrizeAmount} MON`,
  mon: CUBE_REBALANCE_CONFIG.monPrizeAmount,
  secret: true
};
const COIN_PRIZE_WEIGHTS = {
  coin_30: 28,
  coin_60: 28,
  coin_100: 18,
  coin_175: 12,
  coin_275: 8,
  coin_450: 5,
  coin_750: 3,
  coin_1100: 2
};
const BAIT_PRIZE_WEIGHTS = {
  bait_2: 30,
  bait_3: 30,
  bait_4: 20,
  bait_6: 15,
  bait_9: 9
};
const PAID_SPIN_COST_MON = ((_a = MON_CUBE_SPIN_PACKAGES[0]) == null ? void 0 : _a.monAmount) ?? "0.04";
const BUY_ROLL_ICON_SRC = publicAsset("assets/wheel_buy_roll_icon_v2.webp");
const ROLL_CUBE_ICON_SRC = publicAsset("assets/wheel_roll_cube_icon_v2.webp");
const BUY_SPIN_TOAST_ID = "wheel-buy-spin";
const CUBE_MUSIC_DUCK_MS = 16e3;
const CUBE_MON_CELEBRATION_MS = 2600;
const CUBE_SHOWCASE_TILE_INDEXES = [2, 7, 12, 17, 22, 6, 8, 10, 14, 16, 18, 21];
const CUBE_TILE_PATH = Array.from({ length: 5 }, (_, row) => {
  const rowIndices = Array.from({ length: 5 }, (_2, col) => row * 5 + col);
  return row % 2 === 0 ? rowIndices : rowIndices.reverse();
}).flat();
const mod = (value, base) => (value % base + base) % base;
const indexToFaceAndTile = (index) => ({
  faceIndex: Math.floor(index / FACE_TILE_COUNT),
  tileIndex: index % FACE_TILE_COUNT
});
const faceAndTileToIndex = (faceIndex, tileIndex) => faceIndex * FACE_TILE_COUNT + tileIndex;
const randomUniqueIndexes = (count, maxExclusive, blocked = /* @__PURE__ */ new Set()) => {
  const chosen = /* @__PURE__ */ new Set();
  const targetCount = Math.max(0, Math.min(count, maxExclusive - blocked.size));
  while (chosen.size < targetCount) {
    const index = Math.floor(Math.random() * maxExclusive);
    if (!blocked.has(index)) {
      chosen.add(index);
    }
  }
  return Array.from(chosen.values());
};
const clampChance = (chance) => Math.max(0, Math.min(1, Number(chance) || 0));
const pickWeighted = (items, getWeight) => {
  const totalWeight = items.reduce((sum, item) => sum + getWeight(item), 0);
  let roll = Math.random() * totalWeight;
  for (const item of items) {
    roll -= getWeight(item);
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
};
const withTimeout = async (promise, timeoutMs, message) => new Promise((resolve, reject) => {
  const timer = window.setTimeout(() => {
    reject(new Error(message));
  }, timeoutMs);
  Promise.resolve(promise).then(resolve, reject).finally(() => window.clearTimeout(timer));
});
const shortCoinLabel = (amount) => {
  if (amount >= 1e3) {
    const compact = amount % 1e3 === 0 ? amount / 1e3 : Number((amount / 1e3).toFixed(1));
    return `${compact}K`;
  }
  return `${amount}`;
};
const getFishByReward = (reward) => reward.type === "fish" && reward.fishId ? FISH_DATA.find((fish) => fish.id === reward.fishId) ?? null : null;
const getRodByReward = (reward) => reward.type === "rod" && typeof reward.rodLevel === "number" ? ROD_DATA.find((rod) => rod.level === reward.rodLevel) ?? null : null;
const getCubeRodRewardConfig = (rodId) => ROD_CUBE_DROP_CONFIG.cubeRodRewards.find((reward) => reward.rodId === rodId) ?? null;
const getEligibleRodDrops = (currentRodLevel) => ROD_DATA.flatMap((rod) => {
  const rewardConfig = getCubeRodRewardConfig(rod.id);
  if (!rewardConfig || rod.level <= currentRodLevel || rod.level < ROD_CUBE_DROP_CONFIG.minLevel || rod.level > ROD_CUBE_DROP_CONFIG.maxLevel || rewardConfig.dropWeight <= 0) {
    return [];
  }
  return [{ ...rod, cubeDropWeight: rewardConfig.dropWeight, duplicateCompensationMonads: rewardConfig.duplicateCompensationMonads }];
});
const createFishPrize = () => {
  const fish = pickWeighted(FISH_DATA, (item) => item.chance);
  return {
    id: `fish_${fish.id}`,
    type: "fish",
    fishId: fish.id,
    quantity: 1,
    label: `${fish.name} x1`
  };
};
const createCoinPrize = () => {
  return pickWeighted(COIN_PRIZES, (item) => COIN_PRIZE_WEIGHTS[item.id] ?? 1);
};
const createBaitPrize = () => pickWeighted(BAIT_PRIZES, (item) => BAIT_PRIZE_WEIGHTS[item.id] ?? 1);
const createMonPrize = () => {
  const prize = MON_PRIZES.length > 0 ? pickWeighted(MON_PRIZES, (item) => Number(item.cubeWeight ?? 1)) : FALLBACK_MON_PRIZE;
  const amount = prize.mon ?? CUBE_REBALANCE_CONFIG.monPrizeAmount;
  return {
    ...prize,
    label: `${formatMonAmount(amount)} MON`
  };
};
const createRewardPrize = () => BAIT_PRIZES.length > 0 && Math.random() < BAIT_TILE_RATIO ? createBaitPrize() : createCoinPrize();
const createCubeTilePrize = () => Math.random() < FISH_TILE_RATIO ? createFishPrize() : createRewardPrize();
const createRodPrize = (currentRodLevel) => {
  const eligibleRods = getEligibleRodDrops(currentRodLevel);
  if (eligibleRods.length === 0) return null;
  const rod = pickWeighted(eligibleRods, (item) => item.cubeDropWeight);
  return {
    id: rod.id,
    type: "rod",
    rodId: rod.id,
    rodLevel: rod.level,
    rarity: rod.rarity,
    duplicateCompensationMonads: rod.duplicateCompensationMonads,
    label: rod.name
  };
};
const getShowcaseRodPrizes = () => ROD_DATA.flatMap((rod) => {
  const rewardConfig = getCubeRodRewardConfig(rod.id);
  if (!rewardConfig || rod.level < ROD_CUBE_DROP_CONFIG.minLevel || rod.level > ROD_CUBE_DROP_CONFIG.maxLevel || rewardConfig.dropWeight <= 0) {
    return [];
  }
  return [{
    id: rod.id,
    type: "rod",
    rodId: rod.id,
    rodLevel: rod.level,
    rarity: rod.rarity,
    duplicateCompensationMonads: rewardConfig.duplicateCompensationMonads,
    label: rod.name
  }];
}).sort((a, b) => Number(b.rodLevel ?? 0) - Number(a.rodLevel ?? 0));
const cloneShowcasePrize = (prize) => {
  if (!prize) return null;
  if (prize.type === "mon") {
    const amount = Number(prize.mon ?? CUBE_REBALANCE_CONFIG.monPrizeAmount);
    return {
      ...prize,
      label: `${formatMonAmount(amount)} MON`
    };
  }
  return { ...prize };
};
const getShowcasePrizes = (includeMon) => {
  const showcaseRodPrizes = getShowcaseRodPrizes();
  const showcasePrizes = [
    cloneShowcasePrize(SHOWCASE_MON_PRIZES[0]),
    cloneShowcasePrize(showcaseRodPrizes[0]),
    cloneShowcasePrize(SHOWCASE_COIN_PRIZES[0]),
    cloneShowcasePrize(SHOWCASE_BAIT_PRIZES[0]),
    cloneShowcasePrize(SHOWCASE_MON_PRIZES[1]),
    cloneShowcasePrize(showcaseRodPrizes[1]),
    cloneShowcasePrize(SHOWCASE_COIN_PRIZES[1]),
    cloneShowcasePrize(SHOWCASE_MON_PRIZES[2]),
    cloneShowcasePrize(showcaseRodPrizes[2]),
    cloneShowcasePrize(SHOWCASE_BAIT_PRIZES[1]),
    cloneShowcasePrize(SHOWCASE_MON_PRIZES[3])
  ].filter((item) => Boolean(item));
  const seen = /* @__PURE__ */ new Set();
  return showcasePrizes.filter((item) => {
    const key = `${item.type}:${item.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
const getShowcaseTileIndexes = (protectedTileIndex) => {
  const orderedIndexes = [
    ...CUBE_SHOWCASE_TILE_INDEXES,
    ...Array.from({ length: FACE_TILE_COUNT }, (_, index) => index)
  ];
  const seen = /* @__PURE__ */ new Set();
  return orderedIndexes.filter((index) => {
    if (index === protectedTileIndex || seen.has(index)) return false;
    seen.add(index);
    return index >= 0 && index < FACE_TILE_COUNT;
  });
};
const decorateCubeFaceWithShowcase = (faces, faceIndex, protectedTileIndex, includeMon) => {
  const face = faces[faceIndex];
  if (!face) return faces;
  const prizes = getShowcasePrizes();
  const tileIndexes = getShowcaseTileIndexes(protectedTileIndex);
  prizes.forEach((prize, index) => {
    const tileIndex = tileIndexes[index];
    if (typeof tileIndex === "number") {
      face[tileIndex] = prize;
    }
  });
  return faces;
};
const decorateCubeFacesWithShowcase = (faces, includeMon) => {
  faces.forEach((_, faceIndex) => {
    decorateCubeFaceWithShowcase(faces, faceIndex, null);
  });
  return faces;
};
const createPreviewCubeFaces = (currentRodLevel = 0, includeMon = true) => decorateCubeFacesWithShowcase(
  createCubeFaces(currentRodLevel, includeMon)
);
const shouldInjectRodTile = () => ROD_CUBE_DROP_CONFIG.cubeRodDropEnabled && Math.random() < clampChance(ROD_CUBE_DROP_CONFIG.tileInjectionChance);
const createCubeFaces = (currentRodLevel = 0, includeMon = true) => {
  const totalTiles = CUBE_SIDES.length * FACE_TILE_COUNT;
  const globalPrizes = Array.from({ length: totalTiles }, () => createCubeTilePrize());
  const reservedIndexes = /* @__PURE__ */ new Set();
  const monIndexes = includeMon && MON_TILE_COUNT > 0 ? randomUniqueIndexes(MON_TILE_COUNT, totalTiles, reservedIndexes) : [];
  for (const globalIndex of monIndexes) {
    globalPrizes[globalIndex] = createMonPrize();
    reservedIndexes.add(globalIndex);
  }
  const rodIndexes = shouldInjectRodTile() && ROD_CUBE_DROP_CONFIG.tileCount > 0 ? randomUniqueIndexes(ROD_CUBE_DROP_CONFIG.tileCount, totalTiles, reservedIndexes) : [];
  for (const globalIndex of rodIndexes) {
    const rodPrize = createRodPrize(currentRodLevel);
    if (!rodPrize) break;
    globalPrizes[globalIndex] = rodPrize;
    reservedIndexes.add(globalIndex);
  }
  return CUBE_SIDES.map((_, sideIndex) => globalPrizes.slice(sideIndex * FACE_TILE_COUNT, (sideIndex + 1) * FACE_TILE_COUNT));
};
const getRodTileGlobalIndexes = (faces) => faces.flatMap((face, faceIndex) => face.flatMap((item, tileIndex) => item.type === "rod" ? [faceAndTileToIndex(faceIndex, tileIndex)] : []));
const setPrizeAtGlobalIndex = (faces, globalIndex, prize) => {
  const { faceIndex, tileIndex } = indexToFaceAndTile(globalIndex);
  faces[faceIndex][tileIndex] = prize;
};
const pickCubeTarget = (faces, currentRodLevel) => {
  const totalTiles = CUBE_SIDES.length * FACE_TILE_COUNT;
  let rodIndexes = getRodTileGlobalIndexes(faces);
  const shouldHitRodJackpot = ROD_CUBE_DROP_CONFIG.cubeRodDropEnabled && Math.random() < clampChance(ROD_CUBE_DROP_CONFIG.targetWinChance);
  if (shouldHitRodJackpot && rodIndexes.length === 0) {
    const rodPrize = createRodPrize(currentRodLevel);
    const [rodIndex] = rodPrize ? randomUniqueIndexes(1, totalTiles) : [];
    if (rodPrize && typeof rodIndex === "number") {
      setPrizeAtGlobalIndex(faces, rodIndex, rodPrize);
      rodIndexes = [rodIndex];
    }
  }
  const targetGlobalIndex = shouldHitRodJackpot && rodIndexes.length > 0 ? rodIndexes[Math.floor(Math.random() * rodIndexes.length)] : randomUniqueIndexes(1, totalTiles, new Set(rodIndexes))[0] ?? 0;
  const { faceIndex, tileIndex } = indexToFaceAndTile(targetGlobalIndex);
  return {
    faceIndex,
    tileIndex,
    prize: faces[faceIndex][tileIndex]
  };
};
const getPrizeVisualMatchScore = (candidate, target) => {
  if (candidate.id === target.id) return 1e3;
  if (candidate.type !== target.type) return 0;
  if (target.type === "coins") {
    const candidateCoins = Number(candidate.coins ?? 0);
    const targetCoins = Number(target.coins ?? 0);
    if (candidateCoins <= 0 || targetCoins <= 0) return 20;
    return 240 - Math.min(200, Math.abs(candidateCoins - targetCoins) / Math.max(targetCoins, 1));
  }
  if (target.type === "bait") {
    const candidateBait = Number(candidate.bait ?? 0);
    const targetBait = Number(target.bait ?? 0);
    if (candidateBait <= 0 || targetBait <= 0) return 20;
    return 260 - Math.min(180, Math.abs(candidateBait - targetBait) * 16);
  }
  if (target.type === "mon") {
    const candidateMon = Number(candidate.mon ?? 0);
    const targetMon = Number(target.mon ?? 0);
    if (candidateMon <= 0 || targetMon <= 0) return 80;
    return 320 - Math.min(220, Math.abs(candidateMon - targetMon) / Math.max(targetMon, 0.5));
  }
  if (target.type === "rod") {
    if (candidate.rodId === target.rodId || candidate.rodLevel === target.rodLevel) return 420;
    return 180;
  }
  if (target.type === "fish") {
    return candidate.fishId === target.fishId ? 380 : 80;
  }
  return 60;
};
const findVisualTargetForPrize = (faces, targetPrize, fallbackFaceIndex, fallbackTileIndex) => {
  const fallback = {
    faceIndex: mod(fallbackFaceIndex, CUBE_SIDES.length),
    tileIndex: mod(fallbackTileIndex, FACE_TILE_COUNT)
  };
  let bestTarget = fallback;
  let bestScore = 0;
  faces.forEach((face, faceIndex) => {
    face.forEach((candidatePrize, tileIndex) => {
      const score = getPrizeVisualMatchScore(candidatePrize, targetPrize);
      if (score > bestScore) {
        bestScore = score;
        bestTarget = { faceIndex, tileIndex };
      }
    });
  });
  return bestScore > 0 ? bestTarget : fallback;
};
const getRewardToastLabel = (reward) => {
  const rod = getRodByReward(reward);
  if (rod && reward.duplicateCompensationApplied && reward.duplicateCompensationMonads) {
    return `${rod.name} duplicate: +${formatMonAmount(reward.duplicateCompensationMonads)} MON`;
  }
  if (rod) {
    return `${rod.name} (${ROD_RARITY_NAMES[rod.rarity]})`;
  }
  return reward.label;
};
const getMonadRewardAmount = (reward) => {
  if (reward.type === "mon") {
    return Number(reward.mon ?? CUBE_REBALANCE_CONFIG.monPrizeAmount);
  }
  if (reward.duplicateCompensationApplied && reward.duplicateCompensationMonads) {
    return Number(reward.duplicateCompensationMonads);
  }
  return 0;
};
const getFaceViewRotation = (faceIndex) => {
  const offset = FACE_ALIGNMENT_OFFSETS[faceIndex] ?? FACE_ALIGNMENT_OFFSETS[0];
  return {
    x: BASE_REVEAL_ROTATION.x + offset.x,
    y: BASE_REVEAL_ROTATION.y + offset.y,
    z: BASE_REVEAL_ROTATION.z + offset.z
  };
};
const getNextRotation = (current, targetFaceIndex) => {
  const target = getFaceViewRotation(targetFaceIndex);
  const currentX = mod(current.x, 360);
  const currentY = mod(current.y, 360);
  const currentZ = mod(current.z, 360);
  const targetX = mod(target.x, 360);
  const targetY = mod(target.y, 360);
  const targetZ = mod(target.z, 360);
  return {
    x: current.x + 720 + mod(targetX - currentX, 360),
    y: current.y + 1080 + mod(targetY - currentY, 360),
    z: current.z + 360 + mod(targetZ - currentZ, 360)
  };
};
const PROMPT_CONFIG = {
  tasks: {
    title: "Finish daily tasks first",
    description: "Claim any 3 daily tasks to unlock 3 cube rolls.",
    actionLabel: "Go to Tasks"
  },
  tomorrow: {
    title: "Come back tomorrow",
    description: "Your daily cube rolls are finished for today.",
    actionLabel: "OK"
  },
  wallet: {
    title: "Connect wallet first",
    description: "Connect your wallet before buying cube rolls with MON.",
    actionLabel: "Connect Wallet"
  }
};
const WheelScreen = ({
  coins,
  rodLevel,
  nftRods = [],
  availableRolls,
  dailyWheelRolls,
  paidWheelRolls,
  dailyTaskClaimsMet,
  walletAddress,
  onRequestRoll,
  onResolveReward,
  onBuySpin,
  onOpenTasks,
  onSpinStartSound,
  onRevealSound,
  onRewardSound,
  onMonadRewardSound
}) => {
  const highestOwnedRodLevel = getHighestOwnedRodLevel(rodLevel, nftRods);
  const canUseMonadPayment = canUseMonadPaymentIdentity(walletAddress);
  const [phase, setPhase] = reactExports.useState("idle");
  const [cubeFaces] = reactExports.useState(() => createPreviewCubeFaces(highestOwnedRodLevel, canUseMonadPayment));
  const [rotation, setRotation] = reactExports.useState(() => getFaceViewRotation(0));
  const [rotationTransitionEnabled, setRotationTransitionEnabled] = reactExports.useState(true);
  const [highlightedFaceIndex, setHighlightedFaceIndex] = reactExports.useState(null);
  const [highlightedTileIndex, setHighlightedTileIndex] = reactExports.useState(null);
  const [isBuyingSpin, setIsBuyingSpin] = reactExports.useState(false);
  const [promptType, setPromptType] = reactExports.useState(null);
  const [monCelebration, setMonCelebration] = reactExports.useState(null);
  const timersRef = reactExports.useRef([]);
  const spinLockRef = reactExports.useRef(false);
  const pendingTargetRef = reactExports.useRef(null);
  const settleStartedRef = reactExports.useRef(false);
  const selectionSettledRef = reactExports.useRef(false);
  const phaseRef = reactExports.useRef("idle");
  const { sendTransactionAsync } = useSendTransaction();
  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };
  const setSpinPhase = (nextPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  };
  reactExports.useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  reactExports.useEffect(() => () => {
    clearTimers();
    restoreBackgroundMusic();
  }, []);
  const spinning = phase === "spinning";
  const selecting = phase === "selecting";
  const canRoll = availableRolls > 0;
  const hasPaidRolls = paidWheelRolls > 0;
  const hasDailyRolls = dailyWheelRolls > 0;
  const rotationTransform = reactExports.useMemo(
    () => `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
    [rotation]
  );
  const triggerMonadCelebration = (reward) => {
    const monAmount = getMonadRewardAmount(reward);
    if (monAmount <= 0) return false;
    setMonCelebration({
      amountLabel: `+${formatMonAmount(monAmount)} MON`,
      nonce: Date.now()
    });
    const timer = window.setTimeout(() => {
      setMonCelebration(null);
      restoreBackgroundMusic();
    }, CUBE_MON_CELEBRATION_MS);
    timersRef.current.push(timer);
    return true;
  };
  const renderTile = (item, tileIndex, sideIndex) => {
    var _a2;
    const fish = getFishByReward(item);
    const rod = getRodByReward(item);
    const isHighlighted = highlightedFaceIndex === sideIndex && highlightedTileIndex === tileIndex;
    const isMonTile = item.type === "mon";
    const isBaitTile = item.type === "bait";
    const isRodTile = item.type === "rod";
    const isBigCoinTile = item.type === "coins" && Number(item.coins ?? 0) >= 750;
    const monAmountLabel = isMonTile ? formatMonAmount(item.mon ?? CUBE_REBALANCE_CONFIG.monPrizeAmount) : "";
    const colorIndex = Math.max(WHEEL_PRIZES.findIndex((prizeItem) => prizeItem.id === item.id), 0);
    const accent = item.type === "fish" && fish ? RARITY_COLORS[fish.rarity] : item.type === "mon" ? "#14f195" : item.type === "bait" ? "#bef264" : item.type === "rod" && rod ? ROD_RARITY_COLORS[rod.rarity] : item.secret ? "#f8fafc" : CUBE_TILE_COLORS[colorIndex % CUBE_TILE_COLORS.length];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `relative flex min-w-0 items-center justify-center overflow-hidden rounded-[4px] border text-[8px] font-black leading-none text-black transition-all duration-200 sm:text-[10px] ${isHighlighted ? "z-20 scale-[1.16] border-white ring-4 ring-cyan-100/90 shadow-[0_0_26px_rgba(34,211,238,0.95),0_0_44px_rgba(255,255,255,0.65)]" : isMonTile ? "border-emerald-100/90 ring-1 ring-emerald-100/85 shadow-[0_0_0_1px_rgba(16,185,129,0.25),0_0_16px_rgba(20,241,149,0.45)]" : isBaitTile ? "border-lime-100/90 ring-1 ring-lime-100/80 shadow-[0_0_0_1px_rgba(101,163,13,0.2),0_0_14px_rgba(190,242,100,0.35)]" : isRodTile ? "border-amber-100/90 ring-1 ring-amber-100/80 shadow-[0_0_0_1px_rgba(251,191,36,0.24),0_0_16px_rgba(250,204,21,0.38)]" : isBigCoinTile ? "border-yellow-100/90 ring-1 ring-yellow-100/80 shadow-[0_0_0_1px_rgba(250,204,21,0.28),0_0_18px_rgba(251,191,36,0.42)]" : "border-black/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.58),0_5px_10px_rgba(0,0,0,0.22)]"}`,
        style: {
          background: item.type === "fish" && fish ? `linear-gradient(135deg, ${accent}40, ${accent}18)` : isMonTile ? "radial-gradient(circle at top, rgba(236,253,245,0.98), rgba(52,211,153,0.94) 52%, rgba(5,150,105,0.98) 100%)" : isBaitTile ? "radial-gradient(circle at top, rgba(247,254,231,0.98), rgba(190,242,100,0.94) 55%, rgba(101,163,13,0.98) 100%)" : isRodTile ? `linear-gradient(135deg, ${accent}f2, ${accent}8f 56%, rgba(17,24,39,0.96))` : isBigCoinTile ? "radial-gradient(circle at 50% 18%, rgba(255,251,235,0.98), rgba(250,204,21,0.96) 46%, rgba(217,119,6,0.98) 100%)" : item.secret ? "linear-gradient(135deg, #f8fafc, #fde68a 45%, #f472b6)" : `linear-gradient(135deg, ${accent}, ${accent}bb)`,
          opacity: spinning && highlightedFaceIndex !== null && highlightedFaceIndex !== sideIndex ? 0.94 : 1,
          filter: isHighlighted ? "brightness(1.38) saturate(1.3)" : "none"
        },
        children: [
          isHighlighted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute inset-0 bg-white/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute inset-[10%] rounded-[3px] border border-white/90 shadow-[0_0_16px_rgba(255,255,255,0.9)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/95 blur-md" })
          ] }) : null,
          item.type === "fish" && fish ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FishIcon, { fish, size: "xs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[7px] font-black text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] sm:text-[8px]", children: [
              "x",
              item.quantity ?? 1
            ] })
          ] }) : item.type === "mon" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-0.5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute inset-x-[10%] top-[16%] h-[1px] bg-white/80" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute inset-x-[12%] bottom-[18%] h-[1px] bg-emerald-950/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 text-[6px] font-black tracking-[0.14em] text-[#200052]/80 sm:text-[7px]", children: "MON" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-black text-[#200052] drop-shadow-[0_1px_0_rgba(255,255,255,0.68)] ${monAmountLabel.length >= 3 ? "text-[9px] sm:text-[11px]" : "text-[12px] sm:text-[14px]"}`, children: monAmountLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MonadIcon, { size: "xs", className: "drop-shadow-[0_1px_0_rgba(255,255,255,0.45)] sm:[&>svg]:scale-110" })
            ] })
          ] }) : item.type === "bait" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full w-full flex-col items-center justify-center px-0.5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[6px] font-black tracking-[0.14em] text-lime-950/85 sm:text-[7px]", children: "BAIT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[8px] font-black text-lime-950 drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] sm:text-[10px]", children: [
              "+",
              item.bait ?? 0
            ] })
          ] }) : item.type === "rod" && rod ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full w-full flex-col items-center justify-center gap-0.5 overflow-hidden px-0.5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.4),rgba(255,255,255,0)_48%)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-white/85 shadow-[0_0_8px_rgba(255,255,255,0.8)]" }),
            ((_a2 = ROD_DISPLAY_INFO[rod.level]) == null ? void 0 : _a2.image) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: ROD_DISPLAY_INFO[rod.level].image,
                alt: `${rod.name} prize`,
                className: "relative z-10 h-5 w-5 object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,0.82)] sm:h-7 sm:w-7"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShipWheel, { className: "relative z-10 h-4 w-4 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] sm:h-5 sm:w-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 rounded-full bg-black/38 px-1 text-[6px] font-black tracking-[0.12em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] sm:text-[7px]", children: "ROD" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full w-full flex-col items-center justify-center gap-0.5 overflow-hidden px-0.5", children: [
            isBigCoinTile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute inset-x-[12%] top-[16%] h-[1px] bg-white/80" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute -right-1 -top-1 h-5 w-5 rounded-full border border-white/45" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[6px] font-black tracking-[0.12em] text-amber-950/80 sm:text-[7px]", children: "GOLD" })
            ] }) : null,
            item.secret ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-black/75 sm:h-3.5 sm:w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CoinIcon, { size: "xs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${isBigCoinTile ? "text-[8px] text-amber-950 sm:text-[10px]" : "text-[7px] text-black/85 sm:text-[8px]"} font-black`, children: item.secret ? "???" : shortCoinLabel(item.coins ?? 0) })
          ] })
        ]
      },
      `${sideIndex}-${tileIndex}`
    );
  };
  const snapToFace = (faceIndex, onSettled) => {
    setRotationTransitionEnabled(false);
    setRotation(getFaceViewRotation(faceIndex));
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setRotationTransitionEnabled(true);
        onSettled();
      });
    });
  };
  const finishFaceSelection = (target) => {
    if (selectionSettledRef.current) return;
    selectionSettledRef.current = true;
    void (async () => {
      let keepMusicDuckedForCelebration = false;
      try {
        const result = await withTimeout(
          onResolveReward(target.prize, target.rollId),
          REWARD_RESOLVE_TIMEOUT_MS,
          "Could not apply cube reward. Please try again."
        ) ?? target.prize;
        setSpinPhase("idle");
        setHighlightedFaceIndex(target.faceIndex);
        setHighlightedTileIndex(target.tileIndex);
        const monRewardAmount = getMonadRewardAmount(result);
        if (monRewardAmount > 0) {
          onMonadRewardSound == null ? void 0 : onMonadRewardSound();
        } else {
          onRewardSound == null ? void 0 : onRewardSound();
        }
        keepMusicDuckedForCelebration = triggerMonadCelebration(result);
        ue.success(`You won: ${getRewardToastLabel(result)}`);
      } catch (error) {
        console.error("Cube reward resolve failed:", error);
        ue.error(error instanceof Error ? error.message : "Could not apply cube reward.");
        setSpinPhase("idle");
        setHighlightedFaceIndex(target.faceIndex);
        setHighlightedTileIndex(target.tileIndex);
      } finally {
        if (!keepMusicDuckedForCelebration) {
          restoreBackgroundMusic();
        }
        spinLockRef.current = false;
      }
    })();
  };
  const startFaceSelection = (target) => {
    const startPathIndex = Math.floor(Math.random() * CUBE_TILE_PATH.length);
    const targetPathIndex = CUBE_TILE_PATH.indexOf(target.tileIndex);
    const loops = 2 + Math.floor(Math.random() * 2);
    const offset = mod(targetPathIndex - startPathIndex, CUBE_TILE_PATH.length);
    const totalSteps = loops * CUBE_TILE_PATH.length + offset;
    let step = 0;
    selectionSettledRef.current = false;
    setSpinPhase("selecting");
    setHighlightedFaceIndex(target.faceIndex);
    const settleFallbackTimer = window.setTimeout(() => {
      finishFaceSelection(target);
    }, SELECTION_SETTLE_FALLBACK_MS);
    timersRef.current.push(settleFallbackTimer);
    const tick = () => {
      if (selectionSettledRef.current) return;
      const currentTileIndex = CUBE_TILE_PATH[(startPathIndex + step) % CUBE_TILE_PATH.length];
      setHighlightedTileIndex(currentTileIndex);
      if (step >= totalSteps) {
        finishFaceSelection(target);
        return;
      }
      step += 1;
      const delay = Math.min(220, LIGHT_STEP_START_MS + step * LIGHT_STEP_INCREMENT_MS);
      const timer = window.setTimeout(tick, delay);
      timersRef.current.push(timer);
    };
    tick();
  };
  const finishSpinAndReveal = () => {
    if (settleStartedRef.current || phaseRef.current !== "spinning" || !pendingTargetRef.current) return;
    settleStartedRef.current = true;
    const target = pendingTargetRef.current;
    pendingTargetRef.current = null;
    onRevealSound == null ? void 0 : onRevealSound();
    snapToFace(target.faceIndex, () => startFaceSelection(target));
  };
  const showRollRequirementPrompt = () => {
    if (dailyTaskClaimsMet) {
      setPromptType("tomorrow");
      return;
    }
    setPromptType("tasks");
  };
  const handleBuySpin = async () => {
    if (isBuyingSpin) {
      return;
    }
    if (!canUseMonadPayment) {
      setPromptType("wallet");
      return;
    }
    setIsBuyingSpin(true);
    try {
      const txHash = await sendMonadPayment({
        sendTransactionAsync,
        receiverAddress: MON_MARKET_RECEIVER_ADDRESS,
        monAmount: PAID_SPIN_COST_MON,
        purpose: "wheel-paid-roll"
      });
      ue.loading(MONAD_SHOP_TEST_MODE_ENABLED ? "Test payment created. Adding paid cube roll..." : "Transaction sent. Adding paid cube roll...", {
        id: BUY_SPIN_TOAST_ID,
        duration: 5600
      });
      await onBuySpin(1, txHash);
      ue.success("Paid cube roll added.", {
        id: BUY_SPIN_TOAST_ID,
        duration: 5600
      });
    } catch (err) {
      console.error("Paid spin purchase failed:", err);
      if (isUserRejectedError(err)) {
        ue.error("Transaction cancelled.", {
          id: BUY_SPIN_TOAST_ID,
          duration: 5600
        });
      } else {
        ue.error("Could not buy a roll.", {
          id: BUY_SPIN_TOAST_ID,
          duration: 5600
        });
      }
    } finally {
      setIsBuyingSpin(false);
    }
  };
  const handleCubeTap = () => {
    if (canRoll) {
      ue.info("Use the Roll Cube button below.");
      return;
    }
    showRollRequirementPrompt();
  };
  const handleSpin = async () => {
    if (spinning || selecting || spinLockRef.current) return;
    if (!hasDailyRolls && !hasPaidRolls) {
      showRollRequirementPrompt();
      return;
    }
    clearTimers();
    setMonCelebration(null);
    spinLockRef.current = true;
    const fallbackFaces = createCubeFaces(highestOwnedRodLevel, canUseMonadPayment);
    const localTarget = pickCubeTarget(fallbackFaces, highestOwnedRodLevel);
    let visualTarget = findVisualTargetForPrize(
      cubeFaces,
      localTarget.prize,
      localTarget.faceIndex,
      localTarget.tileIndex
    );
    let faceIndex = visualTarget.faceIndex;
    let tileIndex = visualTarget.tileIndex;
    let targetPrize = localTarget.prize;
    let rollId;
    try {
      const serverRoll = await (onRequestRoll == null ? void 0 : onRequestRoll());
      if (serverRoll) {
        targetPrize = serverRoll.prize;
        rollId = serverRoll.id;
        visualTarget = findVisualTargetForPrize(
          cubeFaces,
          targetPrize,
          serverRoll.target_face_index,
          serverRoll.target_tile_index
        );
        faceIndex = visualTarget.faceIndex;
        tileIndex = visualTarget.tileIndex;
      }
    } catch (error) {
      console.error("Cube roll request failed:", error);
      ue.error(error instanceof Error ? error.message : "Could not roll the cube.");
      spinLockRef.current = false;
      return;
    }
    setHighlightedFaceIndex(null);
    setHighlightedTileIndex(null);
    setSpinPhase("spinning");
    selectionSettledRef.current = false;
    setRotationTransitionEnabled(true);
    duckBackgroundMusic(CUBE_MUSIC_DUCK_MS, 0);
    onSpinStartSound == null ? void 0 : onSpinStartSound();
    pendingTargetRef.current = { faceIndex, tileIndex, prize: targetPrize, rollId };
    settleStartedRef.current = false;
    setRotation((current) => getNextRotation(current, faceIndex));
    const spinTimer = window.setTimeout(() => {
      finishSpinAndReveal();
    }, SPIN_DURATION_MS + SPIN_SETTLE_BUFFER_MS);
    timersRef.current.push(spinTimer);
    const hardFallbackTimer = window.setTimeout(() => {
      finishFaceSelection({ faceIndex, tileIndex, prize: targetPrize, rollId });
    }, ROLL_HARD_FALLBACK_MS);
    timersRef.current.push(hardFallbackTimer);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectButton.Custom, { children: ({ openConnectModal }) => {
    const activePrompt = promptType ? PROMPT_CONFIG[promptType] : null;
    const handlePromptAction = () => {
      if (promptType === "tasks") {
        setPromptType(null);
        onOpenTasks();
        return;
      }
      if (promptType === "wallet") {
        setPromptType(null);
        window.setTimeout(() => {
          openConnectModal == null ? void 0 : openConnectModal();
        }, 80);
        return;
      }
      setPromptType(null);
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GameScreenShell,
        {
          title: "Daily Prize Cube",
          subtitle: "Claim any 3 daily tasks to unlock 3 cube rolls. Buy extra rolls with MON any time.",
          coins,
          backgroundImage: publicAsset("assets/bg_wheel_v4.jpg"),
          contentWrapperClassName: "mx-auto mt-4 max-w-5xl sm:mt-6 min-h-0 w-full flex-1 overflow-visible",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full min-h-0 flex-col items-center justify-center gap-4 sm:gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `relative h-[18rem] w-full max-w-[24rem] overflow-visible sm:h-[24rem] sm:max-w-[32rem] ${canRoll && !spinning && !selecting ? "cursor-pointer" : "cursor-default"}`,
                style: {
                  perspective: "1050px",
                  "--cube-size": "min(max(46vmin, 12rem), 20rem)",
                  "--cube-half": "calc(var(--cube-size) / 2)"
                },
                onClick: handleCubeTap,
                role: "button",
                tabIndex: 0,
                onKeyDown: (event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCubeTap();
                  }
                },
                "aria-label": "Cube preview",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `absolute left-1/2 top-1/2 h-[var(--cube-size)] w-[var(--cube-size)] -translate-x-1/2 -translate-y-1/2 overflow-visible transition-[filter,transform] duration-300 ${canRoll ? "brightness-110 drop-shadow-[0_0_70px_rgba(34,211,238,0.38)]" : "grayscale-[0.45] brightness-75"} ${canRoll && !spinning && !selecting ? "hover:scale-[1.02]" : ""}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "relative h-full w-full overflow-visible",
                          onTransitionEnd: (event) => {
                            if (event.propertyName !== "transform") return;
                            finishSpinAndReveal();
                          },
                          style: {
                            transformStyle: "preserve-3d",
                            transform: rotationTransform,
                            transition: rotationTransitionEnabled ? spinning ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)` : "transform 700ms ease" : "none"
                          },
                          children: CUBE_SIDES.map((side, sideIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute inset-0 grid grid-cols-5 gap-1.5 overflow-visible rounded-lg border border-cyan-100/40 bg-slate-950/90 p-2 shadow-[inset_0_0_28px_rgba(255,255,255,0.12),0_0_28px_rgba(34,211,238,0.18)]",
                              style: {
                                transform: FACE_TRANSFORMS[side],
                                transformStyle: "preserve-3d",
                                backfaceVisibility: "hidden"
                              },
                              children: cubeFaces[sideIndex].map((item, tileIndex) => renderTile(item, tileIndex, sideIndex))
                            },
                            side
                          ))
                        }
                      )
                    }
                  ),
                  monCelebration ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "pointer-events-none absolute inset-0 z-30 flex items-center justify-center",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-[1.4rem] border border-[#836EF9]/50 bg-[radial-gradient(circle_at_50%_42%,rgba(131,110,249,0.34),rgba(5,16,26,0.94)_65%)] shadow-[0_18px_54px_rgba(0,0,0,0.55),0_0_56px_rgba(20,241,149,0.34)] sm:h-56 sm:w-56", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MonadCelebrationFireworks, {}),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MonadIcon, { size: "hero", className: "animate-monad-logo-pop drop-shadow-[0_0_30px_rgba(20,241,149,0.88)]" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-black uppercase text-emerald-100 sm:text-base", children: "Monad won" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-black text-white drop-shadow-[0_2px_12px_rgba(20,241,149,0.5)] sm:text-3xl", children: monCelebration.amountLabel })
                        ] })
                      ] })
                    },
                    monCelebration.nonce
                  ) : null
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 sm:gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                WheelActionIconButton,
                {
                  src: ROLL_CUBE_ICON_SRC,
                  alt: "Roll cube",
                  label: "Roll cube",
                  onClick: handleSpin,
                  disabled: spinning || selecting,
                  badge: canRoll ? `${availableRolls}` : null,
                  shape: "banner"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                WheelActionIconButton,
                {
                  src: BUY_ROLL_ICON_SRC,
                  alt: "Buy roll",
                  label: `Buy roll for ${monadPriceLabel(PAID_SPIN_COST_MON)}`,
                  onClick: handleBuySpin,
                  disabled: isBuyingSpin,
                  badge: hasPaidRolls ? `${paidWheelRolls}` : null
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertDialog,
        {
          open: !!activePrompt,
          onOpenChange: (open) => {
            if (!open) {
              setPromptType(null);
            }
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "max-w-[calc(100vw-2rem)] border border-cyan-300/20 bg-slate-950/95 text-cyan-50 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-md sm:max-w-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "text-xl font-black text-white", children: activePrompt == null ? void 0 : activePrompt.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-sm font-medium text-cyan-100/80", children: activePrompt == null ? void 0 : activePrompt.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "border-cyan-300/20 bg-slate-900 text-cyan-50 hover:bg-slate-800", children: "Close" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AlertDialogAction,
                {
                  onClick: handlePromptAction,
                  className: "border border-cyan-300/25 bg-cyan-500/20 text-cyan-50 hover:bg-cyan-500/30",
                  children: activePrompt == null ? void 0 : activePrompt.actionLabel
                }
              )
            ] })
          ] })
        }
      )
    ] });
  } });
};
export {
  WheelScreen as default
};
