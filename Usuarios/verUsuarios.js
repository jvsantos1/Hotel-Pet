document.addEventListener('DOMContentLoaded', () => {
  const queryParams = new URLSearchParams(window.location.search);
  const index = queryParams.get('index');
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios[index];

  if (usuario) {
      document.getElementById('usuario-email').textContent = usuario.email;
      document.getElementById('usuario-nome').textContent = usuario.nome;
      document.getElementById('usuario-status').textContent = usuario.status;
      document.getElementById('usuario-funcao').textContent = usuario.funcao;
      document.getElementById('usuario-criadoEm').textContent = usuario.criadoEm;

      const imagemUsuario = document.getElementById('usuario-imagem');
      imagemUsuario.src = usuario.imagem || 'perfil.png';
      imagemUsuario.alt = 'Imagem do Usuário';
  }
});