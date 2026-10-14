import {useEffect} from 'react';

const CORE:{[key:string]:string}={word:'Writer',excel:'Sheets',powerpoint:'Slides'};
const HUB={
  outlook:'Mail',onenote:'Notes',onedrive:'Files',teams:'Mail',loop:'Notes',planner:'Planner',todo:'To Do',forms:'Forms',lists:'Lists',whiteboard:'Whiteboard',clipchamp:'Media',sway:'Designer',visio:'Diagram',project:'Planner',access:'Database',powerbi:'Analytics',powerapps:'Automation',automate:'Automation',sharepoint:'Files',designer:'Designer',stream:'Media',search:'Dashboard',copilot:'Dashboard',settings:'Dashboard'
};
function clickText(text:string){
  const buttons=[...document.querySelectorAll('button')];
  const b=buttons.find(x=>x.textContent?.trim()===text);
  b?.click();
}
export default function M365Bridge(){
 useEffect(()=>{
  const open=(e:Event)=>{
   const id=(e as CustomEvent<string>).detail;
   if(CORE[id]){clickText(CORE[id]);return;}
   const hub=document.querySelector('.wh-launch') as HTMLButtonElement|null;
   if(!hub)return;
   hub.click();
   const target=HUB[id]||'Dashboard';
   window.setTimeout(()=>clickText(target),40);
  };
  addEventListener('m365:open-app',open);
  return()=>removeEventListener('m365:open-app',open);
 },[]);
 return null;
}
