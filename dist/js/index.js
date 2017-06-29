!function(e){function __webpack_require__(r){if(o[r])return o[r].exports;var t=o[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,__webpack_require__),t.l=!0,t.exports}var o={};__webpack_require__.m=e,__webpack_require__.c=o,__webpack_require__.i=function(e){return e},__webpack_require__.d=function(e,o,r){__webpack_require__.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:r})},__webpack_require__.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return __webpack_require__.d(o,"a",o),o},__webpack_require__.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},__webpack_require__.p="./",__webpack_require__(__webpack_require__.s=2)}([function(e,o,r){"use strict";function checkChess(e){var o=e.col,r=e.row,t=e.type,i=checkItem(o,r,t,function(e){return[e-1+"_"+r,e+"_"+r,e+1+"_"+r]}),c=checkItem(o,r,t,function(e){return[o+"_"+(e-1),o+"_"+e,o+"_"+(e+1)]}),_=checkItem(o,r,t,function(e){var t=o-r;return[e-1+t+"_"+(e-1),e+t+"_"+e,e+1+t+"_"+(e+1)]}),a=checkItem(o,r,t,function(e){return[o-e+1+"_"+(r+e-1),o-e+"_"+(r+e),o-e-1+"_"+(r+e+1)]}),u=checkItem(o,r,t,function(e){return[o+e+1+"_"+(r-e-1),o+e+"_"+(r-e),o+e-1+"_"+(r-e+1)]}),s=i||c||_||a||u;s&&(n.className="show",n.innerHTML=s.type+"胜利！",setTimeout(function(){n.className="",start(),b=!0},3e3))}function checkItem(e,o,r,t){for(var n=0,i=[],c=0;c<=h;c++){var _=t(c),a=_[0],u=_[1],s=_[2];if(d[u]){d[u].type!=r&&n<5&&(n=0);var f=d[u].type==r,l=d[a]&&d[a].type==r,p=d[s]&&d[s].type==r;f&&(l||p)&&(i.push(u),n+=1)}}return n>=5&&{win:i,type:r}}function start(){c.clearRect(0,0,l,l),d={},drawLine()}function setChess(){for(var e in d)markChess(d[e])}function markChess(e){var o=e.pos;c.fillStyle=e.color,c.beginPath(),c.arc(o[0],o[1],p,0,f),c.fill()}function drawLine(){c.setTransform(1,0,0,1,.5,.5),c.lineWidth=1,c.strokeStyle="#000",c.beginPath();for(var e=k-1,o=0;o<s;o++){var r=h*o+p;c.moveTo(r,p),c.lineTo(r,e),c.moveTo(p,r),c.lineTo(e,r)}c.moveTo(e,p),c.lineTo(e,e),c.moveTo(p,e),c.lineTo(e,e),c.stroke()}function markPosition(e){var o=e[0],r=e[1];m%2==0&&c.setTransform(1,0,0,1,0,0),o=o%2==0?o+1:o,r=r%2==0?r+1:r,c.lineWidth=m,c.strokeStyle="#f00",c.beginPath(),c.moveTo(o-p,r-p),c.lineTo(o-p+v,r-p),c.moveTo(o-p,r-p-m/2),c.lineTo(o-p,r-p-m/2+v),c.moveTo(o+p,r-p),c.lineTo(o+p-v,r-p),c.moveTo(o+p,r-p-m/2),c.lineTo(o+p,r-p-m/2+v),c.moveTo(o+p,r+p),c.lineTo(o+p-v,r+p),c.moveTo(o+p,r+p+m/2),c.lineTo(o+p,r+p-m/2-v),c.moveTo(o-p,r+p),c.lineTo(o-p+v,r+p),c.moveTo(o-p,r+p+m/2),c.lineTo(o-p,r+p-v),c.stroke()}Object.defineProperty(o,"__esModule",{value:!0});var t=r(1);r.n(t);const n=document.querySelector("#tip"),i=document.querySelector("#view"),c=i.getContext("2d"),_=window.innerWidth,a=window.innerHeight,u=20,s=16,f=2*Math.PI;var l=Math.min(_,a)-2*u,h=Math.floor(l/s),p=Math.floor(h/4),v=Math.floor(p/2);const m=2;i.width=i.height=l;const k=l-2*(p-v-m);h=Math.floor(k/s),p=Math.floor(h/4),v=Math.floor(p/2);var T=p,w=p;i.style.cssText="margin: "+u+"px";var d={},b=!0;start(),i.addEventListener("click",function(e){var o=e.offsetX,r=e.offsetY,t=Math.floor(o/h),n=Math.floor(r/h);if(!d[t+"_"+n]){var i=h*t,c=h*n,_=i+p,a=c+p,u={pos:[_,a],col:t,row:n,type:b?"黑方":"白方",color:b?"#000":"#ccc"};d[t+"_"+n]=u,markChess(u),checkChess(u),b=!b}}),i.addEventListener("mousemove",function(e){var o=e.offsetX,r=e.offsetY,t=Math.floor(o/h),n=Math.floor(r/h),i=h*t,_=h*n;T==i&&w==_||(c.clearRect(T-p-v,w-p-v,2*(p+v),2*(p+v)),drawLine(),T=i+p-m/2,w=_+p-m/2,markPosition([T,w]),setChess())})},function(e,o){},function(e,o,r){e.exports=r(0)}]);