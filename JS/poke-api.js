const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name
  pokemon.height = pokeDetail.height
  pokemon.weight = pokeDetail.weight
  pokemon.base_experience = pokeDetail.base_experience

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types
  
  pokemon.types = types
  pokemon.type = type

  const abilities = pokeDetail.abilities.map((ability) => ability.ability.name)
  pokemon.abilities = abilities

  const statsName = pokeDetail.stats.map((stat) => stat.stat.name);
  pokemon.statsName = statsName
  
  const statsNumber = pokeDetail.stats.map((stat) =>stat.base_stat);
  pokemon.statsNumber = statsNumber
  
  pokemon.photo = pokeDetail.sprites.other.showdown.front_default
  
  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
  .then((response) => response.json())
  .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonbody) => jsonbody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error))
    
}
