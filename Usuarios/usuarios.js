// Função para carregar os usuários e exibir na tabela
function loadUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios.length > 0) {
      renderUsuarios(usuarios);
  } else {
      alert('Nenhum usuário cadastrado ainda.');
  }
}

function renderUsuarios(usuarios) {
  const tableBody = document.getElementById('usuarios-table-body');
  tableBody.innerHTML = '';
  usuarios.forEach((usuario, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><input type="checkbox"></td>
          <td><img src="${usuario.imagem || 'perfil.png'}" alt="Foto" width="35" height="35"></td>
          <td>${usuario.email}</td>
          <td>${usuario.nome}</td>
          <td>${usuario.funcao}</td>
          <td>${usuario.status}</td>
          <td>${usuario.criadoEm || new Date().toLocaleDateString()}</td>
          <td class="actions">
              <a href="verUsuario.html?index=${index}">Visualizar</a> |
              <a href="editarPerfil.html?index=${index}">Editar</a> | 
              <a href="#" class="delete-btn" data-index="${index}">Excluir</a>
          </td>
      `;
      tableBody.appendChild(row);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          excluirUsuario(index);
      });
  });
}

function excluirUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.splice(index, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  loadUsuarios();
}



document.addEventListener('DOMContentLoaded', () => {
  loadUsuarios();
});