import { aE as createLucideIcon, R as ROD_DATA, r as reactExports, u as useSendTransaction, aF as isRealWalletAddress, aG as ownsRodLevel, aH as WALLET_CHECK_IN_AMOUNT_MON, aI as WALLET_CHECK_IN_RECEIVER_ADDRESS, aJ as WALLET_CHECK_IN_REPEAT_TEST_MODE, aK as ExternalLink, aL as Send, p as publicAsset, j as jsxRuntimeExports, m as Tabs, n as TabsContent, o as Button, Y as Trophy, a3 as Lock, aM as LEVIATHAN_COMMON_ROD_BONUS_CONFIG, s as ROD_RARITY_COLORS, q as ROD_RARITY_NAMES, t as Check, aN as formatStreakDays, ay as ConnectButton, G as ue, aO as Clock3, aP as Input, aQ as REFERRAL_BAIT_ENABLED, aR as Box, W as Worm, x as Coins, E as parseEther, I as sendMonadPayment, C as CoinIcon, T as TabsList, k as TabsTrigger, L as isUserRejectedError, O as getErrorMessage } from "./index-tWfloERs.js";
import { G as GameScreenShell } from "./GameScreenShell-CkPXb6FN.js";
import { a as QuestBoardPlaque, b as QuestBoardCard, Q as QuestBoard } from "./QuestBoard-DNVEv0CT.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Copy = createLucideIcon("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Heart = createLucideIcon("Heart", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MessageCircle = createLucideIcon("MessageCircle", [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Repeat2 = createLucideIcon("Repeat2", [
  ["path", { d: "m2 9 3-3 3 3", key: "1ltn5i" }],
  ["path", { d: "M13 18H7a2 2 0 0 1-2-2V6", key: "1r6tfw" }],
  ["path", { d: "m22 15-3 3-3-3", key: "4rnwn2" }],
  ["path", { d: "M11 6h6a2 2 0 0 1 2 2v10", key: "2f72bc" }]
]);
const WALLET_CHECK_IN_TOAST_ID = "wallet-check-in-flow";
const WALLET_CHECK_IN_VERIFY_ATTEMPTS = 12;
const WALLET_CHECK_IN_VERIFY_RETRY_MS = 5e3;
const WALLET_CHECK_IN_PENDING_STORAGE_KEY = "hook_loot_pending_wallet_check_in_tx_v1";
const MONAD_MAINNET_CHAIN_ID = "0x8f";
const MONAD_MAINNET_PARAMS = {
  chainId: MONAD_MAINNET_CHAIN_ID,
  chainName: "Monad Mainnet",
  nativeCurrency: {
    name: "MON",
    symbol: "MON",
    decimals: 18
  },
  rpcUrls: ["https://rpc.monad.xyz"],
  blockExplorerUrls: ["https://monadscan.com"]
};
const DEFAULT_X_TARGET_USERNAME = "HookLootgame";
const normalizeXHandle = (value) => {
  const trimmed = String("").trim().replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//i, "").replace(/^@+/, "").split(/[/?#]/)[0].trim();
  return /^[A-Za-z0-9_]{1,15}$/.test(trimmed) ? trimmed : "";
};
const SOCIAL_X_TARGET_USERNAME = normalizeXHandle() || DEFAULT_X_TARGET_USERNAME;
const SOCIAL_X_PROFILE_URL = String(`https://x.com/${SOCIAL_X_TARGET_USERNAME}`);
const SOCIAL_X_VISIT_DELAY_MS = 12e3;
const getRodById = (id) => ROD_DATA.find((rod) => rod.id === id) ?? null;
const leviathanRequiredRod = getRodById(LEVIATHAN_COMMON_ROD_BONUS_CONFIG.requiredRodId) ?? ROD_DATA[0];
const leviathanBonusRod = getRodById(LEVIATHAN_COMMON_ROD_BONUS_CONFIG.bonusRodId);
const getBrowserEthereumProvider = () => {
  if (typeof window === "undefined") return null;
  const maybeWindow = window;
  return maybeWindow.ethereum && typeof maybeWindow.ethereum.request === "function" ? maybeWindow.ethereum : null;
};
const toHexQuantity = (value) => `0x${value.toString(16)}`;
const isWalletTransactionHash = (value) => /^0x[a-fA-F0-9]{64}$/.test(value.trim());
const normalizeWalletTransactionHash = (value) => isWalletTransactionHash(value) ? value.trim() : null;
const pendingWalletCheckInStorageKey = (walletAddress) => `${WALLET_CHECK_IN_PENDING_STORAGE_KEY}:${walletAddress.toLowerCase()}`;
const readPendingWalletCheckInTx = (walletAddress) => {
  if (!walletAddress || typeof window === "undefined") return null;
  try {
    const txHash = window.localStorage.getItem(pendingWalletCheckInStorageKey(walletAddress));
    return txHash ? normalizeWalletTransactionHash(txHash) : null;
  } catch {
    return null;
  }
};
const writePendingWalletCheckInTx = (walletAddress, txHash) => {
  try {
    window.localStorage.setItem(pendingWalletCheckInStorageKey(walletAddress), txHash);
  } catch {
  }
};
const clearPendingWalletCheckInTx = (walletAddress) => {
  if (!walletAddress || typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(pendingWalletCheckInStorageKey(walletAddress));
  } catch {
  }
};
const wait = (ms) => new Promise((resolve) => {
  window.setTimeout(resolve, ms);
});
const isRetryableWalletCheckInError = (error) => {
  const message = getErrorMessage(error).toLowerCase();
  return message.includes("transaction pending") || message.includes("fetch failed") || message.includes("failed to fetch") || message.includes("rpc request failed") || message.includes("rpc error") || message.includes("cannot fetch transaction details") || message.includes("timeout") || message.includes("network");
};
const getProviderChainId = async (provider) => {
  const chainId = await provider.request({ method: "eth_chainId" });
  return typeof chainId === "string" ? chainId.toLowerCase() : null;
};
const getProviderErrorCode = (error) => error && typeof error === "object" && "code" in error ? Number(error.code) : null;
const ensureMonadMainnet = async (provider) => {
  if (await getProviderChainId(provider) === MONAD_MAINNET_CHAIN_ID) return;
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: MONAD_MAINNET_CHAIN_ID }]
    });
  } catch (error) {
    if (getProviderErrorCode(error) !== 4902) {
      throw error;
    }
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [MONAD_MAINNET_PARAMS]
    });
  }
  if (await getProviderChainId(provider) !== MONAD_MAINNET_CHAIN_ID) {
    throw new Error("Switch MetaMask to Monad Mainnet before sending the check-in.");
  }
};
const TasksScreen = ({
  walletAddress,
  rodLevel,
  equippedRod,
  nftRods = [],
  dailyTasks,
  specialTasks,
  weeklyMissions,
  socialTasks,
  walletCheckInSummary,
  walletCheckInLoading = false,
  socialTasksLoading = false,
  dailyTaskClaimsMet,
  availableWheelRolls,
  isWalletConnected,
  isWalletVerified,
  isWalletVerifying = false,
  referralSummary,
  onClaimTask,
  onClaimWeeklyMission,
  claimingTaskId = null,
  claimingWeeklyMissionId = null,
  onWalletCheckIn,
  onVerifyWallet,
  onEquipRod,
  onOpenFish,
  onSubmitSocialTask,
  onClaimSocialTask,
  onOpenWheel,
  weeklyMissionsEnabled = false
}) => {
  dailyTasks.filter((task) => task.progress >= task.target).length;
  const claimedCount = dailyTasks.filter((task) => task.claimed).length;
  const [activeTab, setActiveTab] = reactExports.useState("daily");
  const [isMobileLayout, setIsMobileLayout] = reactExports.useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [walletCheckInSubmitting, setWalletCheckInSubmitting] = reactExports.useState(false);
  const [pendingWalletCheckInTx, setPendingWalletCheckInTx] = reactExports.useState(() => readPendingWalletCheckInTx(walletAddress));
  const [manualWalletCheckInTxHash, setManualWalletCheckInTxHash] = reactExports.useState("");
  const [copiedReferral, setCopiedReferral] = reactExports.useState(false);
  const [submittingSocialTaskId, setSubmittingSocialTaskId] = reactExports.useState(null);
  const [claimingSocialTaskId, setClaimingSocialTaskId] = reactExports.useState(null);
  const socialVisitTimerRef = reactExports.useRef(null);
  const { sendTransactionAsync } = useSendTransaction();
  const canUseWalletCheckInPayment = isRealWalletAddress(walletAddress);
  const ownsLeviathanBonusRod = Boolean(leviathanBonusRod && ownsRodLevel(leviathanBonusRod.level, rodLevel, nftRods));
  const hasLeviathanRodEquipped = equippedRod === leviathanRequiredRod.level;
  const leviathanBountyStatus = ownsLeviathanBonusRod ? "Reward owned" : hasLeviathanRodEquipped ? "Ready to hunt" : "Equip Common Rod";
  const walletCheckInAmountMon = (walletCheckInSummary == null ? void 0 : walletCheckInSummary.amountMon) ?? WALLET_CHECK_IN_AMOUNT_MON;
  const walletCheckInPriceLabel = `${walletCheckInAmountMon} MON`;
  const walletCheckInReceiverAddress = (walletCheckInSummary == null ? void 0 : walletCheckInSummary.receiverAddress) ?? WALLET_CHECK_IN_RECEIVER_ADDRESS;
  const walletCheckInRepeatTestMode = Boolean((walletCheckInSummary == null ? void 0 : walletCheckInSummary.repeatTestMode) || WALLET_CHECK_IN_REPEAT_TEST_MODE);
  const socialTaskCards = reactExports.useMemo(() => socialTasks.map((task) => ({
    ...task,
    icon: task.id === "twitter_follow" ? ExternalLink : task.id === "twitter_repost" ? Repeat2 : task.id === "twitter_like" ? Heart : task.id === "discord_join" ? MessageCircle : Send
  })), [socialTasks]);
  const boardLayout = isMobileLayout ? "mobile" : "desktop";
  const boardViewportInsets = reactExports.useMemo(() => isMobileLayout ? {
    mobile: {
      left: "16.2%",
      right: "16.2%",
      top: "16.2%",
      bottom: "18.6%"
    }
  } : {
    desktop: {
      left: "11.6%",
      right: "10.8%",
      top: "18.2%",
      bottom: "18.8%"
    }
  }, [isMobileLayout]);
  const questBackgrounds = reactExports.useMemo(() => isMobileLayout ? {
    daily: publicAsset("assets/daily_quests_mobile_reference.webp"),
    blockchain: publicAsset("assets/blockchain_quests_mobile_reference.webp"),
    weekly: publicAsset("assets/weekly_quests_mobile_reference.webp"),
    social: publicAsset("assets/social_quests_mobile_reference.webp")
  } : {
    daily: publicAsset("assets/daily_quests_board_reference.webp"),
    blockchain: publicAsset("assets/blockchain_quests_board_reference.webp"),
    weekly: publicAsset("assets/weekly_quests_board_reference.webp"),
    social: publicAsset("assets/social_quests_board_reference.webp")
  }, [isMobileLayout]);
  reactExports.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event) => setIsMobileLayout(event.matches);
    setIsMobileLayout(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  reactExports.useEffect(() => {
    setPendingWalletCheckInTx(readPendingWalletCheckInTx(walletAddress));
  }, [walletAddress]);
  reactExports.useEffect(() => () => {
    if (socialVisitTimerRef.current != null) {
      window.clearTimeout(socialVisitTimerRef.current);
    }
  }, []);
  const handleCopyReferralLink = async () => {
    var _a;
    if (!(referralSummary == null ? void 0 : referralSummary.referralLink)) return;
    try {
      if ((_a = navigator.clipboard) == null ? void 0 : _a.writeText) {
        await navigator.clipboard.writeText(referralSummary.referralLink);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = referralSummary.referralLink;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedReferral(true);
      window.setTimeout(() => setCopiedReferral(false), 1800);
    } catch (error) {
      console.error("Referral link copy failed:", error);
      ue.error("Copy failed. Please copy the link manually.");
    }
  };
  const handleOpenXProfile = (task) => {
    window.open(SOCIAL_X_PROFILE_URL, "_blank", "noopener,noreferrer");
    if (!task || task.status === "claimed" || task.canClaim || submittingSocialTaskId === task.id) return;
    if (!isWalletVerified) {
      ue.error("Connect a verified wallet first.");
      return;
    }
    setSubmittingSocialTaskId(task.id);
    if (socialVisitTimerRef.current != null) {
      window.clearTimeout(socialVisitTimerRef.current);
    }
    socialVisitTimerRef.current = window.setTimeout(() => {
      socialVisitTimerRef.current = null;
      void (async () => {
        try {
          await onSubmitSocialTask(task.id, `visited:${SOCIAL_X_PROFILE_URL}`);
        } finally {
          setSubmittingSocialTaskId(null);
        }
      })();
    }, SOCIAL_X_VISIT_DELAY_MS);
  };
  const handleClaimSocialReward = async (taskId) => {
    if (!isWalletVerified) {
      ue.error("Connect a verified wallet first.");
      return;
    }
    setClaimingSocialTaskId(taskId);
    try {
      await onClaimSocialTask(taskId);
    } finally {
      setClaimingSocialTaskId(null);
    }
  };
  const showWalletCheckInError = (error) => {
    if (isUserRejectedError(error)) {
      ue.error("Transaction cancelled", {
        id: WALLET_CHECK_IN_TOAST_ID,
        duration: 5600
      });
      return;
    }
    const retryable = isRetryableWalletCheckInError(error);
    if (retryable) {
      ue.info("Check-in transaction is still confirming. No new MON was sent; press the button again to re-check the same transaction.", {
        id: WALLET_CHECK_IN_TOAST_ID,
        duration: 9e3
      });
      return;
    }
    clearPendingWalletCheckInTx(walletAddress);
    setPendingWalletCheckInTx(null);
    ue.error(`Wallet check-in failed: ${getErrorMessage(error)}`, {
      id: WALLET_CHECK_IN_TOAST_ID,
      duration: 5600
    });
  };
  const verifyWalletCheckInTxHash = async (txHash, pendingMessage) => {
    if (!walletAddress) throw new Error("Wallet is not connected.");
    writePendingWalletCheckInTx(walletAddress, txHash);
    setPendingWalletCheckInTx(txHash);
    ue.loading(pendingMessage, {
      id: WALLET_CHECK_IN_TOAST_ID,
      duration: 9e4
    });
    for (let attempt = 1; attempt <= WALLET_CHECK_IN_VERIFY_ATTEMPTS; attempt += 1) {
      try {
        await onWalletCheckIn(txHash);
        break;
      } catch (error) {
        if (attempt >= WALLET_CHECK_IN_VERIFY_ATTEMPTS || !isRetryableWalletCheckInError(error)) {
          throw error;
        }
        ue.loading(`Transaction sent. Waiting for Monad confirmation (${attempt}/${WALLET_CHECK_IN_VERIFY_ATTEMPTS})...`, {
          id: WALLET_CHECK_IN_TOAST_ID,
          duration: 9e4
        });
        await wait(WALLET_CHECK_IN_VERIFY_RETRY_MS);
      }
    }
    clearPendingWalletCheckInTx(walletAddress);
    setPendingWalletCheckInTx(null);
    setManualWalletCheckInTxHash("");
    ue.success("Daily wallet streak updated.", {
      id: WALLET_CHECK_IN_TOAST_ID,
      duration: 5600
    });
  };
  const handleWalletCheckIn = async () => {
    if (!walletAddress || !canUseWalletCheckInPayment || walletCheckInSubmitting) return;
    setWalletCheckInSubmitting(true);
    try {
      const pendingTxHash = pendingWalletCheckInTx ?? readPendingWalletCheckInTx(walletAddress);
      if (pendingTxHash) {
        await verifyWalletCheckInTxHash(pendingTxHash, "Verifying your already sent wallet check-in...");
        return;
      }
      const provider = getBrowserEthereumProvider();
      if (provider) {
        await ensureMonadMainnet(provider);
      }
      const paymentRequest = {
        to: walletCheckInReceiverAddress,
        value: parseEther(walletCheckInAmountMon)
      };
      const txHash = provider ? await provider.request({
        method: "eth_sendTransaction",
        params: [{
          from: walletAddress,
          to: paymentRequest.to,
          value: toHexQuantity(paymentRequest.value)
        }]
      }) : await sendMonadPayment({
        sendTransactionAsync,
        receiverAddress: paymentRequest.to,
        monAmount: walletCheckInAmountMon,
        purpose: "wallet-check-in",
        allowTestMode: false
      });
      if (typeof txHash !== "string" || !isWalletTransactionHash(txHash)) {
        throw new Error("Wallet did not return a transaction hash.");
      }
      await verifyWalletCheckInTxHash(txHash, "Wallet check-in transaction sent. Verifying on-chain...");
    } catch (error) {
      showWalletCheckInError(error);
    } finally {
      setWalletCheckInSubmitting(false);
    }
  };
  const handleVerifyExistingWalletCheckIn = async () => {
    if (!walletAddress || walletCheckInSubmitting) return;
    const txHash = normalizeWalletTransactionHash(manualWalletCheckInTxHash);
    if (!txHash) {
      ue.error("Paste a valid transaction hash first.", {
        id: WALLET_CHECK_IN_TOAST_ID,
        duration: 5600
      });
      return;
    }
    setWalletCheckInSubmitting(true);
    try {
      await verifyWalletCheckInTxHash(txHash, "Verifying pasted wallet check-in transaction...");
    } catch (error) {
      showWalletCheckInError(error);
    } finally {
      setWalletCheckInSubmitting(false);
    }
  };
  const renderRewardBadge = (task) => {
    const cubeChargeReward = "rewardCubeCharge" in task ? task.rewardCubeCharge ?? 0 : 0;
    if (cubeChargeReward > 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "h-4 w-4 text-cyan-200" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cyan-100", children: [
          "+",
          cubeChargeReward,
          " cube roll"
        ] })
      ] });
    }
    if (task.rewardBait) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Worm, { className: "h-4 w-4 text-lime-300" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lime-200", children: [
          task.rewardBait,
          " bait"
        ] })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CoinIcon, { size: "md" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-300", children: task.rewardCoins })
    ] });
  };
  const renderSocialRewardBadge = (task) => {
    if (task.rewardCubeCharge) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "h-4 w-4 text-cyan-200" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cyan-100", children: [
          "+",
          task.rewardCubeCharge,
          " cube rolls"
        ] })
      ] });
    }
    if (task.rewardBait) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Worm, { className: "h-4 w-4 text-lime-300" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lime-200", children: [
          task.rewardBait,
          " bait"
        ] })
      ] });
    }
    if (task.rewardCoins) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CoinIcon, { size: "md" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-300", children: task.rewardCoins })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#f3d47e]", children: "Preview" });
  };
  const getSocialStatusLabel = (task) => {
    if (task.status === "claimed") return "Claimed";
    if (task.canClaim || task.status === "verified") return "Ready";
    if (task.status === "pending_verification") return "Pending";
    return task.verificationMode === "automatic" ? "Available" : "Preview";
  };
  const getQuestStatusLabel = (task) => {
    if (task.claimed) return "Claimed";
    if (task.progress >= task.target) return "Ready";
    if (task.progress > 0) return "In progress";
    return "Not started";
  };
  const renderLeviathanBountyCard = () => {
    if (!leviathanBonusRod) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(QuestBoardCard, { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.64rem] font-black uppercase tracking-[0.16em] text-cyan-200/75 sm:text-xs", children: "Trophy bounty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 pr-2 text-[0.96rem] font-black uppercase tracking-[0.04em] text-[#f3c777] drop-shadow-[0_1px_0_rgba(0,0,0,0.6)] sm:text-[1.2rem]", children: "Catch Cosmic Leviathan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-[0.8rem] leading-5 text-[#f8e8bf]/88 sm:mt-2 sm:text-[0.97rem] sm:leading-6", children: [
            "Land it with the ",
            leviathanRequiredRod.name,
            ". The reward applies instantly on the catch result."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "inline-flex shrink-0 flex-col items-end rounded-2xl border bg-[linear-gradient(180deg,rgba(48,31,14,0.95)_0%,rgba(30,19,10,0.92)_100%)] px-2.5 py-1.5 text-right shadow-[0_8px_16px_rgba(0,0,0,0.28)] sm:px-3 sm:py-2",
            style: { borderColor: `${ROD_RARITY_COLORS[leviathanBonusRod.rarity]}80` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.14em] text-[#f8e8bf]/72", children: "Reward" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.8rem] font-black sm:text-sm", style: { color: ROD_RARITY_COLORS[leviathanBonusRod.rarity] }, children: leviathanBonusRod.name })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid gap-2 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-[#8f6a38]/70 bg-[rgba(15,10,7,0.62)] px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-[0.14em] text-[#f3c777]/70", children: "Required rod" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-black text-[#f8e8bf]", children: leviathanRequiredRod.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-[#8f6a38]/70 bg-[rgba(15,10,7,0.62)] px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-[0.14em] text-[#f3c777]/70", children: "Bounty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-black", style: { color: ROD_RARITY_COLORS[leviathanBonusRod.rarity] }, children: ROD_RARITY_NAMES[leviathanBonusRod.rarity] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-[#8f6a38]/70 bg-[rgba(15,10,7,0.62)] px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-[0.14em] text-[#f3c777]/70", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-black text-cyan-100", children: leviathanBountyStatus })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          disabled: ownsLeviathanBonusRod,
          onClick: () => {
            if (ownsLeviathanBonusRod) return;
            if (!hasLeviathanRodEquipped) {
              onEquipRod(leviathanRequiredRod.level);
              return;
            }
            onOpenFish();
          },
          className: "h-11 w-full rounded-[1rem] border border-[#7f5227] bg-[linear-gradient(180deg,#8c531f_0%,#6e4117_42%,#4f2f14_100%)] text-[0.86rem] font-black uppercase tracking-[0.04em] text-[#f8db9a] shadow-[inset_0_1px_0_rgba(255,220,160,0.22),0_10px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:brightness-110 disabled:border-[#3a2817] disabled:bg-[linear-gradient(180deg,#2f241c_0%,#231b15_100%)] disabled:text-[#8c7b63] disabled:shadow-none sm:h-[3.25rem] sm:rounded-[1.2rem] sm:text-[1.02rem]",
          children: ownsLeviathanBonusRod ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-2 h-4 w-4" }),
            "Reward owned"
          ] }) : hasLeviathanRodEquipped ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mr-2 h-4 w-4" }),
            "Go fish"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mr-2 h-4 w-4" }),
            "Equip ",
            leviathanRequiredRod.name
          ] })
        }
      ) })
    ] }) });
  };
  const boardHeader = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: `grid h-auto w-full gap-1 rounded-[1.1rem] border border-[#8f6a38]/70 bg-[rgba(16,11,8,0.84)] p-1 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-md sm:gap-1.5 sm:rounded-[1.35rem] sm:p-1.5 ${isMobileLayout ? "grid-cols-2" : weeklyMissionsEnabled ? "grid-cols-4" : "grid-cols-3"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "daily", className: "h-9 rounded-[0.8rem] px-2 text-[0.68rem] font-black uppercase tracking-[0.03em] text-[#ead4aa] data-[state=active]:border data-[state=active]:border-[#b6884b] data-[state=active]:bg-[rgba(48,31,14,0.92)] data-[state=active]:text-[#f8dfab] sm:h-10 sm:rounded-[0.95rem] sm:text-[0.82rem] sm:tracking-[0.05em]", children: "Daily" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "blockchain", className: "h-9 rounded-[0.8rem] px-2 text-[0.68rem] font-black uppercase tracking-[0.03em] text-[#ead4aa] data-[state=active]:border data-[state=active]:border-[#b6884b] data-[state=active]:bg-[rgba(48,31,14,0.92)] data-[state=active]:text-[#f8dfab] sm:h-10 sm:rounded-[0.95rem] sm:text-[0.82rem] sm:tracking-[0.05em]", children: "Blockchain" }),
    weeklyMissionsEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "weekly", className: "h-9 rounded-[0.8rem] px-2 text-[0.68rem] font-black uppercase tracking-[0.03em] text-[#ead4aa] data-[state=active]:border data-[state=active]:border-[#b6884b] data-[state=active]:bg-[rgba(48,31,14,0.92)] data-[state=active]:text-[#f8dfab] sm:h-10 sm:rounded-[0.95rem] sm:text-[0.82rem] sm:tracking-[0.05em]", children: "Weekly" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "social", className: `h-9 rounded-[0.8rem] px-2 text-[0.68rem] font-black uppercase tracking-[0.03em] text-[#ead4aa] data-[state=active]:border data-[state=active]:border-[#b6884b] data-[state=active]:bg-[rgba(48,31,14,0.92)] data-[state=active]:text-[#f8dfab] sm:h-10 sm:rounded-[0.95rem] sm:text-[0.82rem] sm:tracking-[0.05em] ${!weeklyMissionsEnabled ? "col-span-2 sm:col-span-1" : ""}`, children: "Social" })
  ] }) });
  const renderTaskBoard = (tasks, onClaim, footer, claimingId, leadingCard) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    QuestBoard,
    {
      layout: boardLayout,
      header: boardHeader,
      footer,
      headerPlacement: isMobileLayout ? "inline" : "fixed",
      footerPlacement: isMobileLayout ? "inline" : "fixed",
      viewportInsets: boardViewportInsets,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3", children: [
        leadingCard,
        tasks.map((task) => {
          const isWalletCheckInTask = task.id === "wallet_check_in";
          const taskProgress = isWalletCheckInTask && walletCheckInRepeatTestMode ? 0 : task.progress;
          const taskClaimed = isWalletCheckInTask && walletCheckInRepeatTestMode ? false : task.claimed;
          const complete = taskProgress >= task.target;
          const progress = Math.min(100, taskProgress / task.target * 100);
          const statusLabel = getQuestStatusLabel({ ...task, progress: taskProgress, claimed: taskClaimed });
          const cubeChargeReward = "rewardCubeCharge" in task ? task.rewardCubeCharge ?? 0 : 0;
          const isClaiming = claimingId === task.id;
          const isInviteFriendTask = task.id === "invite_friend";
          const hasPaymentIdentity = Boolean(walletAddress) && canUseWalletCheckInPayment;
          const walletCheckInReady = isWalletVerified && hasPaymentIdentity;
          const walletAlreadyCheckedInToday = !walletCheckInRepeatTestMode && Boolean(walletCheckInSummary == null ? void 0 : walletCheckInSummary.todayCheckedIn);
          const walletCheckInNeedsVerification = isWalletConnected && !walletCheckInReady;
          const walletCheckInStatusText = !hasPaymentIdentity ? walletCheckInNeedsVerification ? `Verify your wallet first, then send today's ${walletCheckInPriceLabel} transaction to start or continue your streak.` : `Connect your wallet first, then send today's ${walletCheckInPriceLabel} transaction to start or continue your streak.` : !walletCheckInReady ? `Verify your wallet first, then send today's ${walletCheckInPriceLabel} transaction to start or continue your streak.` : walletCheckInLoading ? "Refreshing streak status..." : pendingWalletCheckInTx ? "A check-in transaction was already sent. Press the button to verify the same transaction; no new MON will be sent." : walletAlreadyCheckedInToday ? `Checked in today. Streak: ${formatStreakDays(walletCheckInSummary.streakDays)}.` : (walletCheckInSummary == null ? void 0 : walletCheckInSummary.lastCheckInDate) ? `Current streak: ${formatStreakDays(walletCheckInSummary.streakDays)}. Send today's ${walletCheckInPriceLabel} check-in to keep it going.` : `Start your streak with a ${walletCheckInPriceLabel} check-in today.`;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(QuestBoardCard, { className: isWalletCheckInTask || isInviteFriendTask ? "md:col-span-2" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "pr-2 text-[0.96rem] font-black uppercase tracking-[0.04em] text-[#f3c777] drop-shadow-[0_1px_0_rgba(0,0,0,0.6)] sm:text-[1.2rem]", children: task.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[0.8rem] leading-5 text-[#f8e8bf]/88 sm:mt-2 sm:text-[0.97rem] sm:leading-6", children: task.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex shrink-0 items-center gap-1.5 rounded-2xl border border-[#c89745] bg-[linear-gradient(180deg,rgba(48,31,14,0.95)_0%,rgba(30,19,10,0.92)_100%)] px-2.5 py-1.5 text-[0.8rem] font-black text-[#ffd56d] shadow-[0_8px_16px_rgba(0,0,0,0.28)] sm:px-3 sm:py-2 sm:text-sm", children: renderRewardBadge(task) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center justify-between text-[0.78rem] text-[#f8e8bf]/82 sm:mb-2 sm:text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  taskProgress,
                  "/",
                  task.target
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: statusLabel })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 rounded-full border border-[#684623] bg-[#120d09] px-1 py-[3px] shadow-[inset_0_2px_5px_rgba(0,0,0,0.55)] sm:h-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full rounded-full bg-[linear-gradient(180deg,#8cecff_0%,#55dbff_100%)] shadow-[0_0_16px_rgba(96,223,255,0.7)] transition-all duration-300",
                  style: { width: `${progress}%` }
                }
              ) })
            ] }),
            isWalletCheckInTask && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-[1.05rem] border border-[#8f6a38] bg-[linear-gradient(180deg,rgba(30,22,15,0.82)_0%,rgba(20,15,10,0.9)_100%)] p-3 sm:mt-4 sm:rounded-[1.2rem]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#f8e8bf]/80 sm:text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Streak: ",
                  formatStreakDays((walletCheckInSummary == null ? void 0 : walletCheckInSummary.streakDays) ?? 0)
                ] }),
                (walletCheckInSummary == null ? void 0 : walletCheckInSummary.lastCheckInAt) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Last check-in ",
                  new Date(walletCheckInSummary.lastCheckInAt).toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[0.78rem] leading-5 text-[#f8e8bf]/82 sm:text-sm", children: walletCheckInStatusText }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectButton.Custom, { children: ({ openConnectModal }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  disabled: walletCheckInSubmitting || walletCheckInLoading || isWalletVerifying || walletAlreadyCheckedInToday,
                  onClick: () => {
                    if (!hasPaymentIdentity) {
                      if (walletCheckInNeedsVerification && onVerifyWallet) {
                        void onVerifyWallet();
                        return;
                      }
                      openConnectModal == null ? void 0 : openConnectModal();
                      return;
                    }
                    if (!walletCheckInReady) {
                      if (onVerifyWallet) {
                        void onVerifyWallet();
                      } else {
                        ue.info("Wallet verification is still starting. Try again in a moment.");
                      }
                      return;
                    }
                    void handleWalletCheckIn();
                  },
                  className: "mt-3 h-10 w-full rounded-[1rem] border border-[#7f5227] bg-[linear-gradient(180deg,#8c531f_0%,#6e4117_42%,#4f2f14_100%)] text-[0.78rem] font-black uppercase tracking-[0.04em] text-[#f8db9a] shadow-[inset_0_1px_0_rgba(255,220,160,0.22),0_10px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:brightness-110 disabled:border-[#3a2817] disabled:bg-[linear-gradient(180deg,#2f241c_0%,#231b15_100%)] disabled:text-[#8c7b63] disabled:shadow-none sm:h-11 sm:text-sm",
                  children: walletCheckInSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "mr-2 h-4 w-4" }),
                    "Verifying transaction"
                  ] }) : walletAlreadyCheckedInToday ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-2 h-4 w-4" }),
                    "Checked in today"
                  ] }) : isWalletVerifying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "mr-2 h-4 w-4" }),
                    "Verifying wallet"
                  ] }) : walletCheckInNeedsVerification ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
                    "Verify wallet to check in"
                  ] }) : !hasPaymentIdentity ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
                    "Connect wallet to check in"
                  ] }) : !walletCheckInReady ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "mr-2 h-4 w-4" }),
                    "Preparing wallet"
                  ] }) : pendingWalletCheckInTx ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "mr-2 h-4 w-4" }),
                    "Verify sent check-in"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
                    "Send ",
                    walletCheckInPriceLabel,
                    " check-in"
                  ] })
                }
              ) }),
              walletCheckInReady && !walletAlreadyCheckedInToday && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: manualWalletCheckInTxHash,
                    onChange: (event) => setManualWalletCheckInTxHash(event.target.value),
                    placeholder: "Paste existing tx hash",
                    disabled: walletCheckInSubmitting,
                    className: "h-10 rounded-[0.9rem] border-[#7f5227] bg-[rgba(12,8,5,0.74)] text-[0.76rem] font-bold text-[#f8db9a] placeholder:text-[#9b815b] focus-visible:ring-[#c89745] sm:text-xs"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    disabled: walletCheckInSubmitting || !normalizeWalletTransactionHash(manualWalletCheckInTxHash),
                    onClick: () => void handleVerifyExistingWalletCheckIn(),
                    className: "h-10 rounded-[0.9rem] border border-[#6b7f27] bg-[linear-gradient(180deg,#5f8122_0%,#456519_100%)] px-3 text-[0.74rem] font-black uppercase tracking-[0.04em] text-[#efffc8] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_8px_14px_rgba(0,0,0,0.24)] hover:brightness-110 disabled:border-[#30351d] disabled:bg-[linear-gradient(180deg,#2f3324_0%,#25271d_100%)] disabled:text-[#7b826b] sm:text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-2 h-4 w-4" }),
                      "Verify tx"
                    ]
                  }
                )
              ] })
            ] }),
            isInviteFriendTask && REFERRAL_BAIT_ENABLED && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-[1.05rem] border border-[#8f6a38] bg-[linear-gradient(180deg,rgba(30,22,15,0.82)_0%,rgba(20,15,10,0.9)_100%)] p-3 sm:mt-4 sm:rounded-[1.2rem]", children: Boolean(walletAddress) && (referralSummary == null ? void 0 : referralSummary.referralLink) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-xl border border-[#8f6a38] bg-[rgba(15,10,7,0.7)] px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.12em] text-[#f3c777]/80", children: "Rewarded referrals" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-lg font-black text-[#f8e8bf]", children: [
                    referralSummary.rewardedReferralCount,
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-sm font-bold text-[#c8ab7d]", children: [
                      "/ ",
                      referralSummary.maxRewardedReferrals
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-[#9a7a33] bg-[rgba(92,70,21,0.42)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#f3d47e]", children: "+10 bait" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: referralSummary.referralLink,
                    readOnly: true,
                    className: "h-11 flex-1 border-[#6f4928] bg-[rgba(15,10,7,0.7)] text-[#f8e8bf]"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => void handleCopyReferralLink(),
                    className: "h-11 gap-2 border-[#6f4928] bg-[rgba(15,10,7,0.7)] px-4 text-[#f8e8bf] hover:bg-[rgba(30,22,15,0.88)]",
                    children: copiedReferral ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
                      "Copied"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
                      "Copy link"
                    ] })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[0.78rem] leading-5 text-[#f8e8bf]/82 sm:text-sm", children: "Invite friends from here. Each invited wallet is locked to the first valid referrer link." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-[0.78rem] leading-5 text-[#f8e8bf]/82 sm:text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Connect and verify your wallet first, then your referral link will appear here." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The reward stays in Blockchain quests, not in Settings." })
            ] }) }),
            !(isWalletCheckInTask && walletCheckInRepeatTestMode) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                disabled: !complete || taskClaimed || isClaiming,
                onClick: () => {
                  void onClaim(task.id);
                },
                className: "h-11 w-full rounded-[1rem] border border-[#7f5227] bg-[linear-gradient(180deg,#8c531f_0%,#6e4117_42%,#4f2f14_100%)] text-[0.86rem] font-black uppercase tracking-[0.04em] text-[#f8db9a] shadow-[inset_0_1px_0_rgba(255,220,160,0.22),0_10px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:brightness-110 disabled:border-[#3a2817] disabled:bg-[linear-gradient(180deg,#2f241c_0%,#231b15_100%)] disabled:text-[#8c7b63] disabled:shadow-none sm:h-[3.25rem] sm:rounded-[1.2rem] sm:text-[1.02rem]",
                children: taskClaimed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-2 h-4 w-4" }),
                  "Claimed"
                ] }) : isClaiming ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "mr-2 h-4 w-4" }),
                  "Claiming..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  cubeChargeReward > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "mr-2 h-4 w-4" }) : task.rewardBait ? /* @__PURE__ */ jsxRuntimeExports.jsx(Worm, { className: "mr-2 h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "mr-2 h-4 w-4" }),
                  "Claim reward"
                ] })
              }
            ) })
          ] }) }, task.id);
        })
      ] })
    }
  );
  const renderSocialTaskBoard = (footer) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    QuestBoard,
    {
      layout: boardLayout,
      header: boardHeader,
      footer,
      headerPlacement: isMobileLayout ? "inline" : "fixed",
      footerPlacement: isMobileLayout ? "inline" : "fixed",
      viewportInsets: boardViewportInsets,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3", children: socialTaskCards.map((task) => {
        const Icon = task.icon;
        const isXFollowTask = task.id === "twitter_follow";
        const isSubmitting = submittingSocialTaskId === task.id || socialTasksLoading;
        const isClaiming = claimingSocialTaskId === task.id;
        const isClaimed = task.status === "claimed";
        const canClaim = task.canClaim && !isClaimed;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(QuestBoardCard, { className: `min-h-[11rem] text-left md:min-h-[12.75rem] ${isXFollowTask ? "md:col-span-2" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-12 w-12 items-center justify-center rounded-[1rem] border border-[#8f6a38] bg-[rgba(15,10,7,0.72)] text-[#f3c777] shadow-[0_8px_16px_rgba(0,0,0,0.28)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#9a7a33] bg-[rgba(92,70,21,0.42)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#f3d47e]", children: getSocialStatusLabel(task) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 pr-2 text-[0.96rem] font-black uppercase tracking-[0.04em] text-[#f3c777] drop-shadow-[0_1px_0_rgba(0,0,0,0.6)] sm:mt-4 sm:text-[1.2rem]", children: task.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[0.8rem] leading-5 text-[#f8e8bf]/88 sm:mt-2 sm:text-[0.97rem] sm:leading-6", children: isXFollowTask ? task.description : "Social quests are still in preview. Rewards and verification will unlock in a later update." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 inline-flex w-fit items-center gap-1.5 rounded-2xl border border-[#c89745] bg-[rgba(18,13,9,0.68)] px-2.5 py-1.5 text-[0.8rem] font-black shadow-[0_8px_16px_rgba(0,0,0,0.22)] sm:px-3 sm:text-sm", children: renderSocialRewardBadge(task) }),
          isXFollowTask ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                disabled: isSubmitting || isClaiming || isClaimed,
                onClick: () => {
                  if (canClaim) void handleClaimSocialReward(task.id);
                  else handleOpenXProfile(task);
                },
                className: "h-11 w-full rounded-[1rem] border border-[#7f5227] bg-[linear-gradient(180deg,#8c531f_0%,#6e4117_42%,#4f2f14_100%)] text-[0.86rem] font-black uppercase tracking-[0.04em] text-[#f8db9a] shadow-[inset_0_1px_0_rgba(255,220,160,0.22),0_10px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:brightness-110 disabled:border-[#3a2817] disabled:bg-[linear-gradient(180deg,#2f241c_0%,#231b15_100%)] disabled:text-[#8c7b63] disabled:shadow-none sm:h-[3.25rem] sm:rounded-[1.2rem] sm:text-[1.02rem]",
                children: isClaimed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-2 h-4 w-4" }),
                  "Claimed"
                ] }) : isClaiming ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "mr-2 h-4 w-4" }),
                  "Claiming..."
                ] }) : canClaim ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { className: "mr-2 h-4 w-4" }),
                  "Claim 3 cube rolls"
                ] }) : isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "mr-2 h-4 w-4" }),
                  "Checking visit..."
                ] }) : isWalletVerified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
                  "Open X and start check"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
                  "Open X profile"
                ] })
              }
            ),
            task.proofUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[0.72rem] font-bold text-[#f8e8bf]/72 sm:text-xs", children: [
              "Visit recorded: @",
              SOCIAL_X_TARGET_USERNAME
            ] }),
            isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[0.72rem] font-bold text-[#f8e8bf]/72 sm:text-xs", children: "Keep the X profile open for a few seconds. The quest will become ready automatically." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: () => ue.info("Social quests are still in preview."),
              className: "h-11 w-full rounded-[1rem] border border-[#7f5227] bg-[linear-gradient(180deg,#8c531f_0%,#6e4117_42%,#4f2f14_100%)] text-[0.86rem] font-black uppercase tracking-[0.04em] text-[#f8db9a] shadow-[inset_0_1px_0_rgba(255,220,160,0.22),0_10px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:brightness-110 sm:h-[3.25rem] sm:rounded-[1.2rem] sm:text-[1.02rem]",
              children: "Preview only"
            }
          ) })
        ] }) }, task.id);
      }) })
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GameScreenShell,
    {
      title: "Quest Board",
      subtitle: "Daily, blockchain, weekly, and social progression all live here.",
      backgroundImage: questBackgrounds[activeTab],
      backgroundFit: "cover",
      overlayClassName: "bg-[linear-gradient(180deg,rgba(8,6,3,0.18)_0%,rgba(10,8,5,0.2)_48%,rgba(6,5,3,0.26)_100%)]",
      headerHidden: true,
      shellPaddingClassName: "px-0 pb-[calc(var(--bottom-nav-clearance,6rem)+0.35rem)] pt-0",
      contentWrapperClassName: "mx-auto mt-0 min-h-0 w-full flex-1 overflow-hidden",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Tabs,
        {
          value: activeTab,
          onValueChange: (value) => setActiveTab(value),
          className: "flex h-full min-h-0 flex-col",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "daily", className: "mt-0 min-h-0 flex-1 overflow-hidden", children: renderTaskBoard(
              dailyTasks,
              onClaimTask,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuestBoardPlaque,
                {
                  eyebrow: "Daily prize cube",
                  description: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    claimedCount,
                    "/",
                    dailyTasks.length,
                    " claimed. ",
                    availableWheelRolls > 0 ? `${availableWheelRolls} roll${availableWheelRolls === 1 ? "" : "s"} ready.` : dailyTaskClaimsMet ? "Done for today." : "Claim 3 daily tasks to unlock it."
                  ] }),
                  action: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      disabled: availableWheelRolls <= 0,
                      onClick: onOpenWheel,
                      className: "h-11 shrink-0 rounded-[1rem] border border-[#7f5227] bg-[linear-gradient(180deg,#8c531f_0%,#6e4117_42%,#4f2f14_100%)] px-4 text-sm font-black uppercase tracking-[0.04em] text-[#f8db9a] shadow-[inset_0_1px_0_rgba(255,220,160,0.22),0_10px_16px_rgba(0,0,0,0.28)] transition-all duration-200 hover:brightness-110 disabled:border-[#3a2817] disabled:bg-[linear-gradient(180deg,#2f241c_0%,#231b15_100%)] disabled:text-[#8c7b63] disabled:shadow-none",
                      children: availableWheelRolls > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mr-2 h-4 w-4" }),
                        "Open cube"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "mr-2 h-4 w-4" }),
                        "Locked"
                      ] })
                    }
                  )
                }
              ),
              claimingTaskId
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "blockchain", className: "mt-0 min-h-0 flex-1 overflow-hidden", children: renderTaskBoard(
              specialTasks,
              onClaimTask,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuestBoardPlaque,
                {
                  eyebrow: "Wallet-linked",
                  description: isWalletVerified ? "Wallet check-in and friend-invite rewards live here now." : "Connect and verify your wallet to unlock blockchain quests and referral rewards."
                }
              ),
              claimingTaskId,
              renderLeviathanBountyCard()
            ) }),
            weeklyMissionsEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "weekly", className: "mt-0 min-h-0 flex-1 overflow-hidden", children: renderTaskBoard(
              weeklyMissions,
              onClaimWeeklyMission,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuestBoardPlaque,
                {
                  eyebrow: "Long ladder",
                  description: "Weekly quests track bigger goals and can award bonus cube charges."
                }
              ),
              claimingWeeklyMissionId
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "social", className: "mt-0 min-h-0 flex-1 overflow-hidden", children: renderSocialTaskBoard(
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuestBoardPlaque,
                {
                  eyebrow: "Community loop",
                  description: isWalletVerified ? `Open @${SOCIAL_X_TARGET_USERNAME}, wait a few seconds, and claim 3 cube rolls.` : "Connect your wallet first. Social quests and verified rewards only work on wallet-linked accounts."
                }
              )
            ) })
          ]
        }
      )
    }
  );
};
export {
  TasksScreen as default
};
