import React, { useState, useEffect } from 'react'
import AuthenticationContext from './AuthenticationContext'

const AuthenticationProvider = ({ children }) => {
  const [username, setUsername] = useState('')
  const logIn = (logInUsername) => {
    setUsername(logInUsername)
  }
  const logOut = () => {
    setUsername('')
  }
  useEffect(() => {
    const getLoggedInUser = async () => {
      const response = await fetch('/auth/loggedInUser')
      const loggedInUser = await response.json()
      if (loggedInUser) {
        logIn(loggedInUser.username)
      }
    }
    getLoggedInUser()
  }, [])

  const authContext = { username, logIn, logOut }
  return (
    <AuthenticationContext.Provider value={authContext}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationProvider
