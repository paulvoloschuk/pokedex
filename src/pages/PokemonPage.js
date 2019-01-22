import { connect } from 'react-redux'
import * as pokemonActions from '../redux/actions/pokemonActions'

import React, { Component, Fragment } from 'react'
import { Card, Breadcrumbs } from '@blueprintjs/core'
import Loader from '../components/Loader'
import Stats from '../components/Stats'
import EvolutionList from '../components/EvolutionList'
import { capitalize } from '../utils'

class PokemonPage extends Component {
  componentDidMount() {
    this.props.getPokemon(this.props.match.params.name)
  }
  componentWillReceiveProps(newProps) {
    const nameParam = newProps.match.params.name
    if (this.props.match.params.name !== nameParam && !this.props[nameParam])
      this.props.getPokemon(newProps.match.params.name)
  }

  _linkHandler = e => {
    e.preventDefault()
    this.props.history.push('/')
  }

  render() {
    const { isFetched = true, data } =
      this.props[this.props.match.params.name] || {}

    return (
      <div className="pokemon_page">
        {isFetched || !data ? (
          <Loader>Pokemon loading</Loader>
        ) : (
          <Fragment>
            <Breadcrumbs
              items={[
                {
                  href: '/',
                  icon: 'home',
                  text: 'Home',
                  onClick: this._linkHandler
                },
                { icon: 'document', text: capitalize(data.name) }
              ]}
            />
            <div className="pokemon_page__grid">
              <Stats data={data.stats} />
              <Card className="pokemon_page__details">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    data.id
                  }.png`}
                  alt="pokemon"
                  width={200}
                  height={200}
                />
                <EvolutionList
                  current={data.name}
                  data={data.evolution_chain}
                />
              </Card>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { ...state.pokemon }
}

const mapDispatchToProps = {
  getPokemon: pokemonActions.getPokemon
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonPage)
