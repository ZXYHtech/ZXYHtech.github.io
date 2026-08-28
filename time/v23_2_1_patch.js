/* My OS V23.2.1 · mobile pomodoro layout polish */
(function(){
'use strict';
if(window.__MY_OS_V23_2_1__)return;window.__MY_OS_V23_2_1__=true;
const q=s=>document.querySelector(s);
function compact(){
 const panel=q('#pomodoroPanel'),bg=q('#v232BgReminder');
 if(panel&&bg&&bg.parentElement!==panel){panel.appendChild(bg)}
 q('#pomoTestAlert')?.classList.add('v2321-hide-test');
 q('#v232BgTest')?.classList.add('v2321-hide-test');
 q('.v232-bg-note')?.classList.add('v2321-hide-test');
 const headSmall=q('#v232BgReminder .v232-bg-head small');
 if(headSmall&&headSmall.textContent!=='锁屏后台提醒已验证')headSmall.textContent='锁屏后台提醒已验证';
 const title=q('#v232BgReminder .v232-bg-head b');
 if(title&&title.textContent!=='📱 后台锁屏提醒')title.textContent='📱 后台锁屏提醒';
 const bgStatus=q('#v232BgStatus'),box=q('#v232BgReminder');
 if(bgStatus&&box){
   const t=(bgStatus.textContent||'').replace(/\s+/g,' ');
   const bad=/未恢复|没有启动|阻止|不支持/.test(t);
   box.classList.toggle('v2321-needs-recovery',bad);
 }
 const resume=q('#v232BgResume');if(resume&&resume.textContent!=='恢复提醒')resume.textContent='恢复提醒';
}
const mo=new MutationObserver(compact);mo.observe(document.body,{childList:true,subtree:true,characterData:true});
compact();setInterval(compact,1800);
const small=q('.brand small'),rt=q('#runtimeBadge span');if(small)small.textContent='V23.2.1 · Stable · 移动端优化';if(rt)rt.textContent='V23.2.1 · My OS';
})();
