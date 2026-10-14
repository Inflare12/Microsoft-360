import {useEffect,useMemo,useState} from 'react';
import {AppWindow,BookOpen,CalendarDays,CheckSquare,Cloud,Command,FileSpreadsheet,FileText,Folder,HelpCircle,LayoutGrid,Mail,Menu,MessageSquare,MousePointer2,Palette,PanelTop,Presentation,Search,Settings,Table2,Users,Video,Workflow,X,Zap} from 'lucide-react';

type AppItem={id:string;name:string;group:string;icon:any;description:string};
const APPS:AppItem[]=[
 {id:'word',name:'Word',group:'Create',icon:FileText,description:'Documents, layouts, review and publishing'},
 {id:'excel',name:'Excel',group:'Create',icon:FileSpreadsheet,description:'Workbooks, formulas, charts, tables and analysis'},
 {id:'powerpoint',name:'PowerPoint',group:'Create',icon:Presentation,description:'Presentations, themes, animations and presenting'},
 {id:'outlook',name:'Outlook',group:'Communicate',icon:Mail,description:'Mail, calendar, contacts and focused inbox'},
 {id:'onenote',name:'OneNote',group:'Create',icon:BookOpen,description:'Notebooks, sections, pages, ink and media'},
 {id:'onedrive',name:'OneDrive',group:'Files',icon:Cloud,description:'Files, folders, sharing and local sync workspace'},
 {id:'teams',name:'Teams',group:'Communicate',icon:MessageSquare,description:'Chats, channels, meetings and collaboration workspace'},
 {id:'loop',name:'Loop',group:'Collaborate',icon:PanelTop,description:'Shared components, pages and project workspaces'},
 {id:'planner',name:'Planner',group:'Plan',icon:LayoutGrid,description:'Plans, buckets, assignments and progress'},
 {id:'todo',name:'To Do',group:'Plan',icon:CheckSquare,description:'My Day, lists, reminders and recurring tasks'},
 {id:'forms',name:'Forms',group:'Collect',icon:Table2,description:'Forms, quizzes, questions and response review'},
 {id:'lists',name:'Lists',group:'Collect',icon:Table2,description:'Structured records, views, rules and columns'},
 {id:'whiteboard',name:'Whiteboard',group:'Create',icon:Palette,description:'Freeform canvas, cards, ink and diagrams'},
 {id:'clipchamp',name:'Clipchamp',group:'Create',icon:Video,description:'Timeline-style video editing workspace'},
 {id:'sway',name:'Sway',group:'Create',icon:PanelTop,description:'Web-style interactive stories and presentations'},
 {id:'visio',name:'Visio',group:'Create',icon:Workflow,description:'Flowcharts, diagrams, shapes and connectors'},
 {id:'project',name:'Project',group:'Plan',icon:LayoutGrid,description:'Tasks, dependencies, milestones and timelines'},
 {id:'access',name:'Access',group:'Data',icon:Table2,description:'Tables, relationships, queries and forms'},
 {id:'powerbi',name:'Power BI',group:'Data',icon:Table2,description:'Reports, dashboards, datasets and visuals'},
 {id:'powerapps',name:'Power Apps',group:'Automate',icon:AppWindow,description:'Low-code app workspace and data forms'},
 {id:'automate',name:'Power Automate',group:'Automate',icon:Workflow,description:'Triggers, actions, conditions and workflows'},
 {id:'sharepoint',name:'SharePoint',group:'Files',icon:Folder,description:'Sites, libraries, lists and pages'},
 {id:'designer',name:'Designer',group:'Create',icon:Palette,description:'Graphics, layouts and design workspace'},
 {id:'stream',name:'Stream',group:'Create',icon:Video,description:'Video library, playback and collections'},
 {id:'search',name:'Search',group:'Tools',icon:Search,description:'Unified workspace search'},
 {id:'copilot',name:'Copilot',group:'AI',icon:Zap,description:'BYOK AI assistant and command actions'},
 {id:'settings',name:'Settings',group:'Tools',icon:Settings,description:'Appearance, keyboard, privacy and data controls'},
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
