document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();  // Impede o envio tradicional do formulário

        // Coletando os valores dos campos do formulário
        const proprietario = document.querySelector("#proprietario").value.trim();
        const nome = document.querySelector("#nome").value.trim();
        const tipo = document.querySelector("#tipo").value.trim();
        const tamanho = document.querySelector("#tamanho").value.trim();
        const raca = document.querySelector("#raca").value.trim();  
        const imagemInput = document.querySelector("#imagem_pet");

        // Validação dos campos obrigatórios
        if (!proprietario || !nome || !tipo || !tamanho || !raca) {
            alert("Por favor, preencha todos os campos obrigatórios (*)!");
            return;
        }

        // Logando as variáveis para debug
        console.log("Campos validados! Detalhes do novo pet:", { proprietario, nome, tipo, tamanho, raca });

        // Criando a URL da imagem caso exista uma
        const imagemURL = imagemInput.files[0] ? URL.createObjectURL(imagemInput.files[0]) : null;

        // Criando o objeto para o novo pet
        const novoPet = {
            proprietario,
            nome,
            tipo,
            tamanho,
            raca,
            imagem: imagemURL
        };

        console.log("Novo pet criado:", novoPet);

        // Verificando se existe uma lista de pets no localStorage
        let pets = JSON.parse(localStorage.getItem("pets"));
        if (!pets) {
            pets = [];  // Se não houver, criamos uma nova lista
            console.log("Lista de pets não encontrada. Criando nova lista.");
        }

        // Adicionando o novo pet à lista
        pets.push(novoPet);

        // Salvando a lista de pets no localStorage
        localStorage.setItem("pets", JSON.stringify(pets));
        console.log("Pet salvo com sucesso no localStorage!");

        // Alerta de sucesso
        alert("Pet cadastrado com sucesso!");

        // Redirecionando para a página de Pets
        window.location.href = "Pets.html";

        // Resetando o formulário
        formulario.reset();
    });
});
