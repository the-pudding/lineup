import{r as $}from"./index.Cxcxuvjx.js";function te(e,t){const o={},c={},a={$$scope:1};let s=e.length;for(;s--;){const f=e[s],i=t[s];if(i){for(const r in f)r in i||(c[r]=1);for(const r in i)a[r]||(o[r]=i[r],a[r]=1);e[s]=i}else for(const r in f)a[r]=1}for(const f in c)f in o||(o[f]=void 0);return o}function ne(e){return typeof e=="object"&&e!==null?e:{}}var b=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function W(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var C="Expected a function",k=NaN,M="[object Symbol]",F=/^\s+|\s+$/g,N=/^[-+]0x[0-9a-f]+$/i,R=/^0b[01]+$/i,z=/^0o[0-7]+$/i,A=parseInt,B=typeof b=="object"&&b&&b.Object===Object&&b,H=typeof self=="object"&&self&&self.Object===Object&&self,P=B||H||Function("return this")(),D=Object.prototype,G=D.toString,V=Math.max,U=Math.min,j=function(){return P.Date.now()};function X(e,t,o){var c,a,s,f,i,r,d=0,w=!1,l=!1,y=!0;if(typeof e!="function")throw new TypeError(C);t=I(t)||0,v(o)&&(w=!!o.leading,l="maxWait"in o,s=l?V(I(o.maxWait)||0,t):s,y="trailing"in o?!!o.trailing:y);function h(n){var u=c,m=a;return c=a=void 0,d=n,f=e.apply(m,u),f}function _(n){return d=n,i=setTimeout(g,t),w?h(n):f}function S(n){var u=n-r,m=n-d,E=t-u;return l?U(E,s-m):E}function T(n){var u=n-r,m=n-d;return r===void 0||u>=t||u<0||l&&m>=s}function g(){var n=j();if(T(n))return O(n);i=setTimeout(g,S(n))}function O(n){return i=void 0,y&&c?h(n):(c=a=void 0,f)}function x(){i!==void 0&&clearTimeout(i),d=0,c=r=a=i=void 0}function L(){return i===void 0?f:O(j())}function p(){var n=j(),u=T(n);if(c=arguments,a=this,r=n,u){if(i===void 0)return _(r);if(l)return i=setTimeout(g,t),h(r)}return i===void 0&&(i=setTimeout(g,t)),f}return p.cancel=x,p.flush=L,p}function v(e){var t=typeof e;return!!e&&(t=="object"||t=="function")}function q(e){return!!e&&typeof e=="object"}function J(e){return typeof e=="symbol"||q(e)&&G.call(e)==M}function I(e){if(typeof e=="number")return e;if(J(e))return k;if(v(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=v(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=e.replace(F,"");var o=R.test(e);return o||z.test(e)?A(e.slice(2),o?2:8):N.test(e)?k:+e}var K=X;const Q=W(K),Y=()=>{var e;return((e=window==null?void 0:window.visualViewport)==null?void 0:e.width)||document.documentElement.clientWidth},Z=()=>{var e;return((e=window==null?void 0:window.visualViewport)==null?void 0:e.height)||document.documentElement.clientHeight},ie=$({width:0,height:0},e=>{const t=()=>e({width:Y(),height:Z()});return t(),window.addEventListener("resize",Q(t,250)),()=>{window.removeEventListener("resize",t)}});export{ne as a,W as b,b as c,te as g,ie as v};
