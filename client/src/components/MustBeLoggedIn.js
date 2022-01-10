import { useContext } from 'react'
import AuthenticationContext from '../AuthenticationContext'

const MustBeLoggedIn = ({ children }) => {
    const authContext = useContext(AuthenticationContext)
    return authContext.username ? children : null
}

export default MustBeLoggedIn
