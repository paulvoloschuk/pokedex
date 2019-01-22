import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Elevation } from '@blueprintjs/core'
import { capitalize } from '../utils'

const withHighlight = (search, text) => {
  if (!search) return text
  const delimiters = text.match(new RegExp(search, 'ig'))
  return delimiters
    ? text.split(new RegExp(search, 'i')).reduce(
        (acc, string, index, text) => [
          ...acc,
          index && index !== text.length ? (
            <span key={index} className="list__highlight">
              {delimiters[--index]}
            </span>
          ) : (
            undefined
          ),
          string
        ],
        []
      )
    : text
}

export default ({
  data: { name, id },
  withLink,
  highlight: searchString,
  ...rest
}) => (
  <Link to={name} {...rest}>
    <Card interactive={true} elevation={Elevation.TWO}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
        width={96}
        height={96}
      />
      <h4>
        {searchString
          ? withHighlight(searchString, capitalize(name))
          : capitalize(name)}
      </h4>
    </Card>
  </Link>
)
