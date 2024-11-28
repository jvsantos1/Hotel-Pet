document.addEventListener("DOMContentLoaded", () => {
    // Obtém o índice do pet a partir da URL
    const urlParams = new URLSearchParams(window.location.search);
    const index = parseInt(urlParams.get("index"));
    
    if (isNaN(index)) {
        alert("Pet não encontrado.");
        window.location.href = "/pets/pets.html";
        return;
    }

    // Carrega os dados do pet a ser editado
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    const pet = pets[index];

    if (!pet) {
        alert("Pet não encontrado.");
        window.location.href = "/Pets/pets.html";
        return;
    }

    // Preenche o formulário com os dados do pet
    document.querySelector("#Nome").value = pet.nome;
    document.querySelector("#tipo").value = pet.tipo;
    document.querySelector("#tamanho").value = pet.tamanho;
    document.querySelector("#raca").value = pet.raca;

    const imagemPet = document.querySelector("#imagem_pet");
    
    if (pet.imagem) {
        const imgPreview = document.createElement("img");
        imgPreview.src = pet.imagem;
        imgPreview.alt = "Imagem do Pet";
        imgPreview.style.maxWidth = "100px"; // Tamanho da imagem
        document.querySelector("#image-preview").appendChild(imgPreview);
    }

    // Salva as alterações do pet no localStorage
    const formulario = document.querySelector("form");
    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.querySelector("#Nome").value.trim();
        const tipo = document.querySelector("#tipo").value.trim();
        const tamanho = document.querySelector("#tamanho").value.trim();
        const raca = document.querySelector("#raca").value.trim();  
        const imagemInput = document.querySelector("#imagem_pet");

        if (!nome || !tipo || !tamanho || !raca) {
            alert("Por favor, preencha todos os campos obrigatórios (*)!");
            return;
        }

        const imagemURL = imagemInput.files[0] ? URL.createObjectURL(imagemInput.files[0]) : pet.imagem;

        const updatedPet = {
            nome,
            tipo,
            tamanho,
            raca,
            imagem: imagemURL
        };

        pets[index] = updatedPet; // Atualiza o pet no array

        localStorage.setItem("pets", JSON.stringify(pets));

        alert("Pet atualizado com sucesso!");
        window.location.href = "/pets/pets.html"; // Redireciona para a página de pets
    });
});