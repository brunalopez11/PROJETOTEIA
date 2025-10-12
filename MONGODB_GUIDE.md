# 🍃 Guia MongoDB - Projeto Teia

## 📦 Instalação

### Windows
1. **MongoDB Community Server** já instalado ✅
2. **MongoDB Compass** já instalado ✅

## 🚀 Iniciando o MongoDB

### Como Serviço do Windows
```powershell
# Iniciar serviço
net start MongoDB

# Parar serviço
net stop MongoDB

# Verificar status
sc query MongoDB
```

### Verificar se está rodando
```bash
mongosh --eval "db.version()"
```

## 🗄️ Estrutura do Banco

### Banco de Dados: `teia_db`
### Collection: `candidatos`

**Estrutura do Documento:**
```json
{
  "_id": "ObjectId gerado automaticamente",
  "candidato_id": "String (ID convertido)",
  "nome": "Nome Completo",
  "cpf": "12345678901",
  "email": "email@exemplo.com",
  "senha": "senha123"
}
```

**Índices Únicos:**
- `email` (único)
- `cpf` (único)

## 💻 Comandos Úteis

### Via MongoDB Compass (Interface Gráfica)

1. **Conectar:**
   - URI: `mongodb://localhost:27017`
   - Clique em "Connect"

2. **Visualizar dados:**
   - Navegue até: `teia_db` > `candidatos`
   - Clique em "Documents"

3. **Filtrar:**
   ```json
   { "email": "exemplo@email.com" }
   ```

### Via Terminal (mongosh)

```bash
# Abrir shell do MongoDB
mongosh

# Listar bancos
show dbs

# Usar banco teia_db
use teia_db

# Listar collections
show collections

# Ver todos os candidatos
db.candidatos.find().pretty()

# Contar documentos
db.candidatos.countDocuments()

# Buscar por email
db.candidatos.find({ email: "exemplo@email.com" })

# Buscar por CPF
db.candidatos.find({ cpf: "12345678901" })

# Ver apenas alguns campos
db.candidatos.find({}, { nome: 1, email: 1, _id: 0 })

# Deletar um candidato
db.candidatos.deleteOne({ email: "exemplo@email.com" })

# Deletar todos (CUIDADO!)
db.candidatos.deleteMany({})

# Ver índices
db.candidatos.getIndexes()

# Estatísticas da collection
db.candidatos.stats()
```

## 🔍 Queries Avançadas

```bash
# Buscar candidatos com nome que contém "João"
db.candidatos.find({ nome: { $regex: "João", $options: "i" } })

# Buscar vários emails
db.candidatos.find({ email: { $in: ["email1@test.com", "email2@test.com"] } })

# Atualizar senha de um candidato
db.candidatos.updateOne(
  { email: "exemplo@email.com" },
  { $set: { senha: "novaSenha123" } }
)

# Adicionar campo novo a todos
db.candidatos.updateMany(
  {},
  { $set: { ativo: true } }
)
```

## 🛠️ Manutenção

### Backup
```bash
# Backup completo do banco
mongodump --db teia_db --out ./backup

# Backup de uma collection específica
mongodump --db teia_db --collection candidatos --out ./backup
```

### Restore
```bash
# Restaurar backup
mongorestore --db teia_db ./backup/teia_db
```

### Limpar dados de teste
```bash
mongosh
use teia_db
db.candidatos.deleteMany({})
```

## 📊 Monitoramento

### Ver logs do MongoDB
```powershell
# Windows - Log padrão
C:\Program Files\MongoDB\Server\7.0\log\mongod.log
```

### Status do servidor
```bash
mongosh --eval "db.serverStatus()"
```

## ⚠️ Troubleshooting

### Serviço não inicia
```powershell
# Verificar se a porta 27017 está disponível
netstat -ano | findstr :27017

# Reiniciar serviço
net stop MongoDB
net start MongoDB
```

### Erro de conexão no Spring Boot
1. Verifique se MongoDB está rodando
2. Confirme a porta: `27017`
3. Verifique `application.properties`:
   ```properties
   spring.data.mongodb.host=localhost
   spring.data.mongodb.port=27017
   spring.data.mongodb.database=teia_db
   ```

### Limpar cache/locks
```bash
# Se o MongoDB não iniciar, pode precisar remover locks
# Caminho comum: C:\data\db\mongod.lock
```

## 📚 Recursos

- [Documentação MongoDB](https://docs.mongodb.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [Spring Data MongoDB](https://spring.io/projects/spring-data-mongodb)

## 🎯 Integração com o Projeto

O Spring Boot se conecta automaticamente ao MongoDB usando as configurações em `application.properties`. Os dados são persistidos e não são perdidos ao reiniciar o servidor (diferente do H2).

**Vantagens:**
✅ Dados persistentes
✅ Schema flexível
✅ Performance excelente
✅ Escalabilidade
✅ Queries poderosas
