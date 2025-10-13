# 🔧 Solucionando "Access Denied" - MongoDB no Windows

## ❌ Erro: "System error 5. Access is denied"

Este erro ocorre quando você tenta iniciar o serviço MongoDB sem privilégios de administrador.

## ✅ Soluções

### Opção 1: PowerShell como Administrador (Recomendado)

1. **Feche o PowerShell atual**
2. **Abra o PowerShell como Administrador:**
   - Pressione `Win + X`
   - Selecione **"Windows PowerShell (Admin)"** ou **"Terminal (Admin)"**
   - Ou: Pesquise "PowerShell" no menu iniciar → Clique com botão direito → "Executar como administrador"

3. **Execute o comando:**
   ```powershell
   net start MongoDB
   ```

### Opção 2: Prompt de Comando como Administrador

1. **Pressione `Win + X`**
2. Selecione **"Prompt de Comando (Admin)"**
3. Execute:
   ```cmd
   net start MongoDB
   ```

### Opção 3: Verificar se o MongoDB está instalado como serviço

```powershell
# Verificar se o serviço existe
Get-Service -Name MongoDB -ErrorAction SilentlyContinue

# Listar todos os serviços com "mongo"
Get-Service | Where-Object {$_.Name -like "*mongo*"}
```

Se não aparecer nada, o MongoDB pode não estar instalado como serviço.

### Opção 4: Instalar MongoDB como Serviço do Windows

Se o MongoDB não estiver instalado como serviço:

1. **Abra PowerShell como Administrador**

2. **Navegue até a pasta do MongoDB:**
   ```powershell
   cd "C:\Program Files\MongoDB\Server\7.0\bin"
   ```
   *(Ajuste a versão se diferente)*

3. **Instale como serviço:**
   ```powershell
   .\mongod.exe --install --serviceName MongoDB --serviceDisplayName "MongoDB Server" --dbpath "C:\data\db" --logpath "C:\data\log\mongod.log"
   ```

4. **Crie as pastas necessárias (se não existirem):**
   ```powershell
   New-Item -ItemType Directory -Force -Path "C:\data\db"
   New-Item -ItemType Directory -Force -Path "C:\data\log"
   ```

5. **Inicie o serviço:**
   ```powershell
   net start MongoDB
   ```

### Opção 5: Iniciar MongoDB Manualmente (Sem Serviço)

Se não quiser usar como serviço:

1. **Abra PowerShell (não precisa ser admin)**

2. **Navegue até a pasta bin do MongoDB:**
   ```powershell
   cd "C:\Program Files\MongoDB\Server\7.0\bin"
   ```

3. **Execute o MongoDB diretamente:**
   ```powershell
   .\mongod.exe --dbpath "C:\data\db"
   ```

4. **Deixe este terminal aberto** enquanto usa o MongoDB

5. **Para parar:** `Ctrl + C` no terminal

### Opção 6: Usar MongoDB Compass para Iniciar

1. Abra o **MongoDB Compass**
2. Tente conectar em `mongodb://localhost:27017`
3. Se aparecer erro, o Compass pode oferecer iniciar o MongoDB

## 🎯 Solução Rápida para Desenvolvimento

Para desenvolvimento, a maneira mais simples:

**PowerShell comum (sem admin):**

```powershell
# Navegar até o MongoDB
cd "C:\Program Files\MongoDB\Server\7.0\bin"

# Iniciar MongoDB (deixar terminal aberto)
.\mongod.exe
```

**Em outro terminal, execute seu projeto normalmente.**

## ✅ Verificar se MongoDB está rodando

### Via PowerShell:
```powershell
# Testar conexão
mongosh --eval "db.version()"
```

### Via Browser:
Acesse: http://localhost:27017
- Se aparecer uma mensagem do MongoDB, está rodando! ✅

### Via MongoDB Compass:
1. Abra o Compass
2. Conecte: `mongodb://localhost:27017`
3. Se conectar, está rodando! ✅

## 📝 Configuração Recomendada para Desenvolvimento

### 1. MongoDB como Serviço (Melhor para longo prazo)

**Vantagens:**
- ✅ Inicia automaticamente com o Windows
- ✅ Roda em background
- ✅ Não precisa terminal aberto

**Configuração:**
1. PowerShell como Admin
2. Instalar como serviço (Opção 4 acima)
3. Configurar inicialização automática:
   ```powershell
   Set-Service -Name MongoDB -StartupType Automatic
   ```

### 2. MongoDB Manual (Mais simples para começar)

**Vantagens:**
- ✅ Não precisa privilégios admin
- ✅ Fácil de parar/reiniciar
- ✅ Ver logs diretamente

**Uso:**
```powershell
# Terminal 1: MongoDB
cd "C:\Program Files\MongoDB\Server\7.0\bin"
.\mongod.exe

# Terminal 2: Backend Spring Boot
cd C:\TEIA_lucas\sitebackend
.\mvnw spring-boot:run

# Terminal 3: Frontend React
cd C:\TEIA_lucas
npm run dev
```

## 🔍 Localização Comum do MongoDB

Caminhos típicos de instalação:
- `C:\Program Files\MongoDB\Server\7.0\bin`
- `C:\Program Files\MongoDB\Server\6.0\bin`
- `C:\MongoDB\Server\7.0\bin`

## ⚠️ Troubleshooting

### "mongod" não é reconhecido
Adicione o MongoDB ao PATH do Windows:

1. Pesquise "Variáveis de ambiente" no Windows
2. Edite "Path" nas variáveis do sistema
3. Adicione: `C:\Program Files\MongoDB\Server\7.0\bin`
4. Reinicie o terminal

### Porta 27017 já em uso
```powershell
# Ver o que está usando a porta
netstat -ano | findstr :27017

# Matar processo (substitua PID)
taskkill /PID [numero] /F
```

### Erro de permissão em C:\data\db
```powershell
# Criar pasta com permissões corretas
New-Item -ItemType Directory -Force -Path "C:\data\db"
New-Item -ItemType Directory -Force -Path "C:\data\log"
```

## 📚 Resumo das Opções

| Método | Precisa Admin? | Auto-inicia? | Melhor para |
|--------|----------------|--------------|-------------|
| Serviço Windows | ✅ Sim (só 1x) | ✅ Sim | Produção/Uso diário |
| Manual (mongod.exe) | ❌ Não | ❌ Não | Desenvolvimento/Teste |
| MongoDB Compass | ❌ Não | ❌ Não | Visualização apenas |

## 🎯 Recomendação

**Para começar agora:**
1. Abra PowerShell (comum)
2. Execute: `cd "C:\Program Files\MongoDB\Server\7.0\bin"`
3. Execute: `.\mongod.exe`
4. Deixe rodando e use outros terminais

**Para uso contínuo:**
1. Configure como serviço (uma vez)
2. Use `net start MongoDB` com admin quando necessário
