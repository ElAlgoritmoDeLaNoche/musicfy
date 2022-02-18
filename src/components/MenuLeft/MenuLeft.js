import React, { useState, useEffect } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { isUserAdmin } from '../../utils/Api'
import BasicModal from '../Modal/BasicModal'

import './MenuLeft.scss'

function MenuLeft(props) {

  const { user, location } = props

  const [activeMenu, setActiveMenu] = useState(location.pathname)
  const [userAdmin, setUserAdmin] = useState(false)

  useEffect(() => {
    isUserAdmin(user.uid).then(response => {
      setUserAdmin(response)
    })
  }, [user])


  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to)
  }

  return (
    <>
      <Menu className="menu-left" vertical>
        <div className="top">
          <Menu.Item
            as={Link}
            to="/"
            active={activeMenu === '/'}
            onClick={handlerMenu}
          >
            <Icon name="home" />
            Inicio
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/artists"
            active={activeMenu === '/artists'}
            onClick={handlerMenu}
          >
            <Icon name="music" />
            Artistas
          </Menu.Item>
        </div>
        {userAdmin && (
          <div className="footer">
            <Menu.Item>
              <Icon name="plus square outline" />
              Nuevo Artista
            </Menu.Item>
            <Menu.Item>
              <Icon name="plus square outline" />
              Nueva Canción
            </Menu.Item>
          </div>
        )}
      </Menu>
      <BasicModal show={false} setShow={null} title="Test title">
        <h2>Contenido del modal</h2>
      </BasicModal>
    </>
  )
}

export default withRouter(MenuLeft)