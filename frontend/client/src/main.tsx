import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css';
import { BrowserRouter } from 'react-router-dom';
// import { Amplify } from 'aws-amplify';
// import { awsconfig } from './aws-exports';

// Configure Amplify with the settings from our export file
// Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);