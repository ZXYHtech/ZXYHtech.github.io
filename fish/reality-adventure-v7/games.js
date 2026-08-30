const openGames={
  monad:{title:'MonadFish',icon:'🐠',url:'https://kaimiewl.github.io/fishing-game/',license:'MIT',repo:'KaimiEwl/fishing-game',note:'移动端友好的浏览器钓鱼游戏：地图推进、鱼种稀有度、装备升级和任务循环。'},
  fishfarm:{title:"Gallifrey's Fish Farm",icon:'🏝️',url:'https://gallifreycar.github.io/gallifreys-fish-farm/',license:'MIT',repo:'gallifreyCar/gallifreys-fish-farm',note:'挂机钓鱼 + 鱼宠收集 + 建村 + Boss 战，玩法更偏养成。'},
  chill:{title:'Chill Fishing',icon:'⛵',url:'https://cdn.jsdelivr.net/gh/cristianjeffries/chill-fishing@2c35441c0d1fb51242c0cc5718c7f1970151425c/index.html',license:'MIT',repo:'cristianjeffries/chill-fishing',note:'Canvas 钓鱼 RPG：50+鱼种、昼夜天气、不同水深、船只升级、图鉴和长期存档。'}
};
function games(){
  if(openGames[S.gameScreen])return externalGame(S.gameScreen);
  S.gameScreen='hub';
  shell(`<div class="hero"><span class="eyebrow">开源小游戏</span><h1>换个玩法，直接在这里玩。</h1><div class="lead">这里仅收录有明确开源许可证的钓鱼游戏。游戏在当前页面内打开，不再混入自制反应题或练习题。</div></div>
  <div class="gamegrid">${Object.entries(openGames).map(([id,g])=>`<button class="gamecard" data-game="${id}"><span class="gicon">${g.icon}</span><b>${g.title}</b><small>${g.note}</small><span class="badge">${g.license} · 开源</span></button>`).join('')}</div>
  <section class="card"><span class="eyebrow">说明</span><div class="sub">游戏版权归各原作者，本站只做网页内嵌入口，并保留项目名、仓库与许可证信息。若第三方页面临时不可用，可换另一个游戏。</div></section>`,'开源小游戏');
  app.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{S.gameScreen=b.dataset.game;render()});
}
function gameBack(){S.gameScreen='hub';render()}
function externalGame(id){
  const g=openGames[id];
  shell(`<section class="card deep"><span class="eyebrow" style="color:#ffdc91">开源游戏 · ${g.license}</span><div class="title">${g.icon} ${g.title}</div><div class="sub">${g.note}</div><div class="pillrow"><span class="pill on" style="color:white">${g.repo}</span></div><button id="gameBack" class="secondary" style="margin-top:10px">← 换一个游戏</button></section>
  <iframe class="gameframe external" src="${g.url}" title="${g.title}" allow="fullscreen; autoplay; gamepad; clipboard-read; clipboard-write" referrerpolicy="no-referrer" loading="eager"></iframe>
  <div class="legalnote">${g.title} 来自开源项目 ${g.repo}（${g.license}）。当前页面仅嵌入运行，不把原作标为本站自研。</div>`,'开源小游戏');
  document.querySelector('#gameBack').onclick=gameBack;
}
