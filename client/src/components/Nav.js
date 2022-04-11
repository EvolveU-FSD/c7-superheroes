import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationContext from '../AuthenticationContext'
import MustBeLoggedIn from './MustBeLoggedIn'

const Nav = () => {
  const authContext = useContext(AuthenticationContext)
  return (
    <nav className="nav">
      {authContext.username && <p>{authContext.username}</p>}
      <Link className="btn btn-primary" to="/">
        Home
      </Link>
      <MustBeLoggedIn>
        <Link className="btn btn-primary" to="/new">
          New
        </Link>
      </MustBeLoggedIn>
      {!authContext.username && (
        <Link className="btn btn-primary" to="/login">
          Login
        </Link>
      )}
      <MustBeLoggedIn>
        <button className="btn btn-primary" onClick={authContext.logOut}>
          Logout
        </button>
      </MustBeLoggedIn>
    </nav>
  )
}

export default Nav
