// Função de validação do login
function validarLogin(event) {
  event.preventDefault(); // Evitar o envio padrão do formulário

  // Pegando os dados do formulário
  const login = document.getElementById("nome").value; // Campo "login"
  const senha = document.getElementById("password").value; // Campo "senha"

  // Dados fictícios de login para cliente, funcionário e gerente
  const usuarios = {
    gerente: { login: "joao", senha: "123456", role: "gerente" },
  };

  // Verificar se os dados de login existem
  const usuarioAutenticado = Object.values(usuarios).find(
    (user) => user.login === login && user.senha === senha
  );

  if (!usuarioAutenticado) {
    alert("Usuário ou senha incorretos.");
  } else {
    // Armazenar o usuário logado no localStorage para uso em outras páginas
    localStorage.setItem("usuario", JSON.stringify(usuarioAutenticado));

    alert("Login realizado com sucesso!");

    // Redireciona para a página principal dependendo do tipo de usuário
    const redirecionamentos = {
      gerente: "../Nav/nav.html", // Página do Gerente
    };

    window.location.href = redirecionamentos[usuarioAutenticado.role];
  }
}

// Adicionar o evento de submit ao formulário após o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  if (form) {
    form.addEventListener("submit", validarLogin); // Conecta o evento ao formulário
  }
});
