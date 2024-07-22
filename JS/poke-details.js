// Função para carregar os detalhes do Pokémon em uma nova janela
function loadPokemonDetailsInNewWindow(pokemonId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
    .then((pokemon) => {
      const detailsPage = `

<div class="poke-container">
<div class="pokedex-details">
<img class="poke-background" src="img/pokeball-gray.svg" alt="">
    <div class="header-details ${pokemon.type}">
      <button class="back title" id="backButton"><div class="seta"></div>&nbsp; &nbsp;   PokeDex</button>
      <img src="${pokemon.photo}" alt="${pokemon.name}">
      <img class="background" src="img/pokeball-gray.svg" alt="">
      <span class="poke-number"># ${pokemon.number}</span>
    </div>

    <h1 class="name-details">${pokemon.name}</h1>
    
    <div class="pokemon-info">
      <ol class="types-details">
        ${pokemon.types
          .map((type) => `<li class="type-details ${type}" >${type}</li>`)
          .join("")}
      </ol>
    </div>
    <div class="poke-medidas">
      <span class="height">Height: ${pokemon.height}</span>
      <span class="weight">Weight: ${pokemon.weight}</span>
    </div>

    <div class="poke-details">
      <p>Base Experience: ${pokemon.base_experience}</p>
      <ul>
      <h3>Abilities</h3>
        ${pokemon.abilities
          .map(
            (abilities) => `<li class="type ${abilities}">${abilities}</li>`
          )
          .join("")}
      </ul>
    </div>

    
    <h2>Base Stats</h2>
    <div class="baseStatsContainer">
    
    <div class="statsName">
    ${pokemon.statsName
      .map(
        (statsName) => `<div class="type pokeStatusDetail ${statsName}">${statsName} :</div>`
      )
      .join("")}
    </div>
      <div class="statsNumber">
      ${pokemon.statsNumber
        .map((statsNumber) => {
          const percentage = (statsNumber / 200) * 100;
          return `<div class="statsBar"><div class="progress-bar" style="width: ${percentage}%;"><span>${statsNumber}/200</span></div></div>`;
        })
        .join("")}
    </div>
    </div>
    </div>
    </div>
    </div>`;

      // lnkar o botão de voltar
      document.body.innerHTML = detailsPage;

      document.getElementById("backButton").addEventListener("click", () => {
        location.reload();
      });
    });
}

// Adiciona um event listener a cada item da lista de Pokémon
document.addEventListener("DOMContentLoaded", () => {
  const pokemonList = document.getElementById("pokemonList");
  if (pokemonList) {
    pokemonList.addEventListener("click", (event) => {
      const pokemonItem = event.target.closest("li.pokemon");
      if (pokemonItem) {
        const pokemonId = pokemonItem
          .querySelector(".number")
          .textContent.replace("#", "");
        loadPokemonDetailsInNewWindow(pokemonId);
      }
    });
  }
});
