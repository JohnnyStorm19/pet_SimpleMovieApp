import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={'pet-simple-movie-app.vercel.app'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
