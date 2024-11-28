document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#formCadastroUsuario");

  formulario.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.querySelector("#email").value.trim();
      const nome = document.querySelector("#Nome").value.trim();
      const telefone = document.querySelector("#telefone").value.trim();
      const funcao = document.querySelector("#funcao").value.trim();
      const imagemInput = document.querySelector("#imagem_pet");

      if (!email || !telefone) {
          alert("Por favor, preencha os campos obrigatórios (*)!");
          return;
      }

      const imagemURL = imagemInput.files[0] ? URL.createObjectURL(imagemInput.files[0]) : null;

      const novoUsuario = {
          email,
          nome,
          telefone,
          funcao,
          imagem: imagemURL
      };

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.push(novoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Usuário cadastrado com sucesso!");

      window.location.href = "../Usuarios/usuarios.html";

      formulario.reset();
  });
});