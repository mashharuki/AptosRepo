import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

declare global {
  interface Window { aptos: any; }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

window.addEventListener('load', () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

reportWebVitals();
