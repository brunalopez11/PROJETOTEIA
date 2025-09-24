# TEIA - Backend Setup

## Pré-requisitos
1. **Node.js** instalado (versão 14 ou superior)
2. **MySQL** rodando localmente
3. **Banco de dados** incluído em TEIA/db_teia.sql

## Instalação e Execução

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Configurar banco de dados
- Abra o arquivo `backend/server.js`
- Ajuste as credenciais do MySQL (usuário e senha) na seção:
```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Seu usuário MySQL
  password: '', // Sua senha MySQL
  database: 'teia'
});
```

### 3. Executar o servidor
```bash
npm start
```
ou para desenvolvimento (reinicia automaticamente):
```bash
npm run dev
```

### 4. Acessar a aplicação
Abra o navegador em: `http://localhost:3000`

## Estrutura
- **Frontend:** Arquivos HTML, CSS e JS na pasta raiz
- **Backend:** Pasta `backend/` com servidor Node.js
- **API Endpoints:**
  - `POST /api/cadastro` - Criar nova conta
  - `POST /api/login` - Fazer login