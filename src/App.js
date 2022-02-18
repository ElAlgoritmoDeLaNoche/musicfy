import React, { useState } from 'react'
import firebase from './utils/Firebase'
import { ToastContainer } from 'react-toastify'
import 'firebase/compat/auth'
import Auth from './pages/Auth/Auth'
import LoggedLayout from './layouts/LoggedLayout/LoggedLayout'

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
      {!user ? <Auth /> : <LoggedLayout user={user} />}
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

export default App;
