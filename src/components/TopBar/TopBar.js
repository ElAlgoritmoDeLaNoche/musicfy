import React from 'react'
import { Icon, Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../utils/Firebase'
import 'firebase/compat/auth'
import UserImage from '../../assets/png/user.png'

import './TopBar.scss'

function TopBar(props) {

  const { user } = props

  const goback = () => {
    console.log("Ir atras");
  }

  const logout = () => {
    console.log("Cerrar Sesión");
  }

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <Icon name="angle left" onClick={goback} />
      </div>
      <div className="top-bar__right">
        <Link to="/settings">
          <Image src={UserImage} />
          {user.displayName}
        </Link>
        <Icon name="power off" onClick={logout} />
      </div>
    </div>
  )
}

export default withRouter(TopBar)