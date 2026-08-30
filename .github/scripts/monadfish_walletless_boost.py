#!/usr/bin/env python3
from pathlib import Path
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/monadfish-upstream")
path = root / "src/components/game/BoostDialog.tsx"
if not path.parent.exists():
    raise SystemExit(f"component directory not found: {path.parent}")

path.write_text(r'''import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Fish, Info, Sparkles, X, Zap } from 'lucide-react';
import { BOOST_ICON_SRC } from '@/lib/rodAssets';
import { publicAsset } from '@/lib/assets';

// Chinese Lite intentionally preserves the familiar boost shortcut position but
// removes every MON purchase / wallet transaction path. Progression advice here
// only points players back to normal in-game fishing, tasks and equipment.
const BoostDialog: React.FC<any> = () => (
  <Dialog>
    <DialogTrigger asChild>
      <button
        type="button"
        className="group relative isolate overflow-visible bg-transparent outline-none transition-all duration-200 hover:scale-105 focus-visible:scale-105 active:scale-95"
        aria-label="成长提示"
        title="成长提示"
      >
        <span
          aria-hidden="true"
          className="absolute inset-[12%] rounded-[1.5rem] bg-[radial-gradient(circle,rgba(42,116,255,0.32),rgba(15,23,42,0)_72%)] blur-md"
        />
        <img
          src={BOOST_ICON_SRC}
          alt=""
          aria-hidden="true"
          className="relative z-[1] block w-20 object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.36)] transition-transform duration-300 group-hover:scale-[1.02] sm:w-24"
          draggable={false}
        />
      </button>
    </DialogTrigger>

    <DialogContent
      className="h-auto w-[min(34rem,calc(100vw-1rem))] max-w-none overflow-hidden border border-cyan-300/15 bg-[#07101b]/96 p-0 text-zinc-100 shadow-[0_32px_80px_rgba(0,0,0,0.72)] backdrop-blur-xl"
      style={{
        backgroundImage: `linear-gradient(rgba(3,7,18,.84),rgba(3,7,18,.96)),url(${publicAsset('assets/boost_board_reference.webp')})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <DialogHeader className="border-b border-cyan-300/10 px-5 pb-4 pt-5 text-left">
        <DialogTitle className="flex items-center gap-2 text-xl font-black text-cyan-100">
          <Sparkles className="h-5 w-5" />成长提示
        </DialogTitle>
        <DialogDescription className="text-sm leading-6 text-zinc-300">
          中文 Lite 版不出售 MON 加速包，也不需要连接钱包。下面这些方式都可以通过正常游玩获得成长。
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-3 px-5 py-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-cyan-300/15 bg-black/55 p-4">
          <Fish className="h-6 w-6 text-cyan-200" />
          <b className="mt-2 block text-cyan-100">持续钓鱼</b>
          <p className="mt-1 text-sm leading-6 text-zinc-400">熟悉咬钩节奏，积累鱼获、经验和金币，逐步升级鱼竿。</p>
        </div>
        <div className="rounded-2xl border border-violet-300/15 bg-black/55 p-4">
          <Zap className="h-6 w-6 text-violet-200" />
          <b className="mt-2 block text-violet-100">任务与收集</b>
          <p className="mt-1 text-sm leading-6 text-zinc-400">优先完成游戏内任务，并利用图鉴、烧烤和魔方拓展收益。</p>
        </div>
      </div>

      <div className="mx-5 mb-5 flex items-start gap-2 rounded-xl border border-amber-300/15 bg-amber-300/5 px-3 py-2 text-xs leading-5 text-amber-100/85">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <span>本版本不存在充值、提现、签名、MON 支付或链上奖励入口。</span>
      </div>

      <DialogClose asChild>
        <Button className="mx-5 mb-5 w-[calc(100%-2.5rem)] rounded-xl bg-cyan-300 font-black text-black hover:bg-cyan-200">
          知道了
        </Button>
      </DialogClose>

      <DialogClose className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 p-2 text-zinc-300 hover:text-white" aria-label="关闭">
        <X className="h-4 w-4" />
      </DialogClose>
    </DialogContent>
  </Dialog>
);

export default BoostDialog;
''', encoding='utf-8')

print('replaced BoostDialog with wallet-free Chinese progression guide')
