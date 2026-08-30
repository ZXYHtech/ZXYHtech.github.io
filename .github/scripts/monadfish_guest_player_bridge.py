#!/usr/bin/env python3
from pathlib import Path
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/monadfish-upstream")
path = root / "src/hooks/useWalletAuth.ts"
if not path.parent.exists():
    raise SystemExit(f"hook directory not found: {path.parent}")

path.write_text(r'''import type { GameProgressSnapshot, PlayerState } from '@/types/game';
import { XP_PER_LEVEL } from '@/types/game';

// Lite keeps the upstream PlayerRecord/mapPlayerRecord contract because
// useGuestSession reuses it. No wallet provider, connector, signature or
// wallet-session code exists in this replacement module.
export interface PlayerRecord {
  wallet_address: string;
  coins: number;
  bait: number;
  daily_free_bait?: number;
  daily_free_bait_reset_at?: string | null;
  bonus_bait_granted_total?: number;
  level: number;
  xp: number;
  xp_to_next: number;
  rod_level: number;
  equipped_rod: number;
  inventory: unknown;
  cooked_dishes?: unknown;
  game_progress?: unknown;
  total_catches: number;
  login_streak: number;
  nft_rods: unknown;
  nickname: string | null;
  avatar_url: string | null;
  referrer_wallet_address?: string | null;
  rewarded_referral_count?: number;
  today_referral_attach_count?: number;
  updated_at?: string;
}

export interface ReferralSummary {
  rewardedReferralCount: number;
  todayReferralAttachCount: number;
  maxRewardedReferrals: number;
  referrerWalletAddress: string | null;
  referralLink: string | null;
}

function mapInventory(value: unknown): PlayerState['inventory'] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const record = item as Record<string, unknown>;
    const fishId = typeof record.fishId === 'string' ? record.fishId.trim() : '';
    const quantity = typeof record.quantity === 'number' ? record.quantity : Number(record.quantity ?? 0);
    const rawCaughtAt = record.caughtAt;
    const caughtAt = rawCaughtAt instanceof Date ? rawCaughtAt : new Date(String(rawCaughtAt ?? ''));
    if (!fishId || !Number.isFinite(quantity) || quantity <= 0 || Number.isNaN(caughtAt.getTime())) return [];
    return [{ fishId, quantity: Math.max(0, Math.floor(quantity)), caughtAt }];
  });
}

function mapCookedDishes(value: unknown): PlayerState['cookedDishes'] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const record = item as Record<string, unknown>;
    const recipeId = typeof record.recipeId === 'string' ? record.recipeId.trim() : '';
    const quantity = typeof record.quantity === 'number' ? record.quantity : Number(record.quantity ?? 0);
    const rawCreatedAt = record.createdAt;
    const createdAt = rawCreatedAt instanceof Date ? rawCreatedAt : new Date(String(rawCreatedAt ?? ''));
    if (!recipeId || !Number.isFinite(quantity) || quantity <= 0 || Number.isNaN(createdAt.getTime())) return [];
    return [{ recipeId, quantity: Math.max(0, Math.floor(quantity)), createdAt }];
  });
}

export function mapPlayerRecord(p: PlayerRecord): PlayerState {
  const syncedProgress = p.game_progress && typeof p.game_progress === 'object'
    ? p.game_progress as GameProgressSnapshot
    : null;
  const nftRods = Array.isArray(p.nft_rods)
    ? p.nft_rods.flatMap((value) => (typeof value === 'number' && Number.isFinite(value) ? [value] : []))
    : [];

  return {
    coins: p.coins,
    bait: p.bait,
    dailyFreeBait: p.daily_free_bait ?? 0,
    dailyFreeBaitResetAt: p.daily_free_bait_reset_at ?? null,
    bonusBaitGrantedTotal: p.bonus_bait_granted_total ?? 0,
    level: p.level,
    xp: p.xp,
    xpToNextLevel: p.xp_to_next || p.level * XP_PER_LEVEL,
    rodLevel: p.rod_level,
    equippedRod: p.equipped_rod ?? p.rod_level,
    inventory: mapInventory(p.inventory),
    cookedDishes: mapCookedDishes(p.cooked_dishes),
    totalCatches: p.total_catches,
    dailyBonusClaimed: false,
    loginStreak: p.login_streak || 1,
    nftRods,
    nickname: p.nickname || null,
    avatarUrl: p.avatar_url || null,
    collectionBook: syncedProgress?.collectionBook ?? null,
    rodMastery: syncedProgress?.rodMastery ?? null,
  };
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
''', encoding='utf-8')

print('preserved guest PlayerRecord mapping with wallet auth disabled')
