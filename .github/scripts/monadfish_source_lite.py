#!/usr/bin/env python3
from pathlib import Path
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/monadfish-upstream")
src = root / "src"
if not src.exists():
    raise SystemExit(f"MonadFish source directory not found: {src}")


def write(rel: str, text: str) -> None:
    path = root / rel
    path.write_text(text, encoding="utf-8")
    print(f"patched {rel}")


# Lite is a normal browser game. Remove Wagmi/RainbowKit providers at the root so
# wallet connector frameworks are not initialized or included through App.tsx.
write("src/App.tsx", r'''import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicAsset } from '@/lib/assets';
import Index from "./pages/Index";

const queryClient = new QueryClient();

document.documentElement.style.setProperty(
  '--pattern-bg-image',
  `url("${publicAsset('assets/pattern-bg.png')}")`
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" closeButton richColors />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
''')


# Keep the hook contract used by FishingGame, but make it deliberately wallet-free.
# The real Lite identity is supplied by useGuestSession + the local API shim.
write("src/hooks/useWalletAuth.ts", r'''export interface ReferralSummary {
  rewardedReferralCount: number;
  todayReferralAttachCount: number;
  maxRewardedReferrals: number;
  referrerWalletAddress: string | null;
  referralLink: string | null;
}

const noopAsync = async () => false;
const noop = () => undefined;

export function useWalletAuth() {
  return {
    address: undefined as string | undefined,
    isConnected: false,
    isVerified: false,
    isVerifying: false,
    savedPlayer: null,
    savedPlayerSyncMode: 'server' as const,
    savedGameProgress: null,
    hasPendingPlayerSave: false,
    walletSessionResolving: false,
    verificationError: null as string | null,
    referralSummary: null as ReferralSummary | null,
    saveProgress: noopAsync,
    saveWalletSnapshot: noopAsync,
    flushPlayerSave: noopAsync,
    flushGameProgressSave: noopAsync,
    flushWalletSnapshot: noopAsync,
    saveGameProgress: noopAsync,
    saveVerifiedNickname: noopAsync,
    syncServerPlayerRecord: noop,
    retryVerifyWallet: noopAsync,
    disconnect: noop,
  };
}
''')


# Replace the top-left player HUD with a wallet-free Lite HUD. This removes
# WalletDialog/usePlayerMon/useAdminAccess from the reachable module graph.
write("src/components/game/PlayerPanel.tsx", r'''import React, { useState } from 'react';
import { ChevronDown, Info, Package, Trophy, Worm } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CoinIcon from './CoinIcon';
import PlayerLevelAvatar from '@/components/PlayerLevelAvatar';
import PlayerStatItem from '@/components/PlayerStatItem';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const PlayerPanel: React.FC<any> = ({ player }) => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const xpPercentage = player?.xpToNextLevel > 0 ? (player.xp / player.xpToNextLevel) * 100 : 0;
  const totalFishCount = (player?.inventory || []).reduce((sum: number, fish: any) => sum + (fish.quantity || 0), 0);
  const totalDishCount = (player?.cookedDishes || []).reduce((sum: number, dish: any) => sum + (dish.quantity || 0), 0);
  const totalBait = Math.max(0, Number(player?.bait || 0)) + Math.max(0, Number(player?.dailyFreeBait || 0));

  return (
    <>
      <div className={cn('fixed z-30 flex items-center gap-1.5', isMobile ? 'left-3 top-3' : 'left-5 top-5')}>
        <a
          href="/fish/games/monadfish/guide.html"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 bg-black/85 text-cyan-100 shadow-md backdrop-blur-md transition hover:border-cyan-300/40"
          aria-label="游戏说明"
          title="游戏说明"
        >
          <Info className="h-4 w-4" />
        </a>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border border-cyan-300/24 bg-black/88 px-2.5 py-1.5 text-zinc-100 shadow-[0_12px_26px_rgba(0,0,0,0.48)] backdrop-blur-md transition-all hover:scale-[1.03] hover:border-cyan-300/38 hover:bg-zinc-950 active:scale-95',
            isExpanded && 'border-cyan-300/40',
          )}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? '收起等级详情' : '查看等级详情'}
        >
          <div className="rounded-full border border-cyan-300/18">
            <PlayerLevelAvatar level={player?.level || 1} avatarUrl={player?.avatarUrl} size="sm" />
          </div>
          {!isMobile && (
            <>
              <span className="text-left">
                <span className="block text-[10px] font-bold text-cyan-100/75">等级</span>
                <span className="block max-w-[6.5rem] truncate text-sm font-black text-zinc-100">
                  {player?.nickname || `Lv. ${player?.level || 1}`}
                </span>
              </span>
              <ChevronDown className={cn('h-4 w-4 shrink-0 text-cyan-100 transition-transform', isExpanded && 'rotate-180')} />
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className={cn('fixed z-30', isMobile ? 'left-3 top-[3.85rem] w-[min(18rem,calc(100vw-1.5rem))]' : 'left-5 top-[4.65rem] w-[18.75rem]')}>
          <Card className="border border-cyan-300/16 bg-black/92 p-3 text-zinc-100 shadow-[0_18px_40px_rgba(0,0,0,0.58)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <PlayerLevelAvatar level={player?.level || 1} avatarUrl={player?.avatarUrl} size="md" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-black text-zinc-100">{player?.nickname || `等级 ${player?.level || 1}`}</p>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-zinc-900 ring-1 ring-zinc-800">
                  <div className="h-full rounded-full bg-cyan-300" style={{ width: `${Math.min(100, Math.max(0, xpPercentage))}%` }} />
                </div>
                <p className="mt-1 text-xs font-semibold text-zinc-400">{player?.xp || 0}/{player?.xpToNextLevel || 0} 经验</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <PlayerStatItem compact icon={<CoinIcon size="sm" />} label="金币" value={player?.coins || 0} />
              <PlayerStatItem compact icon={<Worm className="h-4 w-4 text-zinc-200" />} label="鱼饵" value={totalBait} />
              <PlayerStatItem compact icon={<Trophy className="h-4 w-4 text-zinc-200" />} label="鱼获" value={player?.totalCatches || 0} />
              <PlayerStatItem compact icon={<Package className="h-4 w-4 text-zinc-200" />} label="收藏" value={totalFishCount + totalDishCount} />
            </div>
            <div className="mt-3 rounded-xl border border-cyan-300/10 bg-cyan-300/5 px-3 py-2 text-xs text-cyan-100/75">进度仅保存在当前浏览器，本版本不连接钱包。</div>
          </Card>
        </div>
      )}
    </>
  );
};

export default PlayerPanel;
''')


# Wallet/MON payment shop is replaced by a local-coin shop. The existing player
# action callbacks still perform purchases against the Lite compatibility layer.
write("src/components/game/ShopScreen.tsx", r'''import React from 'react';
import { Coins, Worm } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ROD_DATA } from '@/types/game';
import { BAIT_PACKAGES } from '@/lib/baitEconomy';
import CoinIcon from './CoinIcon';

const ShopScreen: React.FC<any> = ({ coins = 0, bait = 0, dailyFreeBait = 0, rodLevel = 0, onBuyBait, onBuyRod }) => {
  const totalBait = Math.max(0, Number(bait || 0)) + Math.max(0, Number(dailyFreeBait || 0));
  const rods = ROD_DATA.filter((rod: any) => rod.level > 0 && Number(rod.coinCost || 0) > 0);

  return (
    <div className="h-full overflow-y-auto bg-[#05060b] px-4 pb-28 pt-5 text-zinc-100">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200/70">本地商店</p><h2 className="text-2xl font-black">商店</h2></div>
          <div className="flex gap-2 text-xs font-bold">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/20 bg-black/70 px-3 py-1.5"><CoinIcon size="sm" /> {coins} 金币</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-cyan-300/20 bg-black/70 px-3 py-1.5"><Worm className="h-4 w-4" /> {totalBait} 鱼饵</span>
          </div>
        </div>

        <Card className="mb-4 border-cyan-300/15 bg-black/65 p-4 text-zinc-100">
          <h3 className="mb-3 text-lg font-black text-cyan-100">购买鱼饵</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {BAIT_PACKAGES.map((pack: any, index: number) => {
              const amount = Number(pack.amount ?? pack.bait ?? pack.quantity ?? 0);
              const cost = Number(pack.cost ?? pack.coinCost ?? pack.coins ?? 0);
              const disabled = amount <= 0 || cost <= 0 || coins < cost;
              return (
                <Button key={pack.id || index} disabled={disabled} onClick={() => onBuyBait?.(amount, cost)} className="h-auto min-h-14 justify-between rounded-xl border border-cyan-300/15 bg-zinc-950 px-4 text-left hover:bg-zinc-900">
                  <span><b className="block text-cyan-100">{amount || '?'} 个鱼饵</b><small className="text-zinc-400">补充抛竿资源</small></span>
                  <span className="inline-flex items-center gap-1 font-black text-amber-200"><Coins className="h-4 w-4" />{cost || '?'}</span>
                </Button>
              );
            })}
          </div>
        </Card>

        <Card className="border-cyan-300/15 bg-black/65 p-4 text-zinc-100">
          <h3 className="mb-3 text-lg font-black text-cyan-100">升级鱼竿</h3>
          <div className="grid gap-2">
            {rods.map((rod: any) => {
              const cost = Number(rod.coinCost || 0);
              const owned = rod.level <= rodLevel;
              return (
                <div key={rod.id || rod.level} className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
                  <div><b className="block">{rod.name || `鱼竿 Lv.${rod.level}`}</b><small className="text-zinc-400">等级 {rod.level}</small></div>
                  <Button disabled={owned || coins < cost} onClick={() => onBuyRod?.(rod.level, cost)} className="rounded-xl bg-cyan-300 text-black hover:bg-cyan-200">
                    {owned ? '已拥有' : `${cost} 金币`}
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>

        <p className="mt-4 text-center text-xs text-zinc-500">中文版 Lite 已移除钱包、MON 支付、充值和提现入口。</p>
      </div>
    </div>
  );
};

export default ShopScreen;
''')


# Remove the blockchain/wallet quest implementation (ConnectButton, wagmi tx,
# chain switching). Keep useful local tasks in a Chinese, wallet-free task list.
write("src/components/game/TasksScreen.tsx", r'''import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const taskTitle = (task: any, index: number) => task?.title || task?.name || task?.label || `任务 ${index + 1}`;
const taskDescription = (task: any) => task?.description || task?.desc || task?.requirement || '';
const taskStatus = (task: any) => String(task?.status || '').toLowerCase();

const TasksScreen: React.FC<any> = (props) => {
  const daily = Array.isArray(props.dailyTasks) ? props.dailyTasks : [];
  const special = Array.isArray(props.specialTasks) ? props.specialTasks : [];
  const weekly = props.weeklyMissionsEnabled && Array.isArray(props.weeklyMissions) ? props.weeklyMissions : [];
  const localTasks = [...daily, ...special, ...weekly];

  const claim = (task: any) => {
    const id = task?.id;
    if (!id) return;
    if (weekly.includes(task)) props.onClaimWeeklyMission?.(id);
    else props.onClaimTask?.(id);
  };

  return (
    <div className="h-full overflow-y-auto bg-[#05060b] px-4 pb-28 pt-5 text-zinc-100">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200/70">本地成长</p>
        <h2 className="mb-1 text-2xl font-black">任务</h2>
        <p className="mb-4 text-sm leading-6 text-zinc-400">完成钓鱼与成长任务获取游戏内奖励。钱包签到、链上转账和 MON 支付任务已从中文版移除。</p>

        <div className="grid gap-3">
          {localTasks.length === 0 ? (
            <Card className="border-cyan-300/15 bg-black/65 p-5 text-center text-zinc-300">当前没有可显示的本地任务，先去钓几条鱼吧。</Card>
          ) : localTasks.map((task: any, index: number) => {
            const status = taskStatus(task);
            const completed = ['completed','claimed','done'].includes(status) || task?.claimed === true;
            const claimable = task?.canClaim === true || ['claimable','ready'].includes(status);
            return (
              <Card key={task?.id || index} className="border-cyan-300/15 bg-black/65 p-4 text-zinc-100">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <b className="block text-base text-cyan-100">{taskTitle(task, index)}</b>
                    {taskDescription(task) && <p className="mt-1 text-sm leading-6 text-zinc-400">{taskDescription(task)}</p>}
                    <p className="mt-2 text-xs text-zinc-500">状态：{completed ? '已完成' : claimable ? '可领取' : '进行中'}</p>
                  </div>
                  <Button disabled={!claimable || completed} onClick={() => claim(task)} className="shrink-0 rounded-xl bg-cyan-300 text-black hover:bg-cyan-200">
                    {completed ? '已领取' : claimable ? '领取' : '进行中'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <Button onClick={props.onOpenFish} variant="outline" className="mt-4 w-full rounded-xl border-cyan-300/20 bg-black text-cyan-100 hover:bg-zinc-950">返回钓鱼</Button>
      </div>
    </div>
  );
};

export default TasksScreen;
''')


# Critical gameplay labels are localized in source (not DOM post-processing),
# preventing React re-renders from restoring English aria-label values.
controls_path = root / "src/components/game/GameControls.tsx"
controls = controls_path.read_text(encoding="utf-8")
translations = {
    "'Hook fish'": "'提竿'",
    "'Premium cast'": "'高级抛竿'",
    "'Cast line'": "'抛竿'",
    "'No bait'": "'鱼饵不足'",
    ">Caught!</p>": ">钓到了！</p>",
    ">Casting...</GameStateNotice>": ">正在抛竿…</GameStateNotice>",
    ">Waiting for a bite...</GameStateNotice>": ">等待鱼儿咬钩…</GameStateNotice>",
    ">Reeling in!</GameStateNotice>": ">正在收线！</GameStateNotice>",
    "Experience for trying": "尝试也会获得经验",
    "Could not credit wallet reward.": "此奖励在 Lite 版中不可用。",
    "Connect a verified wallet to credit this MON reward.": "Lite 版不提供链上奖励。",
}
for old, new in translations.items():
    controls = controls.replace(old, new)
controls_path.write_text(controls, encoding="utf-8")
print("patched src/components/game/GameControls.tsx")

print("MonadFish source-level Chinese Lite patch complete")
