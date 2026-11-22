
//serve para encontrar os elementos do HTML
const formulario = document.querySelector("#form-livro");
const campoTitulo = document.querySelector("#titulo");
const campoAutor = document.querySelector("#autor");
const campoStatus = document.querySelector("#status");
const campoBusca = document.querySelector("#busca");
const listaLivros = document.querySelector("#lista-livros");
const contador = document.querySelector("#contador");
const mensagem = document.querySelector("#mensagem");
const avisoVazio = document.querySelector("#vazio");
const botoesFiltro = document.querySelectorAll("[data-filtro]");

// variável q registra o filtro atual
let filtroAtual = "todos";
//recebe o valor interno do status e devolve o texto que sera mostrado no cartão de livro
function nomeDoStatus(status) {
  if (status === "lendo") return "Lendo";
  if (status === "lido") return "Lido";
  return "Quero ler";
}

function atualizarLista() { // aqui atualiza a lista conforme busca e filtro
  const termo = campoBusca.value.trim().toLowerCase(); 
  const livros = listaLivros.querySelectorAll(".livro"); // procura todos os elementos com a classe livro dentro da lista
  let quantidadeVisivel = 0;
   
  livros.forEach((livro) => { /// percorre os cartões de livro, um por um
    const textoLivro = livro.textContent.toLowerCase();
    const statusCorresponde = filtroAtual === "todos" || livro.dataset.status === filtroAtual; //condição verifica se o livro passa pelo filtro
    const buscaCorresponde = textoLivro.includes(termo); // verifica se  o livro tem o termo que foi digitado 
    const mostrar = statusCorresponde && buscaCorresponde;

    livro.hidden = !mostrar; // prop hidden esconde o livro quando mostrar é falso 
    if (mostrar) quantidadeVisivel += 1;
  });
  
  ///atualiza o contador e o aviso, e mostra o total cadastrado
  const total = livros.length; 
  contador.textContent = total === 1 ? "1 livro" : `${total} livros`;
  avisoVazio.hidden = quantidadeVisivel !== 0;
}

//serve pra criar um novo cartão de livro
function criarLivro(titulo, autor, status) {
  const item = document.createElement("li");
  item.className = "livro";
  item.dataset.status = status;

  const tituloLivro = document.createElement("h4");
  tituloLivro.textContent = titulo;

  const autorLivro = document.createElement("p");
  autorLivro.textContent = `Autor: ${autor || "Autor desconhecido"}`;

  const statusLivro = document.createElement("p");
  statusLivro.textContent = `Status: ${nomeDoStatus(status)}`;

  item.append(tituloLivro, autorLivro, statusLivro); // append coloca os três elementos dentro do cartão
  return item; // retorna o cartão de livro
} 

//faltando evento de enviar formulario 

campoBusca.addEventListener("input", atualizarLista); 

// aqui faz os os botões de filtro funcionarem
botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    filtroAtual = botao.dataset.filtro;

    botoesFiltro.forEach((outroBotao) => { // aqui mostra qual filtro está clicado
      outroBotao.classList.remove("filtro-ativo");
    });
    botao.classList.add("filtro-ativo");

    atualizarLista();
  });
});

atualizarLista();
