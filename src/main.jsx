import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProviderWrapper } from "./context/auth.context.jsx"
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProviderWrapper>
        <App />
      </ AuthProviderWrapper>
    </React.StrictMode>
  </BrowserRouter>
)
