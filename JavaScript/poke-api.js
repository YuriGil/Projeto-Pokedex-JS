/*Poke-Api - Manipulação da API*/
const pokeApi = {};

//conversão do modelo do banco para o modelo criado (pokemon-model.js)
//utilizando apenas as informações necessarias 
function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name
  
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types
  
  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.showdown.front_default
  
  return pokemon
}

//transforma a lista da promise em varias promises individuais, ja convertidas para json
//transforma o promise em um array, para q possam ser chamados independete um do outro
pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
  .then((response) => response.json())
  .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  /*codigo de consumo de api*/

  //Promise são assincronos, serão executadas em paralelo, sem impedir a continuidade do codigo
  //utilizado quando você quer transformar um modelo síncrono (que espera sua finalização), em um assíncrono (transforma a função em promises).
  //fetch promise = promessa que a requisção solicitada ao servidor será realizada/comunicação com o servidor
  return fetch(url)
    //.then = usado para manipular o resultado da promise
    //response.json() = converte o resultado para json, arquvi de comunicação reconhecido pelo JS
    //pega o resultado convertido e disponibiliza para manipulação
    .then((response) => response.json())
    //resultado convertido em Lista-HTML para manipulação baseado na promise
    .then((jsonbody) => jsonbody.results)
    //manipula a lista de promises 
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    //uma lista de promessas de detalhes
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error))
    
}
