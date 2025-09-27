import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { store } from './app/store.ts'
import './index.css'
import ThemeProvider from './ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
    </Provider>
    
  </StrictMode>,
)
