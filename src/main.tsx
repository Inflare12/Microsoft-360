import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import WorkspaceHub from './WorkspaceHub';
import QuickTools from './QuickTools';
import ErrorBoundary from './ErrorBoundary';
import M365Experience from './M365Experience';
import M365Bridge from './M365Bridge';
import './styles.css';
import './workspace-hub.css';
import './quick-tools.css';

if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('/sw.js').catch(()=>{});
const openApp=(id:string)=>window.dispatchEvent(new CustomEvent('m365:open-app',{detail:id}));

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <M365Experience onOpenApp={openApp} />
      <M365Bridge />
      <App />
      <WorkspaceHub />
      <QuickTools />
    </ErrorBoundary>
  </React.StrictMode>
);
