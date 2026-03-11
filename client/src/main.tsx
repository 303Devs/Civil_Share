import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from 'thirdweb/react';
import { ContractContextProvider, ActivePageContextProvider } from './context';
import { ToastContainer } from 'react-toastify';

import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <Router>
        <ContractContextProvider>
          <ActivePageContextProvider>
            <App />
            <ToastContainer position='bottom-right' theme='dark' />
          </ActivePageContextProvider>
        </ContractContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
