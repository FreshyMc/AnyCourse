import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
