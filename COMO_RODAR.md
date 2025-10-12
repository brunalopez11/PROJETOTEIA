# 🚀 Guia de Execução - Projeto Teia

## ⚙️ Pré-requisitos

- **Node.js** 16+ e npm
- **Java** 17+
- **Maven** (ou use o wrapper incluído)

## 🏃 Como rodar o projeto completo

### 1️⃣ Iniciar o Backend (Spring Boot)

```bash
# Navegue até a pasta do backend
cd sitebackend

# Execute o Spring Boot
./mvnw spring-boot:run

# Ou no Windows PowerShell:
.\mvnw.cmd spring-boot:run
```

✅ Backend estará rodando em: **http://localhost:8080**

### 2️⃣ Iniciar o Frontend (React + Vite)

```bash
# Volte para a raiz do projeto
cd ..

# Instale as dependências (primeira vez)
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

✅ Frontend estará rodando em: **http://localhost:5173**

## 📊 Acessos úteis

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Frontend | http://localhost:5173 | Aplicação React |
| Backend API | http://localhost:8080 | API REST |
| H2 Console | http://localhost:8080/h2-console | Banco de dados |
| Endpoint Candidatos | http://localhost:8080/candidato | Lista candidatos |

### 🗄️ Configuração do H2 Console

- **JDBC URL**: `jdbc:h2:mem:testdb`
- **User Name**: `sa`
- **Password**: *(vazio)*

## 🔧 Scripts disponíveis

### Frontend
```bash
npm run dev      # Modo desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
npm run lint     # Verificar código
```

### Backend
```bash
./mvnw spring-boot:run    # Executar aplicação
./mvnw clean install      # Build do projeto
./mvnw test              # Executar testes
```

## 🎯 Fluxo de teste

1. **Inicie backend e frontend**
2. Acesse `http://localhost:5173`
3. Cadastre um novo usuário em `/cadastro`
4. Faça login em `/login`
5. Acesse o dashboard com suas informações

## ⚠️ Solução de problemas

### Porta em uso
Se a porta 8080 ou 5173 estiver ocupada:

```bash
# Windows - verificar porta
netstat -ano | findstr :8080
netstat -ano | findstr :5173

# Matar processo (substitua PID)
taskkill /PID [numero] /F
```

### CORS bloqueado
Certifique-se de que:
1. O backend está rodando
2. O frontend está acessando de `localhost:5173`
3. Reinicie ambos os servidores após mudanças

### Erro de conexão no frontend
Verifique se o backend está rodando em `http://localhost:8080`

## 📁 Estrutura do projeto

```
TEIA_lucas/
├── sitebackend/        # Backend Spring Boot
│   ├── src/
│   └── pom.xml
├── src/                # Frontend React
│   ├── components/
│   ├── pages/
│   ├── services/       # API client
│   └── contexts/       # React Context
├── package.json        # Dependências Node
└── vite.config.js     # Configuração Vite
```

## 🌐 Endpoints da API

### Candidatos
- `GET /candidato` - Listar todos
- `POST /candidato` - Cadastrar
  ```json
  {
    "nome": "João Silva",
    "cpf": "12345678901",
    "email": "joao@email.com",
    "senha": "Senh@123"
  }
  ```
- `POST /candidato/login` - Login
  ```json
  {
    "email": "joao@email.com",
    "senha": "Senh@123"
  }
  ```

## 👥 Equipe

- Ana Luiza
- Bruna Lopez
- Cleverson Amorim
- José Luiz
- Lucas Willians
- Thais Ferreira

---

**💡 Dica**: Mantenha os dois terminais abertos simultaneamente para desenvolvimento!
