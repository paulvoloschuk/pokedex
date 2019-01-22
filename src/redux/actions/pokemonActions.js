import {
  GET_POKEMON_REQUEST,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_FAIL,
  SET_POKEMON
} from '../constants/pokemonConstants'

function buildEvolutionChain(data, result = []) {
  if (data.evolves_to.length) buildEvolutionChain(data.evolves_to[0], result)
  result.push(data.species)
  return result
}

function setPokemon(name, data, stock_evolution) {
  const evolution_chain = buildEvolutionChain(stock_evolution.chain)
    .map(species => ({ ...species, id: species.url.match(/(\d+)\/$/)[1] }))
    .reverse()

  return {
    type: SET_POKEMON,
    payload: { name, ...data, evolution_chain }
  }
}

export function getPokemon(name) {
  return async function(dispatch) {
    let res = null,
      data = {},
      species = null,
      evolution_chain = null

    dispatch({
      type: GET_POKEMON_REQUEST,
      payload: { name }
    })

    try {
      // Fetching
      res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      data = await res.json()
      res = await fetch(data.species.url)
      species = await res.json()
      res = await fetch(species.evolution_chain.url)
      evolution_chain = await res.json()

      dispatch({
        type: GET_POKEMON_SUCCESS,
        payload: { name }
      })
      dispatch(setPokemon(name, data, evolution_chain))
    } catch (e) {
      dispatch({
        type: GET_POKEMON_FAIL,
        payload: { error: e.message, name }
      })
    }
  }
}
