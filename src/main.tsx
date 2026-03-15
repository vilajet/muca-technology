import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { analytics, logEvent } from './services/firebase'

// Log unhandled JS errors to Firebase Analytics
window.addEventListener('error', (e) => {
  logEvent(analytics, 'js_error', {
    message: e.message,
    source: e.filename,
    line: e.lineno,
  })
})

window.addEventListener('unhandledrejection', (e) => {
  logEvent(analytics, 'js_error', {
    message: e.reason?.message || String(e.reason),
    source: 'unhandled_promise',
  })
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
