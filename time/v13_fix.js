/* My OS V13.1 small onboarding replay fix */
(function(){
'use strict';
function q(s){return document.querySelector(s)}
function reveal(){document.querySelectorAll('#onboardingModal .u-step').forEach(x=>x.classList.remove('v13-config-hidden'));q('#saveProfileBtn')?.classList.remove('v13-config-hidden');try{storageSet('my_os_v13_guide_seen','1')}catch(e){}const b=q('#v13UnderstandBtn');if(b)b.remove();const intro=q('#v13FirstGuide');if(intro&&!intro.querySelector('.learning-note.v13-repeat-note'))intro.insertAdjacentHTML('beforeend','<p class="learning-note v13-repeat-note"><b>接下来只是在告诉系统你更喜欢哪种帮助方式。</b>这些设置以后随时能改。</p>')}
function ensureButton(){const intro=q('#v13FirstGuide');if(!intro||q('#v13UnderstandBtn'))return;const b=document.createElement('button');b.className='btn primary v13-understood';b.id='v13UnderstandBtn';b.textContent='我明白怎么用了，继续设置我的方式';b.addEventListener('click',reveal);intro.appendChild(b)}
q('#reopenV13Guide')?.addEventListener('click',()=>setTimeout(ensureButton,0),true);
setTimeout(()=>{if(q('#onboardingModal')?.classList.contains('show')&&storageGet('my_os_v13_guide_seen')!=='1')ensureButton()},380);
})();
