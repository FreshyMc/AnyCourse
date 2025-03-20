import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/style.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
