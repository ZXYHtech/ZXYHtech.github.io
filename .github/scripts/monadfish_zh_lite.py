#!/usr/bin/env python3
from pathlib import Path
import sys

dist = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/monadfish-upstream/dist")
if not dist.exists():
    raise SystemExit(f"dist not found: {dist}")

css = r'''html { font-family: "Noto Sans SC","Microsoft YaHei","PingFang SC",system-ui,sans-serif; }
#zxyh-game-guide-link{
  position:fixed;right:12px;top:max(12px,env(safe-area-inset-top));z-index:2147483000;
  display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:0 13px;
  border:1px solid rgba(103,232,249,.55);border-radius:999px;background:rgba(3,7,18,.82);
  color:#cffafe;font-size:13px;font-weight:800;text-decoration:none;letter-spacing:.02em;
  box-shadow:0 8px 26px rgba(0,0,0,.35),0 0 18px rgba(34,211,238,.16);backdrop-filter:blur(10px)
}
#zxyh-game-guide-link:active{transform:scale(.97)}
[data-rk],w3m-modal,wcm-modal,[class*="rainbowkit"],[class*="wallet-connect"]{display:none!important}
[data-zxyh-wallet-hidden="1"]{display:none!important}
'''

js = r'''(() => {
  'use strict';
  document.documentElement.lang = 'zh-CN';
  document.title = 'MonadFish 中文版｜钓鱼游戏';

  const exact = new Map([
    ['Fish','钓鱼'],['Tasks','任务'],['Shop','商店'],['Grill','烧烤'],['Cube','魔方'],['Board','排行'],
    ['Map','地图'],['Inventory','鱼篓'],['Collection','图鉴'],['Rod','鱼竿'],['Rods','鱼竿'],['Bait','鱼饵'],
    ['Coins','金币'],['Coin','金币'],['Level','等级'],['XP','经验'],['Settings','设置'],['Profile','玩家'],
    ['Cast line','抛竿'],['Hook fish','提竿'],['Caught!','钓到了！'],['Missed!','跑鱼了！'],
    ['Loading','加载中'],['Preparing screen...','正在准备界面…'],['Screen error','界面异常'],
    ['This screen did not load correctly. Reload the game or go back to fishing.','这个界面没有正确加载，请重新加载游戏或返回钓鱼。'],
    ['Reload game','重新加载'],['Back to fish','返回钓鱼'],['Close','关闭'],['Cancel','取消'],['Confirm','确认'],
    ['Buy','购买'],['Sell','出售'],['Equip','装备'],['Equipped','已装备'],['Upgrade','升级'],['Claim','领取'],
    ['Ready','可用'],['Locked','未解锁'],['Owned','已拥有'],['New','新'],['Free','免费'],['Continue','继续'],
    ['Play','开始'],['Start','开始'],['Back','返回'],['Next','下一步'],['Previous','上一步'],['Done','完成'],
    ['Common','普通'],['Uncommon','优秀'],['Rare','稀有'],['Epic','史诗'],['Legendary','传说'],
    ['Daily Tasks','每日任务'],['Weekly Missions','每周任务'],['Leaderboard','排行榜'],['Fishing','钓鱼'],
    ['Fishing Net','自动渔网'],['Cook','烹饪'],['Cooking','烹饪中'],['Recipes','菜谱'],['Reward','奖励'],
    ['Rewards','奖励'],['Your Fish','你的鱼获'],['Total Catches','累计鱼获'],['Best Catch','最佳鱼获'],
    ['Not enough bait','鱼饵不足'],['Not enough coins','金币不足'],['Try again','再试一次'],
    ['Waiting for a bite...','等待鱼儿咬钩…'],['Something is biting!','有鱼咬钩！'],['Fish got away','鱼儿跑掉了'],
    ['Fish got away!','鱼儿跑掉了！'],['Perfect!','完美！'],['Good!','不错！'],['Great!','很棒！'],
    ['How to Play','游戏说明'],['Guide','游戏说明']
  ]);

  const replacements = [
    [/\bLevel\s+(\d+)\b/g,'等级 $1'],
    [/\b(\d+)\s+XP\b/g,'$1 经验'],
    [/\b(\d+)\s+coins?\b/gi,'$1 金币'],
    [/\b(\d+)\s+baits?\b/gi,'$1 鱼饵'],
    [/Cast again/gi,'再次抛竿'],
    [/Go fishing/gi,'去钓鱼'],
    [/Catch fish/gi,'钓到鱼'],
    [/Sell fish/gi,'出售鱼获'],
    [/Buy bait/gi,'购买鱼饵'],
    [/Buy rod/gi,'购买鱼竿']
  ];

  const walletPattern = /(connect\s+wallet|disconnect\s+wallet|verify\s+wallet|wallet\s+address|wallet\s+check|wallet\b|withdraw\b|deposit\b|claim\s+mon\b|buy\s+mon\b|mon\s+balance|pay\s+with\s+mon|weekly\s+payout)/i;
  const walletClassPattern = /(wallet|rainbowkit|wagmi)/i;

  function translateString(input){
    if (!input) return input;
    const leading = input.match(/^\s*/)?.[0] || '';
    const trailing = input.match(/\s*$/)?.[0] || '';
    const core = input.trim();
    if (!core) return input;
    if (exact.has(core)) return leading + exact.get(core) + trailing;
    let out = core;
    for (const [re, value] of replacements) out = out.replace(re, value);
    return leading + out + trailing;
  }

  function translate(root){
    const scope = root && root.nodeType === Node.ELEMENT_NODE ? root : document.body;
    if (!scope) return;
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes){
      const p = node.parentElement;
      if (!p || /^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/i.test(p.tagName)) continue;
      const next = translateString(node.nodeValue || '');
      if (next !== node.nodeValue) node.nodeValue = next;
    }
    scope.querySelectorAll?.('[aria-label],[title],[placeholder]').forEach(el => {
      for (const attr of ['aria-label','title','placeholder']){
        if (!el.hasAttribute(attr)) continue;
        const oldValue = el.getAttribute(attr) || '';
        const nextValue = translateString(oldValue);
        if (nextValue !== oldValue) el.setAttribute(attr,nextValue);
      }
    });
  }

  function stripWallet(root){
    const scope = root && root.nodeType === Node.ELEMENT_NODE ? root : document.body;
    if (!scope) return;
    scope.querySelectorAll?.('[data-rk],w3m-modal,wcm-modal,[class*="wallet"],[id*="wallet"]').forEach(el => {
      if (el.id === 'zxyh-game-guide-link') return;
      el.setAttribute('data-zxyh-wallet-hidden','1');
      el.setAttribute('aria-hidden','true');
    });
    scope.querySelectorAll?.('button,a,[role="button"],[role="menuitem"],label').forEach(el => {
      const haystack = [
        el.textContent || '',
        el.getAttribute('aria-label') || '',
        el.getAttribute('title') || '',
        typeof el.className === 'string' ? el.className : ''
      ].join(' ');
      if (walletPattern.test(haystack) || walletClassPattern.test(String(el.className || ''))){
        el.setAttribute('data-zxyh-wallet-hidden','1');
        el.setAttribute('aria-hidden','true');
        if ('disabled' in el) el.disabled = true;
      }
    });
  }

  function ensureGuideLink(){
    if (location.pathname.endsWith('/guide.html')) return;
    if (document.getElementById('zxyh-game-guide-link')) return;
    const link = document.createElement('a');
    link.id = 'zxyh-game-guide-link';
    link.href = '/fish/games/monadfish/guide.html';
    link.textContent = '？ 游戏说明';
    link.setAttribute('aria-label','打开游戏说明');
    document.body?.appendChild(link);
  }

  let scheduled = false;
  function apply(){
    scheduled = false;
    translate(document.body);
    stripWallet(document.body);
    ensureGuideLink();
  }
  function schedule(){
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(apply);
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', apply, {once:true});
  } else {
    apply();
  }
  new MutationObserver(schedule).observe(document.documentElement,{
    subtree:true,childList:true,characterData:true,attributes:true,
    attributeFilter:['aria-label','title','class','id']
  });
  window.__MONADFISH_ZH_LITE__ = true;
})();'''

guide = r'''<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <meta name="theme-color" content="#06101f" />
  <title>MonadFish 中文版｜游戏说明</title>
  <style>
    *{box-sizing:border-box}html{background:#06101f;color:#e6f7ff;font-family:"Noto Sans SC","Microsoft YaHei","PingFang SC",system-ui,sans-serif}
    body{margin:0;min-height:100vh;background:radial-gradient(circle at 50% -10%,#123b63 0,#07111f 42%,#030711 100%);padding:env(safe-area-inset-top) 16px calc(28px + env(safe-area-inset-bottom))}
    main{max-width:760px;margin:auto}.top{position:sticky;top:0;padding:12px 0 10px;background:linear-gradient(#06101ff2,#06101fc9 75%,transparent);backdrop-filter:blur(8px);z-index:3}
    .back{display:inline-flex;min-height:42px;align-items:center;padding:0 14px;border:1px solid #3ddbf080;border-radius:999px;color:#cffafe;background:#07111fcc;text-decoration:none;font-weight:800}
    h1{font-size:30px;line-height:1.16;margin:20px 0 8px}.lead{color:#a7c8dc;line-height:1.75;margin-bottom:18px}
    section{margin:14px 0;padding:18px;border:1px solid #4dd8ed2f;border-radius:18px;background:#07101bc9;box-shadow:0 14px 40px #0006}
    h2{font-size:18px;margin:0 0 12px;color:#8cf3ff}.flow{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
    .step{padding:12px 8px;border-radius:14px;background:#0d2137;text-align:center;font-weight:800}.num{display:block;color:#66e8ff;font-size:12px;margin-bottom:6px}
    ul,ol{padding-left:1.25rem;line-height:1.8;margin:8px 0}.tag{display:inline-block;padding:3px 8px;border-radius:999px;background:#12304a;color:#a5f3fc;font-size:12px;font-weight:800;margin-right:5px}
    .note{border-color:#fbbf2450;background:#261b08cc;color:#ffe9a8}.note h2{color:#ffd66b}
    footer{padding:10px 4px;color:#6f93a8;font-size:12px;line-height:1.6;text-align:center}
    @media(max-width:520px){h1{font-size:25px}.flow{grid-template-columns:repeat(2,1fr)}section{padding:15px}}
  </style>
</head>
<body>
<main>
  <div class="top"><a class="back" href="/fish/games/monadfish/">← 返回游戏</a></div>
  <h1>🎣 MonadFish 中文版游戏说明</h1>
  <div class="lead">这是一款轻量化的浏览器钓鱼游戏。核心目标很简单：不断钓鱼、积累鱼获与经验，解锁更好的鱼竿和玩法，并探索任务、烧烤、收集与排行榜内容。</div>
  <section>
    <h2>1. 最基本的钓鱼流程</h2>
    <div class="flow">
      <div class="step"><span class="num">STEP 1</span>点击“抛竿”</div>
      <div class="step"><span class="num">STEP 2</span>等待鱼咬钩</div>
      <div class="step"><span class="num">STEP 3</span>出现提示后“提竿”</div>
      <div class="step"><span class="num">STEP 4</span>获得鱼获与经验</div>
    </div>
    <p>不要太早提竿，也别错过咬钩窗口。不同鱼种、鱼竿和进度会影响你的收获体验。</p>
  </section>
  <section>
    <h2>2. 底部功能都做什么</h2>
    <ul>
      <li><span class="tag">钓鱼</span>主玩法，抛竿、咬钩、提竿、积累鱼获。</li>
      <li><span class="tag">任务</span>完成日常或阶段目标，领取游戏内奖励。</li>
      <li><span class="tag">商店</span>购买鱼饵、鱼竿和其他可用装备。</li>
      <li><span class="tag">烧烤</span>用鱼获制作料理，扩展鱼获价值和收集玩法。</li>
      <li><span class="tag">魔方</span>特殊奖励玩法，有可用次数时可以尝试。</li>
      <li><span class="tag">排行</span>查看当前版本支持的成绩与排行信息。</li>
    </ul>
  </section>
  <section>
    <h2>3. 资源与成长</h2>
    <ul>
      <li><b>鱼饵：</b>抛竿的重要资源；不足时先查看任务、商店或其他奖励来源。</li>
      <li><b>金币：</b>用于购买和升级游戏内物品，不是真实货币。</li>
      <li><b>经验 / 等级：</b>持续钓鱼和完成目标可提升等级，逐步开放更多内容。</li>
      <li><b>鱼竿：</b>不同鱼竿代表不同成长阶段，建议优先升级常用装备。</li>
      <li><b>鱼获：</b>可用于收集、出售或烧烤，具体用途以游戏内页面为准。</li>
    </ul>
  </section>
  <section>
    <h2>4. 新手建议</h2>
    <ol>
      <li>先连续完成几次“抛竿 → 等待 → 提竿”，熟悉咬钩节奏。</li>
      <li>鱼饵不要一次用光，先观察任务和商店的补充方式。</li>
      <li>优先看“任务”，它通常能告诉你下一步最值得做什么。</li>
      <li>钓到新鱼时留意图鉴与烧烤用途，不要只盯着金币。</li>
      <li>如果页面异常，返回游戏后点击宿主页面的重新载入按钮即可重新检查运行状态。</li>
    </ol>
  </section>
  <section class="note">
    <h2>5. 中文 Lite 版与原版的区别</h2>
    <p><b>本版本已经移除钱包入口和 MON / 区块链交易功能。</b>游戏按照普通网页小游戏使用，不需要连接钱包，也不会要求签名或付款。</p>
    <p>当前进度主要保存在本浏览器的本地存储中。清理浏览器站点数据、使用无痕模式或更换设备，可能导致本地进度无法继续。</p>
  </section>
  <footer>MonadFish 上游项目：KaimiEwl/fishing-game（MIT）。本站版本为中文 Lite 适配版。</footer>
</main>
</body>
</html>'''

(dist / "zh-lite.css").write_text(css, encoding="utf-8")
(dist / "zh-lite-polish.js").write_text(js, encoding="utf-8")
(dist / "guide.html").write_text(guide, encoding="utf-8")

index_path = dist / "index.html"
html = index_path.read_text(encoding="utf-8")
if "zh-lite.css" not in html:
    html = html.replace("</head>", '    <link rel="stylesheet" href="/fish/games/monadfish/zh-lite.css" />\n  </head>', 1)
if "zh-lite-polish.js" not in html:
    html = html.replace("</body>", '    <script src="/fish/games/monadfish/zh-lite-polish.js"></script>\n  </body>', 1)
index_path.write_text(html, encoding="utf-8")
