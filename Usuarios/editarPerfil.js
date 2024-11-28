document.addEventListener('DOMContentLoaded', () => {
  const queryParams = new URLSearchParams(window.location.search);
  const index = queryParams.get('index');
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios[index];

  if (usuario) {
      const form = document.getElementById('editForm');
      form.elements['Id'].value = usuario.id;
      form.elements['criadoEm'].value = usuario.criadoEm;
      form.elements['email'].value = usuario.email;
      form.elements['nome'].value = usuario.nome;
      form.elements['status'].value = usuario.status;
      form.elements['funcao'].value = usuario.funcao;

      form.addEventListener('submit', (event) => {
          event.preventDefault();

          usuario.id = form.elements['Id'].value;
          usuario.criadoEm = form.elements['criadoEm'].value;
          usuario.email = form.elements['email'].value;
          usuario.nome = form.elements['nome'].value;
          usuario.status = form.elements['status'].value;
          usuario.funcao = form.elements['funcao'].value;

          usuarios[index] = usuario;
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
          alert('Perfil atualizado!');
          window.location.href = '../Usuarios/usuarios.html';
      });
  }
});