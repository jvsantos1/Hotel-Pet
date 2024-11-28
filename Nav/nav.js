document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");
  const sidebarLinks = document.querySelectorAll(".sidebar a");

  // Mapeamento de páginas para caminhos de arquivos HTML e CSS
  const pagePaths = {
    Home: { html: "../Pets/pets.html", css: "../Pets/pets.css" },
    CadastrarPets: {
      html: "../Pets/cadPet.html",
      css: "../../Pets/cadPets.css"
    },
    EditarPet: {
      html: "../Pets/editarPet.html",
      css: "../Pets/editarPet.css"
    },
    VisualizarPet: {
      html: "../Pets/visualizarPet.html",
      css: "../Pets/visualizarPet.css"
    },
    Usuarios: {
      html: "../Usuarios/usuarios.html",
      css: "../Usuarios/usuarios.css"
    },
    CadastrarUsuarios: {
      html: "../Usuarios/novoUsuario.html",
      css: "../Usuarios/novoUsuario.html",
    },
    EditarPerfil: {
      html: "../Usuarios/editarPerfil.html",
      css: "../Usuarios/editarPerfil.css",
    },
    FazerReserva: {
      html: "../../Reserva/FazerReserva/FazerReserva.html",
      css: "../../Reserva/FazerReserva/styles.css",
    },
    VerReserva: {
      html: "../../Reserva/VerReserva/VerReserva.html",
      css: "../../Reserva/VerReserva/styles.css",
    },
    Reservas: { html: "Reservas/reservas.html", css: "Reservas/styles.css" },
    CadastrarPerfil: {
      html: "../../Perfil/cadastrarPerfil.html",
      css: "../../Perfil/styles.css",
    },
    EditarReserva: {
      html: "../../Editar/editarReserva/editarReserva.html",
      css: "../../Editar/editarReserva/styles.css",
    },
    EditarReservaEmAndamento: {
      html: "../../Editar/editarReservaEmAndamento/editarReservaEmAndamento.html",
      css: "../../Editar/editarReservaEmAndamento/styles.css",
    },
    EditarReservaFinalizada: {
      html: "../../Editar/editarReservaFinalizada/editarReservaFinalizada.html",
      css: "../../Editar/editarReservaFinalizada/styles.css",
    },
    Configurar: {
      html: "../../Home/Configurar/configuracoes.html",
      css: "../../Home/Configurar/styles.css",
    },
  };

  // Função para carregar CSS dinamicamente com timestamp para evitar cache
  function loadCSS(cssPath) {
    let existingLink = document.querySelector("link[data-dynamic-css]");
    if (existingLink) existingLink.remove();

    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = `${cssPath}?timestamp=${new Date().getTime()}`;
    linkElement.setAttribute("data-dynamic-css", "");
    document.head.appendChild(linkElement);
  }

  // Função para carregar uma página específica
  function loadPage(page) {
    const { html: pagePath, css: cssPath } = pagePaths[page] || pagePaths.Home;

    fetch(pagePath)
      .then((response) => {
        if (!response.ok) throw new Error("Página não encontrada");
        return response.text();
      })
      .then((html) => {
        contentDiv.innerHTML = html;
        loadCSS(cssPath);
        if (page === "VerReserva") initializeReservaView(true); // Chama a função para inicializar a página VerReserva
      })
      .catch((error) => {
        contentDiv.innerHTML = "<p>Erro ao carregar a página.</p>";
        console.error("Erro ao carregar a página:", error);
      });
  }

  // Função para manipular a navegação
  function handleNavigation(event, page) {
    event.preventDefault();
    history.pushState({ page }, "", `#${page}`);
    loadPage(page);
  }

  // Configura evento de clique para os links de navegação
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const page = link.getAttribute("data-page");
      handleNavigation(event, page);
    });
  });

  // Detecta a navegação pelo histórico
  window.addEventListener("popstate", (event) => {
    const page = event.state ? event.state.page : "Home";
    loadPage(page);
  });

  // Função para inicializar a tela de VerReserva
  function initializeReservaView(isGerente) {
    console.log("initializeReservaView chamada com isGerente:", isGerente);

    const reservaStatus = document.querySelector("#reservaStatus");
    const notaInput = document.querySelector("#notaEstadia");
    const anotacoesInput = document.querySelector("#anotacoesEstadia");

    // Verifique se os campos existem
    if (!reservaStatus || !notaInput || !anotacoesInput) {
      console.error("Elementos necessários não encontrados na página VerReserva.");
      return;
    }

    console.log("reservaStatus:", reservaStatus, "notaInput:", notaInput, "anotacoesInput:", anotacoesInput);

    if (isGerente && reservaStatus.value === "Finalizada") {
      notaInput.disabled = false;
      anotacoesInput.disabled = false;
    } else if (reservaStatus.value === "Finalizada") {
      notaInput.disabled = true;
      anotacoesInput.disabled = true;
    }

    reservaStatus.addEventListener("change", () => {
      if (reservaStatus.value === "Finalizada") {
        notaInput.disabled = false;
        anotacoesInput.disabled = false;
      } else {
        notaInput.disabled = true;
        anotacoesInput.disabled = true;
      }
    });
  }

  // Carrega a página inicial
  const initialPage = location.hash.replace("#", "") || "Home";
  loadPage(initialPage);
});