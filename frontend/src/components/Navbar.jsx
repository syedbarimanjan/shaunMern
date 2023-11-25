import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

const navbar = () => {
  const {logout}=useLogout();
  const {state}=useAuthContext();
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
              {state.user && (
                <div>
                  <span>{state.user.email}</span>
                  <button onClick={handleClick}>Logout</button>
                </div>
              )}
              {!state.user &&(
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