MonadFish Chinese adaptation for ZXYHtech /fish/
Upstream: https://github.com/KaimiEwl/fishing-game
Pinned source: 817708f05b609accb5b8ed39c299e318459044cf
License: MIT (see LICENSE-MonadFish.txt)
Adaptation: source-level wallet stack removal, localStorage-backed API compatibility, Chinese UI localization, realistic hook-fight animation, expanded fish species and a Chinese game-guide page.
Maintenance mode: direct remote file updates are the normal path for runtime/localization/economy polish that does not require React recompilation. GitHub Actions is not required for routine MonadFish iteration; the retained rebuild workflow is only a reproducible/manual fallback for source-level rebuilds.
Current variety policy: 14 catchable species, recent-catch anti-repeat weighting, and a mild discovery boost for uncaught non-ultra-rare species.
V5 motion: no dedicated motion button. Browsers that allow sensor access directly enable it automatically; iOS permission is requested from the first normal user gesture. Phone tilt affects fight tension and lightly rotates the rendered pepe/boat asset; touch remains the fallback.
V5 economy: 30 daily free bait, 12 coins per purchased bait, 5 daily cube rolls, +1 cube roll per 4 successful catches, small landing-coin rewards, higher fish sale values, daily coin stipend, and once-per-day exploration rewards for trying game features.
V5 localization: Inventory/fish/grill-stuff/gear/achievements/rod content has a dedicated Chinese runtime pass, including sell-price display alignment with the rebalanced local economy.
