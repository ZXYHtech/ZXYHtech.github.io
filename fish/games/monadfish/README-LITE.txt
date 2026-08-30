MonadFish Chinese Lite integration for ZXYHtech /fish/
Upstream: https://github.com/KaimiEwl/fishing-game
Pinned source: 817708f05b609accb5b8ed39c299e318459044cf
License: MIT (see LICENSE-MonadFish.txt)
Adaptation: source-level wallet stack removal, localStorage-backed API compatibility, Chinese UI localization, realistic hook-fight animation, expanded fish species and a Chinese game-guide page.
Wallet providers/connectors, wallet verification, MON transactions and authoritative online leaderboard are not part of the Lite player build.
Maintenance mode: direct remote file updates are the normal path for runtime/localization/economy polish that does not require React recompilation. GitHub Actions is not required for routine MonadFish iteration; the existing build workflow is only a reproducible/manual fallback for source-level rebuilds.
Current variety policy: 14 catchable species, recent-catch anti-repeat weighting, and a mild discovery boost for uncaught non-ultra-rare species.
