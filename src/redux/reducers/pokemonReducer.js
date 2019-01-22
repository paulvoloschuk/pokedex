import {
  GET_POKEMON_REQUEST,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_FAIL,
  SET_POKEMON
} from '../constants/pokemonConstants'

const initialPokemonState = {
  isFetched: false,
  error: null,
  data: null
}

export default function(state = {}, { type, payload: { name, ...data } = {} }) {
  switch (type) {
    case GET_POKEMON_REQUEST:
      return {
        ...state,
        [name]: { ...initialPokemonState, isFetched: true }
      }

    case GET_POKEMON_SUCCESS:
      return {
        ...state,
        [name]: { ...state[name], isFetched: false }
      }

    case GET_POKEMON_FAIL:
      return {
        ...state,
        [name]: { ...state[name], isFetched: false, error: data.error }
      }

    case SET_POKEMON:
      return {
        ...state,
        [name]: { ...state[name], data: { ...data, name } }
      }

    default:
      return state
  }
}
