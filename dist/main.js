(()=>{"use strict";var e={700:(e,t,n)=>{var r=n(379),a=n.n(r),o=n(795),i=n.n(o),s=n(569),c=n.n(s),l=n(565),u=n.n(l),d=n(216),f=n.n(d),p=n(589),h=n.n(p),v=n(772),m={};function y(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw o}}}}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function b(e,t){for(var n=[],r=e;r<t;r++)n.push(r);return n}function x(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function S(e,t,n){var r;return{start:e,end:t,team:n,hitStatus:[],setLength:void(r=e[0]==t[0]?t[1]-e[1]:t[0]-e[0]),length:r,hit:function(e,t){this.hitStatus.push([e,t]);var r=1==n?".selfCont > ":".enemCont > ";C.displayTile(e,t,r,0),C.displayTile(e+1,t+1,r,1),C.displayTile(e+1,t-1,r,1),C.displayTile(e-1,t+1,r,1),C.displayTile(e-1,t-1,r,1)},isSunk:function(){return this.hitStatus.length>=this.length}}}function A(e){var t=[],n=[];return{team:e,placeShip:function(n,r){var a=S(n,r,e),o=1==e?".selfCont > ":".enemCont > ";return t.push(a),2!=e&&C.displayShip(n,r,o),a},placeDefault:function(){this.placeShip([2,4],[2,7]),this.placeShip([4,1],[4,5]),this.placeShip([4,7],[7,7]),this.placeShip([3,9],[3,11]),this.placeShip([8,4],[8,6]),this.placeShip([6,1],[6,4]),this.placeShip([10,6],[10,10])},getActiveTiles:function(e,n){var r,a=[],o=y(t);try{for(o.s();!(r=o.n()).done;){var i=r.value;if(i.start[0]==i.end[0]){var s,c=y(b(i.start[1],i.end[1]));try{for(c.s();!(s=c.n()).done;){var l=s.value;a.push([i.start[0],l])}}catch(e){c.e(e)}finally{c.f()}}else if(i.start[1]==i.end[1]){var u,d=y(b(i.start[0],i.end[0]));try{for(d.s();!(u=d.n()).done;){var f=u.value;a.push([f,i.start[1]])}}catch(e){d.e(e)}finally{d.f()}}}}catch(e){o.e(e)}finally{o.f()}return a},isTileEmpty:function(e,t){return!this.getActiveTiles().some((function(n){return Array.isArray(n)&&n.every((function(n,r){return Object.is([e,t][r],n)}))}))},isTileShot:function(e,t){return!!n.some((function(n){return Array.isArray(n)&&n.every((function(n,r){return Object.is([e,t][r],n)}))}))},allSunk:function(){var e,n=[],r=y(t);try{for(r.s();!(e=r.n()).done;){var a=e.value;1==a.isSunk()&&n.push(a)}}catch(e){r.e(e)}finally{r.f()}return n.length==t.length},handleMissed:function(){var t,r=1==e?".selfCont > ":".enemCont > ",a=y(n);try{for(a.s();!(t=a.n()).done;){var o=t.value;C.displayTile(o[0],o[1],r,1)}}catch(e){a.e(e)}finally{a.f()}},receiveAttack:function(r,a){if(this.isTileEmpty(r,a))return this.isTileShot(r,a)||n.push([r,a]),this.handleMissed(),!1;var o,i=y(t);try{for(i.s();!(o=i.n()).done;){var s=o.value;s.start[0]==s.end[0]?a>=s.start[1]&&a<s.end[1]&&r==s.start[0]&&s.hit(r,a,e):s.start[1]==s.end[1]&&r>=s.start[0]&&r<s.end[0]&&a==s.start[1]&&s.hit(r,a,e)}}catch(e){i.e(e)}finally{i.f()}return!0}}}m.styleTagTransform=h(),m.setAttributes=u(),m.insert=c().bind(null,"head"),m.domAPI=i(),m.insertStyleElement=f(),a()(v.Z,m),v.Z&&v.Z.locals&&v.Z.locals,e=n.hmd(e);var C={createGrid:function(e,t,n){var r=document.querySelector(n);r.style.setProperty("--grid-rows",e),r.style.setProperty("--grid-cols",t);for(var a=1;a<=e;a++)for(var o=1;o<=e;o++){var i=document.createElement("button");i.setAttribute("data-row",a),i.setAttribute("data-col",o),".enemCont"==n?i.setAttribute("data-team","enem"):i.setAttribute("data-team","self"),r.appendChild(i).className="grid-item"}},displayShip:function(e,t,n){var r=[];if(e[0]==t[0]){var a,o=y(b(e[1],t[1]));try{for(o.s();!(a=o.n()).done;){var i=a.value;r.push([e[0],i])}}catch(e){o.e(e)}finally{o.f()}}else if(e[1]==t[1]){var s,c=y(b(e[0],t[0]));try{for(c.s();!(s=c.n()).done;){var l=s.value;r.push([l,e[1]])}}catch(e){c.e(e)}finally{c.f()}}for(var u=0,d=r;u<d.length;u++){var f=d[u];document.querySelector("".concat(n,'[data-row="').concat(f[0],'"][data-col="').concat(f[1],'"]')).classList.add("exposed")}},displayTile:function(e,t,n,r){var a;try{a=document.querySelector("".concat(n,'[data-row="').concat(e,'"][data-col="').concat(t,'"]')),1==r?(a.classList.add("missed"),a.classList.remove("grid-item")):(a.classList.add("selfExposed"),a.classList.remove("grid-item"))}catch(e){return}},purgeAll:function(){for(var e=document.querySelector(".enemCont"),t=document.querySelector(".selfCont");e.hasChildNodes()|t.hasChildNodes();)e.removeChild(e.lastChild),t.removeChild(t.lastChild)},displayResult:function(e){var t=Array.from(document.querySelectorAll(".grid-item")),n=document.querySelector(".result");t.forEach((function(e){e.disabled=!0})),n.innerHTML=1==e?"You won! Congratz":"You lost! So bad!";var r=document.querySelector(".restartCont"),a=document.createElement("button");a.classList.add("restart"),a.innerHTML="Restart",r.appendChild(a),a.addEventListener("click",(function(){C.purgeAll(),C.createGrid(10,10,".selfCont"),C.createGrid(10,10,".enemCont"),w()}))}},w=function(){var e=A(1),t=A(2);t.placeDefault(),e.placeDefault(),document.querySelectorAll(".grid-item").forEach((function(n){n.addEventListener("click",(function(n){var r=parseInt(n.target.getAttribute("data-row")),a=parseInt(n.target.getAttribute("data-col"));"enem"==n.target.getAttribute("data-team")?(t.receiveAttack(r,a)||e.receiveAttack(x(1,10),x(1,10)),t.allSunk()&&C.displayResult()):e.receiveAttack(r,a)}))}))};C.createGrid(10,10,".selfCont"),C.createGrid(10,10,".enemCont"),w(),e.exports={shipFactory:S,newGameboard:A}},772:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(81),a=n.n(r),o=n(645),i=n.n(o)()(a());i.push([e.id,"* {\n    box-sizing: border-box;\n    border-radius: 0px;\n}\n\n.app-wrapper {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: 20px;\n}\n\n.result {\n    font-size: large;\n    font-family: 'Arial';\n}\n\nbody {\n    margin: 0;\n    height: 100vh;\n}\n\n:root {\n    --grid-cols: 1;\n    --grid-rows: 1;\n}\n\n.container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 50px;\n}\n  \n.selfCont, .enemCont {\n    border: solid 2px rgb(165, 165, 165);\n    width: 500px;\n    height: 500px;\n    display: grid;\n    grid-template-rows: repeat(var(--grid-rows), 1fr);\n    grid-template-columns: repeat(var(--grid-cols), 1fr);\n}\n\n.grid-item {\n    border: 1px solid rgb(209, 209, 209);\n    text-align: center;\n}\n\n.grid-item:hover {\n    border: 2px solid rgb(167, 137, 221);\n    text-align: center;\n}\n\n.exposed {\n    border: 2px solid rgb(174, 157, 252);\n    background-color: rgb(209, 198, 255);\n}\n\n.missed {\n    background-color: rgb(220, 217, 235);\n    border: 1px solid rgb(156, 151, 177);\n}\n\n.missed::after {\n    content: \" \\B7 \";\n    font-size: large;\n}\n\n.selfExposed {\n    border: 2px solid rgb(118, 93, 226);\n    background-image: linear-gradient(to bottom, rgb(132, 104, 255), rgb(166, 146, 255));\n}\n\n.restart {\n    border: 1px solid greenyellow;\n    width: 60px;\n    height: 30px;\n}",""]);const s=i},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,a,o){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var l=0;l<e.length;l++){var u=[].concat(e[l]);r&&i[u[0]]||(void 0!==o&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=o),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),a&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=a):u[4]="".concat(a)),t.push(u))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var o={},i=[],s=0;s<e.length;s++){var c=e[s],l=r.base?c[0]+r.base:c[0],u=o[l]||0,d="".concat(l," ").concat(u);o[l]=u+1;var f=n(d),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==f)t[f].references++,t[f].updater(p);else{var h=a(p,r);r.byIndex=s,t.splice(s,0,{identifier:d,updater:h,references:1})}i.push(d)}return i}function a(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,a){var o=r(e=e||[],a=a||{});return function(e){e=e||[];for(var i=0;i<o.length;i++){var s=n(o[i]);t[s].references--}for(var c=r(e,a),l=0;l<o.length;l++){var u=n(o[l]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}o=c}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var a=void 0!==n.layer;a&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,a&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var o=n.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var o=t[r]={id:r,loaded:!1,exports:{}};return e[r](o,o.exports,n),o.loaded=!0,o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n(700)})();