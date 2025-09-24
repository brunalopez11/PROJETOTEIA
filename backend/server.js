const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..'))); // Serve arquivos estáticos da pasta pai

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ajuste conforme seu usuário MySQL
  password: 'root', // Ajuste conforme sua senha MySQL
  database: 'teia'
});

// Conectar ao banco
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para cadastro
app.post('/api/cadastro', (req, res) => {
  const { nome, cpf, email, senha } = req.body;

  // Limpar e padronizar CPF (remover qualquer formatação, manter apenas números)
  const cpfLimpo = cpf.replace(/\D/g, '');

  // Verificar se já existe usuário com o mesmo email ou CPF
  const checkQuery = 'SELECT * FROM candidato WHERE email = ? OR cpf = ?';
  
  db.query(checkQuery, [email, cpfLimpo], (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }

    if (results.length > 0) {
      // Verificar se é email ou CPF duplicado
      const emailExists = results.some(user => user.email === email);
      const cpfExists = results.some(user => user.cpf === cpfLimpo);
      
      let message = 'Já existe um usuário com ';
      if (emailExists && cpfExists) {
        message += 'este email e CPF';
      } else if (emailExists) {
        message += 'este email';
      } else {
        message += 'este CPF';
      }
      
      return res.status(400).json({ 
        success: false, 
        message: message 
      });
    }

    // Inserir novo usuário (usando campos existentes na tabela)
    const insertQuery = `
      INSERT INTO candidato (nome, cpf, email, senha) 
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      nome,
      cpfLimpo, // CPF limpo como string de 11 dígitos
      email,
      senha
    ];

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir usuário:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Erro ao criar conta' 
        });
      }

      res.json({ 
        success: true, 
        message: 'Conta criada com sucesso!',
        userId: result.insertId 
      });
    });
  });
});

// Rota para login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM candidato WHERE email = ?';
  
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Erro interno do servidor' 
      });
    }

    if (results.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email não encontrado' 
      });
    }

    const user = results[0];
    
    // Verificar se a senha está correta
    if (user.senha !== senha) {
      return res.status(400).json({ 
        success: false, 
        message: 'Senha incorreta' 
      });
    }
    
    // Login bem-sucedido
    return res.json({ 
      success: true, 
      message: 'Login realizado com sucesso!',
      user: {
        id: user.id_candidato,
        nome: user.nome,
        email: user.email
      }
    });
  });
});

// Rota para servir as páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'login.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'cadastro.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
