import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CarritoProvider} from './context/CarritoContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import App from './App.jsx'
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
        <App /> 
      </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)