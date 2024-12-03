import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Context from './Contextprovider/Context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Context>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Context>
);

reportWebVitals();
