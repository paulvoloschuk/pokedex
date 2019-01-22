import { combineReducers } from 'redux'
import list from './listReducer'
import pokemon from './pokemonReducer'

export default combineReducers({
  list,
  pokemon
})
