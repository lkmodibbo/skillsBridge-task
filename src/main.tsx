import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Providers } from './app/Providers'
import { AppRouter } from './routes/AppRouter'
import './styles/globals.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found. Make sure index.html has <div id="root">.')
}

createRoot(rootElement).render(
  <StrictMode>
    <Providers>
      <AppRouter />
    </Providers>
  </StrictMode>,
)
