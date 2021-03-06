import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Pages
import Home from '../pages/Home/Home'
import Settings from '../pages/Settings/Settings'

function Routes(props) {

  const { user } = props

  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/artists" exact>
        <h1>Artistas</h1>
      </Route>
      <Route path="/settings" exact>
        <Settings user={user} />
      </Route>
    </Switch>
  )
}

export default Routes