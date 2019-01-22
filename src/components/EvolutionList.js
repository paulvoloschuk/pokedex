import React from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from '../utils'

export default ({ data, current }) => (
  <div>
    <h5>
      <center>Evolution chain</center>
    </h5>
    <div className="evolution_list">
      {data.map(item => (
        <Link
          to={`/${item.name}`}
          className={`evolution_list__item ${item.name === current &&
            'evolution_list__item--curent'}`}
          key={item.name}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              item.id
            }.png`}
            alt={item.name}
            width={48}
            height={48}
          />
          {capitalize(item.name)}
        </Link>
      ))}
    </div>
  </div>
)
