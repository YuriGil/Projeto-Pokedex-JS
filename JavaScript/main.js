/*
const offset = 0;
const limit = 9;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
*/
//pega o elemento do HTML para ser manipulado no JS
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 5;
let offset = 0;


/*

-----Outros modos de escrever----

//transforma a lista promise em lista HTML
pokeApi.getPokemons().then((pokemons = []) => {
  //literalmente mapeia os elementos do array para manipulação
  const newList = pokemons.map((pokemon) => {
    return convertPokemonToLi(pokemon);
  })
  //join = concatena os itens do array
  const newHtml = newList.join("")
  pokemonList.innerHTML += newHtml
  
})


----- outra forma de escrever -----

const listaItems = []
//percorrendo a lista
for (let i = 0; i < pokemons.length; i++) {
  //pega o elemento e converte ele para LI
  const pokemon = pokemons[i];
  //concatenando ele na lista
  listaItems(convertPokemonToLi(pokemon))
}
*/
//função para paginação de itens da lista
//função para converter o resultado da promise em html para ser exibido e manipulado
function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
    .map(
      (pokemon) =>
        `
      <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    
    <div class="detail">
        <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}" >${type}</li>`)
          .join("")}
        </ol>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
</li>

    `
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}


/*Botão relacionadio a paginação*/
loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordWithNextPage = offset + limit
//se a pagina atingir o numero pre estabelecido retira o botão para continaur carregando
  if(qtdRecordWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)
  
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }else{
    loadPokemonItens(offset, limit);
  }
});
