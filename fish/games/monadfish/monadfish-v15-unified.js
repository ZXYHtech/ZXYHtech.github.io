(()=>{
'use strict';
const RELEASE='V15-UNIFIED';
const ATLAS='/fish/games/monadfish/assets/v8-1249/angler-boy-v8-1249.webp?release='+RELEASE;
const OLD=/pepe_boat|pepe.*boat|pepe.?vessel|fisherman\.png|pepe_final|pepe_sheet/i;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
window.__MONADFISH_RELEASE__=RELEASE;
window.__MONADFISH_V15_UNIFIED__=true;

const style=document.createElement('style');
style.textContent=`
#mf-v8-character,#mf-v9-angler,#mf-v10-angler,#mf-v10-boat,#mf-v11-angler,#mf-v12-angler,#mf-v13-angler,#mf-v13-hint,#mf-v14-angler,#mf-v14-status{display:none!important;opacity:0!important;visibility:hidden!important}
#mf-v15-status{position:fixed;left:7px;top:7px;z-index:2147483600;padding:3px 7px;border-radius:8px;background:#031c2bd9;color:#67e8f9;font:900 9px/1.2 system-ui;pointer-events:none;opacity:.16}
`;
document.head.appendChild(style);
const status=document.createElement('div');status.id='mf-v15-status';status.textContent='V15 场景统一中';document.body.appendChild(status);

let state='idle',stateSince=performance.now(),resultSuccess=true,wasFight=false,lastSceneDrawAt=0,lastTip=null,lastPose=-1;
const setState=s=>{if(s===state)return;state=s;stateSince=performance.now();};
const visible=el=>{if(!el)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>8&&r.height>8&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>0;};
function findAction(re){
  for(const b of document.querySelectorAll('button,[role="button"]')){
    if(!visible(b))continue;
    const hay=String(b.getAttribute('aria-label')||'')+' '+String(b.textContent||'')+' '+[...b.querySelectorAll('img')].map(i=>i.src+' '+(i.alt||'')).join(' ');
    if(re.test(hay))return b;
  }
  return null;
}
document.addEventListener('click',e=>{
  const b=e.target?.closest?.('button,[role="button"]');if(!b)return;
  const hay=String(b.getAttribute('aria-label')||'')+' '+String(b.textContent||'')+' '+[...b.querySelectorAll('img')].map(i=>i.src+' '+(i.alt||'')).join(' ');
  if(/抛竿|Cast line|cast_button_blue/i.test(hay)){setState('casting');setTimeout(()=>{if(state==='casting')setState('waiting')},850);}
  if(/提竿|Hook fish|cast_button_green/i.test(hay))setState('catching');
},true);
setInterval(()=>{
  const fight=window.__MONADFISH_HOOK_FIGHT__===true||document.body.classList.contains('mf-v8-fighting');
  if(fight){if(!wasFight)setState('catching');wasFight=true;return;}
  if(wasFight){wasFight=false;setState('result');setTimeout(()=>{const t=String(document.body?.innerText||'');resultSuccess=!/跑鱼|鱼儿跑|got away|missed|失败/i.test(t);},120);return;}
  if(findAction(/提竿|Hook fish|cast_button_green/i)){setState('biting');return;}
  if(findAction(/抛竿|Cast line|cast_button_blue/i)){if(state!=='casting'&&state!=='waiting')setState('idle');return;}
  if(state==='casting'&&performance.now()-stateSince>900)setState('waiting');
  if(state==='result'&&performance.now()-stateSince>2800)setState('idle');
},55);

const atlas=new Image();atlas.decoding='async';atlas.src=ATLAS;
const poses=new Array(8).fill(null);
const anchorMode=['right','right','top','left','right','top','right','right'];
function cleanPose(index){
  const cw=Math.floor(atlas.naturalWidth/4),ch=Math.floor(atlas.naturalHeight/2);
  const raw=document.createElement('canvas');raw.width=cw;raw.height=ch;raw.dataset.mfV15='1';
  const x=raw.getContext('2d',{willReadFrequently:true});
  x.drawImage(atlas,(index%4)*cw,Math.floor(index/4)*ch,cw,ch,0,0,cw,ch);
  let im;try{im=x.getImageData(0,0,cw,ch)}catch{return null;}
  const d=im.data,n=cw*ch,labels=new Uint16Array(n),queue=new Int32Array(n);let label=0,best=0,bestCount=0;
  for(let p=0;p<n;p++){
    if(d[p*4+3]<28||labels[p])continue;
    label++;let head=0,tail=0,count=0;queue[tail++]=p;labels[p]=label;
    while(head<tail){const q=queue[head++],qx=q%cw,qy=(q/cw)|0;count++;
      let z;if(qx>0){z=q-1;if(!labels[z]&&d[z*4+3]>=28){labels[z]=label;queue[tail++]=z}}
      if(qx<cw-1){z=q+1;if(!labels[z]&&d[z*4+3]>=28){labels[z]=label;queue[tail++]=z}}
      if(qy>0){z=q-cw;if(!labels[z]&&d[z*4+3]>=28){labels[z]=label;queue[tail++]=z}}
      if(qy<ch-1){z=q+cw;if(!labels[z]&&d[z*4+3]>=28){labels[z]=label;queue[tail++]=z}}
    }
    if(count>bestCount){bestCount=count;best=label;}
  }
  if(!best)return null;
  let minX=cw,minY=ch,maxX=0,maxY=0;
  for(let p=0;p<n;p++){
    if(labels[p]!==best){d[p*4+3]=0;continue;}
    const px=p%cw,py=(p/cw)|0;if(px<minX)minX=px;if(px>maxX)maxX=px;if(py<minY)minY=py;if(py>maxY)maxY=py;
  }
  x.putImageData(im,0,0);
  const w=Math.max(1,maxX-minX+1),h=Math.max(1,maxY-minY+1),out=document.createElement('canvas');out.width=w;out.height=h;out.dataset.mfV15='1';
  const o=out.getContext('2d',{willReadFrequently:true});o.drawImage(raw,minX,minY,w,h,0,0,w,h);
  const od=o.getImageData(0,0,w,h).data,mode=anchorMode[index];let ax=mode==='left'?w:-1,ay=h;
  const limit=h*(index===1?0.66:0.60);
  for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){
    if(od[(yy*w+xx)*4+3]<32)continue;
    if(mode==='top'){
      if(yy<ay||(yy===ay&&xx>ax)){ax=xx;ay=yy;}
    }else if(yy<=limit&&mode==='right'){
      if(xx>ax||(xx===ax&&yy<ay)){ax=xx;ay=yy;}
    }else if(yy<=limit&&mode==='left'){
      if(xx<ax||(xx===ax&&yy<ay)){ax=xx;ay=yy;}
    }
  }
  if(ax<0||ax>w){ax=w*.85;ay=h*.16;}
  return{canvas:out,w,h,ax,ay};
}
atlas.onload=()=>{for(let i=0;i<8;i++)poses[i]=cleanPose(i);window.__MONADFISH_V15_ASSETS_READY__=poses.every(Boolean);status.textContent=window.__MONADFISH_V15_ASSETS_READY__?'V15 人竿线统一 ✓':'V15 素材降级';};
atlas.onerror=()=>{window.__MONADFISH_V15_ASSETS_READY__=false;status.textContent='V15 人物素材失败';};

function direction(){return String(document.getElementById('mf-v8-dir')?.textContent||'');}
function tension(){const s=String(document.getElementById('mf-v8-tension')?.textContent||'');const m=s.match(/(\d+)/);return m?+m[1]:50;}
function choosePose(now){
  if(state==='idle'||state==='waiting')return{index:0,mirror:false};
  if(state==='casting')return{index:2,mirror:false};
  if(state==='biting')return{index:1,mirror:false};
  if(state==='result')return{index:resultSuccess?7:6,mirror:false};
  const age=now-stateSince,d=direction(),high=tension()>74;
  if(age<330)return{index:2,mirror:false};
  if(high)return{index:5,mirror:/右/.test(d)};
  if((age%1150)>790)return{index:6,mirror:/左/.test(d)};
  return{index:4,mirror:/右/.test(d)};
}
function drawFightBoat(ctx,dw,dh){
  const y=dh*.24,top=dh*.16,bottom=dh*.47;
  ctx.save();ctx.shadowColor='rgba(0,0,0,.42)';ctx.shadowBlur=Math.max(4,dh*.045);ctx.shadowOffsetY=dh*.035;
  const g=ctx.createLinearGradient(0,top,0,bottom);g.addColorStop(0,'#d58a3a');g.addColorStop(.48,'#9b5227');g.addColorStop(1,'#4b2415');ctx.fillStyle=g;ctx.strokeStyle='#f2b768';ctx.lineWidth=Math.max(1.5,dh*.018);
  ctx.beginPath();ctx.moveTo(-dw*.43,top);ctx.quadraticCurveTo(0,y+dh*.08,dw*.43,top);ctx.lineTo(dw*.34,bottom);ctx.quadraticCurveTo(0,bottom+dh*.10,-dw*.34,bottom);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.shadowColor='transparent';ctx.strokeStyle='rgba(66,31,18,.72)';ctx.lineWidth=Math.max(2,dh*.025);ctx.beginPath();ctx.moveTo(-dw*.36,top+dh*.035);ctx.quadraticCurveTo(0,y+dh*.09,dw*.36,top+dh*.035);ctx.stroke();
  ctx.strokeStyle='rgba(255,213,143,.45)';ctx.lineWidth=Math.max(1,dh*.010);ctx.beginPath();ctx.moveTo(-dw*.28,bottom-dh*.06);ctx.quadraticCurveTo(0,bottom+dh*.01,dw*.28,bottom-dh*.06);ctx.stroke();ctx.restore();
}
function extraFightAngle(now){return(state==='biting'||state==='catching'||state==='result')?(-0.06+Math.sin((Date.now()*.001)*8)*0.03):0;}
function rotatePoint(x,y,a){const c=Math.cos(a),s=Math.sin(a);return{x:x*c-y*s,y:x*s+y*c};}
function drawUnified(ctx,dw,dh,now){
  const spec=choosePose(now),p=poses[spec.index];lastPose=spec.index;
  if(!p)return false;
  if(spec.index>=3)drawFightBoat(ctx,dw,dh);
  const L={x:dw*(.898-.5),y:dh*(.095-.5)},extra=extraFightAngle(now),target=rotatePoint(L.x,L.y,-extra);
  let scale,ox,oy;
  if(spec.index===0||spec.index===2){
    const bottom=dh*.47,den=Math.max(30,p.h-p.ay);scale=clamp((bottom-target.y)/den,dh*.00145,dh*.00425);oy=target.y-p.ay*scale;
    ox=spec.mirror?target.x-(p.w-p.ax)*scale:target.x-p.ax*scale;
  }else{
    const targetH=dh*(spec.index===1?1.10:spec.index===7?1.00:.88);scale=targetH/p.h;const bottom=dh*(spec.index===1?.47:.30);oy=bottom-p.h*scale;ox=-p.w*scale*.5+dw*.015;
  }
  ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.shadowColor='rgba(0,0,0,.32)';ctx.shadowBlur=Math.max(2,dh*.025);ctx.shadowOffsetY=dh*.025;
  const previous=drawUnified.previous;
  if(spec.mirror){ctx.translate(ox+p.w*scale,oy);ctx.scale(-1,1);previous.call(ctx,p.canvas,0,0,p.w*scale,p.h*scale);}else previous.call(ctx,p.canvas,ox,oy,p.w*scale,p.h*scale);
  ctx.restore();
  const localTip=spec.mirror?{x:ox+(p.w-p.ax)*scale,y:oy+p.ay*scale}:{x:ox+p.ax*scale,y:oy+p.ay*scale};
  const m=ctx.getTransform(),baseX=ctx.canvas.clientWidth?ctx.canvas.width/ctx.canvas.clientWidth:1,baseY=ctx.canvas.clientHeight?ctx.canvas.height/ctx.canvas.clientHeight:1;
  const deviceX=m.a*localTip.x+m.c*localTip.y+m.e,deviceY=m.b*localTip.x+m.d*localTip.y+m.f;
  lastTip={x:deviceX/baseX,y:deviceY/baseY,canvas:ctx.canvas,at:performance.now(),state};lastSceneDrawAt=performance.now();
  return true;
}

const proto=window.CanvasRenderingContext2D?.prototype;
if(proto&&!proto.__mfV15UnifiedPatched){
  const previous=proto.drawImage,nativeMove=proto.moveTo,nativeQuad=proto.quadraticCurveTo;drawUnified.previous=previous;Object.defineProperty(proto,'__mfV15UnifiedPatched',{value:true});
  proto.drawImage=function(image,...args){
    const src=String(image?.currentSrc||image?.src||'');
    if(OLD.test(src)&&this.canvas?.dataset?.mfV15!=='1'&&this.canvas?.dataset?.mfV8!=='1'){
      if(args.length===4){const [dx,dy,dw,dh]=args.map(Number);if([dx,dy,dw,dh].every(Number.isFinite)&&dw>40&&dh>40){if(drawUnified(this,dw,dh,performance.now()))return;}}
      return;
    }
    return previous.call(this,image,...args);
  };
  proto.moveTo=function(x,y){
    const t=lastTip,age=t?performance.now()-t.at:999;
    const stroke=String(this.strokeStyle||'').replace(/\s+/g,'');const lineLike=t&&t.canvas===this.canvas&&age<22&&Number(this.lineWidth)<=1.1&&/220.*230.*255.*0\.45/.test(stroke)&&state!=='idle';
    if(lineLike){t.lineActive=true;t.origX=Number(x);t.origY=Number(y);return nativeMove.call(this,t.x,t.y);}
    return nativeMove.call(this,x,y);
  };
  proto.quadraticCurveTo=function(cpx,cpy,x,y){
    const t=lastTip;
    if(t?.lineActive&&t.canvas===this.canvas){t.lineActive=false;const ex=Number(x),ey=Number(y);if([ex,ey].every(Number.isFinite)){const nx=(t.x+ex)/2,ny=state==='casting'?Math.min(t.y,ey)-80:(t.y+ey)/2+15;return nativeQuad.call(this,nx,ny,ex,ey);}}
    return nativeQuad.call(this,cpx,cpy,x,y);
  };
}

window.__MONADFISH_V15_CHECK__=()=>({release:RELEASE,assetsReady:poses.every(Boolean),canvasHooked:performance.now()-lastSceneDrawAt<1500,state,pose:lastPose,tip:lastTip?{x:Math.round(lastTip.x),y:Math.round(lastTip.y)}:null,oldOverlayHidden:['mf-v13-angler','mf-v14-angler'].every(id=>{const e=document.getElementById(id);return!e||getComputedStyle(e).display==='none';})});
})();
