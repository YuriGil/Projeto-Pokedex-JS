// Função para carregar os detalhes do Pokémon
function loadPokemonDetails(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            const detailsPage = `
                <div class="pokemon-details">
                <button id="backButton">PokeDex</button>
                <img src="${pokemon.sprites.other.showdown.front_default}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <p><strong>Altura:</strong> ${pokemon.height}</p>
                <p><strong>Peso:</strong> ${pokemon.weight}</p>
                    <h3>Tipos</h3>
                    <ul>
                    ${pokemon.types.map(type => `<li>${type.type.name}</li>`).join('')}
                    </ul>
                    <h3>Habilidades</h3>
                    <ul>
                    ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
                    </ul>
                </div>
            `;
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
        pokemonList.addEventListener("click", event => {
            if (event.target.closest('li.pokemon')) {
                const pokemonName = event.target.closest('li.pokemon').querySelector('.name').textContent.toLowerCase();
                loadPokemonDetails(pokemonName);
            }
        });
    }
});
