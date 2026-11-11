// Chave onde a sessão do usuário é salva no navegador (LocalStorage)
const SESSION_KEY = 'usuario_sessao';

// E-mail e senha permitidos para entrar (apenas para o protótipo)
const EMAIL_OK = 'console.log220@gmail.com';
const SENHA_OK = 'adm26pt@';

// Isso serve para mostrar ou esconder uma mensagem de erro na tela
// Se a mensagem for vazia, o erro some
function showError(el, message = '') {
  el.textContent = message;
  el.hidden = !message;
}

// Isso faz o botão "Mostrar / Ocultar" trocar o tipo do campo de senha
document.addEventListener('click', (e) => {
  // Verifica se o clique foi no botão de mostrar senha
  const btn = e.target.closest('[data-action="toggle-login-password"]');
  if (!btn) return;

  const input = document.getElementById('senha');
  const show = input.type === 'password';

  // Alterna entre texto visível e senha escondida
  input.type = show ? 'text' : 'password';
  // Altera o texto do botão
  btn.textContent = show ? 'Ocultar' : 'Mostrar';
});

// Isso modifica o comportamento do formulário ao clicar em "Entrar"
const form = document.getElementById('login-form');
form?.addEventListener('submit', (e) => {
  // Evita que a página recarregue sozinha ao enviar
  e.preventDefault();

  const email = form.email.value.trim();

  // Guarda os lugares da tela onde os erros aparecem
  const errors = {
    email: form.querySelector('[data-error="email"]'),
    senha: form.querySelector('[data-error="senha"]'),
    form: form.querySelector('[data-error="form"]'),
  };

  // Confere o e-mail e a senha (se estiver certo, o erro some)
  showError(errors.email, email !== EMAIL_OK && 'E-mail não cadastrado.');
  showError(errors.senha, form.senha.value !== SENHA_OK && 'Senha incorreta.');
  showError(errors.form);

  // Se algum erro estiver visível, para aqui e não faz login
  if (!errors.email.hidden || !errors.senha.hidden) return;

  // Salva os dados do usuário no navegador
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      nome: 'Administrador',
      email,
      logadoEm: new Date().toISOString(),
    }));
  } catch {
    showError(errors.form, 'Erro ao salvar a sessão no navegador.');
    return;
  }

  // Abre a próxima página (dashboard)
  window.location.href = 'dashboard.html';
});
