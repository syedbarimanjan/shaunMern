import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

const navbar = () => {
  const {logout}=useLogout();
  const {authState}=useAuthContext();
  const handleClick = () => {
    logout();
  }
  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1>Workout Buddy</h1>
            </Link>
            <nav>
              {authState.user && (
                <div>
                  <span>{authState.user.email}</span>
                  <button onClick={handleClick}>Logout</button>
                </div>
              )}
              {!authState.user &&(
                <div>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </div>
              )}
            </nav>
        </div>
    </header>
  )
}

export default navbar