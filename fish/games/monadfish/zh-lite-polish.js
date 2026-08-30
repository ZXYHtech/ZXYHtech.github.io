(() => {
  'use strict';
  document.documentElement.lang='zh-CN';
  document.title='MonadFish 中文版｜钓鱼游戏';

  const exact=new Map([
    ['Fish','钓鱼'],['Fishing','钓鱼'],['Tasks','任务'],['Shop','商店'],['Grill','烧烤'],['Cube','魔方'],['Board','排行'],['Leaderboard','排行榜'],
    ['Map','地图'],['Travel Map','航海地图'],['Inventory','鱼篓'],['Collection','图鉴'],['Rod','鱼竿'],['Rods','鱼竿'],['Bait','鱼饵'],['Gear','装备'],
    ['Coins','金币'],['Coin','金币'],['Gold','金币'],['Level','等级'],['XP','经验'],['Settings','设置'],['Profile','玩家'],['Stats','数据'],
    ['Cast line','抛竿'],['Hook fish','提竿'],['Premium cast','幸运抛竿'],['No bait','没有鱼饵'],['Caught!','钓到了！'],['Missed!','跑鱼了！'],
    ['Casting...','正在抛竿…'],['Reeling in!','正在遛鱼…'],['Waiting for a bite...','等待鱼儿咬钩…'],['Something is biting!','有鱼咬钩！'],
    ['Fish got away','鱼儿跑掉了'],['Fish got away!','鱼儿跑掉了！'],['The fish got away','鱼儿跑掉了'],['Experience for trying','尝试也能获得经验'],
    ['Loading','加载中'],['Preparing screen...','正在准备界面…'],['Screen error','界面异常'],['Reload game','重新加载'],['Back to fish','返回钓鱼'],
    ['Close','关闭'],['Cancel','取消'],['Confirm','确认'],['Buy','购买'],['Sell','出售'],['Equip','装备'],['Equipped','已装备'],['Upgrade','升级'],['Claim','领取'],
    ['Ready','可领取'],['Locked','未解锁'],['Owned','已拥有'],['New','新'],['Free','免费'],['Continue','继续'],['Play','开始'],['Start','开始'],['Back','返回'],['Next','下一步'],['Previous','上一步'],['Done','完成'],
    ['Common','普通'],['Uncommon','优秀'],['Rare','稀有'],['Epic','史诗'],['Legendary','传说'],['Mythic','神话'],
    ['Daily Tasks','每日任务'],['Weekly Missions','每周任务'],['Daily','每日'],['Weekly','每周'],['Reward','奖励'],['Rewards','奖励'],['Claim reward','领取奖励'],['Claim Reward','领取奖励'],
    ['Fishing Net','自动渔网'],['Cook','烹饪'],['Cooking','烹饪中'],['Recipes','菜谱'],['Dish ready','料理完成'],['Grill score added','烧烤积分已增加'],
    ['Your Fish','你的鱼获'],['Total Catches','累计鱼获'],['Best Catch','最佳鱼获'],['Total','总计'],['Quantity','数量'],['Price','价格'],['Value','价值'],
    ['Not enough bait','鱼饵不足'],['Not enough coins','金币不足'],['Try again','再试一次'],['Perfect!','完美！'],['Good!','不错！'],['Great!','很棒！'],
    ['How to Play','游戏说明'],['Guide','游戏说明'],['Audio','声音'],['Music','音乐'],['Sound Effects','音效'],['Mute','静音'],['On','开'],['Off','关'],
    ['Treasure Vault','宝藏秘库'],['Skull Cove','骷髅湾'],['Coral Castle','珊瑚城堡'],['Volcano Grill','火山烧烤'],['Island Market','海岛集市'],['Wheel Pier','幸运码头'],
    ['More islands unlock later','更多岛屿将在后续开放'],['Top grillers','烧烤高手榜'],['Shared leaderboard','烧烤积分排行'],['your grill score','你的烧烤积分'],
    ['No grillers yet','还没有排行记录'],['YOU','你'],['score','积分'],['Guest griller','游客厨师'],['local player','玩家'],
    ['Carp','鲤鱼'],['Perch','河鲈'],['Tilapia','罗非鱼'],['Trout','虹鳟'],['Bass','黑鲈'],['Bream','欧鳊'],['Koi','锦鲤'],['Eel','鳗鱼'],['Catfish','鲶鱼'],['Goldfish','金鱼'],['Tuna','金枪鱼'],['Mutant Fish','变异鱼'],['Pike','紫影鱼'],['Leviathan','星海利维坦'],
    ['Basic Rod','基础鱼竿'],['Bamboo Rod','竹制鱼竿'],['Carbon Rod','碳素鱼竿'],['Pro Rod','专业鱼竿'],['Legendary Rod','传奇鱼竿'],
    ['Lake Skewer','湖鲜串烤'],['Crispy Perch Plate','香酥河鲈'],['Rare Bream Steak','欧鳊鱼排'],['Deepwater Platter','深水拼盘'],['Cosmic Grill','星海烧烤']
  ]);

  const replacements=[
    [/\bLevel\s+(\d+)\b/gi,'等级 $1'],[/\bLv\.?\s*(\d+)\b/gi,'等级 $1'],[/\b(\d+)\s+XP\b/gi,'$1 经验'],[/\b(\d+)\s+coins?\b/gi,'$1 金币'],[/\b(\d+)\s+baits?\b/gi,'$1 鱼饵'],
    [/Cast again/gi,'再次抛竿'],[/Go fishing/gi,'去钓鱼'],[/Catch fish/gi,'钓到鱼'],[/Sell fish/gi,'出售鱼获'],[/Buy bait/gi,'购买鱼饵'],[/Buy rod/gi,'购买鱼竿'],
    [/Locked islands are coming soon\. Hover or tap a place to preview it\./gi,'更多岛屿正在准备中，点击地点可以查看预览。'],
    [/Grill score board\. Cook a dish and climb the shared table\./gi,'制作料理获得烧烤积分，挑战更高排名。'],
    [/Cook fish into grill stuff\. Score goes to the leaderboard, and everything is saved in Inventory\s*->\s*Grill Stuff for later selling\./gi,'把鱼获制作成料理获得烧烤积分，料理会进入鱼篓，可继续出售。'],
    [/The grill is firing up\. Your dish is almost ready\./gi,'炉火已经升起，料理马上完成。'],
    [/Saved to Inventory\s*->\s*Grill Stuff\. Sell it there later for gold\./gi,'料理已放入鱼篓，之后可以出售换取金币。'],
    [/(\d+)\s+dishes cooked/gi,'已制作 $1 道料理'],[/Cook your first dish and your score will appear here\./gi,'完成第一道料理后，你的积分会显示在这里。'],
    [/Board entry unlocks after your first dish/gi,'完成第一道料理后进入排行榜'],[/Ready to publish as\s*/gi,'当前玩家：'],
    [/Cook one dish and your score goes live on the board under your saved player name\.[^.]*/gi,'完成一道料理后，你的烧烤积分会进入排行榜。'],
    [/Wallet is optional\.[^.]*(?:\.[^.]*)?/gi,'先完成一道料理，就会显示你的排行记录。'],
    [/More grill score means[^.]*/gi,'烧烤积分越高，排行榜名次越靠前'],[/How grill score works/gi,'烧烤积分说明'],[/Grill score info/gi,'烧烤积分说明']
  ];

  const forbiddenPattern=/(connect\s+wallet|disconnect\s+wallet|verify\s+wallet|wallet\s+address|wallet\s+check|\bwallet\b|\bmon\b|blockchain|区块链|链上转账|钱包签到|充值|提现|token\s*(share|launch|allocation|payout)|代币分配|广告收益|ad\s*revenue|revenue\s*share)/i;
  const walletClassPattern=/(wallet|rainbowkit|wagmi|web3|monad)/i;
  const adPattern=/(watch\s*(?:an?\s*)?ad|view\s*(?:an?\s*)?ad|rewarded\s*(?:video|ad)|advertisement|看广告|观看广告|广告奖励)/i;
  const PLAYER_KEY='zxyh_monadfish_lite_player_v1';

  function translateString(input){
    if(!input)return input;
    const leading=input.match(/^\s*/)?.[0]||'', trailing=input.match(/\s*$/)?.[0]||'', core=input.trim();
    if(!core)return input;
    if(exact.has(core))return leading+exact.get(core)+trailing;
    let out=core;
    for(const [re,value] of replacements)out=out.replace(re,value);
    return leading+out+trailing;
  }

  function removeOldBadge(){document.getElementById('zxyh-lite-badge')?.remove();}

  function translate(root){
    const scope=root&&root.nodeType===Node.ELEMENT_NODE?root:document.body;if(!scope)return;
    const walker=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){const p=node.parentElement;if(!p||/^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/i.test(p.tagName))continue;const next=translateString(node.nodeValue||'');if(next!==node.nodeValue)node.nodeValue=next;}
    scope.querySelectorAll?.('[aria-label],[title],[placeholder]').forEach(el=>{for(const attr of ['aria-label','title','placeholder']){if(!el.hasAttribute(attr))continue;const oldValue=el.getAttribute(attr)||'',nextValue=translateString(oldValue);if(nextValue!==oldValue)el.setAttribute(attr,nextValue);}});
  }

  function cleanLegacyMessaging(root){
    const scope=root&&root.nodeType===Node.ELEMENT_NODE?root:document.body;if(!scope)return;
    removeOldBadge();
    scope.querySelectorAll?.('[data-rk],w3m-modal,wcm-modal,[class*="rainbowkit"],[class*="wallet-connect"]').forEach(el=>el.remove());
    scope.querySelectorAll?.('p,small,label,button,a,[role="button"],[role="menuitem"],h1,h2,h3,h4,span').forEach(el=>{
      if(el.id==='zxyh-game-guide-link'||el.id==='zxyh-motion-toggle')return;
      const cls=typeof el.className==='string'?el.className:'';
      const haystack=[el.textContent||'',el.getAttribute('aria-label')||'',el.getAttribute('title')||'',cls].join(' ');
      if(adPattern.test(haystack)){
        if(el.matches('button,a,[role="button"]')){el.dataset.zxyhInstantReward='1';el.dataset.zxyhRewardSource=haystack;el.textContent='立即领取';el.setAttribute('aria-label','立即领取奖励');}
        else el.setAttribute('data-zxyh-ad-hidden','1');
        return;
      }
      if(forbiddenPattern.test(haystack)||walletClassPattern.test(cls)){
        el.setAttribute('data-zxyh-wallet-hidden','1');el.setAttribute('aria-hidden','true');
      }
    });
  }

  function rewardFromText(text){
    const n=Math.max(1,Math.min(1000,Number(String(text).match(/(\d+)/)?.[1]||0)));
    if(/coin|gold|金币/i.test(text))return {coins:n||50,bait:0,label:`+${n||50} 金币`};
    if(/bait|鱼饵/i.test(text))return {coins:0,bait:n||5,label:`+${n||5} 鱼饵`};
    return {coins:50,bait:5,label:'+50 金币 · +5 鱼饵'};
  }
  function grantInstant(text){
    let p;try{p=JSON.parse(localStorage.getItem(PLAYER_KEY)||'null');}catch{p=null;}if(!p)return false;
    const reward=rewardFromText(text||'');p.coins=Math.max(0,Number(p.coins||0))+reward.coins;p.bait=Math.max(0,Number(p.bait||0))+reward.bait;p.updated_at=new Date().toISOString();localStorage.setItem(PLAYER_KEY,JSON.stringify(p));
    const toast=document.createElement('div');toast.textContent='已领取 '+reward.label;toast.style.cssText='position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:2147483646;padding:10px 15px;border-radius:999px;background:rgba(5,46,22,.94);border:1px solid rgba(134,239,172,.55);color:#dcfce7;font:800 13px system-ui;box-shadow:0 12px 32px rgba(0,0,0,.35)';document.body.appendChild(toast);setTimeout(()=>toast.remove(),1200);setTimeout(()=>location.reload(),420);return true;
  }
  document.addEventListener('click',e=>{const el=e.target?.closest?.('[data-zxyh-instant-reward="1"]');if(!el)return;e.preventDefault();e.stopImmediatePropagation();grantInstant(el.dataset.zxyhRewardSource||el.textContent||'');},true);

  function ensureGuideLink(){
    if(location.pathname.endsWith('/guide.html')||document.getElementById('zxyh-game-guide-link'))return;
    const link=document.createElement('a');link.id='zxyh-game-guide-link';link.href='/fish/games/monadfish/guide.html';link.textContent='？ 游戏说明';link.setAttribute('aria-label','打开游戏说明');document.body?.appendChild(link);
  }

  let scheduled=false;function apply(){scheduled=false;translate(document.body);cleanLegacyMessaging(document.body);ensureGuideLink();}function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(apply);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','class','id']});
  const runtimeStyle=document.createElement('style');runtimeStyle.textContent='#zxyh-lite-badge,[data-zxyh-wallet-hidden="1"],[data-zxyh-ad-hidden="1"]{display:none!important}';document.head.appendChild(runtimeStyle);
  window.__MONADFISH_GRANT_INSTANT_REWARD__=grantInstant;
  window.__MONADFISH_ZH_V4__=true;
})();