import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { Image } from 'semantic-ui-react'
import NoAvatar from '../../assets/png/user.png'
import firebase from '../../utils/Firebase'
import 'firebase/compat/storage'
import 'firebase/compat/auth'

function UploadAvatar(props) {

  const { user } = props
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL)

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    setAvatarUrl(URL.createObjectURL(file))
    uploadImage(file).then(() => {
      updateUserAvatar()
    })
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop
  })

  const uploadImage = file => {
    console.log(file);
    const ref = firebase.storage().ref().child(`avatar/${user.uid}`)
    return ref.put(file)
  }

  const updateUserAvatar = () => {
    firebase.storage().ref(`avatar/${user.uid}`).getDownloadURL().then(response => {
      firebase.auth().currentUser.updateProfile({ photoURL: response })
    }).catch(() => {
      toast.error("Error al actualizar el avatar", { theme: "colored" })
    })
  }

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoAvatar} />
      ) : <Image src={avatarUrl ? avatarUrl : NoAvatar} />
      }
    </div>
  )
}

export default UploadAvatar