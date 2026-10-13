import {useEffect,useMemo,useState} from 'react';
import {AppWindow,BookOpen,CalendarDays,CheckSquare,Cloud,Command,FileSpreadsheet,FileText,Folder,HelpCircle,LayoutGrid,Mail,Menu,MessageSquare,MousePointer2,Palette,PanelTop,Presentation,Search,Settings,Table2,Users,Video,Workflow,X,Zap} from 'lucide-react';

type AppItem={id:string;name:string;group:string;icon:any;description:string};
const APPS:AppItem[]=[
 ['word','Word','Create',FileText,'Documents, layouts, review and publishing'],
 ['excel','Excel','Create',FileSpreadsheet,'Workbooks, formulas, charts, tables and analysis'],
 ['powerpoint','PowerPoint','Create',Presentation,'Presentations, themes, animations and presenting'],
 ['outlook','Outlook','Communicate',Mail,'Mail, calendar, contacts and focused inbox'],
 ['onenote','OneNote','Create',BookOpen,'Notebooks, sections, pages, ink and media'],
 ['onedrive','OneDrive','Files',Cloud,'Files, folders, sharing and local sync workspace'],
 ['teams','Teams','Communicate',MessageSquare,'Chats, channels, meetings and collaboration workspace'],
 ['loop','Loop','Collaborate',PanelTop,'Shared components, pages and project workspaces'],
 ['planner','Planner','Plan',LayoutGrid,'Plans, buckets, assignments and progress'],
 ['todo','To Do','Plan',CheckSquare,'My Day, lists, reminders and recurring tasks'],
 ['forms','Forms','Collect',Table2,'Forms, quizzes, questions and response review'],
 ['lists','Lists','Collect',Table2,'Structured records, views, rules and columns'],
 ['whiteboard','Whiteboard','Create',Palette,'Freeform canvas, cards, ink and diagrams'],
 ['clipchamp','Clipchamp','Create',Video,'Timeline-style video editing workspace'],
 ['sway','Sway','Create',PanelTop,'Web-style interactive stories and presentations'],
 ['visio','Visio','Create',Workflow,'Flowcharts, diagrams, shapes and connectors'],
 ['project','Project','Plan',LayoutGrid,'Tasks, dependencies, milestones and timelines'],
 ['access','Access','Data',Table2,'Tables, relationships, queries and forms'],
 ['powerbi','Power BI','Data',Table2,'Reports, dashboards, datasets and visuals'],
 ['powerapps','Power Apps','Automate',AppWindow,'Low-code app workspace and data forms'],
 ['automate','Power Automate','Automate',Workflow,'Triggers, actions, conditions and workflows'],
 ['sharepoint','SharePoint','Files',Folder,'Sites, libraries, lists and pages'],
 ['designer','Designer','Create',Palette,'Graphics, layouts and design workspace'],
 ['stream','Stream','Create',Video,'Video library, playback and collections'],
 ['search','Search','Tools',Search,'Unified workspace search'],
 ['copilot','Copilot','AI',Zap,'BYOK AI assistant and command actions'],
 ['settings','Settings','Tools',Settings,'Appearance, keyboard, privacy and data controls'],
];
const SHORTCUTS=[
 ['Ctrl+K','Command palette'],['Ctrl+Shift+P','App launcher'],['Ctrl+Tab','Next document/app tab'],['Ctrl+Shift+Tab','Previous tab'],['Ctrl+S','Save workspace'],['Ctrl+O','Open/import'],['Ctrl+N','New document'],['Ctrl+P','Print / PDF'],['Ctrl+Z','Undo'],['Ctrl+Y','Redo'],['Ctrl+F','Find'],['Alt+Shift+5','Toggle strikethrough'],['F1','Keyboard help'],['Esc','Close palette/dialog'],
];
export default function M365Experience({onOpenApp,onNew,onSave,onOpen,onPrint,onUndo,onRedo}:{onOpenApp?:(id:string)=>void;onNew?:()=>void;onSave?:()=>void;onOpen?:()=>void;onPrint?:()=>void;onUndo?:()=>void;onRedo?:()=>void}){
 const[palette,setPalette]=useState(false),[help,setHelp]=useState(false),[apps,setApps]=useState(false),[q,setQ]=useState(''),[cursor,setCursor]=useState('select'),[tab,setTab]=useState(0);
 const tabs=['Home','Insert','Draw','Layout','Review','View','Help'];
 const filtered=useMemo(()=>APPS.filter(a=>`${a.name} ${a.description} ${a.group}`.toLowerCase().includes(q.toLowerCase())),[q]);
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPalette(true);setApps(false);return}
   if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==='p'){e.preventDefault();setApps(true);setPalette(false);return}
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='tab'){e.preventDefault();setTab(t=>(t+1)%tabs.length);return}
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();onSave?.();return}
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='o'){e.preventDefault();onOpen?.();return}
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='n'){e.preventDefault();onNew?.();return}
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='p'){e.preventDefault();onPrint?.();return}
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();onUndo?.();return}
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='y'){e.preventDefault();onRedo?.();return}
   if(e.key==='F1'){e.preventDefault();setHelp(true);return}
   if(e.key==='Escape'){setPalette(false);setApps(false);setHelp(false)}
 };window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[onNew,onSave,onOpen,onPrint,onUndo,onRedo,tabs.length]);
 const launch=(a:AppItem)=>{onOpenApp?.(a.id);setApps(false);setPalette(false);setQ('')};
 return <>
  <div className="m365-strip">
   <button className="m365-apps-button" onClick={()=>setApps(true)}><Menu size={16}/> 365</button>
   <div className="m365-tabs">{tabs.map((t,i)=><button className={i===tab?'active':''} key={t} onClick={()=>setTab(i)}>{t}</button>)}</div>
   <button className="m365-command" onClick={()=>setPalette(true)}><Search size={15}/><span>Search / Tell me what you want to do</span><kbd>Ctrl K</kbd></button>
   <div className="m365-strip-actions"><button title="Cursor mode" onClick={()=>setCursor(cursor==='select'?'text':cursor==='text'?'draw':'select')}><MousePointer2 size={16}/><span>{cursor}</span></button><button title="Keyboard shortcuts" onClick={()=>setHelp(true)}><HelpCircle size={16}/></button></div>
  </div>
  {apps&&<div className="m365-backdrop" onMouseDown={()=>setApps(false)}><div className="m365-window m365-app-window" onMouseDown={e=>e.stopPropagation()}><header><div><b>Microsoft-365 workspace</b><small>All apps · keyboard-first · local-first</small></div><button onClick={()=>setApps(false)}><X/></button></header><div className="m365-app-search"><Search size={17}/><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search apps..."/></div><div className="m365-app-grid">{filtered.map(a=>{const I=a.icon;return <button className="m365-app-card" key={a.id} onClick={()=>launch(a)}><span className="m365-app-icon"><I size={22}/></span><span><b>{a.name}</b><small>{a.description}</small></span><em>{a.group}</em></button>})}</div></div></div>}
  {palette&&<div className="m365-backdrop" onMouseDown={()=>setPalette(false)}><div className="m365-window m365-command-window" onMouseDown={e=>e.stopPropagation()}><div className="m365-command-input"><Command size={18}/><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search commands, apps and actions..."/><kbd>Esc</kbd></div><div className="m365-command-list">{filtered.slice(0,12).map(a=>{const I=a.icon;return <button key={a.id} onClick={()=>launch(a)}><I size={17}/><span><b>Open {a.name}</b><small>{a.description}</small></span><kbd>↵</kbd></button>})}<button onClick={()=>{onSave?.();setPalette(false)}}><Cloud size={17}/><span><b>Save workspace</b><small>Persist your current local workspace</small></span><kbd>Ctrl S</kbd></button><button onClick={()=>{setHelp(true);setPalette(false)}}><HelpCircle size={17}/><span><b>Keyboard shortcuts</b><small>View the complete shortcut map</small></span><kbd>F1</kbd></button></div></div></div>}
  {help&&<div className="m365-backdrop" onMouseDown={()=>setHelp(false)}><div className="m365-window m365-help" onMouseDown={e=>e.stopPropagation()}><header><div><b>Keyboard & interaction</b><small>365-style command surface</small></div><button onClick={()=>setHelp(false)}><X/></button></header><div className="shortcut-grid">{SHORTCUTS.map(([key,label])=><div key={key}><kbd>{key}</kbd><span>{label}</span></div>)}</div><div className="cursor-help"><b>Cursor modes</b><span>Select — normal pointer</span><span>Text — editing/text selection</span><span>Draw — ink/drawing interaction</span><span>Use the cursor button in the top strip to switch modes.</span></div></div></div>}
 </>;
}
