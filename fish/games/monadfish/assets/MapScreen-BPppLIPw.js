import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, i as cn, L as Lock } from "./index-BS_fjQJr.js";
/** @license lucide-react v0.462.0 - ISC */
const ArrowLeft=createLucideIcon("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);
const MapPin=createLucideIcon("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);
const locations=[
  {id:"vault",title:"宝藏秘库",hint:"未解锁",image:"/fish/games/monadfish/assets/map_treasure_vault_cutout-D2srnzi4.webp"},
  {id:"skull",title:"骷髅湾",hint:"未解锁",image:"/fish/games/monadfish/assets/map_skull_cove_cutout-C8j1aliv.webp"},
  {id:"castle",title:"珊瑚城堡",hint:"未解锁",image:"/fish/games/monadfish/assets/map_coral_castle_cutout-K5zaMxnp.webp"},
  {id:"barbecue",title:"火山烧烤",hint:"未解锁",image:"/fish/games/monadfish/assets/map_volcano_grill_cutout-CZCRR8h4.webp"},
  {id:"market",title:"海岛集市",hint:"未解锁",image:"/fish/games/monadfish/assets/map_island_market_cutout-CQ1lTMb3.webp"},
  {id:"carnival",title:"幸运码头",hint:"未解锁",image:"/fish/games/monadfish/assets/map_wheel_pier_cutout-B8mB1WMY.webp"}
];
const MapScreen=({onBack})=>{
  const [active,setActive]=reactExports.useState(null);
  return /* @__PURE__ */jsxRuntimeExports.jsx("div",{className:"relative h-full overflow-hidden bg-[#130e08] text-[#f8dfab]",children:/* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"relative mx-auto flex h-full max-w-5xl flex-col px-4 pb-28 pt-5 sm:px-8",children:[
    /* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"mb-4 flex items-center justify-between gap-3",children:[
      /* @__PURE__ */jsxRuntimeExports.jsx(Button,{type:"button",onClick:onBack,className:"h-10 rounded-xl border border-[#8f6a38]/70 bg-black/45 px-4 text-[#f8dfab] hover:bg-black/60",children:/* @__PURE__ */jsxRuntimeExports.jsxs("span",{className:"inline-flex items-center",children:[/* @__PURE__ */jsxRuntimeExports.jsx(ArrowLeft,{className:"mr-2 h-4 w-4"}),"返回"]})}),
      /* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"text-right",children:[/* @__PURE__ */jsxRuntimeExports.jsx("h2",{className:"text-2xl font-black",children:"航海地图"}),/* @__PURE__ */jsxRuntimeExports.jsx("p",{className:"text-xs text-[#d7b77f]",children:"更多钓场正在准备中"})]})
    ]}),
    /* @__PURE__ */jsxRuntimeExports.jsx("div",{className:"min-h-0 flex-1 overflow-y-auto",children:/* @__PURE__ */jsxRuntimeExports.jsx("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5",children:locations.map(loc=>{
      const isActive=active===loc.id;
      return /* @__PURE__ */jsxRuntimeExports.jsxs("button",{type:"button",onPointerEnter:()=>setActive(loc.id),onPointerLeave:()=>setActive(null),onFocus:()=>setActive(loc.id),onBlur:()=>setActive(null),"aria-label":`${loc.title}，${loc.hint}`,className:cn("relative overflow-hidden rounded-2xl border bg-black/45 text-left shadow-xl transition-transform",isActive?"scale-[1.02] border-amber-300/60":"border-[#6e4a25]/65"),children:[
        /* @__PURE__ */jsxRuntimeExports.jsx("img",{src:loc.image,alt:"",className:`block w-full ${isActive?"grayscale-0 brightness-100":"grayscale brightness-75"}`}),
        /* @__PURE__ */jsxRuntimeExports.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"}),
        /* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"absolute inset-x-0 bottom-0 p-3",children:[/* @__PURE__ */jsxRuntimeExports.jsx("b",{className:"block text-sm text-white sm:text-base",children:loc.title}),/* @__PURE__ */jsxRuntimeExports.jsxs("span",{className:"mt-1 inline-flex items-center gap-1 text-xs text-amber-200",children:[/* @__PURE__ */jsxRuntimeExports.jsx(Lock,{className:"h-3.5 w-3.5"}),loc.hint]})]})
      ]},loc.id);
    })})}),
    /* @__PURE__ */jsxRuntimeExports.jsxs("div",{className:"mt-4 flex items-center justify-center gap-2 text-xs font-bold text-[#d9bd8b]",children:[/* @__PURE__ */jsxRuntimeExports.jsx(MapPin,{className:"h-4 w-4"}),"后续将逐步开放新的岛屿和鱼种"]})
  ]})});
};
export { MapScreen as default };
