import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ImageGradient from './header';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ImageGradient />
        <App />
  </React.StrictMode>
);

