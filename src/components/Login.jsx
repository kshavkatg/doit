import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaExclamationCircle } from 'react-icons/fa'
import Loader from "react-loader-spinner";
import fullLogo from "../images/doit FULL.png"
import { useAuth } from '../context'

export const Login = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const { login } = useAuth()
const history = useHistory()
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)

function handleSubmit(e) {
  e.preventDefault()

  setError('')
  setLoading(true)

  login(email, password)
    .then(() =>{
      setLoading(false)
      history.push("/")
    })
    .catch((err) => {
      setError(err.message)
      setLoading(false)
    })
}

if (loading) return (
  <div className='loading'>
    <Loader type="Oval" color="#4c956c" height={50} width={50} />
    <h3>Loading</h3>
  </div>
  
)

return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="full-logo">
          <img src={fullLogo} alt="full-logo" />
        </div>
        <div>
          <h2>Log in</h2>
        </div>
        {error && <div className="alert_error"><FaExclamationCircle />{error}</div>}
        <div className="inputs-wrapper">
          <h3>Email</h3>
          <label htmlFor="email">
            <input 
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </label>
        </div>
        <div className="inputs-wrapper">
          <h3>Password</h3>
          <label htmlFor="password">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              minLength="6"
              required
              />
          </label>
        </div>
        <div>
          <button 
            className="login"
            type="submit"
            disabled={loading}
          >Log In</button>
        </div>
        <div className="helper-block">
          <h3><Link to="/forgot-password">Forgot your password?</Link></h3>
          <h3>Dont have an account? <Link to="/signup">Sign up</Link></h3>
        </div>
      </form>
      <div className="helper">
        <p className="text">For authorization Sign Up,  or use:</p>
        <div className="data">
          <p className="email">Email: &nbsp;&nbsp; kshavkatg@gmail.com</p>
          <p className="pass">Password: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12345678</p>
        </div>
      </div>
    </div>
  ) 
}

