import { connect } from 'react-redux'
import * as listActions from '../redux/actions/listActions'

import React, { Component } from 'react'
import Pokemon from '../components/pokemon'
import Loader from '../components/Loader'

import { InputGroup, Callout } from '@blueprintjs/core'

class ListPage extends Component {
  componentDidMount() {
    console.log(this.props)
    if (!this.props.pokemons) this.props.getPokemons()
  }

  _handleSearch = ({ currentTarget }) => {
    this.props.filterPokemons(currentTarget.value)
  }

  render() {
    const { pokemons, searchString, isFetched, error } = this.props

    return (
      <div className="list">
        {error && <div className="list__error">{error}</div>}
        <div className="list__search">
          <InputGroup
            disabled={error || isFetched}
            onChange={this._handleSearch}
            value={searchString}
            placeholder="Enter pokemon name..."
            leftIcon="search"
          />
        </div>
        {isFetched ? (
          <Loader />
        ) : (
          <div className="pokemons">
            {pokemons && pokemons.length ? (
              pokemons.map(pokemon => (
                <Pokemon
                  key={pokemon.id}
                  highlight={searchString}
                  className="pokemons__item"
                  data={pokemon}
                />
              ))
            ) : (
              <Callout className="pokemons__no-content" intent="warning">
                Sorry! No pokemons found.
              </Callout>
            )}
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { displayed, isFetched, searchString, error } = state.list

  return {
    pokemons: displayed,
    searchString,
    isFetched,
    error
  }
}

const mapDispatchToProps = {
  getPokemons: listActions.getPokemons,
  filterPokemons: listActions.filterPokemons
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage)
