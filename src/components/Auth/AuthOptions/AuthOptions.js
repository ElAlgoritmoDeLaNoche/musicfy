import React from 'react'
import { Button } from 'semantic-ui-react'
import './AuthOptions.scss'

function AuthOptions(props) {

  const { setSelectedForm } = props;

  return (
    <div className="auth-options">
      <h2>Millones de Canciones, gratis en musicfy</h2>
      <Button className="register" onClick={() => setSelectedForm("register")}>Registrate Gratis</Button>
      <Button className="login" onClick={() => setSelectedForm("login")}>Inicia Sesión</Button>
    </div>
  )
}

export default AuthOptions