# Trade Tool - Deployment Guide

## Arquivos necessários:

- ✅ `index.html` - Aplicação com `import.meta.env`
- ✅ `vite.config.js` - Configuração de build
- ✅ `package.json` - Dependências e scripts
- ✅ `.gitignore` - Exclui `node_modules` e `.env.local`

## Setup no GitHub:

1. **Clone ou crie o repositório**
   ```bash
   git clone seu-repo
   cd seu-repo
   ```

2. **Coloca os arquivos:**
   - `index.html`
   - `vite.config.js`
   - `package.json`
   - `.gitignore` (já deve ter)

3. **Commit e Push:**
   ```bash
   git add .
   git commit -m "Deploy seguro com Vite"
   git push origin main
   ```

## Setup no Vercel:

1. **Vai em:** https://vercel.com/dashboard
2. **Clica em "New Project"**
3. **Seleciona seu repositório GitHub** (proximatradelool)
4. **Preenche os campos:**
   - Project Name: `proximatradelool`
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Na seção "Environment Variables", adiciona:**
   ```
   VITE_SUPABASE_URL = https://snintnntzvgantlcbmhy.supabase.co
   VITE_SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuaW50bm50enZnYW50bGNibWh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1MjM1NTgsImV4cCI6MjEwMDA5OTU1OH0.3Pg1BFi814f6bL93hXIEUOINoFl4XgCEhp6DbZjxzZs
   VITE_APP_PASSWORD = proxima2026
   ```

6. **Clica "Deploy"**

## O que acontece:

1. ✅ Vercel detecta o `vite.config.js`
2. ✅ Roda `npm run build`
3. ✅ Vite injeta as variáveis de ambiente
4. ✅ Arquivo final fica **seguro** (sem credenciais expostas)
5. ✅ Deploy ao vivo

## Resultado:

- 🔒 Credenciais **NUNCA** são commitadas ao GitHub
- 🔒 Credenciais **NUNCA** aparecem no código-fonte público
- 🔒 Arquivo final é seguro mesmo se alguém abrir DevTools
- ✅ Funciona 100% no Vercel

---

**Pronto! Agora é seguro e funciona.** 🚀
