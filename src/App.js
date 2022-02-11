import React, { useState } from 'react'
import firebase from './utils/Firebase'
import { ToastContainer } from 'react-toastify'
import 'firebase/compat/auth'
import Auth from './pages/Auth/Auth'

function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  firebase.auth().onAuthStateChanged(currentUser => {

    if (!currentUser?.emailVerified) {
      // firebase.auth().signOut()
      setUser(null)
    } else {
      setUser(currentUser)
    }
    setIsLoading(false)
  })

  if (isLoading) {
    return null
  }

  return (
    <>
      {!user ? <Auth /> : <UserLogged />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

function UserLogged() {

  const logout = () => {
    firebase.auth().signOut();
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <h1>Usuario Logeado</h1>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}

export default App;
