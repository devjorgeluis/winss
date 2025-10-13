import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContextProvider from './AppContext.jsx'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './css/swiper.bundle.min.css'
import './css/vuetify.min.css'
import './css/Profile.css'
import './css/Winss.css'
import './css/Home.css'
import './css/Lobby.css'
import './css/Halloween.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AppContextProvider>
      <App className="normal-mode app-mode"/>
    </AppContextProvider>
  // </StrictMode>
)
