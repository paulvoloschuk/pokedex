import React from 'react'
import { Route, Switch } from 'react-router'

// Pages
import ListPage from './pages/ListPage'
import PokemonPage from './pages/PokemonPage'

/*
 @see https://github.com/supasate/connected-react-router/blob/master/FAQ.md
 */
const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={ListPage} />
      <Route path="/:name" component={PokemonPage} />
    </Switch>
  </div>
)

export default routes
