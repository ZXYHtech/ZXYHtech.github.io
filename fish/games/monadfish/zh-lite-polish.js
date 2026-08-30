(() => {
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
})();