# Teia Backend - Spring Boot

Este é o backend da aplicação **Teia**, desenvolvido em Spring Boot para gerenciar candidatos e sistema de login.

## 🚀 Como executar o projeto

### Pré-requisitos
- **Java 17** ou superior
- **Maven** (ou use o wrapper incluído)

### 1. Executar o backend
```bash
# Opção 1: Usando Maven Wrapper (recomendado)
./mvnw spring-boot:run

# Opção 2: Usando Maven instalado
mvn spring-boot:run

# Opção 3: Windows (PowerShell)
.\mvnw.cmd spring-boot:run
```

O servidor iniciará na **porta 8080**: `http://localhost:8080`

### 2. Verificar se está funcionando
Acesse: `http://localhost:8080/candidato`
- Deve retornar uma lista vazia `[]` (inicialmente)

## 🗄️ Banco de Dados H2

### Acessar o Console H2
1. Com o servidor rodando, acesse: `http://localhost:8080/h2-console`
2. Configure a conexão:
   - **JDBC URL**: `jdbc:h2:mem:testdb`
   - **User Name**: `sa`
   - **Password**: *(deixe vazio)*
3. Clique em **Connect**

### Visualizar dados
```sql
-- Ver todos os candidatos
SELECT * FROM candidato;

-- Ver estrutura da tabela
SHOW COLUMNS FROM candidato;
```

## 📡 Endpoints da API

### Candidatos
- **GET** `/candidato` - Listar todos os candidatos
- **POST** `/candidato` - Cadastrar novo candidato
- **POST** `/candidato/login` - Fazer login

### Exemplos de uso

#### Cadastrar candidato
```bash
curl -X POST http://localhost:8080/candidato \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "12345678901",
    "email": "joao@email.com",
    "senha": "MinhaSenh@123"
  }'
```

#### Fazer login
```bash
curl -X POST http://localhost:8080/candidato/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "senha": "MinhaSenh@123"
  }'
```

## 🎯 Frontend Integration

O frontend deve fazer requisições para:
- **Cadastro**: `http://localhost:8080/candidato`
- **Login**: `http://localhost:8080/candidato/login`

**CORS** está configurado para aceitar requisições de:
- `localhost:3000`, `localhost:5000`, `localhost:5500`, `localhost:8000`
- Protocolo `file://` (arquivos locais)

## 📁 Estrutura do Projeto

```
src/main/java/com/teia/sitebackend/
├── controller/
│   └── CandidatoController.java    # Endpoints REST
├── model/
│   └── Candidato.java              # Entidade JPA
├── repository/
│   └── CandidatoRepository.java    # Interface de dados
├── service/
│   └── CandidatoService.java       # Lógica de negócio
├── dto/
│   ├── LoginRequest.java           # DTO para login
│   └── ApiResponse.java            # DTO para respostas
├── config/
│   └── CorsConfig.java             # Configuração CORS
└── SitebackendApplication.java     # Classe principal
```

## 🔧 Configurações (application.properties)

```properties
# Porta do servidor
server.port=8080

# H2 Database
spring.h2.console.enabled=true
spring.datasource.url=jdbc:h2:mem:testdb

# Thymeleaf
spring.thymeleaf.cache=false
```

## 🐛 Solução de Problemas

### Erro de porta em uso
Se a porta 8080 estiver ocupada:
```bash
# Verificar processos usando a porta
netstat -ano | findstr :8080

# Ou alterar a porta no application.properties
server.port=8081
```

### Erro de Java
Verificar versão do Java:
```bash
java -version
```

### CORS bloqueado
Verificar se o frontend está rodando em uma das portas configuradas no `CorsConfig.java`.

## 📝 Notas Importantes

- **Banco H2**: Os dados são perdidos ao reiniciar o servidor (banco em memória)
- **Senhas**: Atualmente armazenadas em texto plano (implementar hash em produção)
- **Validações**: Email e CPF únicos são validados automaticamente
- **Logs**: Acompanhe o console para debug durante desenvolvimento

## 🤝 Para desenvolvedores

### Adicionando novos endpoints
1. Criar método no `CandidatoController.java`
2. Implementar lógica no `CandidatoService.java`
3. Adicionar consultas no `CandidatoRepository.java` se necessário

### Testando mudanças
Reinicie o servidor após alterações no código Java:
- `Ctrl+C` para parar
- `./mvnw spring-boot:run` para reiniciar