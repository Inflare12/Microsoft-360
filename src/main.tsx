import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import FeatureHub from './feature-hub';
import './styles.css';
import './feature-hub.css';

if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('/sw.js').catch(()=>{});
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/><FeatureHub/></React.StrictMode>);
