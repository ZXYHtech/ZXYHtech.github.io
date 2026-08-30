#!/usr/bin/env python3
from pathlib import Path
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/monadfish-upstream")


def read(rel: str) -> str:
    path = root / rel
    if not path.exists():
        raise SystemExit(f"Missing source file: {path}")
    return path.read_text(encoding="utf-8")


def write(rel: str, text: str) -> None:
    path = root / rel
    path.write_text(text, encoding="utf-8")
    print(f"gameplay-v2 patched {rel}")


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise SystemExit(f"Could not find patch anchor: {label}")
    return text.replace(old, new, 1)


# ---------------------------------------------------------------------------
# 1) Keep only one explicit guide entry. The Chinese runtime already adds the
#    top-right “？ 游戏说明” button, so remove the duplicate round Info icon.
# ---------------------------------------------------------------------------
player_panel = read("src/components/game/PlayerPanel.tsx")
player_panel = replace_once(
    player_panel,
    "import { ChevronDown, Info, Package, Trophy, Worm } from 'lucide-react';",
    "import { ChevronDown, Package, Trophy, Worm } from 'lucide-react';",
    "PlayerPanel Info import",
)
player_panel = replace_once(
    player_panel,
    '''        <a
          href="/fish/games/monadfish/guide.html"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 bg-black/85 text-cyan-100 shadow-md backdrop-blur-md transition hover:border-cyan-300/40"
          aria-label="游戏说明"
          title="游戏说明"
        >
          <Info className="h-4 w-4" />
        </a>

''',
    "",
    "duplicate guide icon",
)
write("src/components/game/PlayerPanel.tsx", player_panel)


# ---------------------------------------------------------------------------
# 2) Expand the actual catch table and Chinese fish names.
#    Lite mode uses the local API as authority, but FISH_DATA must contain every
#    returned id so result cards/inventory can resolve the caught species.
# ---------------------------------------------------------------------------
game_ts = read("src/types/game.ts")
name_replacements = {
    "name: 'Carp'": "name: '鲤鱼'",
    "name: 'Perch'": "name: '河鲈'",
    "name: 'Bream'": "name: '欧鳊'",
    "name: 'Catfish'": "name: '鲶鱼'",
    "name: 'Goldfish'": "name: '金鱼'",
    "name: 'Mutant Fish'": "name: '变异鱼'",
    "name: 'Purple Fish'": "name: '紫影鱼'",
    "name: 'Cosmic Leviathan'": "name: '星海利维坦'",
    "description: 'A common fish, but great for a stew!'": "description: '常见而可靠的淡水鱼，适合新手练习。'",
    "description: 'A striped predator with vivid colors'": "description: '有条纹的小型掠食鱼，动作敏捷。'",
    "description: 'A large fish with golden sides'": "description: '体型宽厚、侧身泛金的大型鱼。'",
    "description: 'A giant of the deep with whiskers'": "description: '栖息深水的大型鲶鱼，力量很足。'",
    "description: 'Grants wishes... well, almost!'": "description: '闪着金光的稀有鱼，十分醒目。'",
    "description: 'Something strange from the depths... NFT-ready!'": "description: '来自深水的奇异变种，动作难以预测。'",
    "description: 'A majestic purple predator! extremely rare!'": "description: '罕见的紫色掠食鱼，速度极快。'",
    "description: 'Legend of the ocean! 1 in 10,000 fishers have seen it...'": "description: '传说中的巨型深水鱼，极少出现。'",
}
for old, new in name_replacements.items():
    if old in game_ts:
        game_ts = game_ts.replace(old, new)

new_species = '''  {
    id: 'tilapia',
    name: '罗非鱼',
    emoji: '🐟',
    rarity: 'common',
    chance: 12,
    price: 5,
    xp: 6,
    description: '适应力强的常见鱼，咬口积极。'
  },
  {
    id: 'trout',
    name: '虹鳟',
    emoji: '🐟',
    rarity: 'uncommon',
    chance: 10,
    price: 11,
    xp: 12,
    description: '喜欢较凉水层，体色鲜明、冲刺很快。'
  },
  {
    id: 'bass',
    name: '黑鲈',
    emoji: '🐟',
    rarity: 'uncommon',
    chance: 8,
    price: 14,
    xp: 14,
    description: '攻击性强，咬钩后会频繁横向冲刺。'
  },
  {
    id: 'koi',
    name: '锦鲤',
    emoji: '🎏',
    rarity: 'rare',
    chance: 6,
    price: 26,
    xp: 22,
    description: '颜色醒目的稀有鲤科鱼，收藏价值较高。'
  },
  {
    id: 'eel',
    name: '鳗鱼',
    emoji: '〰️',
    rarity: 'rare',
    chance: 4,
    price: 34,
    xp: 28,
    description: '身体修长，挣扎时摆动幅度很大。'
  },
  {
    id: 'tuna',
    name: '金枪鱼',
    emoji: '🐟',
    rarity: 'epic',
    chance: 0.8,
    price: 75,
    xp: 45,
    description: '高速巡游的大型鱼，出现概率较低。'
  },
'''
game_ts = replace_once(
    game_ts,
    "  {\n    id: 'goldfish',",
    new_species + "  {\n    id: 'goldfish',",
    "FISH_DATA insertion",
)
write("src/types/game.ts", game_ts)


# ---------------------------------------------------------------------------
# 3) Inventory/result icons reuse the licensed upstream sprites, but apply
#    distinct color/body treatments for the added species.
# ---------------------------------------------------------------------------
fish_icon = read("src/components/game/FishIcon.tsx")
fish_icon = replace_once(
    fish_icon,
    "  leviathan: publicAsset('assets/fish_leviathan.png'),\n};",
    """  leviathan: publicAsset('assets/fish_leviathan.png'),
  tilapia: publicAsset('assets/fish_carp.png'),
  trout: publicAsset('assets/fish_perch.png'),
  bass: publicAsset('assets/fish_pike.png'),
  koi: publicAsset('assets/fish_goldfish.png'),
  eel: publicAsset('assets/fish_mutant.png'),
  tuna: publicAsset('assets/fish_bream.png'),
};

const FISH_VARIANT_STYLE: Record<string, React.CSSProperties> = {
  tilapia: { filter: 'hue-rotate(54deg) saturate(0.82) brightness(0.9)' },
  trout: { filter: 'hue-rotate(-24deg) saturate(1.28) brightness(1.08)' },
  bass: { filter: 'hue-rotate(88deg) saturate(0.72) brightness(0.82)' },
  koi: { filter: 'hue-rotate(18deg) saturate(1.55) brightness(1.12)' },
  eel: { filter: 'hue-rotate(148deg) saturate(0.76) brightness(0.78)' },
  tuna: { filter: 'hue-rotate(196deg) saturate(0.92) brightness(0.88)' },
};""",
    "FishIcon species map",
)
fish_icon = replace_once(
    fish_icon,
    """          className={cn(
            'relative z-[1] block h-full w-full object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.32)]',
            isPurpleFish && 'animate-purple-fish-drift drop-shadow-[0_0_14px_rgba(197,116,255,0.7)]',
          )}
          draggable={false}
""",
    """          className={cn(
            'relative z-[1] block h-full w-full object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.32)]',
            isPurpleFish && 'animate-purple-fish-drift drop-shadow-[0_0_14px_rgba(197,116,255,0.7)]',
          )}
          style={FISH_VARIANT_STYLE[id]}
          draggable={false}
""",
    "FishIcon variant style",
)
write("src/components/game/FishIcon.tsx", fish_icon)


# ---------------------------------------------------------------------------
# 4) Real hook/fight continuity in the canvas.
#    - Fish keeps approaching during the bite state.
#    - The same visible chasing fish is selected when possible.
#    - Once hooked it stays attached to a taut line and fights left/right.
#    - Remove the old duplicate fish drawn directly on the fixed hook.
#    - Increase ambient population and visual variants.
# ---------------------------------------------------------------------------
canvas = read("src/components/game/MonadFishCanvas.tsx")
canvas = replace_once(
    canvas,
    """const FISH_SPRITE_MAP: Record<string, number> = {
    'carp': 0,
    'perch': 1,
    'bream': 2,
    'pike': 3,
    'catfish': 4,
    'goldfish': 5,
    'mutant': 6,
};
""",
    """const FISH_SPRITE_MAP: Record<string, number> = {
    'carp': 0,
    'perch': 1,
    'bream': 2,
    'pike': 3,
    'catfish': 4,
    'goldfish': 5,
    'mutant': 6,
    'leviathan': 7,
    'tilapia': 0,
    'trout': 1,
    'bass': 3,
    'koi': 5,
    'eel': 6,
    'tuna': 2,
};

const FISH_VISUAL_VARIANTS: Record<string, { sprite: number; hue: number; scaleX: number; scaleY: number }> = {
    carp: { sprite: 0, hue: 0, scaleX: 1, scaleY: 1 },
    perch: { sprite: 1, hue: 0, scaleX: 1, scaleY: 1 },
    bream: { sprite: 2, hue: 0, scaleX: 1, scaleY: 1 },
    pike: { sprite: 3, hue: 0, scaleX: 1.08, scaleY: 0.92 },
    catfish: { sprite: 4, hue: 0, scaleX: 1.08, scaleY: 1 },
    goldfish: { sprite: 5, hue: 0, scaleX: 0.9, scaleY: 0.96 },
    mutant: { sprite: 6, hue: 0, scaleX: 1, scaleY: 1 },
    leviathan: { sprite: 7, hue: 0, scaleX: 1.2, scaleY: 1.05 },
    tilapia: { sprite: 0, hue: 54, scaleX: 0.9, scaleY: 1.06 },
    trout: { sprite: 1, hue: -24, scaleX: 1.18, scaleY: 0.86 },
    bass: { sprite: 3, hue: 88, scaleX: 1.16, scaleY: 0.88 },
    koi: { sprite: 5, hue: 18, scaleX: 1.06, scaleY: 0.98 },
    eel: { sprite: 6, hue: 148, scaleX: 1.45, scaleY: 0.66 },
    tuna: { sprite: 2, hue: 196, scaleX: 1.42, scaleY: 0.72 },
};

const AMBIENT_SPECIES = Object.keys(FISH_VISUAL_VARIANTS);
""",
    "canvas fish visual map",
)
canvas = replace_once(
    canvas,
    """interface FishInstance {
    state: 'idle' | 'chasing' | 'booked';
    fishType: number;
    x: number;
    y: number;
""",
    """interface FishInstance {
    state: 'idle' | 'chasing' | 'booked';
    fishType: number;
    speciesId: string;
    hue: number;
    bodyScaleX: number;
    bodyScaleY: number;
    x: number;
    y: number;
""",
    "FishInstance variant fields",
)
canvas = replace_once(
    canvas,
    """        state: 'idle' | 'chasing' | 'booked';
        wobble: number; fishType: number; wobbleSpeed: number;
        depthMin: number; depthMax: number; facing: 1 | -1; targetCooldown: number; turnLock: number;

        constructor(w: number, h: number, fishType: number) {
            const traits = FISH_TRAITS[fishType] || FISH_TRAITS[0];
            this.fishType = fishType;
            this.speed = traits.speed + Math.random() * 0.18;
""",
    """        state: 'idle' | 'chasing' | 'booked';
        wobble: number; fishType: number; wobbleSpeed: number;
        speciesId: string; hue: number; bodyScaleX: number; bodyScaleY: number;
        depthMin: number; depthMax: number; facing: 1 | -1; targetCooldown: number; turnLock: number;

        constructor(w: number, h: number, fishType: number, speciesId = 'carp') {
            const visual = FISH_VISUAL_VARIANTS[speciesId] || FISH_VISUAL_VARIANTS.carp;
            const traits = FISH_TRAITS[visual.sprite] || FISH_TRAITS[fishType] || FISH_TRAITS[0];
            this.fishType = visual.sprite;
            this.speciesId = speciesId;
            this.hue = visual.hue;
            this.bodyScaleX = visual.scaleX;
            this.bodyScaleY = visual.scaleY;
            this.speed = traits.speed + Math.random() * 0.18;
""",
    "FishEntity variant constructor",
)
canvas = replace_once(
    canvas,
    """            if (this.state === 'booked') {
                this.x += (bobber.x - this.x) * 0.15;
                this.y += (bobber.y + 12 - this.y) * 0.15;
                const hookedAngle = -Math.PI / 2 + Math.sin(this.wobble * 4) * 0.2;
                this.angle += (hookedAngle - this.angle) * 0.12;
                this.visualAngle += (this.angle - this.visualAngle) * 0.18;
                return;
            }
""",
    """            if (this.state === 'booked') {
                // Fight around the hook instead of teleporting onto the bobber.
                // Two overlapping oscillations make the fish surge left/right while
                // the vertical component stays constrained by the taut line.
                const lateralFight = Math.sin(this.wobble * 5.2) * 34 + Math.sin(this.wobble * 2.15) * 15;
                const verticalFight = Math.cos(this.wobble * 4.4) * 8 + Math.sin(this.wobble * 1.7) * 4;
                const targetX = bobber.x + lateralFight;
                const targetY = bobber.y + 50 + verticalFight;
                this.x += (targetX - this.x) * 0.18;
                this.y += (targetY - this.y) * 0.2;
                this.facing = Math.sin(this.wobble * 5.2) >= 0 ? 1 : -1;
                const hookedAngle = Math.sin(this.wobble * 4.8) * 0.16;
                this.angle += (hookedAngle - this.angle) * 0.16;
                this.visualAngle += (this.angle - this.visualAngle) * 0.24;
                return;
            }
""",
    "hooked fish fight motion",
)
canvas = replace_once(
    canvas,
    """            if (this.state === 'chasing' && gs === 'waiting') {
                tx = bobber.x + Math.cos(this.wobble) * 60;
                ty = Math.max(minY, bobber.y + 30 + Math.sin(this.wobble) * 20);
""",
    """            if (this.state === 'chasing' && (gs === 'waiting' || gs === 'biting')) {
                const chaseRadius = gs === 'biting' ? 16 : 60;
                const chaseDepth = gs === 'biting' ? 42 : 30;
                tx = bobber.x + Math.cos(this.wobble) * chaseRadius;
                ty = Math.max(minY, bobber.y + chaseDepth + Math.sin(this.wobble) * (gs === 'biting' ? 8 : 20));
""",
    "keep fish at bait during bite",
)
canvas = replace_once(
    canvas,
    """                const aspect = img.width / img.height;
                const dw = this.size * 2, dh = dw / aspect;
                drawAnimatedSprite(ctx, img, dw, dh, this.wobble, this.state === 'chasing' ? 1.35 : 1);
""",
    """                const aspect = img.width / img.height;
                const dw = this.size * 2 * this.bodyScaleX;
                const dh = (this.size * 2 / aspect) * this.bodyScaleY;
                ctx.filter = this.hue === 0 ? 'none' : `hue-rotate(${this.hue}deg) saturate(1.18)`;
                drawAnimatedSprite(ctx, img, dw, dh, this.wobble, this.state === 'booked' ? 1.8 : this.state === 'chasing' ? 1.35 : 1);
                ctx.filter = 'none';
""",
    "draw fish visual variants",
)
canvas = replace_once(
    canvas,
    """        if (fishRef.current.length === 0) {
            for (let i = 0; i < 8; i++) fishRef.current.push(new FishEntity(initialSize.w, initialSize.h, i));
        }
""",
    """        if (fishRef.current.length === 0) {
            for (let i = 0; i < 18; i++) {
                const speciesId = AMBIENT_SPECIES[i % AMBIENT_SPECIES.length];
                const visual = FISH_VISUAL_VARIANTS[speciesId] || FISH_VISUAL_VARIANTS.carp;
                fishRef.current.push(new FishEntity(initialSize.w, initialSize.h, visual.sprite, speciesId));
            }
        }
""",
    "increase ambient fish population",
)
canvas = replace_once(
    canvas,
    """            // === ЛЕСКА И КРЮЧОК ===
            if (gameState !== 'idle') {
""",
    """            // === ЛЕСКА И КРЮЧОК ===
            const fightFish = fishRef.current.find((f) => f.state === 'booked');
            (window as Window & { __MONADFISH_HOOK_FIGHT__?: boolean }).__MONADFISH_HOOK_FIGHT__ = Boolean(
                fightFish && (gameState === 'catching' || gameState === 'result')
            );
            if (gameState !== 'idle') {
""",
    "expose hook fight smoke state",
)
canvas = replace_once(
    canvas,
    """                // Леска вниз от поплавка
                const hookY = by + 50;
                ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 0.8;
""",
    """                const bookedFish = fishRef.current.find((f) => f.state === 'booked');
                if (!bookedFish) {
                // Леска вниз от поплавка
                const hookY = by + 50;
                ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 0.8;
""",
    "hide free hook when fish is attached",
)
canvas = replace_once(
    canvas,
    """                ctx.beginPath(); ctx.moveTo(bx + 2, hookY + 8);
                ctx.quadraticCurveTo(bx + 5 + ww, hookY + 14, bx + 2 + ww * 0.5, hookY + 18);
                ctx.stroke(); ctx.lineCap = 'butt';

                // Пойманная рыба на крючке
                const bookedFish = fishRef.current.find((f) => f.state === 'booked');
                if (bookedFish && fishImgsRef.current[bookedFish.fishType]) {
                    const fImg = fishImgsRef.current[bookedFish.fishType]!;
                    const fA = fImg.width / fImg.height;
                    const fW = 60, fH = fW / fA;
                    ctx.save();
                    ctx.translate(bx, hookY + 10);
                    ctx.rotate(Math.sin(t * 3) * 0.2);
                    drawAnimatedSprite(ctx, fImg, fW, fH, t * 2.2, 1.4);
                    ctx.restore();
                }
""",
    """                ctx.beginPath(); ctx.moveTo(bx + 2, hookY + 8);
                ctx.quadraticCurveTo(bx + 5 + ww, hookY + 14, bx + 2 + ww * 0.5, hookY + 18);
                ctx.stroke(); ctx.lineCap = 'butt';
                }

                // Hooked fish: one fish only, connected by a visibly taut line.
                if (bookedFish) {
                    const fx = bookedFish.x;
                    const fy = bookedFish.y;
                    const pull = Math.max(-18, Math.min(18, fx - bx));
                    ctx.save();
                    ctx.strokeStyle = 'rgba(238,248,255,0.9)';
                    ctx.lineWidth = 1.25;
                    ctx.shadowColor = 'rgba(180,235,255,0.45)';
                    ctx.shadowBlur = 4;
                    ctx.beginPath();
                    ctx.moveTo(bx, by + 5);
                    ctx.quadraticCurveTo(bx + pull * 0.32, (by + fy) * 0.5, fx, fy - 2);
                    ctx.stroke();
                    ctx.shadowBlur = 0;

                    // Small hook at the fish mouth/line contact point.
                    ctx.strokeStyle = '#e5edf5';
                    ctx.lineWidth = 1.4;
                    ctx.beginPath();
                    ctx.moveTo(fx, fy - 3);
                    ctx.quadraticCurveTo(fx + 7, fy + 4, fx + 1, fy + 8);
                    ctx.stroke();

                    // Surface ripples react to the sideways pull.
                    ctx.globalAlpha = 0.25;
                    ctx.strokeStyle = '#d9fbff';
                    for (let i = 0; i < 2; i++) {
                        ctx.beginPath();
                        ctx.ellipse(bx + pull * 0.14, waterLevel + 2, 12 + i * 9 + Math.abs(pull) * 0.12, 3 + i, 0, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
""",
    "remove duplicate fixed-hook fish and draw taut fight line",
)
canvas = replace_once(
    canvas,
    """            // === РЫБЫ ===
            // При catching — цепляем рыбу правильного типа
            if ((gameState === 'biting' || gameState === 'catching') && lastResult?.success && lastResult.fish) {
""",
    """            // === РЫБЫ ===
            // Make the visible bite come from an actual nearby fish instead of
            // letting every fish continue swimming as if nothing happened.
            if (gameState === 'biting' && !fishRef.current.some((f) => f.state === 'chasing')) {
                let nearest: FishInstance | null = null;
                let nearestDistance = Infinity;
                fishRef.current.forEach((f) => {
                    if (f.state === 'booked') return;
                    const d = Math.hypot(f.x - bobberPosRef.current.x, f.y - bobberPosRef.current.y);
                    if (d < nearestDistance) { nearestDistance = d; nearest = f; }
                });
                if (nearest) nearest.state = 'chasing';
            }

            // During catching, keep the same visible chasing fish whenever
            // possible, then apply the resolved species look to that fish.
            if ((gameState === 'biting' || gameState === 'catching') && lastResult?.success && lastResult.fish) {
""",
    "visible fish causes bite",
)
old_booking = """                if (!alreadyBooked) {
                    // Ищем ближайшую рыбу нужного типа
                    let best: FishInstance | null = null;
                    let bestDist = Infinity;
                    fishRef.current.forEach((f) => {
                        if (f.fishType === targetType && f.state !== 'booked') {
                            const d = Math.hypot(f.x - bobberPosRef.current.x, f.y - bobberPosRef.current.y);
                            if (d < bestDist) { bestDist = d; best = f; }
                        }
                    });
                    // Если нет нужного типа — берём любую и меняем тип
                    if (!best) {
                        let anyBest: FishInstance | null = null;
                        let anyDist = Infinity;
                        fishRef.current.forEach((f) => {
                            if (f.state !== 'booked') {
                                const d = Math.hypot(f.x - bobberPosRef.current.x, f.y - bobberPosRef.current.y);
                                if (d < anyDist) { anyDist = d; anyBest = f; }
                            }
                        });
                        if (anyBest) { anyBest.fishType = targetType; best = anyBest; }
                    }
                    if (best) best.state = 'booked';
                }
"""
new_booking = """                if (!alreadyBooked) {
                    let best: FishInstance | null = null;
                    let bestScore = Infinity;
                    fishRef.current.forEach((f) => {
                        if (f.state === 'booked') return;
                        const d = Math.hypot(f.x - bobberPosRef.current.x, f.y - bobberPosRef.current.y);
                        const chaseBonus = f.state === 'chasing' ? -1000 : 0;
                        const score = d + chaseBonus;
                        if (score < bestScore) { bestScore = score; best = f; }
                    });
                    if (best) {
                        const speciesId = lastResult.fish.id;
                        const visual = FISH_VISUAL_VARIANTS[speciesId] || FISH_VISUAL_VARIANTS.carp;
                        best.fishType = targetType;
                        best.speciesId = speciesId;
                        best.hue = visual.hue;
                        best.bodyScaleX = visual.scaleX;
                        best.bodyScaleY = visual.scaleY;
                        best.state = 'booked';
                    }
                }
"""
canvas = replace_once(canvas, old_booking, new_booking, "hook the visible chasing fish")
write("src/components/game/MonadFishCanvas.tsx", canvas)


# ---------------------------------------------------------------------------
# 5) Resolve the local/server catch immediately after the player hooks the fish,
#    then keep gameState='catching' long enough for the visible fight animation.
#    Previously the code waited 1s before it even knew which fish was caught,
#    which made the canvas show an unrelated swimming fish and then jump to result.
# ---------------------------------------------------------------------------
state = read("src/hooks/useGameState.ts")
state = replace_once(
    state,
    """    setGameState('catching');
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (serverCast && onResolveServerFishingCast) {
""",
    """    setGameState('catching');

    if (serverCast && onResolveServerFishingCast) {
""",
    "resolve catch before fight animation",
)
server_anchor = """      setGameState('result');
      await new Promise(resolve => setTimeout(resolve, 2500));
      setGameState('idle');
      setLastResult(null);
      return;
"""
server_replacement = """      // Keep the resolved fish visibly attached to the line for a short fight
      // before showing the result card. This makes hook -> struggle -> land continuous.
      await new Promise(resolve => setTimeout(resolve, 1900));
      setGameState('result');
      await new Promise(resolve => setTimeout(resolve, 2200));
      setGameState('idle');
      setLastResult(null);
      return;
"""
state = replace_once(state, server_anchor, server_replacement, "server hook fight duration")
write("src/hooks/useGameState.ts", state)

print("MonadFish gameplay v2 source patch complete")
