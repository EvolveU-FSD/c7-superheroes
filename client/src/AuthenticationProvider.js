import React, { useState } from 'react'
import AuthenticationContext from './AuthenticationContext'

const AuthenticationProvider = ({ children }) => {
    const [username, setUsername] = useState('')
    const logIn = (logInUsername) => {
        setUsername(logInUsername)
    }
    const logOut = () => {
        setUsername('')
    }
    const authContext = { username, logIn, logOut }
    return (
        <AuthenticationContext.Provider value={authContext}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider
