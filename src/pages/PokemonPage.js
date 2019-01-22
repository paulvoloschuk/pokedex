import { connect } from 'react-redux'
import * as pokemonActions from '../redux/actions/pokemonActions'

import React, { Component, Fragment } from 'react'

class PokemonPage extends Component {
  componentDidMount() {
    this.props.getPokemon(this.props.match.params.name)
  }

  _buildEvolutionChain(data, result = []) {
    if (data.evolves_to.length)
      this._buildEvolutionChain(data.evolves_to[0], result)
    result.push(data.species)
    return result
  }

  render() {
    const { isFetched = true, data } =
      this.props[this.props.match.params.name] || {}
    return (
      <div className="pokemon_page">
        {isFetched || !data ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <h1 className="pokemon_page__caption">{data.name}</h1>
            <div className="pokemon_page__grid">
              <table>
                <caption>Stats</caption>
                <tbody>
                  {data.stats.map(({ base_stat, stat }) => (
                    <tr key={stat.name}>
                      <td>{stat.name}</td>
                      <td>{base_stat}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>total</td>
                    <td>
                      {data.stats.reduce(
                        (sum, { base_stat }) => sum + base_stat,
                        0
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="pokemon_page__details">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    data.id
                  }.png`}
                  alt="pokemon"
                  width={200}
                  height={200}
                />
                <table width="100%">
                  <caption>Evolution</caption>
                  <tbody>
                    <tr>
                      {this._buildEvolutionChain(data.evolution.chain)
                        .reverse()
                        .map(item => (
                          <td key={item.name}>
                            <a href={`/${item.name}`}>{item.name}</a>
                          </td>
                        ))}
                    </tr>
                  </tbody>
                </table>
              </div>
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
