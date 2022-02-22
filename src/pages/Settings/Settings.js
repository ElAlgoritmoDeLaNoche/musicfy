import React, { useState } from 'react'
import UploadAvatar from '../../components/Settings/UploadAvatar'

import './Settings.scss'

function Settings(props) {

  const { user } = props

  return (
    <div className="settings">
      <h1>Configuraciones</h1>
      <div className="avatar-name">
        <UploadAvatar user={user} />
      </div>
      <h2>Username</h2>
    </div>
  )
}

export default Settings