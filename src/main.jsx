import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Screen1Page from './screens/Screen1Page.jsx';
import './styles.css';

function resolvePageByPath(pathname) {
  const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return normalized === '/screen1' ? <Screen1Page /> : <App />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>{resolvePageByPath(window.location.pathname)}</React.StrictMode>
);
