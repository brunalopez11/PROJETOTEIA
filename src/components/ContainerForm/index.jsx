import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { candidatoAPI } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'

export const ContainerForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await candidatoAPI.login({ email, senha });

      if (response.success && response.data.success) {
        // Salvar dados do usuário usando o AuthContext
        login(response.data.data);
        
        // Mostrar mensagem de sucesso
        setMessage({ text: response.data.message, type: 'success' });
        
        // Limpar formulário
        setEmail('');
        setSenha('');
        
        // Redirecionar para dashboard após 1 segundo
        setTimeout(() => {
          navigate('/area-aluno');
        }, 1000);
      } else {
        // Tratar erro retornado pelo backend
        setMessage({ 
          text: response.data?.message || 'Email ou senha incorretos', 
          type: 'error' 
        });
      }
    } catch (error) {
      setMessage({ 
        text: error.message || 'Erro de conexão. Verifique se o servidor está rodando.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <div className="login-container">
        <div className="login-form-section">
          <div className="login-form-container">
            <h2>Faça seu Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="senha">Senha:</label>
                <input 
                  type="password" 
                  id="senha" 
                  name="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              {message.text && (
                <div className={`form-message ${message.type}`}>
                  {message.text}
                </div>
              )}
              
              <button 
                type="submit" 
                className="login-button" 
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Logar'}
              </button>
            </form>
            
            <div className="signup-link">
              <p>Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
