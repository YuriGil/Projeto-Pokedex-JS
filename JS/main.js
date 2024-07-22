const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 5;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit)
  
  .then((pokemons = []) => {
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
    <img class="background" src="./img/pokeball-gray.svg" alt="">
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

/**********BUSCA E PAGINÇÃO DA POKEDEX*********/
async function searchPokemon() {
  const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  try {
    const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Pokémon não encontrado');
      }
      
      const pokemonData = await response.json();
      
      // Chamar a função preexistente para exibir os detalhes do Pokémon
      loadPokemonDetailsInNewWindow(pokemonData.id);
  } catch (error) {
      alert(error.message);
    }
  }
  
  document.addEventListener("keypress", function(e){

    if (e.key === "Enter"){
        //console.log("Apertou o enter");
        const button = document.querySelector("span");
        button.click();
    }
})