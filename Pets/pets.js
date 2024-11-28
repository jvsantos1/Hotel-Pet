document.addEventListener("DOMContentLoaded", function () { 
    // Função para carregar os pets com filtro
    function loadPets(filter = {}) {
        const pets = JSON.parse(localStorage.getItem("pets")) || [];
        const petsTableBody = document.querySelector("#pets-table-body");
        petsTableBody.innerHTML = "";

        // Filtrando os pets com base nos parâmetros passados
        const filteredPets = pets.filter((pet) => {
            return Object.keys(filter).every((key) => {
                return filter[key] ? pet[key]?.toLowerCase().includes(filter[key].toLowerCase()) : true;
            });
        });

        // Exibindo os pets filtrados
        filteredPets.forEach((pet, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="checkbox" /></td>
                <td>${index + 1}</td>
                <td>${pet.nome}</td>
                <td>${pet.tipo}</td>
                <td>${pet.raca}</td>
                <td>${pet.tamanho}</td>
                <td class="actions">
                    <a href="editarPet.html?index=${index}">Editar</a> | 
                    <a href="visualizarPet.html?index=${index}">Visualizar</a> | 
                    <a class="delete-btn" data-index="${index}">Excluir</a>
                </td>
            `;
            petsTableBody.appendChild(row);
        });

        // Funcionalidade para excluir um pet
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                deletePet(index);
            });
        });
    }

    // Função para excluir um pet
    function deletePet(index) {
        const pets = JSON.parse(localStorage.getItem("pets")) || [];
        pets.splice(index, 1);

        localStorage.setItem("pets", JSON.stringify(pets));

        loadPets();
    }

    // Obter parâmetros da URL para filtros
    const urlParams = new URLSearchParams(window.location.search);
    const filter = {
        Id: urlParams.get('Id') || '',
        nome: urlParams.get('nome') || '',
        raca: urlParams.get('raca') || '',
        tamanho: urlParams.get('tamanho') || '',
    };

    // Carregar pets com os filtros da URL
    loadPets(filter);

    // Atualizar a URL com filtros ao submeter o formulário
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Obter os valores do formulário
        const filter = {
            Id: document.querySelector("#Id").value.trim(),
            nome: document.querySelector("#nome").value.trim(),
            raca: document.querySelector("#raça").value.trim(),
            tamanho: document.querySelector("#tamanho").value.trim(),
        };

        // Atualizar a URL com os filtros
        const searchParams = new URLSearchParams(filter).toString();
        window.history.pushState({}, '', '?' + searchParams);  // Atualiza a URL sem recarregar a página

        // Recarregar pets com os filtros atualizados
        loadPets(filter);
    });

    // Resetar os filtros e recarregar todos os pets
    document.querySelector("form").addEventListener("reset", function () {
        // Limpar parâmetros de filtro na URL
        window.history.pushState({}, '', window.location.pathname);
        loadPets();
    });
});
