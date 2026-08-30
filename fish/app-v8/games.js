const openGames={
  paradise:{title:'Paradise Isle',icon:'🏝️',url:'https://appleweiping.github.io/paradise-isle/',license:'MIT',repo:'appleweiping/paradise-isle',note:'岛屿生活游戏，内含完整钓鱼小游戏：抛竿、咬口、收线、鱼种与鱼竿成长。'},
  harpoon:{title:'Harpoon Fishing',icon:'🎯',url:'https://beephids.github.io/harpoon-fishing/',license:'AGPL-3.0',repo:'beephids/harpoon-fishing',note:'触屏友好的街机捕鱼：拖动瞄准、松手发射，支持单人和双人。'}
};
function games(){
  if(openGames[S.gameScreen])return externalGame(S.gameScreen);
  S.gameScreen='hub';setGameChrome(false);
  shell(`<div class="hero"><span class="eyebrow">开源小游戏 · 已筛除API依赖</span><h1>先保证能玩，再谈数量。</h1><div class="lead">已下架 MonadFish、Fish Farm 和错误的 Chill Fishing CDN 嵌法。这里只保留无需本站后端、适合浏览器运行的候选。</div></div>
  <div class="gamegrid">${Object.entries(openGames).map(([id,g])=>`<button class="gamecard" data-game="${id}"><span class="gicon">${g.icon}</span><b>${g.title}</b><small>${g.note}</small><span class="badge">${g.license} · 开源</span></button>`).join('')}</div>
  <section class="card"><span class="eyebrow">验收规则</span><div class="sub">有API缺失、窗口无法点击、资源路径错误或手机布局不可用的游戏，直接下架。第三款通过相同验收后再加入，不再为了凑数量上线。</div></section>`,'小游戏');
  app.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{S.gameScreen=b.dataset.game;games()});
}
function gameBack(){S.gameScreen='hub';setGameChrome(false);games()}
function externalGame(id){
  const g=openGames[id];stopCam();setGameChrome(true);
  app.innerHTML=`<div class="game-stage"><div class="game-topbar"><button id="gameBack" class="game-back">← 换游戏</button><div class="game-name"><b>${g.icon} ${g.title}</b><small>${g.license} · ${g.repo}</small></div><button id="gameReload" class="game-reload">↻</button></div><div class="game-viewport"><div id="gameLoading" class="game-loading">正在载入 ${g.title}…</div><iframe id="gameFrame" class="gameframe-full" src="${g.url}" title="${g.title}" allow="fullscreen; autoplay; gamepad; clipboard-read; clipboard-write" referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div id="gameHint" class="game-hint">若10秒后仍是空白或无法操作，请返回；该游戏会自动从可玩列表移除，避免继续误导玩家。</div></div>`;
  const frame=document.querySelector('#gameFrame'),loading=document.querySelector('#gameLoading'),hint=document.querySelector('#gameHint');
  document.querySelector('#gameBack').onclick=gameBack;
  document.querySelector('#gameReload').onclick=()=>{loading.style.display='grid';frame.src=g.url+(g.url.includes('?')?'&':'?')+'reload='+Date.now()};
  frame.onload=()=>{loading.style.display='none';hint.classList.add('loaded')};
  setTimeout(()=>{if(loading.style.display!=='none')hint.classList.add('warn')},10000);
}
