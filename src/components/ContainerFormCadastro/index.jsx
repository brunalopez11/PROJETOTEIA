import React from 'react'
import { Link } from 'react-router-dom'

export const ContainerFormCadastro = () => {
  return (
     <main class="login-main">
    <div class="login-container">
      <div class="login-form-section cadastro-form-section">
        <div class="login-form-container">
          <h2>Crie sua Conta</h2>
          <form class="login-form" id="cadastroForm">
            <div class="form-group">
              <label for="nome">Nome Completo:</label>
              <input type="text" id="nome" name="nome" required/>
            </div>
            
            <div class="form-group">
              <label for="cpf">CPF:</label>
              <input type="text" id="cpf" name="cpf" required maxlength="11" placeholder="Apenas números"/>
              <span class="error-message" id="cpfError"></span>
            </div>
            
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required/>
              <span class="error-message" id="emailError"></span>
            </div>
            
            <div class="form-group">
              <label for="senha">Senha:</label>
              <input type="password" id="senha" name="senha" required/>
              <span class="error-message" id="senhaError"></span>
            </div>
            
            <button type="submit" class="login-button" id="cadastroButton">Cadastrar</button>
          </form>
          
          <div class="signup-link">
            <p>Já tem uma conta? <Link to="/login">Faça login aqui</Link></p>
          </div>
        </div>
      </div>
    </div>
  </main>
  )
}
