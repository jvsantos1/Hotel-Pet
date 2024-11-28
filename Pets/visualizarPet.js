document.addEventListener("DOMContentLoaded", () => {
    
  const urlParams = new URLSearchParams(window.location.search);
  const index = parseInt(urlParams.get("index"));
  
  if (isNaN(index)) {
      alert("Pet não encontrado.");
      window.location.href = "/pets/pets.html"; 
      return;
  }

 
  const pets = JSON.parse(localStorage.getItem("pets")) || [];
  const pet = pets[index];

  if (!pet) {
      alert("Pet não encontrado.");
      window.location.href = "/pets/pets.html"; 
  }

  document.querySelector("#pet-nome").textContent = pet.nome;
  document.querySelector("#pet-tipo").textContent = pet.tipo;
  document.querySelector("#pet-raca").textContent = pet.raca;
  document.querySelector("#pet-tamanho").textContent = pet.tamanho;

  const petImagem = document.querySelector("#pet-imagem");
  if (pet.imagem) {
      petImagem.src = pet.imagem; 
  } else {
      petImagem.alt = "Imagem não disponível";
  }
});