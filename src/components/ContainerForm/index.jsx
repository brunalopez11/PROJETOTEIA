import React from 'react'
import { Link } from 'react-router-dom'

export const ContainerForm = () => {
  return (
    <main className="login-main">
    <div className="login-container">
      <div className="login-form-section">
        <div className="login-form-container">
          <h2>Faça seu Login</h2>
          <form className="login-form" id="loginForm">
            <div className="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required/>
            </div>
            
            <div className="form-group">
              <label for="senha">Senha:</label>
              <input type="password" id="senha" name="senha" required/>
            </div>
            
            <button type="submit" className="login-button" id="loginButton">Logar</button>
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
