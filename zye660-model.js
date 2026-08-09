import * as THREE from './vendor/three.module.min.js';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function box(group, size, position, color, options = {}) {
  const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? .52,
    metalness: options.metalness ?? .08,
    emissive: options.emissive || 0x000000,
    emissiveIntensity: options.emissiveIntensity || 0,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  if (options.rotation) mesh.rotation.set(...options.rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if (options.part) mesh.userData.part = options.part;
  group.add(mesh);
  return mesh;
}

function cylinder(group, radius, length, position, color, options = {}) {
  const geometry = new THREE.CylinderGeometry(radius, radius, length, options.segments || 32);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? .26,
    metalness: options.metalness ?? .82,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.z = options.axis === 'x' ? Math.PI / 2 : 0;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if (options.part) mesh.userData.part = options.part;
  group.add(mesh);
  return mesh;
}

function label(group, text, position, width = 1.2, color = '#d7ddd9', rotationY = 0) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = color;
  context.font = '700 56px Arial, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, 256, 66);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({map: texture, transparent: true, depthWrite: false, side: THREE.DoubleSide});
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(width, width / 4), material);
  plane.position.set(...position);
  plane.rotation.set(-Math.PI / 2, rotationY, 0);
  group.add(plane);
  return plane;
}

function maskedPhoto(url, crop, polygon) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = crop.width;
      canvas.height = crop.height;
      const context = canvas.getContext('2d');
      context.drawImage(image,crop.x,crop.y,crop.width,crop.height,0,0,crop.width,crop.height);
      const pixels=context.getImageData(0,0,crop.width,crop.height);
      const data=pixels.data,total=crop.width*crop.height,visited=new Uint8Array(total),queue=new Int32Array(total);
      let head=0,tail=0;
      const isBackground=index=>{
        const offset=index*4,r=data[offset],g=data[offset+1],b=data[offset+2],average=(r+g+b)/3,chroma=Math.max(r,g,b)-Math.min(r,g,b);
        return data[offset+3]>0&&average>32&&average<233&&chroma<62;
      };
      const enqueue=index=>{if(index<0||index>=total||visited[index]||!isBackground(index))return;visited[index]=1;queue[tail++]=index};
      for(let x=0;x<crop.width;x+=1){enqueue(x);enqueue((crop.height-1)*crop.width+x)}
      for(let y=0;y<crop.height;y+=1){enqueue(y*crop.width);enqueue(y*crop.width+crop.width-1)}
      while(head<tail){const index=queue[head++],x=index%crop.width;enqueue(index-crop.width);enqueue(index+crop.width);if(x>0)enqueue(index-1);if(x<crop.width-1)enqueue(index+1)}
      for(let index=0;index<total;index+=1)if(visited[index])data[index*4+3]=0;
      context.putImageData(pixels,0,0);
      context.save();
      context.globalCompositeOperation='destination-in';
      context.fillStyle='#fff';
      context.beginPath();
      polygon.forEach(([x,y],index)=>index?context.lineTo(x,y):context.moveTo(x,y));
      context.closePath();
      context.fill();
      context.restore();
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      texture.needsUpdate = true;
      resolve(texture);
    };
    image.onerror = reject;
    image.src = url;
  });
}

async function addPhotoSurfaces(product, render) {
  // 原始照片负责顶面细节；结构模型只保留外壳、PCB 厚度和 SMA 的立体轮廓，避免重复元件。
  product.children.forEach(child=>{
    if(!child.isMesh)return;
    if(child.position.y>.36)child.visible=false;
    if(Math.abs(child.position.x)>1.6&&child.position.y<=.36)child.position.z=-.62;
  });
  const frontTexture = await maskedPhoto('/assets/products/zye660-front-reference.jpg',
    {x:499,y:713,width:1284,height:1184},
    [[50,385],[235,385],[235,97],[292,40],[998,40],[1070,107],[1070,385],[1248,385],[1248,542],[1070,542],[1070,1084],[998,1162],[292,1162],[235,1098],[235,542],[50,542]]);
  const front = new THREE.Mesh(
    new THREE.PlaneGeometry(4.9,4.52),
    new THREE.MeshBasicMaterial({map:frontTexture,transparent:true,alphaTest:.03,side:THREE.FrontSide})
  );
  front.position.set(0,.345,.01);
  front.rotation.x=-Math.PI/2;
  front.userData.part='pcb';
  product.add(front);

  const backTexture = await maskedPhoto('/assets/products/zye660-back-reference.jpg',
    {x:640,y:410,width:900,height:650},
    [[25,255],[155,255],[155,25],[750,25],[750,255],[880,255],[880,355],[750,355],[750,615],[155,615],[155,355],[25,355]]);
  const back = new THREE.Mesh(
    new THREE.PlaneGeometry(4.9,3.54),
    new THREE.MeshBasicMaterial({map:backTexture,transparent:true,alphaTest:.03,side:THREE.FrontSide})
  );
  back.position.set(0,-.251,0);
  back.rotation.set(Math.PI/2,0,Math.PI);
  back.userData.part='case';
  product.add(back);
  render();
}

function createProduct() {
  const product = new THREE.Group();
  const white = 0xe7e6e2;
  const pcb = 0x030605;
  const gold = 0xc58a24;
  const silver = 0xaab1b1;
  const black = 0x090b0a;

  // 白色外壳、PCB 与固定结构。
  box(product, [3.52, .48, 3.38], [0, 0, 0], white, {roughness: .76, part: 'case'});
  box(product, [3.2, .09, 3.08], [0, .285, 0], pcb, {roughness: .65, part: 'pcb'});
  [[-1.48,-1.42],[1.48,-1.42],[-1.48,1.42],[1.48,1.42]].forEach(([x,z])=>cylinder(product,.065,.06,[x,.37,z],silver,{segments:16}));

  // 左右 SMA 射频接口：六角底座、主体和螺纹环。
  [-1, 1].forEach(side => {
    cylinder(product, .31, .32, [side * 1.72, .34, .1], gold, {segments: 6, axis: 'x', part: side < 0 ? 'rf-in' : 'rf-out'});
    cylinder(product, .205, .62, [side * 2.12, .34, .1], gold, {segments: 24, axis: 'x', part: side < 0 ? 'rf-in' : 'rf-out'});
    cylinder(product, .225, .16, [side * 2.39, .34, .1], gold, {segments: 28, axis: 'x', part: side < 0 ? 'rf-in' : 'rf-out'});
    cylinder(product, .09, .66, [side * 2.13, .34, .1], 0x3e2f17, {segments: 24, axis: 'x'});
  });

  // DIP 拨码开关与 PS 模式位。
  box(product, [1.78, .14, .52], [0, .405, -.92], black, {roughness: .72, part: 'dip'});
  for (let index = 0; index < 8; index += 1) {
    const x = -.77 + index * .22;
    box(product, [.14, .13, .20], [x, .505, -.88], index === 0 ? 0xe2c16f : 0xe8ded0, {roughness: .6, part: 'dip'});
    label(product, index === 0 ? 'PS' : String(index + 1), [x, .585, -.63], .20, '#ecebe5');
  }
  label(product, 'ON', [-1.05, .47, -1.23], .38, '#d7ddd9');

  // 主控芯片、射频通道焊盘与常见贴片元件。
  box(product, [.62, .14, .62], [0, .405, .05], 0x080b0a, {roughness: .62, part: 'chip'});
  label(product, 'PE43711', [0, .49, .02], .60, '#b9c2bd');
  [-.72, .72].forEach(x => box(product, [.38, .07, .33], [x, .385, .12], gold, {metalness: .65, part: x < 0 ? 'rf-in' : 'rf-out'}));
  const componentRows = [
    [-1.1,-.48],[-.82,-.48],[.82,-.48],[1.08,-.48],[-1.2,.72],[-.92,.72],[-.62,.72],[.62,.72],[.92,.72],[1.18,.72],
    [-1.28,1.08],[-.98,1.08],[-.68,1.08],[.72,1.08],[1.02,1.08],[1.30,1.08]
  ];
  componentRows.forEach(([x,z], index) => box(product, [.18 + (index%3)*.025, .08, .10], [x,.39,z], index%4===0?0xb8a376:0xd7d0bd, {roughness:.7}));

  // Type-C、充电检测开关、电源开关、PWR 指示灯和扩展排针。
  box(product, [.86, .24, .42], [0, .43, 1.47], silver, {metalness:.72,roughness:.28,part:'type-c'});
  box(product, [.58, .10, .18], [0, .565, 1.44], 0x343b3b, {roughness:.7,part:'type-c'});
  box(product, [.55, .14, .24], [1.18, .42, 1.36], 0xe4e5df, {roughness:.65,part:'check'});
  box(product, [.20, .20, .17], [1.18, .55, 1.36], 0x151918, {roughness:.75,part:'check'});
  box(product, [.55, .17, .25], [-1.18, .42, -1.36], silver, {metalness:.58,part:'power'});
  box(product, [.20, .18, .26], [-1.35, .54, -1.36], 0x252b29, {part:'power'});
  cylinder(product, .075, .07, [-.73,.48,-1.28], 0x4cff8b, {segments:24,roughness:.25,metalness:.1,part:'power'});
  for (let row=0; row<2; row+=1) for (let col=0; col<4; col+=1) {
    cylinder(product,.055,.35,[.88+col*.19,.53,-1.30+row*.22],0x202322,{segments:12,part:'spi'});
  }
  label(product, 'IN', [-1.12,.47,.28], .34);
  label(product, 'OUT', [1.12,.47,.28], .44);
  label(product, 'ZYE660 · 9kHz–6GHz', [0,.37,.87], 1.72, '#d4ba73');

  product.rotation.y = -.08;
  return product;
}

function mountOne(canvas) {
  if (canvas.dataset.mounted) return;
  canvas.dataset.mounted = 'true';
  const stage = canvas.closest('[data-product-viewer]');
  const detail = stage.querySelector('.hotspot-detail');
  const fallback = stage.querySelector('.zye3d-fallback');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true, powerPreference: 'high-performance'});
  } catch (error) {
    stage.classList.add('webgl-failed');
    fallback.hidden = false;
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
  const target = new THREE.Vector3(0, .15, 0);
  let azimuth = .72;
  let polar = .93;
  let distance = 8.15;
  let drag = null;
  let moved = false;

  scene.add(new THREE.HemisphereLight(0xf4f7ff, 0x26312e, 1.35));
  const key = new THREE.DirectionalLight(0xffffff, 1.75);
  key.position.set(-4, 8, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xa5d7ff, .92);
  rim.position.set(5, 3, -5);
  scene.add(rim);

  const product = createProduct();
  scene.add(product);
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(4.6, 64),
    new THREE.ShadowMaterial({color: 0x000000, opacity: .22})
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -.31;
  ground.receiveShadow = true;
  scene.add(ground);

  const updateCamera = () => {
    const sin = Math.sin(polar);
    camera.position.set(
      target.x + distance * sin * Math.sin(azimuth),
      target.y + distance * Math.cos(polar),
      target.z + distance * sin * Math.cos(azimuth)
    );
    camera.lookAt(target);
    const angle = ((THREE.MathUtils.radToDeg(azimuth) % 360) + 360) % 360;
    const elevation = 90 - THREE.MathUtils.radToDeg(polar);
    stage.dataset.rotation = String(Math.round(angle));
    stage.dataset.polar = String(Math.round(elevation));
    stage.dataset.zoom = (8.15 / distance).toFixed(2);
    stage.querySelector('[data-viewer-angle]').textContent = `水平 ${Math.round(angle)}°`;
    stage.querySelector('[data-viewer-zoom]').textContent = `俯视 ${Math.round(elevation)}°`;
  };
  const render = () => {
    if (!canvas.isConnected) return;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    if (canvas.width !== Math.round(width * renderer.getPixelRatio()) || canvas.height !== Math.round(height * renderer.getPixelRatio())) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    updateCamera();
    renderer.render(scene, camera);
  };

  const showPart = keyName => {
    const button = stage.querySelector(`[data-zye-focus="${keyName}"]`);
    if (!button) return;
    stage.querySelectorAll('[data-zye-focus]').forEach(item=>item.classList.toggle('active', item === button));
    detail.querySelector('b').textContent = button.dataset.label || button.textContent.trim();
    detail.querySelector('span').textContent = button.dataset.description || '';
    detail.classList.add('open');
  };

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const pick = event => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObject(product, true).find(item=>item.object.userData.part);
    if (hit) showPart(hit.object.userData.part);
  };

  canvas.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    drag = {x:event.clientX,y:event.clientY,azimuth,polar};
    moved = false;
    canvas.setPointerCapture?.(event.pointerId);
    canvas.classList.add('dragging');
  });
  canvas.addEventListener('pointermove', event => {
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    moved ||= Math.abs(dx) + Math.abs(dy) > 4;
    azimuth = drag.azimuth - dx * .009;
    polar = clamp(drag.polar + dy * .008, .22, 2.78);
    render();
  });
  const endDrag = event => {
    if (!drag) return;
    canvas.releasePointerCapture?.(event.pointerId);
    canvas.classList.remove('dragging');
    drag = null;
    if (!moved) pick(event);
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('wheel', event => {
    event.preventDefault();
    distance = clamp(distance + Math.sign(event.deltaY) * .55, 5.3, 12);
    render();
  }, {passive:false});
  canvas.addEventListener('dblclick', () => {azimuth=.72;polar=.93;distance=8.15;render()});

  stage.querySelector('.viewer-controls').addEventListener('click', event => {
    const action = event.target.closest('[data-viewer-action]')?.dataset.viewerAction;
    if (!action) return;
    if (action === 'rotate-left') azimuth -= .25;
    if (action === 'rotate-right') azimuth += .25;
    if (action === 'tilt-up') polar = clamp(polar - .18, .22, 2.78);
    if (action === 'tilt-down') polar = clamp(polar + .18, .22, 2.78);
    if (action === 'zoom-out') distance = clamp(distance + .65, 5.3, 12);
    if (action === 'zoom-in') distance = clamp(distance - .65, 5.3, 12);
    if (action === 'reset') {azimuth=.72;polar=.93;distance=8.15;}
    render();
  });
  stage.querySelectorAll('[data-zye-focus]').forEach(button=>button.addEventListener('click',()=>showPart(button.dataset.zyeFocus)));
  stage.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') azimuth -= .18;
    else if (event.key === 'ArrowRight') azimuth += .18;
    else if (event.key === 'ArrowUp') polar = clamp(polar - .14, .22, 2.78);
    else if (event.key === 'ArrowDown') polar = clamp(polar + .14, .22, 2.78);
    else if (event.key === '+' || event.key === '=') distance = clamp(distance - .55, 5.3, 12);
    else if (event.key === '-') distance = clamp(distance + .55, 5.3, 12);
    else if (event.key === '0') {azimuth=.72;polar=.93;distance=8.15;}
    else return;
    event.preventDefault();
    render();
  });

  const observer = new ResizeObserver(render);
  observer.observe(canvas);
  requestAnimationFrame(()=>{
    stage.classList.add('model-ready');
    render();
    addPhotoSurfaces(product,render).then(()=>stage.classList.add('photo-texture-ready')).catch(()=>stage.classList.add('photo-texture-failed'));
  });
}

export function mountZye660Models() {
  document.querySelectorAll('[data-zye660-model]').forEach(mountOne);
}
