#!/usr/bin/env python3
from pathlib import Path
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/monadfish-upstream")
path = root / "src/components/game/WheelScreen.tsx"
if not path.parent.exists():
    raise SystemExit(f"game component directory not found: {path.parent}")

path.write_text(r'''import React, { useState } from 'react';
import { Box, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const prizeLabel = (prize: any) => {
  if (!prize) return '未知奖励';
  if (prize.label) return String(prize.label);
  if (prize.coins) return `${prize.coins} 金币`;
  if (prize.bait) return `${prize.bait} 鱼饵`;
  if (prize.fishId) return `鱼获：${prize.fishId}`;
  if (prize.rodLevel != null) return `鱼竿等级 ${prize.rodLevel}`;
  return '神秘奖励';
};

const WheelScreen: React.FC<any> = ({
  coins = 0,
  availableRolls = 0,
  dailyWheelRolls = 0,
  paidWheelRolls = 0,
  onRequestRoll,
  onResolveReward,
  onOpenTasks,
  onSpinStartSound,
  onRevealSound,
  onRewardSound,
}) => {
  const [busy, setBusy] = useState(false);
  const [lastPrize, setLastPrize] = useState<any>(null);
  const localRolls = Math.max(0, Number(availableRolls || 0));

  const spin = async () => {
    if (busy || localRolls <= 0) return;
    setBusy(true);
    setLastPrize(null);
    try {
      onSpinStartSound?.();
      const roll = await onRequestRoll?.();
      if (!roll?.prize) return;
      onRevealSound?.();
      const resolved = await onResolveReward?.(roll.prize, roll.id);
      setLastPrize(resolved || roll.prize);
      onRewardSound?.();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-[#05060b] px-4 pb-28 pt-6 text-zinc-100">
      <div className="mx-auto flex min-h-[75vh] w-full max-w-2xl flex-col items-center justify-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-200/75">本地奖励玩法</p>
        <h2 className="mt-1 text-3xl font-black">幸运魔方</h2>
        <p className="mt-2 max-w-md text-center text-sm leading-6 text-zinc-400">使用游戏内获得的免费次数抽取奖励。中文版已移除连接钱包和付费购买额外次数。</p>

        <div className={`mt-8 flex h-44 w-44 items-center justify-center rounded-[2rem] border border-violet-300/35 bg-[radial-gradient(circle_at_35%_30%,rgba(167,139,250,.5),rgba(17,24,39,.95)_62%)] shadow-[0_20px_70px_rgba(124,58,237,.25)] ${busy ? 'animate-pulse' : ''}`}>
          <Box className={`h-20 w-20 text-violet-100 ${busy ? 'animate-spin' : ''}`} />
        </div>

        <div className="mt-6 flex gap-2 text-xs font-bold">
          <span className="rounded-full border border-cyan-300/20 bg-black/70 px-3 py-1.5">可用次数：{localRolls}</span>
          <span className="rounded-full border border-amber-300/20 bg-black/70 px-3 py-1.5">金币：{coins}</span>
        </div>

        <Button onClick={spin} disabled={busy || localRolls <= 0} className="mt-5 min-h-12 min-w-44 rounded-2xl bg-violet-300 px-7 text-base font-black text-black hover:bg-violet-200">
          <Sparkles className="mr-2 h-5 w-5" />{busy ? '魔方转动中…' : localRolls > 0 ? '转动魔方' : '暂无可用次数'}
        </Button>

        {lastPrize && (
          <Card className="mt-5 w-full max-w-sm border-cyan-300/20 bg-black/75 p-5 text-center text-zinc-100">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200/70">本次奖励</p>
            <p className="mt-2 text-xl font-black text-cyan-100">{prizeLabel(lastPrize)}</p>
          </Card>
        )}

        {localRolls <= 0 && (
          <Button onClick={onOpenTasks} variant="outline" className="mt-4 rounded-xl border-cyan-300/20 bg-black text-cyan-100 hover:bg-zinc-950">去任务页获取游戏内次数</Button>
        )}

        <p className="mt-5 text-center text-xs text-zinc-600">上游字段中的 paidWheelRolls={Number(paidWheelRolls || 0)} 不用于中文版购买入口；dailyWheelRolls={Number(dailyWheelRolls || 0)}。</p>
      </div>
    </div>
  );
};

export default WheelScreen;
''', encoding='utf-8')

print('replaced WheelScreen with wallet-free local cube gameplay')
