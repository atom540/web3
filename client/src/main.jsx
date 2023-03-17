import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import { TradeProvider } from './context/TradeContext'
import { TransactionProvider } from './context/TransactionContext'

import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <TransactionProvider>
  {/* <TradeProvider> */}
  
  <React.StrictMode>
    <App />
  </React.StrictMode>
  {/* </TradeProvider> */}
  </TransactionProvider>
 ,
)
