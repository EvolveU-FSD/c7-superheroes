import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthenticationContext from '../AuthenticationContext'

const PrivatePage = ({ children }) => {
  const authContext = useContext(AuthenticationContext)
  if (authContext.username) {
    return children
  }
  return <Navigate to="/login" />
}

export default PrivatePage
