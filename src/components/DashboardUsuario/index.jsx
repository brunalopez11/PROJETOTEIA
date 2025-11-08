import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export const DashboardUsuario = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      logout();
      navigate('/login');
    }
  };

  const formatCpf = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Seção de boas-vindas */}
          <section className="welcome-section">
            <h1>Bem-vindo, {user.nome.split(' ')[0]}!</h1>
            <p className="welcome-text">Este é seu painel de controle pessoal na Teia.</p>
          </section>

          {/* Cards do dashboard */}
          <div className="dashboard-grid">
            {/* Card de Informações Pessoais */}
            <div className="dashboard-card">
              <div className="card-header">
                <h2>Suas Informações</h2>
              </div>
              <div className="card-content">
                <div className="info-row">
                  <span className="info-label">Nome:</span>
                  <span className="info-value">{user.nome}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">CPF:</span>
                  <span className="info-value">{formatCpf(user.cpf)}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">ID:</span>
                  <span className="info-value">{user.candidato_id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botão de logout */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              onClick={handleLogout}
              className="login-button"
              style={{ maxWidth: '200px' }}
            >
              Sair
            </button>
          </div>
        </div>
      </main>

      <footer>
        <p>© 2025 Teia - Inovando por um futuro brilhante!</p>
      </footer>
    </>
  );
};
