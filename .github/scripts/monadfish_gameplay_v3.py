#!/usr/bin/env python3
from pathlib import Path
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/monadfish-upstream")
path = root / "src/components/game/MonadFishCanvas.tsx"
if not path.exists():
    raise SystemExit(f"Missing source file: {path}")

text = path.read_text(encoding="utf-8")

# The main render loop previously captured lastResult only when gameState changed.
# Server resolution updates lastResult while gameState remains 'catching', so the
# loop could keep seeing null forever. Re-run the renderer when the result arrives.
old_dep = "    }, [gameState]);"
if old_dep not in text:
    raise SystemExit("Could not find main canvas render dependency")
text = text.replace(old_dep, "    }, [gameState, lastResult]);", 1)

# Lock the visible biting fish onto the hook immediately when the user reels.
# Its visual species can be corrected a moment later when the local/server catch
# result arrives, but the physical continuity starts at the click, not at result.
anchor = """            // During catching, keep the same visible chasing fish whenever
            // possible, then apply the resolved species look to that fish.
            if ((gameState === 'biting' || gameState === 'catching') && lastResult?.success && lastResult.fish) {
"""
insert = """            if (gameState === 'catching' && !fishRef.current.some((f) => f.state === 'booked')) {
                let hooked: FishInstance | null = null;
                let hookedScore = Infinity;
                fishRef.current.forEach((f) => {
                    if (f.state === 'booked') return;
                    const d = Math.hypot(f.x - bobberPosRef.current.x, f.y - bobberPosRef.current.y);
                    const score = d + (f.state === 'chasing' ? -1000 : 0);
                    if (score < hookedScore) { hookedScore = score; hooked = f; }
                });
                if (hooked) hooked.state = 'booked';
            }

            // During catching, keep the same visible chasing/hooked fish whenever
            // possible, then apply the resolved species look to that fish.
            if ((gameState === 'biting' || gameState === 'catching') && lastResult?.success && lastResult.fish) {
"""
if anchor not in text:
    raise SystemExit("Could not find hook continuity anchor")
text = text.replace(anchor, insert, 1)

# If an already-hooked fish exists, apply the resolved species visual to it too.
# v2 only entered this block when no booked fish existed, which is no longer true
# after the immediate hook above.
old_block = """                const alreadyBooked = fishRef.current.some((f) => f.state === 'booked');
                if (!alreadyBooked) {
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
new_block = """                let best: FishInstance | null = fishRef.current.find((f) => f.state === 'booked') ?? null;
                if (!best) {
                    let bestScore = Infinity;
                    fishRef.current.forEach((f) => {
                        const d = Math.hypot(f.x - bobberPosRef.current.x, f.y - bobberPosRef.current.y);
                        const chaseBonus = f.state === 'chasing' ? -1000 : 0;
                        const score = d + chaseBonus;
                        if (score < bestScore) { bestScore = score; best = f; }
                    });
                }
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
"""
if old_block not in text:
    raise SystemExit("Could not find v2 resolved-fish booking block")
text = text.replace(old_block, new_block, 1)

path.write_text(text, encoding="utf-8")
print("gameplay-v3: immediate hook continuity + live lastResult renderer refresh")
