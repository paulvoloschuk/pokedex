import {
  GET_POKEMONS_REQUEST,
  GET_POKEMONS_SUCCESS,
  GET_POKEMONS_FAIL,
  SET_POKEMONS,
  FILTER_POKEMONS
} from '../constants/listConstants'

const initialState = {
  isFetched: false,
  error: null,
  pokemons: [],
  displayedPokemons: [],
  searchString: ''
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_POKEMONS_REQUEST:
      return {
        ...state,
        isFetched: true
      }

    case GET_POKEMONS_SUCCESS:
      return {
        ...state,
        isFetched: false
      }

    case GET_POKEMONS_FAIL:
      return {
        ...state,
        isFetched: false,
        error: payload
      }

    case SET_POKEMONS:
      return {
        ...state,
        pokemons: payload
      }

    case FILTER_POKEMONS:
      return {
        ...state,
        ...payload
      }

    default:
      return state
  }
}
