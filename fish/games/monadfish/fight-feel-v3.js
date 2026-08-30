(() => {
  'use strict';

  const PROFILES = [
    { id:'steady', label:'持续发力', hint:'稳住鱼线', speed:1.15, base:38, amp:18, shake:1.2, dart:0 },
    { id:'burst', label:'短促冲刺', hint:'注意突然发力', speed:2.35, base:48, amp:25, shake:2.2, dart:1 },
    { id:'serpentine', label:'蛇形摆动', hint:'跟住左右方向', speed:1.85, base:43, amp:22, shake:1.8, dart:0 },
    { id:'heavy', label:'沉底重拉', hint:'拉力很重', speed:0.82, base:64, amp:17, shake:2.8, dart:0 },
    { id:'sprint', label:'高速横冲', hint:'别让鱼线失控', speed:3.1, base:56, amp:31, shake:3.6, dart:1 },
  ];

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let fighting = false;
  let profile = null;
  let startedAt = 0;
  let raf = 0;

  const style = document.createElement('style');
  style.textContent = `
    #zxyh-fight-hud{position:fixed;left:50%;top:max(46px,calc(env(safe-area-inset-top) + 42px));transform:translateX(-50%) translateY(-8px);z-index:999998;width:min(290px,calc(100vw - 32px));padding:10px 12px 9px;border:1px solid rgba(125,211,252,.34);border-radius:16px;background:linear-gradient(180deg,rgba(4,15,29,.88),rgba(2,8,18,.78));box-shadow:0 12px 36px rgba(0,0,0,.38),inset 0 0 0 1px rgba(255,255,255,.04);backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:opacity .16s ease,transform .16s ease;font-family:"Noto Sans SC","Microsoft YaHei","PingFang SC",system-ui,sans-serif;color:#e6fbff}
    #zxyh-fight-hud.on{opacity:1;transform:translateX(-50%) translateY(0)}
    .zxyh-fight-row{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12px;font-weight:800;letter-spacing:.02em}
    .zxyh-fight-name{color:#a5f3fc}.zxyh-fight-dir{min-width:64px;text-align:right;color:#fff;font-size:14px}
    .zxyh-fight-track{height:8px;margin-top:7px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.09);box-shadow:inset 0 0 0 1px rgba(255,255,255,.05)}
    .zxyh-fight-fill{height:100%;width:40%;border-radius:inherit;background:linear-gradient(90deg,#22d3ee 0%,#facc15 62%,#fb7185 100%);transition:width .07s linear;box-shadow:0 0 16px rgba(34,211,238,.34)}
    .zxyh-fight-sub{display:flex;justify-content:space-between;margin-top:5px;color:#8eb4c9;font-size:10px;font-weight:700}
    body.zxyh-fight-active:after{content:"";position:fixed;inset:0;z-index:999990;pointer-events:none;box-shadow:inset 0 0 38px rgba(34,211,238,.11);animation:zxyh-fight-vignette .72s ease-in-out infinite alternate}
    @keyframes zxyh-fight-vignette{to{box-shadow:inset 0 0 58px rgba(251,191,36,.12)}}
  `;
  document.head.appendChild(style);

  const hud = document.createElement('div');
  hud.id = 'zxyh-fight-hud';
  hud.setAttribute('aria-live','polite');
  hud.innerHTML = `
    <div class="zxyh-fight-row"><span class="zxyh-fight-name">鱼已上钩</span><span class="zxyh-fight-dir">← 拉扯</span></div>
    <div class="zxyh-fight-track"><div class="zxyh-fight-fill"></div></div>
    <div class="zxyh-fight-sub"><span class="zxyh-fight-hint">稳住鱼线</span><span class="zxyh-fight-pct">40% 张力</span></div>`;
  document.body.appendChild(hud);

  const nameEl = hud.querySelector('.zxyh-fight-name');
  const dirEl = hud.querySelector('.zxyh-fight-dir');
  const fillEl = hud.querySelector('.zxyh-fight-fill');
  const hintEl = hud.querySelector('.zxyh-fight-hint');
  const pctEl = hud.querySelector('.zxyh-fight-pct');

  function pickProfile(){
    const r = Math.random();
    if (r < .30) return PROFILES[0];
    if (r < .53) return PROFILES[1];
    if (r < .72) return PROFILES[2];
    if (r < .90) return PROFILES[3];
    return PROFILES[4];
  }

  function tensionAt(t){
    const p = profile;
    let wave = Math.sin(t * p.speed * 4.2) * p.amp;
    if (p.id === 'serpentine') wave += Math.sin(t * 8.3) * 7;
    if (p.dart) {
      const phase = (t * p.speed) % 1;
      if (phase > .76) wave += 24 * Math.sin(((phase - .76) / .24) * Math.PI);
    }
    if (p.id === 'heavy') wave += Math.sin(t * 1.7) * 7;
    return Math.max(16, Math.min(96, p.base + wave));
  }

  function frame(now){
    if (!fighting || !profile) return;
    const t = (now - startedAt) / 1000;
    const tension = tensionAt(t);
    const directionSignal = Math.sin(t * profile.speed * (profile.id === 'serpentine' ? 5.7 : 3.8));
    const right = directionSignal >= 0;
    const urgent = tension > 78;

    fillEl.style.width = tension.toFixed(0) + '%';
    pctEl.textContent = tension.toFixed(0) + '% 张力';
    dirEl.textContent = right ? '拉向右 →' : '← 拉向左';
    nameEl.textContent = '鱼已上钩 · ' + profile.label;
    hintEl.textContent = urgent ? '⚠ 张力偏高，稳住！' : profile.hint;

    const canvas = document.querySelector('canvas');
    if (canvas && !reduceMotion) {
      const tug = directionSignal * profile.shake * (0.35 + tension / 130);
      const lift = Math.sin(t * profile.speed * 6.1) * Math.min(1.5, profile.shake * .32);
      canvas.style.transformOrigin = '50% 35%';
      canvas.style.transform = `translate3d(${tug.toFixed(2)}px,${lift.toFixed(2)}px,0)`;
    }
    raf = requestAnimationFrame(frame);
  }

  function startFight(){
    fighting = true;
    profile = pickProfile();
    startedAt = performance.now();
    window.__MONADFISH_FIGHT_PROFILE__ = profile.id;
    document.body.classList.add('zxyh-fight-active');
    hud.classList.add('on');
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
  }

  function stopFight(){
    fighting = false;
    cancelAnimationFrame(raf);
    document.body.classList.remove('zxyh-fight-active');
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.style.transform = '';
    setTimeout(() => hud.classList.remove('on'), 180);
  }

  let previous = false;
  setInterval(() => {
    const active = window.__MONADFISH_HOOK_FIGHT__ === true;
    if (active && !previous) startFight();
    if (!active && previous) stopFight();
    previous = active;
  }, 40);

  window.__MONADFISH_FIGHT_FEEL_V3__ = true;
})();