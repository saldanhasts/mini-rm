let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
let editIndex = -1;

const listaFuncionarios = document.getElementById("listaFuncionarios");
const contador = document.getElementById("contador");
const btnSalvar = document.getElementById("btnSalvar");

// Atualiza tabela e salva no localStorage
function atualizarTabela() {
  listaFuncionarios.innerHTML = "";
  funcionarios.forEach((funcionario, index) => {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
      <td data-label="Nome">${funcionario.nome}</td>
      <td data-label="E-mail">${funcionario.email}</td>
      <td data-label="Empresa">${funcionario.empresa}</td>
      <td data-label="Ações">
        <button class="action-btn edit-btn" onclick="editarFuncionario(${index})">Editar</button>
        <button class="action-btn delete-btn" onclick="removerFuncionario(${index})">Excluir</button>
      </td>
    `;
    listaFuncionarios.appendChild(novaLinha);
  });

  contador.innerText = funcionarios.length > 0
    ? `${funcionarios.length} funcionário(s) cadastrado(s)`
    : "Nenhum funcionário cadastrado";

  localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
}

// Adicionar ou editar funcionário
function adicionarOuEditarFuncionario() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const empresa = document.getElementById("empresa").value.trim();

  if (!nome || !email || !empresa) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const funcionario = { nome, email, empresa };

  if (editIndex === -1) {
    funcionarios.push(funcionario);
  } else {
    funcionarios[editIndex] = funcionario;
    editIndex = -1;
    btnSalvar.innerText = "Adicionar Funcionário";
  }

  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("empresa").value = "";

  atualizarTabela();
}

// Editar funcionário
function editarFuncionario(index) {
  const funcionario = funcionarios[index];
  document.getElementById("nome").value = funcionario.nome;
  document.getElementById("email").value = funcionario.email;
  document.getElementById("empresa").value = funcionario.empresa;

  editIndex = index;
  btnSalvar.innerText = "Atualizar Funcionário";
}

// Remover funcionário
function removerFuncionario(index) {
  funcionarios.splice(index, 1);
  atualizarTabela();
}

// Pesquisar funcionário
function pesquisarFuncionario() {
  const termo = document.getElementById("pesquisa").value.toLowerCase();
  const linhas = listaFuncionarios.getElementsByTagName("tr");

  for (let i = 0; i < linhas.length; i++) {
    const colunas = linhas[i].getElementsByTagName("td");
    let encontrou = false;

    for (let j = 0; j < colunas.length - 1; j++) {
      if (colunas[j].innerText.toLowerCase().includes(termo)) {
        encontrou = true;
        break;
      }
    }

    linhas[i].style.display = encontrou ? "" : "none";
  }
}

// Inicializa tabela ao carregar
atualizarTabela();