(() => {
  'use strict';
  const exact=new Map([
    ['Inventory','鱼篓'],['Fish','鱼获'],['Grill Stuff','料理'],['Gear','装备'],['Achievements','图鉴成就'],['Rods','鱼竿'],
    ['Inventory is empty','鱼篓还是空的'],['Cast your rod to catch some fish!','去抛几竿，把第一条鱼带回来吧！'],
    ['No grill stuff yet','还没有料理'],['Your cooked grill stuff will show up here for selling later.','烧烤完成的料理会放在这里，之后可以出售换金币。'],
    ['Auto Fishing Net','自动渔网'],['Refills once per day and stores the catch here until you collect it.','每天自动补充一次鱼获，领取前会暂存在这里。'],
    ['Waiting','待领取'],['Last collect','上次领取'],['Never','从未'],['Ready date','可领取日期'],['Tomorrow','明天'],['Waiting in net','渔网中等待领取'],
    ['No fish waiting right now','当前没有待领取鱼获'],['The net refills once per day after the next daily reset.','下一次每日刷新后，渔网会再次补充鱼获。'],
    ['Забрать','领取鱼获'],['Achievements found','已发现鱼种'],['Achievement pages','图鉴页面'],['Complete','已完成'],['Unknown species','未知鱼种'],
    ['Common','普通'],['Uncommon','优秀'],['Rare','稀有'],['Epic','史诗'],['Legendary','传说'],['Mythical','神话'],['Secret','隐藏'],
    ['Carp','鲤鱼'],['Perch','河鲈'],['Tilapia','罗非鱼'],['Trout','虹鳟'],['Bass','黑鲈'],['Bream','欧鳊'],['Koi','锦鲤'],['Eel','鳗鱼'],['Catfish','鲶鱼'],['Goldfish','金鱼'],['Tuna','金枪鱼'],['Mutant Fish','变异鱼'],['Purple Fish','紫影鱼'],['Pike','紫影鱼'],['Cosmic Leviathan','星海利维坦'],['Leviathan','星海利维坦'],
    ['A common fish, but great for a stew!','最常见的湖鱼，适合做汤和烧烤。'],['A striped predator with vivid colors','带条纹的小型掠食鱼，动作灵活。'],['A large fish with golden sides','体型较大，鱼身泛着金色光泽。'],['A giant of the deep with whiskers','深水中的大块头，胡须非常醒目。'],['Grants wishes... well, almost!','金光闪闪的稀有鱼获，看到它就走运了。'],['Something strange from the depths... NFT-ready!','来自深水的奇异鱼种，十分少见。'],['A majestic purple predator! extremely rare!','极其稀有的紫色掠食者。'],['Legend of the ocean! 1 in 10,000 fishers have seen it...','传说级海中巨兽，只有极少数钓手见过。'],
    ['The default starter rod. Every player owns it for free from the first cast.','入门鱼竿，适合熟悉抛竿和搏鱼。'],['Standard tackle','标准钓组'],['Blue bobber','蓝色浮漂'],['Purple bobber','紫色浮漂'],['Golden glowing bobber','金色发光浮漂']
  ]);
  const priceMap=new Map([[4,24],[8,32],[5,26],[11,45],[14,58],[18,72],[26,110],[34,150],[38,175],[100,380],[75,520],[400,1200],[5000,9000],[25000,35000]]);
  function translateText(s){
    if(!s)return s;const lead=s.match(/^\s*/)?.[0]||'',trail=s.match(/\s*$/)?.[0]||'',core=s.trim();if(!core)return s;
    if(exact.has(core))return lead+exact.get(core)+trail;
    let out=core;
    out=out.replace(/^Open inventory,\s*(\d+)\s*items?$/i,'打开鱼篓，共 $1 件物品')
      .replace(/^Close inventory$/i,'关闭鱼篓')
      .replace(/^Fish\s*\((\d+)\)$/i,'鱼获 ($1)')
      .replace(/^Grill Stuff\s*\((\d+)\)$/i,'料理 ($1)')
      .replace(/^Gear\s*\((\d+)\)$/i,'装备 ($1)')
      .replace(/^Rods\s*\((\d+)\)$/i,'鱼竿 ($1)')
      .replace(/^(\d+)\s*fish\/day$/i,'每天 $1 条')
      .replace(/^First catch bonus:\s*\+(\d+)\s*coins$/i,'首次钓到奖励：+$1 金币')
      .replace(/^First catch\s*\+(\d+)\s*coins$/i,'首次钓到 +$1 金币')
      .replace(/^Total:\s*(\d+)$/i,'总价值：$1')
      .replace(/^Sell\s*\(\+(\d+)\)$/i,(_,n)=>`出售 (+${priceMap.get(Number(n))||Number(n)})`)
      .replace(/^Забрать рыбу из сети$/i,'领取渔网中的鱼获');
    return lead+out+trail;
  }
  function polishPrices(root){
    const scope=root?.nodeType===Node.ELEMENT_NODE?root:document.body;if(!scope)return;
    scope.querySelectorAll('article,div').forEach(card=>{
      const sell=[...card.querySelectorAll('button')].find(b=>/^出售\s*\(\+\d+\)$/.test((b.textContent||'').trim()));if(!sell)return;
      const m=(sell.textContent||'').match(/\+(\d+)/),unit=m?Number(m[1]):0;if(!unit)return;
      const q=[...card.querySelectorAll('span')].map(x=>(x.textContent||'').trim()).find(t=>/^x\d+$/.test(t));const qty=Math.max(1,Number(q?.slice(1)||1));
      const value=[...card.querySelectorAll('span')].find(x=>/^总价值：\d+$/.test((x.textContent||'').trim()));if(value&&value.firstChild)value.firstChild.nodeValue=`总价值：${unit*qty} `;
    });
  }
  function apply(root=document.body){
    const scope=root?.nodeType===Node.ELEMENT_NODE?root:document.body;if(!scope)return;
    const walker=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){const p=node.parentElement;if(!p||/^(SCRIPT|STYLE|CODE|PRE|TEXTAREA)$/i.test(p.tagName))continue;const n=translateText(node.nodeValue||'');if(n!==node.nodeValue)node.nodeValue=n;}
    scope.querySelectorAll('[aria-label],[title]').forEach(el=>{for(const a of ['aria-label','title']){if(el.hasAttribute(a)){const v=el.getAttribute(a)||'',n=translateText(v);if(v!==n)el.setAttribute(a,n);}}});
    polishPrices(scope);
  }
  let scheduled=false;const schedule=()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;apply();});};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>apply(),{once:true});else apply();
  new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title']});
  window.__MONADFISH_INVENTORY_ZH_V5__=true;
})();
