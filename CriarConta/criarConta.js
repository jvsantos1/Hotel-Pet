// Lógica para criar uma conta
const criarContaForm = document.querySelector("#criarContaForm");
criarContaForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Previne o comportamento padrão do envio do formulário

    const nome = document.querySelector("#nome").value;
    const tel = document.querySelector("#tel").value;
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#password").value;

    if (!nome || !tel || !email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExistente = usuarios.find((usuario) => usuario.email === email);
    if (usuarioExistente) {
        alert("Este email já está cadastrado!");
        return;
    }

    // Adicionando o novo usuário
    usuarios.push({ nome, tel, email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Conta criada com sucesso! Você pode fazer login agora.");
    window.location.href = "../Login/index.html"; // Redireciona após criar conta
});
