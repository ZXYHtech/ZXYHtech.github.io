(()=>{
'use strict';
const RELEASE='V16-CANVAS';
window.__MONADFISH_RELEASE__=RELEASE;
window.__MONADFISH_V16_CANVAS__=true;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const ATLAS='/fish/games/monadfish/assets/v8-1249/angler-boy-v8-1249.webp?release='+RELEASE;
const proto=window.CanvasRenderingContext2D?.prototype;
if(!proto)return;

const style=document.createElement('style');
style.textContent=`#mf-v8-character,#mf-v9-angler,#mf-v10-angler,#mf-v10-boat,#mf-v11-angler,#mf-v12-angler,#mf-v13-angler,#mf-v13-hint,#mf-v14-angler,#mf-v14-status,#mf-v15-status{display:none!important;opacity:0!important;visibility:hidden!important}#mf-v16-status{position:fixed;left:6px;top:6px;z-index:2147483600;padding:2px 6px;border-radius:7px;background:#031c2bcc;color:#a7f3d0;font:900 8px/1.2 system-ui;pointer-events:none;opacity:.2}`;
document.head.appendChild(style);
const status=document.createElement('div');status.id='mf-v16-status';status.textContent='V16 场景接管';document.body.appendChild(status);

let state='idle',stateSince=performance.now(),wasFight=false,resultSuccess=true;
let mainCanvas=null,boatImage=null,candidateHits=0,replacementDraws=0,lastReplace=0,lastTip=null,lastPose=0;
const visible=el=>{if(!el)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>8&&r.height>8&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>0};
function findAction(re){for(const b of document.querySelectorAll('button,[role="button"]')){if(!visible(b))continue;const hay=String(b.getAttribute('aria-label')||'')+' '+String(b.textContent||'')+' '+[...b.querySelectorAll('img')].map(i=>i.src+' '+(i.alt||'')).join(' ');if(re.test(hay))return b}return null}
function setState(s){if(s!==state){state=s;stateSince=performance.now()}}
document.addEventListener('click',e=>{const b=e.target?.closest?.('button,[role="button"]');if(!b)return;const hay=String(b.getAttribute('aria-label')||'')+' '+String(b.textContent||'')+' '+[...b.querySelectorAll('img')].map(i=>i.src+' '+(i.alt||'')).join(' ');if(/抛竿|Cast line|cast_button_blue/i.test(hay)){setState('casting');setTimeout(()=>{if(state==='casting')setState('waiting')},850)}if(/提竿|Hook fish|cast_button_green/i.test(hay))setState('catching')},true);
setInterval(()=>{const fight=window.__MONADFISH_HOOK_FIGHT__===true||document.body.classList.contains('mf-v8-fighting');if(fight){if(!wasFight)setState('catching');wasFight=true;return}if(wasFight){wasFight=false;setState('result');setTimeout(()=>{resultSuccess=!/跑鱼|鱼儿跑|got away|missed|失败/i.test(String(document.body?.innerText||''))},120);return}if(findAction(/提竿|Hook fish|cast_button_green/i)){setState('biting');return}if(findAction(/抛竿|Cast line|cast_button_blue/i)){if(!['casting','waiting','result'].includes(state))setState('idle');return}if(state==='result'&&performance.now()-stateSince>2600)setState('idle')},60);

const atlas=new Image();atlas.decoding='async';atlas.src=ATLAS;
const poses=new Array(8).fill(null);
const anchorMode=['right','right','top','left','right','left','left','right'];
function cleanPose(index){
 const cw=Math.floor(atlas.naturalWidth/4),ch=Math.floor(atlas.naturalHeight/2),raw=document.createElement('canvas');raw.width=cw;raw.height=ch;raw.dataset.mfV16='1';
 const x=raw.getContext('2d',{willReadFrequently:true});x.drawImage(atlas,(index%4)*cw,Math.floor(index/4)*ch,cw,ch,0,0,cw,ch);
 let im;try{im=x.getImageData(0,0,cw,ch)}catch{return null}const d=im.data,n=cw*ch,labels=new Uint16Array(n),q=new Int32Array(n);let label=0,best=0,bestCount=0;
 for(let p=0;p<n;p++){if(d[p*4+3]<25||labels[p])continue;label++;let head=0,tail=0,count=0;q[tail++]=p;labels[p]=label;while(head<tail){const z=q[head++],zx=z%cw,zy=(z/cw)|0;count++;let k;if(zx>0){k=z-1;if(!labels[k]&&d[k*4+3]>=25){labels[k]=label;q[tail++]=k}}if(zx<cw-1){k=z+1;if(!labels[k]&&d[k*4+3]>=25){labels[k]=label;q[tail++]=k}}if(zy>0){k=z-cw;if(!labels[k]&&d[k*4+3]>=25){labels[k]=label;q[tail++]=k}}if(zy<ch-1){k=z+cw;if(!labels[k]&&d[k*4+3]>=25){labels[k]=label;q[tail++]=k}}}if(count>bestCount){bestCount=count;best=label}}
 if(!best)return null;let minX=cw,minY=ch,maxX=0,maxY=0;for(let p=0;p<n;p++){if(labels[p]!==best){d[p*4+3]=0;continue}const px=p%cw,py=(p/cw)|0;minX=Math.min(minX,px);maxX=Math.max(maxX,px);minY=Math.min(minY,py);maxY=Math.max(maxY,py)}x.putImageData(im,0,0);const w=maxX-minX+1,h=maxY-minY+1,out=document.createElement('canvas');out.width=w;out.height=h;out.dataset.mfV16='1';const o=out.getContext('2d',{willReadFrequently:true});o.drawImage(raw,minX,minY,w,h,0,0,w,h);const od=o.getImageData(0,0,w,h).data,mode=anchorMode[index];let ax=mode==='left'?w:-1,ay=h,limit=h*.67;
 for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){if(od[(yy*w+xx)*4+3]<32)continue;if(mode==='top'){if(yy<ay||(yy===ay&&xx>ax)){ax=xx;ay=yy}}else if(yy<=limit&&mode==='right'){if(xx>ax||(xx===ax&&yy<ay)){ax=xx;ay=yy}}else if(yy<=limit&&mode==='left'){if(xx<ax||(xx===ax&&yy<ay)){ax=xx;ay=yy}}}
 if(ax<0||ax>w){ax=w*.85;ay=h*.18}return{canvas:out,w,h,ax,ay};
}
atlas.onload=()=>{for(let i=0;i<8;i++)poses[i]=cleanPose(i);window.__MONADFISH_V16_ASSETS_READY__=poses.every(Boolean);status.textContent=window.__MONADFISH_V16_ASSETS_READY__?'V16 素材 ✓':'V16 素材降级'};
atlas.onerror=()=>{window.__MONADFISH_V16_ASSETS_READY__=false;status.textContent='V16 素材失败'};

function direction(){return String(document.getElementById('mf-v8-dir')?.textContent||'')}
function tension(){const m=String(document.getElementById('mf-v8-tension')?.textContent||'').match(/(\d+)/);return m?+m[1]:50}
function choosePose(now){if(state==='idle'||state==='waiting')return{index:0,mirror:false};if(state==='casting')return{index:2,mirror:false};if(state==='biting')return{index:1,mirror:false};if(state==='result')return{index:resultSuccess?7:6,mirror:false};const age=now-stateSince,d=direction();if(age<350)return{index:2,mirror:false};if(tension()>74)return{index:5,mirror:/右/.test(d)};if(age%1200>820)return{index:6,mirror:/左/.test(d)};return{index:4,mirror:/右/.test(d)}}
function scaleOf(m){return Math.max(.001,Math.hypot(m.a,m.b))}
function isBoatGeometry(ctx,args){
 if(args.length!==4||ctx.canvas?.dataset?.mfV8==='1'||ctx.canvas?.dataset?.mfV13==='1'||ctx.canvas?.dataset?.mfV15==='1'||ctx.canvas?.dataset?.mfV16==='1')return false;
 const [dx,dy,dw,dh]=args.map(Number);if(![dx,dy,dw,dh].every(Number.isFinite)||dw<=0||dh<=0)return false;
 const m=ctx.getTransform(),sc=scaleOf(m),lw=ctx.canvas.width/sc,lh=ctx.canvas.height/sc;if(lw<250||lh<350)return false;
 const centered=Math.abs(dx+dw/2)<Math.max(3,dw*.025)&&Math.abs(dy+dh/2)<Math.max(3,dh*.025);
 const cx=m.e/sc,cy=m.f/sc;
 return centered&&dw>lw*.28&&dw<lw*.82&&dh>lh*.09&&dh<lh*.48&&cx>-lw*.05&&cx<lw*.55&&cy>lh*.10&&cy<lh*.48;
}
function drawBoat(ctx,dw,dh){const top=dh*.13,bottom=dh*.47;ctx.save();const g=ctx.createLinearGradient(0,top,0,bottom);g.addColorStop(0,'#d8893d');g.addColorStop(.5,'#995027');g.addColorStop(1,'#4c2415');ctx.fillStyle=g;ctx.strokeStyle='#f3b96d';ctx.lineWidth=Math.max(1.5,dh*.016);ctx.beginPath();ctx.moveTo(-dw*.44,top);ctx.quadraticCurveTo(0,dh*.30,dw*.44,top);ctx.lineTo(dw*.35,bottom);ctx.quadraticCurveTo(0,bottom+dh*.08,-dw*.35,bottom);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}
function extraAngle(){return['biting','catching','result'].includes(state)?(-.06+Math.sin(Date.now()*.008)*.03):0}
function rot(p,a){const c=Math.cos(a),s=Math.sin(a);return{x:p.x*c-p.y*s,y:p.x*s+p.y*c}}
let nativeDraw=null;
function drawUnified(ctx,dw,dh,now){const spec=choosePose(now),p=poses[spec.index];lastPose=spec.index;if(!p)return false;if(spec.index>=3)drawBoat(ctx,dw,dh);const target=rot({x:dw*(.898-.5),y:dh*(.095-.5)},-extraAngle());let scale,ox,oy;if(spec.index<=2){const bottom=dh*.47,den=Math.max(20,p.h-p.ay);scale=clamp((bottom-target.y)/den,dh*.0013,dh*.0050);oy=target.y-p.ay*scale;ox=spec.mirror?target.x-(p.w-p.ax)*scale:target.x-p.ax*scale}else{const targetH=dh*(spec.index===7?1.02:.90);scale=targetH/p.h;oy=dh*.31-p.h*scale;ox=-p.w*scale*.5+dw*.02}
 ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.shadowColor='rgba(0,0,0,.30)';ctx.shadowBlur=Math.max(2,dh*.022);ctx.shadowOffsetY=dh*.018;if(spec.mirror){ctx.translate(ox+p.w*scale,oy);ctx.scale(-1,1);nativeDraw.call(ctx,p.canvas,0,0,p.w*scale,p.h*scale)}else nativeDraw.call(ctx,p.canvas,ox,oy,p.w*scale,p.h*scale);ctx.restore();
 const localTip=spec.mirror?{x:ox+(p.w-p.ax)*scale,y:oy+p.ay*scale}:{x:ox+p.ax*scale,y:oy+p.ay*scale};const m=ctx.getTransform(),sc=scaleOf(m);lastTip={x:(m.a*localTip.x+m.c*localTip.y+m.e)/sc,y:(m.b*localTip.x+m.d*localTip.y+m.f)/sc,canvas:ctx.canvas,at:performance.now()};return true}

if(!proto.__mfV16CanvasPatched){
 nativeDraw=proto.drawImage;const nativeMove=proto.moveTo,nativeQuad=proto.quadraticCurveTo;Object.defineProperty(proto,'__mfV16CanvasPatched',{value:true});
 proto.drawImage=function(image,...args){
   if(isBoatGeometry(this,args)){
     mainCanvas=this.canvas;candidateHits++;
     if(!boatImage)boatImage=image;
     if(poses[0]){const [, ,dw,dh]=args.map(Number);if(drawUnified(this,dw,dh,performance.now())){replacementDraws++;lastReplace=performance.now();status.textContent='V16 人竿线 '+replacementDraws+' ✓';return}}
   }
   return nativeDraw.call(this,image,...args);
 };
 proto.moveTo=function(x,y){const t=lastTip,age=t?performance.now()-t.at:999,stroke=String(this.strokeStyle||'').replace(/\s+/g,'');const line=t&&t.canvas===this.canvas&&age<28&&Number(this.lineWidth)<=1.15&&state!=='idle'&&(/rgba\(220,230,255,0\.45\)/.test(stroke)||/220.*230.*255/.test(stroke));if(line){t.lineActive=true;return nativeMove.call(this,t.x,t.y)}return nativeMove.call(this,x,y)};
 proto.quadraticCurveTo=function(cpx,cpy,x,y){const t=lastTip;if(t?.lineActive&&t.canvas===this.canvas){t.lineActive=false;const ex=Number(x),ey=Number(y);if(Number.isFinite(ex)&&Number.isFinite(ey)){const nx=(t.x+ex)/2,ny=state==='casting'?Math.min(t.y,ey)-80:(t.y+ey)/2+15;return nativeQuad.call(this,nx,ny,ex,ey)}}return nativeQuad.call(this,cpx,cpy,x,y)};
}
window.__MONADFISH_V16_CHECK__=()=>({release:RELEASE,assetsReady:poses.every(Boolean),candidateHits,replacementDraws,replacing:performance.now()-lastReplace<1200,state,pose:lastPose,tip:lastTip?{x:Math.round(lastTip.x),y:Math.round(lastTip.y)}:null,canvas:mainCanvas?{w:mainCanvas.width,h:mainCanvas.height}:null});
})();