import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Inject subtle high-fidelity developer imprint marking the build version
if (typeof window !== 'undefined') {
  console.log(
    "%c DHMMUN Platform %c v0.9.11 %c Security Integrity Node: ACTIVE %c",
    "color: #ffffff; background: #2c666e; padding: 4px 6px; border-radius: 4px 0 0 4px; font-weight: bold; font-family: system-ui;",
    "color: #2c666e; background: #fafafd; border: 1px solid #2c666e; padding: 3px 6px; font-weight: bold; font-family: system-ui;",
    "color: #4a7c82; font-size: 10px; font-family: monospace; margin-left: 10px;",
    ""
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
