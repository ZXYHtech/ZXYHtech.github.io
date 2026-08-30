# Dock & Pull — source attribution

Upstream: https://github.com/DollarAlchemy/Fish1
License: MIT
Original copyright: Copyright (c) 2026 Tom Garden

This mirror is adapted for the ZXYHtech fishing web app:
- removed external Google Fonts dependency;
- kept the original tap-to-cast / wait / bite / reel / catch loop;
- kept localStorage progression, shop, gear and catch log concepts;
- added a lightweight runtime-ready marker (`window.__DOCK_PULL_READY__`) so the host page can verify that the game script actually initialized;
- packaged as same-origin static files under `/fish/games/dock-pull/` to avoid third-party iframe/API/CDN failures.

The upstream MIT license is preserved in `LICENSE`.
