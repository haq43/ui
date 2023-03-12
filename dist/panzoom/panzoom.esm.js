const t=(t,e=1e4)=>(t=parseFloat(t+"")||0,Math.round((t+Number.EPSILON)*e)/e),e=function(t,i){return!(!t||t===document.body||i&&t===i)&&(function(t){if(!(t&&t instanceof Element&&t.offsetParent))return!1;const e=t.scrollHeight>t.clientHeight,i=window.getComputedStyle(t).overflowY,n=-1!==i.indexOf("hidden"),s=-1!==i.indexOf("visible");return e&&!n&&!s}(t)?t:e(t.parentElement,i))},i=t=>`${t||""}`.split(" ").filter((t=>!!t)),n=(t,e,n)=>{i(e).forEach((e=>{t&&t.classList.toggle(e,n||!1)}))};class s{constructor(t){Object.defineProperty(this,"pageX",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"pageY",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"clientX",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"clientY",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"time",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"nativePointer",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.nativePointer=t,this.pageX=t.pageX,this.pageY=t.pageY,this.clientX=t.clientX,this.clientY=t.clientY,this.id=self.Touch&&t instanceof Touch?t.identifier:-1,this.time=Date.now()}}const o={passive:!1};class r{constructor(t,{start:e=(()=>!0),move:i=(()=>{}),end:n=(()=>{})}){Object.defineProperty(this,"element",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"startCallback",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"moveCallback",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"endCallback",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"currentPointers",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"startPointers",{enumerable:!0,configurable:!0,writable:!0,value:[]}),this.element=t,this.startCallback=e,this.moveCallback=i,this.endCallback=n;for(const t of["onPointerStart","onTouchStart","onMove","onTouchEnd","onPointerEnd","onWindowBlur"])this[t]=this[t].bind(this);this.element.addEventListener("mousedown",this.onPointerStart,o),this.element.addEventListener("touchstart",this.onTouchStart,o),this.element.addEventListener("touchmove",this.onMove,o),this.element.addEventListener("touchend",this.onTouchEnd),this.element.addEventListener("touchcancel",this.onTouchEnd)}onPointerStart(t){if(!t.buttons||0!==t.button)return;const e=new s(t);this.currentPointers.some((t=>t.id===e.id))||this.triggerPointerStart(e,t)&&(window.addEventListener("mousemove",this.onMove),window.addEventListener("mouseup",this.onPointerEnd),window.addEventListener("blur",this.onWindowBlur))}onTouchStart(t){for(const e of Array.from(t.changedTouches||[]))this.triggerPointerStart(new s(e),t);window.addEventListener("blur",this.onWindowBlur)}onMove(t){const e=this.currentPointers.slice(),i="changedTouches"in t?Array.from(t.changedTouches||[]).map((t=>new s(t))):[new s(t)],n=[];for(const t of i){const e=this.currentPointers.findIndex((e=>e.id===t.id));e<0||(n.push(t),this.currentPointers[e]=t)}n.length&&this.moveCallback(t,this.currentPointers.slice(),e)}onPointerEnd(t){t.buttons>0&&0!==t.button||(this.triggerPointerEnd(t,new s(t)),window.removeEventListener("mousemove",this.onMove),window.removeEventListener("mouseup",this.onPointerEnd),window.removeEventListener("blur",this.onWindowBlur))}onTouchEnd(t){for(const e of Array.from(t.changedTouches||[]))this.triggerPointerEnd(t,new s(e))}triggerPointerStart(t,e){return!!this.startCallback(e,t,this.currentPointers.slice())&&(this.currentPointers.push(t),this.startPointers.push(t),!0)}triggerPointerEnd(t,e){const i=this.currentPointers.findIndex((t=>t.id===e.id));i<0||(this.currentPointers.splice(i,1),this.startPointers.splice(i,1),this.endCallback(t,e,this.currentPointers.slice()))}onWindowBlur(){this.clear()}clear(){for(;this.currentPointers.length;){const t=this.currentPointers[this.currentPointers.length-1];this.currentPointers.splice(this.currentPointers.length-1,1),this.startPointers.splice(this.currentPointers.length-1,1),this.endCallback(new Event("touchend",{bubbles:!0,cancelable:!0,clientX:t.clientX,clientY:t.clientY}),t,this.currentPointers.slice())}}stop(){this.element.removeEventListener("mousedown",this.onPointerStart,o),this.element.removeEventListener("touchstart",this.onTouchStart,o),this.element.removeEventListener("touchmove",this.onMove,o),this.element.removeEventListener("touchend",this.onTouchEnd),this.element.removeEventListener("touchcancel",this.onTouchEnd),window.removeEventListener("mousemove",this.onMove),window.removeEventListener("mouseup",this.onPointerEnd),window.removeEventListener("blur",this.onWindowBlur)}}function a(t,e){return e?Math.sqrt(Math.pow(e.clientX-t.clientX,2)+Math.pow(e.clientY-t.clientY,2)):0}function h(t,e){return e?{clientX:(t.clientX+e.clientX)/2,clientY:(t.clientY+e.clientY)/2}:t}const c=(t,...e)=>{const i=e.length;for(let n=0;n<i;n++){const i=e[n]||{};Object.entries(i).forEach((([e,i])=>{const n=Array.isArray(i)?[]:{};var s;t[e]||Object.assign(t,{[e]:n}),"object"==typeof(s=i)&&null!==s&&s.constructor===Object&&"[object Object]"===Object.prototype.toString.call(s)?Object.assign(t[e],c(n,i)):Array.isArray(i)?Object.assign(t,{[e]:[...i]}):Object.assign(t,{[e]:i})}))}return t},l=function(t,e){return t.split(".").reduce(((t,e)=>"object"==typeof t?t[e]:void 0),e)};class u{constructor(t={}){Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:t}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),this.setOptions(t);for(const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))t.startsWith("on")&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}setOptions(t){this.options=t?c({},this.constructor.defaults,t):{};for(const[t,e]of Object.entries(this.option("on")||{}))this.on(t,e)}option(t,...e){let i=l(t,this.options);return i&&"function"==typeof i&&(i=i.call(this,this,...e)),i}optionFor(t,e,i,...n){let s=l(e,t);var o;"string"!=typeof(o=s)||isNaN(o)||isNaN(parseFloat(o))||(s=parseFloat(s)),"true"===s&&(s=!0),"false"===s&&(s=!1),s&&"function"==typeof s&&(s=s.call(this,this,t,...n));let r=l(e,this.options);return r&&"function"==typeof r?s=r.call(this,this,t,...n,s):void 0===s&&(s=r),void 0===s?i:s}cn(t){const e=this.options.classes;return e&&e[t]||""}localize(t,e=[]){t=String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,e,i)=>{let n="";return i?n=this.option(`${e[0]+e.toLowerCase().substring(1)}.l10n.${i}`):e&&(n=this.option(`l10n.${e}`)),n||(n=t),n}));for(let i=0;i<e.length;i++)t=t.split(e[i][0]).join(e[i][1]);return t=t.replace(/\{\{(.*)\}\}/,((t,e)=>e))}on(t,e){let i=[];"string"==typeof t?i=t.split(" "):Array.isArray(t)&&(i=t),this.events||(this.events=new Map),i.forEach((t=>{let i=this.events.get(t);i||(this.events.set(t,[]),i=[]),i.includes(e)||i.push(e),this.events.set(t,i)}))}off(t,e){let i=[];"string"==typeof t?i=t.split(" "):Array.isArray(t)&&(i=t),i.forEach((t=>{const i=this.events.get(t);if(Array.isArray(i)){const t=i.indexOf(e);t>-1&&i.splice(t,1)}}))}emit(t,...e){[...this.events.get(t)||[]].forEach((t=>t(this,...e))),"*"!==t&&this.emit("*",t,...e)}}Object.defineProperty(u,"version",{enumerable:!0,configurable:!0,writable:!0,value:"5.0.7"}),Object.defineProperty(u,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{}});class g extends u{constructor(t={}){super(t),Object.defineProperty(this,"plugins",{enumerable:!0,configurable:!0,writable:!0,value:{}})}attachPlugins(t={}){const e=new Map;for(const[i,n]of Object.entries(t)){const t=this.option(i),s=this.plugins[i];s||!1===t?s&&!1===t&&(s.detach(),delete this.plugins[i]):e.set(i,new n(this,t||{}))}for(const[t,i]of e)this.plugins[t]=i,i.attach();this.emit("attachPlugins")}detachPlugins(){for(const t of Object.values(this.plugins))t.detach();return this.plugins={},this.emit("detachPlugins"),this}}var d;!function(t){t[t.Init=0]="Init",t[t.Error=1]="Error",t[t.Ready=2]="Ready",t[t.Panning=3]="Panning",t[t.Mousemove=4]="Mousemove",t[t.Destroy=5]="Destroy"}(d||(d={}));const m=["a","b","c","d","e","f"],f={content:null,width:"auto",height:"auto",panMode:"drag",touch:!0,dragMinThreshold:3,lockAxis:!1,mouseMoveFactor:1,mouseMoveFriction:.12,zoom:!0,pinchToZoom:!0,panOnlyZoomed:"auto",minScale:1,maxScale:2,friction:.25,dragFriction:.35,decelFriction:.05,click:"toggleZoom",dblClick:!1,wheel:"zoom",wheelLimit:7,spinner:!0,bounds:"auto",infinite:!1,rubberband:!0,bounce:!0,maxVelocity:75,transformParent:!1,classes:{content:"f-panzoom__content",isLoading:"is-loading",canZoomIn:"can-zoom_in",canZoomOut:"can-zoom_out",isDraggable:"is-draggable",isDragging:"is-dragging",inFullscreen:"in-fullscreen",htmlHasFullscreen:"with-panzoom-in-fullscreen"},l10n:{PANUP:"Move up",PANDOWN:"Move down",PANLEFT:"Move left",PANRIGHT:"Move right",ZOOMIN:"Zoom in",ZOOMOUT:"Zoom out",TOGGLEZOOM:"Toggle zoom level",TOGGLE1TO1:"Toggle zoom level",ITERATEZOOM:"Toggle zoom level",ROTATECCW:"Rotate counterclockwise",ROTATECW:"Rotate clockwise",FLIPX:"Flip horizontally",FLIPY:"Flip vertically",FITX:"Fit horizontally",FITY:"Fit vertically",RESET:"Reset",TOGGLEFS:"Toggle fullscreen"}},p=(t,e)=>{i(e).forEach((e=>{t&&t.classList.remove(e)}))},b=(t,e)=>{i(e).forEach((e=>{t&&t.classList.add(e)}))},v={a:1,b:0,c:0,d:1,e:0,f:0};let y=null,w=null;class M extends g{get isTouchDevice(){return null===w&&(w=window.matchMedia("(hover: none)").matches),w}get isMobile(){return null===y&&(y=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)),y}get panMode(){return"mousemove"!==this.options.panMode||this.isTouchDevice?"drag":"mousemove"}get panOnlyZoomed(){const t=this.options.panOnlyZoomed;return"auto"===t?this.isTouchDevice:t}get isInfinite(){return this.option("infinite")}get angle(){return 180*Math.atan2(this.current.b,this.current.a)/Math.PI||0}get targetAngle(){return 180*Math.atan2(this.target.b,this.target.a)/Math.PI||0}get scale(){const{a:t,b:e}=this.current;return Math.sqrt(t*t+e*e)||1}get targetScale(){const{a:t,b:e}=this.target;return Math.sqrt(t*t+e*e)||1}get minScale(){return this.option("minScale")||1}get fullScale(){const{contentRect:t}=this;return t.fullWidth/t.fitWidth||1}get maxScale(){return this.fullScale*(this.option("maxScale")||1)||1}get coverScale(){const{containerRect:t,contentRect:e}=this,i=Math.max(t.height/e.fitHeight,t.width/e.fitWidth)||1;return Math.min(this.fullScale,i)}get isScaling(){return Math.abs(this.targetScale-this.scale)>1e-5&&!this.isResting}get isContentLoading(){const t=this.content;return!!(t&&t instanceof HTMLImageElement)&&!t.complete}get isResting(){if(this.isBouncingX||this.isBouncingY)return!1;for(const t of m){const e="e"==t||"f"===t?.001:1e-5;if(Math.abs(this.target[t]-this.current[t])>e)return!1}return!(!this.ignoreBounds&&!this.checkBounds().inBounds)}constructor(t,e={},i={}){var n,s;if(super(e),Object.defineProperty(this,"pointerTracker",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"resizeObserver",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"updateTimer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"clickTimer",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"rAF",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"isTicking",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"friction",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"ignoreBounds",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"isBouncingX",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"isBouncingY",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"clicks",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"trackingPoints",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"wheelDelta",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"prevWheelDelta",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"prevWheelTime",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"prevMouseMoveEvent",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:d.Init}),Object.defineProperty(this,"isDragging",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(this,"container",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"content",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"spinner",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"containerRect",{enumerable:!0,configurable:!0,writable:!0,value:{width:0,height:0,innerWidth:0,innerHeight:0}}),Object.defineProperty(this,"contentRect",{enumerable:!0,configurable:!0,writable:!0,value:{top:0,right:0,bottom:0,left:0,fullWidth:0,fullHeight:0,fitWidth:0,fitHeight:0,width:0,height:0}}),Object.defineProperty(this,"dragStart",{enumerable:!0,configurable:!0,writable:!0,value:{x:0,y:0,top:0,left:0,time:0}}),Object.defineProperty(this,"dragOffset",{enumerable:!0,configurable:!0,writable:!0,value:{x:0,y:0,time:0}}),Object.defineProperty(this,"current",{enumerable:!0,configurable:!0,writable:!0,value:Object.assign({},v)}),Object.defineProperty(this,"target",{enumerable:!0,configurable:!0,writable:!0,value:Object.assign({},v)}),Object.defineProperty(this,"velocity",{enumerable:!0,configurable:!0,writable:!0,value:{a:0,b:0,c:0,d:0,e:0,f:0}}),Object.defineProperty(this,"lockedAxis",{enumerable:!0,configurable:!0,writable:!0,value:!1}),!t)throw new Error("No Element found");if(this.container=t,this.initContent(),this.attachPlugins(Object.assign(Object.assign({},M.Plugins),i)),this.emit("init"),this.isContentLoading){const e=this.content;if(this.option("spinner")){t.classList.add(this.cn("isLoading"));const i=(s='<div class="f-spinner"><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20"></circle><circle cx="25" cy="25" r="20"></circle></svg></div>',(new DOMParser).parseFromString(s,"text/html").body.firstChild);t.contains(e)?this.spinner=(null===(n=e.parentElement)||void 0===n?void 0:n.insertBefore(i,e))||null:this.spinner=t.appendChild(i)}this.emit("beforeLoad"),e.addEventListener("load",this.onLoad),e.addEventListener("error",this.onError)}else queueMicrotask((()=>{this.enable()}))}initContent(){const{container:t}=this;let e=this.option("content")||t.querySelector(`.${this.cn("content")}`);if(e||(e=t.querySelector("img")||t.firstElementChild,e&&e.classList.add(this.cn("content"))),!e)throw new Error("No content found");this.content=e}onLoad(){this.spinner&&(this.spinner.remove(),this.spinner=null),this.option("spinner")&&this.container.classList.remove(this.cn("isLoading")),this.emit("afterLoad"),this.state===d.Init&&this.enable()}onError(){this.state!==d.Destroy&&(this.spinner&&(this.spinner.remove(),this.spinner=null),this.stop(),this.detachEvents(),this.state=d.Error,this.emit("error"))}attachObserver(){var t;const e=()=>Math.abs(this.containerRect.width-this.container.getBoundingClientRect().width)>.1||Math.abs(this.containerRect.height-this.container.getBoundingClientRect().height)>.1;this.resizeObserver||void 0===window.ResizeObserver||(this.resizeObserver=new ResizeObserver((()=>{this.updateTimer||(e()?(this.onResize(),this.isMobile&&(this.updateTimer=setTimeout((()=>{e()&&this.onResize(),this.updateTimer=null}),500))):this.updateTimer&&(clearTimeout(this.updateTimer),this.updateTimer=null))}))),null===(t=this.resizeObserver)||void 0===t||t.observe(this.container)}detachObserver(){var t;null===(t=this.resizeObserver)||void 0===t||t.disconnect()}attachEvents(){const{container:t}=this;t.addEventListener("click",this.onClick,{passive:!1,capture:!1}),t.addEventListener("wheel",this.onWheel,{passive:!1}),this.pointerTracker=new r(t,{start:this.onPointerDown,move:this.onPointerMove,end:this.onPointerUp}),document.addEventListener("mousemove",this.onMouseMove)}detachEvents(){var t;const{container:e}=this;e.removeEventListener("click",this.onClick,{passive:!1,capture:!1}),e.removeEventListener("wheel",this.onWheel,{passive:!1}),null===(t=this.pointerTracker)||void 0===t||t.stop(),this.pointerTracker=null,document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("keydown",this.onKeydown,!0),this.clickTimer&&(clearTimeout(this.clickTimer),this.clickTimer=null),this.updateTimer&&(clearTimeout(this.updateTimer),this.updateTimer=null)}animate(){this.setTargetForce();const t=this.option("maxVelocity");for(const e of m)this.friction?(this.velocity[e]*=1-this.friction,t&&!this.isScaling&&(this.velocity[e]=Math.max(Math.min(this.velocity[e],t),-1*t)),this.current[e]+=this.velocity[e]):this.current[e]=this.target[e];this.setTransform(),this.setEdgeForce(),!this.isResting||this.isDragging?this.rAF=requestAnimationFrame((()=>this.animate())):this.stop("current")}setTargetForce(){for(const t of m)"e"===t&&this.isBouncingX||"f"===t&&this.isBouncingY||(this.velocity[t]=(1/(1-this.friction)-1)*(this.target[t]-this.current[t]))}checkBounds(t=0,e=0){const{current:i}=this,n=i.e+t,s=i.f+e,o=this.getBounds(),{x:r,y:a}=o,h=r.min,c=r.max,l=a.min,u=a.max;let g=0,d=0;return h!==1/0&&n<h?g=h-n:c!==1/0&&n>c&&(g=c-n),l!==1/0&&s<l?d=l-s:u!==1/0&&s>u&&(d=u-s),Math.abs(g)<.001&&(g=0),Math.abs(d)<.001&&(d=0),Object.assign(Object.assign({},o),{xDiff:g,yDiff:d,inBounds:!g&&!d})}clampTargetBounds(){const{target:t}=this,{x:e,y:i}=this.getBounds();e.min!==1/0&&(t.e=Math.max(t.e,e.min)),e.max!==1/0&&(t.e=Math.min(t.e,e.max)),i.min!==1/0&&(t.f=Math.max(t.f,i.min)),i.max!==1/0&&(t.f=Math.min(t.f,i.max))}calculateContentDim(t=this.current){const{content:e,contentRect:i}=this,{fitWidth:n,fitHeight:s,fullWidth:o,fullHeight:r}=i;let a=o,h=r;if(this.option("zoom")||0!==this.angle){const i=!(e instanceof HTMLImageElement)&&("none"===window.getComputedStyle(e).maxWidth||"none"===window.getComputedStyle(e).maxHeight),c=i?o:n,l=i?r:s,u=this.getMatrix(t),g=new DOMPoint(0,0).matrixTransform(u),d=new DOMPoint(0+c,0).matrixTransform(u),m=new DOMPoint(0+c,0+l).matrixTransform(u),f=new DOMPoint(0,0+l).matrixTransform(u),p=Math.abs(m.x-g.x),b=Math.abs(m.y-g.y),v=Math.abs(f.x-d.x),y=Math.abs(f.y-d.y);a=Math.max(p,v),h=Math.max(b,y)}return{contentWidth:a,contentHeight:h}}setEdgeForce(){if(this.ignoreBounds||this.isDragging||"mousemove"===this.panMode||this.targetScale<this.scale)return this.isBouncingX=!1,void(this.isBouncingY=!1);const{target:t}=this,{x:e,y:i,xDiff:n,yDiff:s}=this.checkBounds();const o=this.option("maxVelocity");let r=this.velocity.e,a=this.velocity.f;0!==n?(this.isBouncingX=!0,n*r<=0?r+=.14*n:(r=.14*n,e.min!==1/0&&(this.target.e=Math.max(t.e,e.min)),e.max!==1/0&&(this.target.e=Math.min(t.e,e.max))),o&&(r=Math.max(Math.min(r,o),-1*o))):this.isBouncingX=!1,0!==s?(this.isBouncingY=!0,s*a<=0?a+=.14*s:(a=.14*s,i.min!==1/0&&(this.target.f=Math.max(t.f,i.min)),i.max!==1/0&&(this.target.f=Math.min(t.f,i.max))),o&&(a=Math.max(Math.min(a,o),-1*o))):this.isBouncingY=!1,this.isBouncingX&&(this.velocity.e=r),this.isBouncingY&&(this.velocity.f=a)}enable(){const{content:t}=this,e=new DOMMatrixReadOnly(window.getComputedStyle(t).transform);for(const t of m)this.current[t]=this.target[t]=e[t];this.updateMetrics(),this.attachObserver(),this.attachEvents(),this.state=d.Ready,this.emit("ready")}onClick(t){var e;this.isDragging&&(null===(e=this.pointerTracker)||void 0===e||e.clear(),this.trackingPoints=[],this.startDecelAnim());const i=t.target;if(!i||t.defaultPrevented)return;if(i&&i.hasAttribute("disabled"))return t.preventDefault(),void t.stopPropagation();if((()=>{const t=window.getSelection();return t&&"Range"===t.type})()&&!i.closest("button"))return;const n=i.closest("[data-panzoom-action]"),s=i.closest("[data-panzoom-change]"),o=n||s,r=o&&((a=o)&&null!==a&&a instanceof Element&&"nodeType"in a)?o.dataset:null;var a;if(r){const e=r.panzoomChange,i=r.panzoomAction;if((e||i)&&t.preventDefault(),e){let t={};try{t=JSON.parse(e)}catch(t){console&&console.warn("The given data was not valid JSON")}return void this.applyChange(t)}if(i)return void(this[i]&&this[i]())}if(Math.abs(this.dragOffset.x)>3||Math.abs(this.dragOffset.y)>3)return t.preventDefault(),void t.stopPropagation();const h=this.content.getBoundingClientRect();if(this.dragStart.time&&!this.canZoomOut()&&(Math.abs(h.x-this.dragStart.x)>2||Math.abs(h.y-this.dragStart.y)>2))return;this.dragStart.time=0;const c=e=>{!this.option("zoom")||Math.abs(this.velocity.a)>.3||e&&"string"==typeof e&&/(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e)&&"function"==typeof this[e]&&(t.preventDefault(),this[e]({event:t}))},l=this.option("click",t),u=this.option("dblClick",t);u?(this.clicks++,1==this.clicks&&(this.clickTimer=setTimeout((()=>{1===this.clicks?(this.emit("click",t),!t.defaultPrevented&&l&&c(l)):(this.emit("dblClick",t),t.defaultPrevented||c(u)),this.clicks=0,this.clickTimer=null}),350))):(this.emit("click",t),!t.defaultPrevented&&l&&c(l))}addTrackingPoint(t){const e=this.trackingPoints.filter((t=>t.time>Date.now()-100));e.push(t),this.trackingPoints=e}onPointerDown(e,i,n){var s;this.dragOffset={x:0,y:0,time:0},this.trackingPoints=[];const o=this.content.getBoundingClientRect();if(this.dragStart={x:o.x,y:o.y,top:o.top,left:o.left,time:Date.now()},this.clickTimer)return!1;if("mousemove"===this.panMode&&this.targetScale>1)return e.preventDefault(),e.stopPropagation(),!1;if(!n.length){const t=e.composedPath()[0];if(["A","TEXTAREA","OPTION","INPUT","SELECT","VIDEO"].includes(t.nodeName)||t.closest("[contenteditable]")||t.closest("[data-selectable]")||t.closest("[data-panzoom-change]")||t.closest("[data-panzoom-action]"))return!1;null===(s=window.getSelection())||void 0===s||s.removeAllRanges()}return"mousedown"===e.type&&e.preventDefault(),t(this.targetScale,1e3)===t(this.minScale,1e3)?(this.stop(),this.target.e=this.current.e,this.target.f=this.current.f):this.stop("target"),this.isDragging=!0,this.addTrackingPoint(i),this.emit("touchStart",e),!0}onPointerMove(i,n,s){if(!1===this.option("touch",i))return;if(!this.isDragging)return;if(n.length<2&&this.panOnlyZoomed&&t(this.targetScale)<=t(this.minScale))return;if(this.emit("touchMove",i),i.defaultPrevented)return;this.addTrackingPoint(n[0]);const{content:o}=this,r=h(s[0],s[1]),c=h(n[0],n[1]);let l=0,u=0;if(n.length>1){const t=o.getBoundingClientRect();l=r.clientX-t.left-.5*t.width,u=r.clientY-t.top-.5*t.height}const g=a(s[0],s[1]),d=a(n[0],n[1]);let m=g?d/g:1,f=c.clientX-r.clientX,p=c.clientY-r.clientY;this.dragOffset.x+=f,this.dragOffset.y+=p,this.dragOffset.time=Date.now()-this.dragStart.time;let b=t(this.targetScale)===t(this.minScale)&&this.option("lockAxis");if(b&&!this.lockedAxis)if("xy"===b||"y"===b||"touchmove"===i.type){if(Math.abs(this.dragOffset.x)<6&&Math.abs(this.dragOffset.y)<6)return void i.preventDefault();const t=Math.abs(180*Math.atan2(this.dragOffset.y,this.dragOffset.x)/Math.PI);this.lockedAxis=t>45&&t<135?"y":"x",this.dragOffset.x=0,this.dragOffset.y=0,f=0,p=0}else this.lockedAxis=b;if(e(i.target,this.content)&&(b="x",this.dragOffset.y=0),b&&"xy"!==b&&this.lockedAxis!==b&&t(this.targetScale)===t(this.minScale))return;i.cancelable&&i.preventDefault(),this.container.classList.add(this.cn("isDragging"));const v=this.checkBounds(f,p);this.option("rubberband")?("x"!==this.isInfinite&&(v.xDiff>0&&f<0||v.xDiff<0&&f>0)&&(f*=Math.max(0,.5-Math.abs(.75/this.contentRect.fitWidth*v.xDiff))),"y"!==this.isInfinite&&(v.yDiff>0&&p<0||v.yDiff<0&&p>0)&&(p*=Math.max(0,.5-Math.abs(.75/this.contentRect.fitHeight*v.yDiff)))):(v.xDiff&&(f=0),v.yDiff&&(p=0));const y=this.targetScale,w=this.minScale,M=this.maxScale;y<.5*w&&(m=Math.max(m,w)),y>1.5*M&&(m=Math.min(m,M)),"y"===this.lockedAxis&&t(y)===t(w)&&(f=0),"x"===this.lockedAxis&&t(y)===t(w)&&(p=0),this.applyChange({originX:l,originY:u,panX:f,panY:p,scale:m,friction:this.option("dragFriction"),ignoreBounds:!0})}onPointerUp(t,i,n){if(n.length)return this.dragOffset.x=0,this.dragOffset.y=0,void(this.trackingPoints=[]);this.container.classList.remove(this.cn("isDragging")),this.isDragging&&(this.addTrackingPoint(i),this.panOnlyZoomed&&this.contentRect.width-this.contentRect.fitWidth<1&&this.contentRect.height-this.contentRect.fitHeight<1&&(this.trackingPoints=[]),e(t.target,this.content)&&"y"===this.lockedAxis&&(this.trackingPoints=[]),this.emit("touchEnd",t),this.isDragging=!1,this.lockedAxis=!1,this.state!==d.Destroy&&(t.defaultPrevented||this.startDecelAnim()))}startDecelAnim(){this.rAF&&(cancelAnimationFrame(this.rAF),this.rAF=null),this.isBouncingX=!1,this.isBouncingY=!1;for(const t of m)this.velocity[t]=0,this.target[t]=this.current[t];p(this.container,"is-scaling"),p(this.container,"is-animating"),this.isTicking=!1;const{trackingPoints:e}=this,i=e[0],n=e[e.length-1];let s=0,o=0,r=0;n&&i&&(s=n.clientX-i.clientX,o=n.clientY-i.clientY,r=n.time-i.time);let a=0,h=0,c=0,l=0,u=this.option("decelFriction");const g=this.targetScale;if((g<this.minScale-1e-5||g>this.maxScale+1e-5)&&(u=.35),r>0){c=Math.abs(s)>3?s/(r/30):0,l=Math.abs(o)>3?o/(r/30):0;const t=this.option("maxVelocity");t&&(c=Math.max(Math.min(c,t),-1*t),l=Math.max(Math.min(l,t),-1*t))}c&&(a=c/(1/(1-u)-1)),l&&(h=l/(1/(1-u)-1)),("y"===this.option("lockAxis")||"xy"===this.option("lockAxis")&&"y"===this.lockedAxis&&t(g)===this.minScale)&&(a=c=0),("x"===this.option("lockAxis")||"xy"===this.option("lockAxis")&&"x"===this.lockedAxis&&t(g)===this.minScale)&&(h=l=0);const d=this.dragOffset.x,f=this.dragOffset.y,b=this.option("dragMinThreshold")||0;Math.abs(d)<b&&Math.abs(f)<b&&(a=h=0,c=l=0),this.applyChange({panX:a,panY:h,friction:u}),this.emit("decel",c,l,d,f)}onWheel(t){const e=Date.now(),i=Math.max(-1,Math.min(1,-t.deltaY||-t.deltaX||-t.detail));if(this.prevWheelTime&&e-this.prevWheelTime<200&&this.prevWheelDelta!==i)return void t.preventDefault();if(this.prevWheelDelta=i,this.prevWheelTime=e,this.emit("wheel",t,i),"mousemove"===this.panMode)return;if(t.defaultPrevented)return;const n=this.option("wheel");"pan"===n?(t.preventDefault(),this.panOnlyZoomed&&!this.canZoomOut()||this.applyChange({panY:100*i,bounce:!1})):"zoom"===n&&!1!==this.option("zoom")&&this.zoomWithWheel(t)}onMouseMove(t){this.panWithMouse(t)}onKeydown(t){"Escape"===t.key&&this.toggleFS()}onResize(){this.updateMetrics(),this.checkBounds().inBounds||this.requestTick()}setTransform(){this.emit("beforeTransform");const{current:e,target:i,content:n,contentRect:s}=this,o=Object.assign({},v);for(const n of m){const s="e"==n||"f"===n?1e3:1e5;o[n]=t(e[n],s),Math.abs(i[n]-e[n])<("e"==n||"f"===n?.51:.001)&&(this.current[n]=i[n])}const{a:r,b:a,c:h,d:c,e:l,f:u}=o,g=`matrix(${r}, ${a}, ${h}, ${c}, ${l}, ${u})`,d=(this.option("transformParent")?n.parentElement:null)||n;if(d.style.transform===g)return;d.style.transform=g;const{contentWidth:f,contentHeight:p}=this.calculateContentDim();s.width=f,s.height=p,this.emit("afterTransform")}updateMetrics(e=!1){if(!this||this.state===d.Destroy)return;const{container:i,containerRect:n,content:s}=this,o=n.innerWidth,r=n.innerHeight,a=i.getBoundingClientRect(),h=getComputedStyle(this.container),c=a.width,l=a.height,u=parseFloat(h.paddingTop)+parseFloat(h.paddingBottom),g=parseFloat(h.paddingLeft)+parseFloat(h.paddingRight);this.containerRect={width:c,height:l,innerWidth:c-g,innerHeight:l-u};let m=this.option("width")||"auto",f=this.option("height")||"auto";"auto"===m&&(m=parseFloat(s.dataset.width||"")||(t=>{let e=0;return e=t instanceof HTMLImageElement?t.naturalWidth:t instanceof SVGElement?t.width.baseVal.value:t.offsetWidth,Math.max(e,t.scrollWidth)})(s)),"auto"===f&&(f=parseFloat(s.dataset.height||"")||(t=>{let e=0;return e=t instanceof HTMLImageElement?t.naturalHeight:t instanceof SVGElement?t.height.baseVal.value:t.offsetHeight,Math.max(e,t.scrollHeight)})(s));const p=(this.option("transformParent")?s.parentElement:null)||s,b=p.getAttribute("style")||"";p.style.setProperty("transform","none","important"),s instanceof HTMLImageElement&&(p.style.width="",p.style.height=""),p.offsetHeight;const v=s.getBoundingClientRect();let y=v.width,w=v.height,M=0,P=0;if(s instanceof HTMLImageElement&&({width:y,height:w,top:M,left:P}=((t,e,i,n)=>{const s=i/n;return s>t/e?(i=t,n=t/s):(i=e*s,n=e),{width:i,height:n,top:.5*(e-n),left:.5*(t-i)}})(v.width,v.height,m,f)),this.contentRect=Object.assign(Object.assign({},this.contentRect),{top:v.top-a.top+M,bottom:a.bottom-v.bottom+M,left:v.left-a.left+P,right:a.right-v.right+P,fitWidth:y,fitHeight:w,width:y,height:w,fullWidth:m,fullHeight:f}),p.style.cssText=b,s instanceof HTMLImageElement&&(p.style.width=`${y}px`,p.style.height=`${w}px`),this.setTransform(),!0!==e){let t="";Math.abs(c-o)>1&&(t+="x"),Math.abs(l-r)>1&&(t+="y"),t&&this.emit("refresh",t)}this.ignoreBounds||(t(this.targetScale)<t(this.minScale)?this.zoomTo(this.minScale,{friction:0}):this.targetScale>this.maxScale?this.zoomTo(this.maxScale,{friction:0}):this.state===d.Init||this.checkBounds().inBounds||this.requestTick()),this.updateControls()}getBounds(){const e=this.option("bounds");if("auto"!==e)return e;const{contentWidth:i,contentHeight:n}=this.calculateContentDim(this.target);let s=0,o=0,r=0,a=0;const h=this.option("infinite");if(!0===h||this.lockedAxis&&h===this.lockedAxis)s=-1/0,r=1/0,o=-1/0,a=1/0;else{let{containerRect:e,contentRect:h}=this,c=t(this.contentRect.fitWidth*this.targetScale,1e3),l=t(this.contentRect.fitHeight*this.targetScale,1e3),{innerWidth:u,innerHeight:g}=e;if(this.containerRect.width===c&&(u=e.width),this.containerRect.width===l&&(g=e.height),i>u){r=.5*(i-u),s=-1*r;let t=.5*(h.right-h.left);s+=t,r+=t}if(this.contentRect.fitWidth>u&&i<u&&(s-=.5*(this.contentRect.fitWidth-u),r-=.5*(this.contentRect.fitWidth-u)),n>g){a=.5*(n-g),o=-1*a;let t=.5*(h.bottom-h.top);o+=t,a+=t}this.contentRect.fitHeight>g&&n<g&&(s-=.5*(this.contentRect.fitHeight-g),r-=.5*(this.contentRect.fitHeight-g))}return{x:{min:s,max:r},y:{min:o,max:a}}}updateControls(){const e=this,i=e.container;let s={toggleMax:this.targetScale-this.minScale<.5*(this.maxScale-this.minScale)?this.maxScale:this.minScale,toggleCover:this.targetScale-this.minScale<.5*(this.coverScale-this.minScale)?this.coverScale:this.minScale,toggleZoom:this.targetScale-this.minScale<.5*(this.fullScale-this.minScale)?this.fullScale:this.minScale}[this.option("click")||""]||this.minScale,o=e.canZoomIn(),r=e.canZoomOut(),a="drag"===this.panMode,h=r&&a;this.targetScale<=this.minScale&&!this.panOnlyZoomed&&(h=!0),(this.contentRect.width-this.contentRect.fitWidth>-1||this.contentRect.height-this.contentRect.fitHeight>-1)&&(h=!0),this.contentRect.width*this.targetScale<this.contentRect.fitWidth&&(h=!1),"mousemove"===this.panMode&&(h=!1);let c=o&&t(s)>t(this.targetScale),l=!c&&!h&&r&&t(s)<t(this.targetScale);n(i,this.cn("canZoomIn"),c),n(i,this.cn("canZoomOut"),l),n(i,this.cn("isDraggable"),h);for(const t of i.querySelectorAll('[data-panzoom-action="zoomIn"]'))o?(t.removeAttribute("disabled"),t.removeAttribute("tabindex")):(t.setAttribute("disabled",""),t.setAttribute("tabindex","-1"));for(const t of i.querySelectorAll('[data-panzoom-action="zoomOut"]'))r?(t.removeAttribute("disabled"),t.removeAttribute("tabindex")):(t.setAttribute("disabled",""),t.setAttribute("tabindex","-1"));for(const t of i.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')){o=e.targetScale<e.fullScale-.1,o||r?(t.removeAttribute("disabled"),t.removeAttribute("tabindex")):(t.setAttribute("disabled",""),t.setAttribute("tabindex","-1"));const i=t.querySelector("g");i&&(i.style.display=e.targetScale>.9*e.fullScale?"none":"")}}panTo({x:t=this.target.e,y:e=this.target.f,scale:i=this.targetScale,friction:n=this.option("friction"),angle:s=0,originX:o=0,originY:r=0,flipX:a=!1,flipY:h=!1,ignoreBounds:c=!1}){this.state!==d.Destroy&&this.applyChange({panX:t-this.target.e,panY:e-this.target.f,scale:i/this.targetScale,angle:s,originX:o,originY:r,friction:n,flipX:a,flipY:h,ignoreBounds:c})}applyChange({panX:e=0,panY:i=0,scale:n=1,angle:s=0,originX:o=-this.current.e,originY:r=-this.current.f,friction:a=this.option("friction"),flipX:h=!1,flipY:c=!1,ignoreBounds:l=!1,bounce:u=this.option("bounce")}){const g=this.state;if(g===d.Init||g===d.Destroy)return;this.rAF&&(cancelAnimationFrame(this.rAF),this.rAF=null),this.isBouncingX=!1,this.isBouncingY=!1;for(const t of m)this.velocity[t]=0;this.friction=a||0,this.ignoreBounds=l;const{current:f}=this,p=f.e,b=f.f,v=this.getMatrix(this.target);let y=(new DOMMatrix).translate(p,b).translate(o,r).translate(e,i);if(this.option("zoom")){if(!l){const t=this.targetScale,e=this.minScale,i=this.maxScale;t*n<e&&(n=e/t),t*n>i&&(n=i/t)}y=y.scale(n)}y=y.translate(-o,-r).translate(-p,-b).multiply(v),s&&(y=y.rotate(s)),h&&(y=y.scale(-1,1)),c&&(y=y.scale(1,-1));for(const e of m)"a"!=e&&"d"!=e||!(y[e]>this.minScale+1e-5||y[e]<this.minScale-1e-5)?this.target[e]=t(y[e],1e3):this.target[e]=y[e];(this.targetScale<this.scale||Math.abs(n-1)>.1||"mousemove"===this.panMode||!1===u)&&!l&&this.clampTargetBounds(),this.isResting||(this.state=d.Panning,this.requestTick())}stop(t=!1){if(this.state===d.Init||this.state===d.Destroy)return;const e=this.isTicking;this.rAF&&(cancelAnimationFrame(this.rAF),this.rAF=null),this.isBouncingX=!1,this.isBouncingY=!1;for(const e of m)this.velocity[e]=0,"current"===t?this.current[e]=this.target[e]:"target"===t&&(this.target[e]=this.current[e]);this.setTransform(),p(this.container,"is-scaling"),p(this.container,"is-animating"),this.isTicking=!1,this.state=d.Ready,e&&(this.emit("endAnimation"),this.updateControls())}requestTick(){this.isTicking||(this.emit("startAnimation"),this.updateControls(),b(this.container,"is-animating"),this.isScaling&&b(this.container,"is-scaling")),this.isTicking=!0,this.rAF||(this.rAF=requestAnimationFrame((()=>this.animate())))}panWithMouse(e,i=this.option("mouseMoveFriction")){if(this.prevMouseMoveEvent=e,"mousemove"!==this.panMode||!e)return;if(t(this.targetScale)<=t(this.minScale))return;this.emit("mouseMove",e);const{container:n,containerRect:s,contentRect:o}=this,r=s.width,a=s.height,h=n.getBoundingClientRect(),c=(e.clientX||0)-h.left,l=(e.clientY||0)-h.top;let{contentWidth:u,contentHeight:g}=this.calculateContentDim(this.target);const d=this.option("mouseMoveFactor");d>1&&(u!==r&&(u*=d),g!==a&&(g*=d));let m=.5*(u-r)-c/r*100/100*(u-r);m+=.5*(o.right-o.left);let f=.5*(g-a)-l/a*100/100*(g-a);f+=.5*(o.bottom-o.top),this.applyChange({panX:m-this.target.e,panY:f-this.target.f,friction:i})}zoomWithWheel(t){if(this.state===d.Destroy||this.state===d.Init)return;const e=Math.abs(t.deltaY)<100&&Math.abs(t.deltaX)<100?25:50,i=Math.max(-1,Math.min(1,-t.deltaY||-t.deltaX||-t.detail)),n=this.targetScale,s=this.maxScale,o=this.minScale;let r=n*(100+i*e)/100;r<o&&n<=o?(this.wheelDelta+=Math.abs(i),r=o):r>s&&n>=s?(this.wheelDelta+=Math.abs(i),r=s):(this.wheelDelta=0,r=Math.max(Math.min(r,s),o)),this.wheelDelta>this.option("wheelLimit")||(t.preventDefault(),r!==n&&this.zoomTo(r,{event:t}))}canZoomIn(){return this.option("zoom")&&(this.contentRect.width<this.contentRect.fitWidth||this.targetScale<this.maxScale-1e-5)}canZoomOut(){return this.option("zoom")&&this.targetScale>this.minScale+1e-5}zoomIn(t=1.25,e){this.zoomTo(this.targetScale*t,e)}zoomOut(t=.8,e){this.zoomTo(this.targetScale*t,e)}zoomToFit(t){this.zoomTo("fit",t)}zoomToCover(t){this.zoomTo("cover",t)}zoomToFull(t){this.zoomTo("full",t)}zoomToMax(t){this.zoomTo("max",t)}toggleZoom(t){this.zoomTo(this.targetScale-this.minScale<.5*(this.fullScale-this.minScale)?"full":"fit",t)}toggleMax(t){this.zoomTo(this.targetScale-this.minScale<.5*(this.maxScale-this.minScale)?"max":"fit",t)}toggleCover(t){this.zoomTo(this.targetScale-this.minScale<.5*(this.coverScale-this.minScale)?"cover":"fit",t)}iterateZoom(t){this.zoomTo("next",t)}zoomTo(t=1,{friction:e="auto",originX:i=0,originY:n=0,event:s}={}){if(this.isContentLoading||this.state===d.Destroy)return;this.stop();const{targetScale:o}=this;let r=1;if("mousemove"===this.panMode&&(s=this.prevMouseMoveEvent||s),s){const t=this.content.getBoundingClientRect(),e=s.clientX||0,o=s.clientY||0;i=e-t.left-.5*t.width,n=o-t.top-.5*t.height}const a=this.fullScale,h=this.maxScale;let c=this.coverScale;"number"==typeof t?r=t/o:("next"===t&&(a-c<.2&&(c=a),t=o<a-1e-5?"full":o<h-1e-5?"max":"fit"),r="full"===t?a/o||1:"cover"===t?c/o||1:"max"===t?h/o||1:1/o||1),e="auto"===e?r>1?.15:.25:e,this.applyChange({scale:r,originX:i,originY:n,friction:e}),s&&"mousemove"===this.panMode&&this.panWithMouse(s,e)}rotateCCW(){this.applyChange({angle:-90})}rotateCW(){this.applyChange({angle:90})}flipX(){this.applyChange({flipX:!0})}flipY(){this.applyChange({flipY:!0})}fitX(){this.stop("target");const{containerRect:t,contentRect:e,target:i}=this;this.applyChange({panX:.5*t.width-(e.left+.5*e.fitWidth)-i.e,panY:.5*t.height-(e.top+.5*e.fitHeight)-i.f,scale:t.width/e.fitWidth/this.targetScale,originX:0,originY:0,ignoreBounds:!0})}fitY(){this.stop("target");const{containerRect:t,contentRect:e,target:i}=this;this.applyChange({panX:.5*t.width-(e.left+.5*e.fitWidth)-i.e,panY:.5*t.height-(e.top+.5*e.fitHeight)-i.f,scale:t.height/e.fitHeight/this.targetScale,originX:0,originY:0,ignoreBounds:!0})}toggleFS(){const{container:t}=this,e=this.cn("inFullscreen"),i=this.cn("htmlHasFullscreen");t.classList.toggle(e);const n=t.classList.contains(e);n?(document.documentElement.classList.add(i),document.addEventListener("keydown",this.onKeydown,!0)):(document.documentElement.classList.remove(i),document.removeEventListener("keydown",this.onKeydown,!0)),this.updateMetrics(),this.emit(n?"enterFS":"exitFS")}getMatrix(t=this.current){const{a:e,b:i,c:n,d:s,e:o,f:r}=t;return new DOMMatrix([e,i,n,s,o,r])}reset(t){if(this.state!==d.Init&&this.state!==d.Destroy){this.stop("current");for(const t of m)this.target[t]=v[t];this.target.a=this.minScale,this.target.d=this.minScale,this.isResting||(this.friction=void 0===t?this.option("friction"):t,this.state=d.Panning,this.requestTick())}}destroy(){this.stop(),this.state=d.Destroy,this.detachEvents(),this.detachObserver();const{container:t,content:e}=this,i=this.option("classes")||{};for(const e of Object.values(i))t.classList.remove(e+"");e&&(e.removeEventListener("load",this.onLoad),e.removeEventListener("error",this.onError)),this.detachPlugins()}}Object.defineProperty(M,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:f}),Object.defineProperty(M,"Plugins",{enumerable:!0,configurable:!0,writable:!0,value:{}});export{M as Panzoom};