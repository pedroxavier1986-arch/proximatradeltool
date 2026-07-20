// ==========================================
// SUPABASE INTEGRATION - MAIN.JS
// ==========================================

// SUPABASE CONFIG - Lê de variáveis de ambiente (Vercel) ou fallback
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://snintnntzvgantlcbmhy.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuaW50bm50enZnYW50bGNibWh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1MjM1NTgsImV4cCI6MjEwMDA5OTU1OH0.3Pg1BFi814f6bL93hXIEUOINoFl4XgCEhp6DbZjxzZs';

// APP PASSWORD
window.APP_PASSWORD = import.meta.env.VITE_APP_PASSWORD || 'proxima2026';

// Inicializar Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// STATE
let currentUser = null;
let organizations = [];
let projects = [];
let selectedOrgId = null;
let selectionStep = 'org'; // 'org' or 'project'

// ==========================================
// AUTH FUNCTIONS
// ==========================================

async function handleSupabaseLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    showAuthError('Preencha email e senha');
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    currentUser = data.user;
    document.getElementById('login-overlay').classList.add('hidden');
    loadOrganizations();
    showSelectionModal();
  } catch (err) {
    showAuthError(err.message);
  }
}

async function handleSupabaseLogout() {
  await supabase.auth.signOut();
  currentUser = null;
  selectedOrgId = null;
  selectionStep = 'org';
  document.getElementById('login-overlay').classList.remove('hidden');
  document.getElementById('selection-overlay').classList.add('hidden');
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
}

function showAuthError(message) {
  const errorDiv = document.getElementById('auth-error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }
}

// ==========================================
// SELECTION FUNCTIONS
// ==========================================

async function loadOrganizations() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', currentUser.id);

    if (error) throw error;

    projects = data || [];
    organizations = [...new Set(projects.map(p => p.organization))].filter(Boolean);
    
    if (organizations.length === 0) {
      // Se não há organizações, cria a primeira
      showCreateOrgModal();
    } else {
      showSelectionModal();
    }
  } catch (err) {
    showAuthError('Erro ao carregar organizações: ' + err.message);
  }
}

function showSelectionModal() {
  const overlay = document.getElementById('selection-overlay');
  const list = document.getElementById('selection-list');
  const title = document.getElementById('selection-title');

  overlay.classList.remove('hidden');

  if (selectionStep === 'org') {
    title.textContent = 'Selecione a Empresa';
    list.innerHTML = organizations.map(org => `
      <label class="selection-item">
        <input type="radio" name="selection" value="${org}" onchange="selectOrg('${org}')">
        ${org}
      </label>
    `).join('');
  } else {
    const orgProjects = projects.filter(p => p.organization === selectedOrgId);
    title.textContent = 'Selecione o Projeto';
    list.innerHTML = orgProjects.map(p => `
      <label class="selection-item">
        <input type="radio" name="selection" value="${p.id}" onchange="selectProject('${p.id}')">
        ${p.name}
      </label>
    `).join('');
  }
}

function selectOrg(org) {
  selectedOrgId = org;
  selectionStep = 'project';
  showSelectionModal();
}

function selectProject(projectId) {
  // Carrega o projeto selecionado
  const project = projects.find(p => p.id === projectId);
  if (project) {
    // Aqui você carregaria o projeto e mostraria a app
    console.log('Projeto selecionado:', project);
    document.getElementById('selection-overlay').classList.add('hidden');
    // Chamar função para carregar a ferramenta Trade Tool
  }
}

function proceedSelection() {
  if (selectionStep === 'org' && selectedOrgId) {
    selectionStep = 'project';
    showSelectionModal();
  }
}

function showCreateOrgModal() {
  alert('Nenhuma organização encontrada. Por favor, crie uma.');
}

// ==========================================
// INIT
// ==========================================

window.handleSupabaseLogin = handleSupabaseLogin;
window.handleSupabaseLogout = handleSupabaseLogout;
window.selectOrg = selectOrg;
window.selectProject = selectProject;
window.proceedSelection = proceedSelection;

console.log('✅ Supabase integrado com sucesso');
