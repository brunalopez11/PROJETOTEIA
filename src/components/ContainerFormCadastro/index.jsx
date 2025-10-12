import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { candidatoAPI } from '../../services/api'

export const ContainerFormCadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  // Validação de CPF
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    return true;
  };

  // Validação de Email
  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação de Senha
  const validarSenha = (senha) => {
    const senhaRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return senhaRegex.test(senha);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Remover não-números do CPF
    const finalValue = name === 'cpf' ? value.replace(/\D/g, '') : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    // Validação em tempo real
    const newErrors = { ...errors };
    
    if (name === 'cpf' && finalValue.length > 0) {
      if (!validarCPF(finalValue)) {
        newErrors.cpf = 'CPF deve conter exatamente 11 números';
      } else {
        delete newErrors.cpf;
      }
    }
    
    if (name === 'email' && value.length > 0) {
      if (!validarEmail(value)) {
        newErrors.email = 'Digite um email válido';
      } else {
        delete newErrors.email;
      }
    }
    
    if (name === 'senha' && value.length > 0) {
      if (!validarSenha(value)) {
        newErrors.senha = 'Senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um caractere especial';
      } else {
        delete newErrors.senha;
      }
    }
    
    setErrors(newErrors);
  };

  const isFormValid = () => {
    return (
      formData.nome.trim().length > 0 &&
      validarCPF(formData.cpf) &&
      validarEmail(formData.email) &&
      validarSenha(formData.senha) &&
      Object.keys(errors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setMessage({ text: 'Por favor, corrija os erros no formulário', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await candidatoAPI.cadastrar(formData);

      if (response.success && response.data.success) {
        // Mostrar mensagem de sucesso
        setMessage({ text: response.data.message + ' Redirecionando...', type: 'success' });
        
        // Limpar formulário
        setFormData({
          nome: '',
          cpf: '',
          email: '',
          senha: ''
        });
        setErrors({});
        
        // Redirecionar para login após 1.5 segundos
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        // Tratar erro retornado pelo backend
        setMessage({ 
          text: response.data?.message || 'Erro ao cadastrar. Tente novamente.', 
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
        <div className="login-form-section cadastro-form-section">
          <div className="login-form-container">
            <h2>Crie sua Conta</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome">Nome Completo:</label>
                <input 
                  type="text" 
                  id="nome" 
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cpf">CPF:</label>
                <input 
                  type="text" 
                  id="cpf" 
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  maxLength="11" 
                  placeholder="Apenas números"
                  disabled={loading}
                  required
                />
                {errors.cpf && <span className="error-message">{errors.cpf}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="senha">Senha:</label>
                <input 
                  type="password" 
                  id="senha" 
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                {errors.senha && <span className="error-message">{errors.senha}</span>}
              </div>
              
              {message.text && (
                <div className={`form-message ${message.type}`}>
                  {message.text}
                </div>
              )}
              
              <button 
                type="submit" 
                className="login-button"
                disabled={!isFormValid() || loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </form>
            
            <div className="signup-link">
              <p>Já tem uma conta? <Link to="/login">Faça login aqui</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
