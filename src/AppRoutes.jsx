import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LoginPage } from './pages/Login'
import { CadastroPage } from './pages/Cadastro'
import { DashboardPage } from './pages/Dashboard'
import { SobrePage } from './pages/Sobre'
import { ContatoPage } from './pages/Contato'
import './App.css'

// Componente para proteger rotas que precisam de autenticação
import { useAuth } from './contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Carregando...</div>;
  }
  
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// Componente para redirecionar usuários já logados
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Carregando...</div>;
  }
  
  return !isAuthenticated() ? children : <Navigate to="/" replace />;
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rota protegida - Dashboard */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Rotas públicas - Login e Cadastro */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          
          <Route 
            path="/cadastro" 
            element={
              <PublicRoute>
                <CadastroPage />
              </PublicRoute>
            } 
          />
          
          {/* Rotas acessíveis a todos */}
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/contato" element={<ContatoPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRoutes
