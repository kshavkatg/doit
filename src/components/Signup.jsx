/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaExclamationCircle } from 'react-icons/fa'
import fullLogo from "../images/doit FULL.png"
import { useAuth } from '../context'

export const Signup = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [passConfirmation, setPassConfirmation] =  useState('')
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)
const { signUp } = useAuth()
const history = useHistory()

async function handleSubmit(e) {
  e.preventDefault()

  if (password !== passConfirmation) {
    return setError('Passwords do not match')
  }

  signUp(email, password)
    .then(() =>{
      setLoading(false)
      history.push("/")
    })
    .catch((err) => {
      setError(err.message)
      setLoading(false)
    })
}

return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="full-logo">
          <img src={fullLogo} alt="full-logo" />
        </div>
        <div>
          <h2>Sign up</h2>
        </div>
        {error && <div className="alert_error"><FaExclamationCircle /> {error}</div>}
        <div className="inputs-wrapper">
          <h3>Email</h3>
          <label>
            <input 
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          </label>
        </div>
        <div className="inputs-wrapper">
          <h3>Password</h3>
          <label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              minLength="6"
              required
              />
          </label>
        </div>
        <div className="inputs-wrapper">
          <h3>Password confirmation</h3>
          <label>
            <input
              type="password"
              onChange={(e) => setPassConfirmation(e.target.value)}
              minLength="6"
              required
              />
          </label>
        </div>
        <div>
          <button 
            className="signup"
            type="submit"
            disabled={loading}
          >Sign Up</button>
        </div>
        <div className="helper-block">
          <h3>Already signed up? <Link to="/login">Go to login</Link></h3>
        </div>
      </form>
    </div>
  ) 
}

