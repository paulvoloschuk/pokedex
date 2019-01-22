import {
  GET_POKEMON_REQUEST,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_FAIL,
  SET_POKEMON
} from '../constants/pokemonConstants'

function setPokemon(name, data) {
  return {
    type: SET_POKEMON,
    payload: { name, ...data }
  }
}

export function getPokemon(name) {
  return async function(dispatch) {
    let res = null,
      data = {},
      species = null
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
      data.evolution = await res.json()

      dispatch({
        type: GET_POKEMON_SUCCESS,
        payload: { name }
      })
      dispatch(setPokemon(name, data))
    } catch (e) {
      dispatch({
        type: GET_POKEMON_FAIL,
        payload: { error: e.message, name }
      })
    }
  }
}
