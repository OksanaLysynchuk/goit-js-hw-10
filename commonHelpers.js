import"./assets/styles-4abf0df9.js";import{f as T,i as p}from"./assets/vendor-77e16229.js";const l=document.getElementById("datetime-picker"),n=document.querySelector("[data-start]"),i=document.querySelectorAll(".value");let d=new Date;function s(t){return String(t).padStart(2,"0")}function b({days:t,hours:e,minutes:r,seconds:o}){i[0].textContent=s(t),i[1].textContent=s(e),i[2].textContent=s(r),i[3].textContent=s(o)}function k(t){d=t[0];const e=Date.now();d<e?(p.error({message:"Please choose a date in the future"}),n.disabled=!0):n.disabled=!1}T(l,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose:k,clickOpens:!0});function u(t){const c=Math.floor(t/864e5),m=Math.floor(t%864e5/36e5),h=Math.floor(t%864e5%36e5/6e4),f=Math.floor(t%864e5%36e5%6e4/1e3);return{days:c,hours:m,minutes:h,seconds:f}}class y{constructor({onTick:e}){this.onTick=e,this.interval=null,this.endTime=null}start(){this.endTime=d.getTime();const e=Date.now();if(this.endTime-e<=0){this.stop();return}this.interval=setInterval(()=>{const o=Date.now(),a=this.endTime-o,c=u(a);this.onTick(c),a<=0&&this.stop()},1e3)}stop(){clearInterval(this.interval);const e=u(0);this.onTick(e),n.disabled=!1,l.disabled=!1}}const v=new y({onTick:b.bind(globalThis)});n.addEventListener("click",()=>{v.start(),n.disabled=!0,l.disabled=!0});
//# sourceMappingURL=commonHelpers.js.map
