import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Contextshare from './context/Contextshare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <GoogleOAuthProvider clientId='1043119981089-f040138nmjftekgpj8u25ica834123rq.apps.googleusercontent.com'> 

    <Contextshare> 
       <App />
       </Contextshare>

      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
