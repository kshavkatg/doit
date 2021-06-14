import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationCircle } from 'react-icons/fa'
import { useAuth } from '../context'

export const ForgotPassword = () => {
  const [message, setMessage] = useState('To reset your password, please enter the email address of your DOIT account.')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { ressetPassword } = useAuth()

  function handleSubmit(e) {
  e.preventDefault()

  setError('')
  setLoading(true)

  ressetPassword(email)
    .then(() =>{
      setLoading(false)
      setMessage('Check your inbox for further instructions')
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
          <img src="/images/doit FULL.png" alt="full-logo" />
        </div>
        <div>
          <h2>Forgot your password?</h2>
        </div>
        {error && <div className="alert_error"><FaExclamationCircle />{error}</div>}
        {message && <div className="alert_message">{message}</div>}
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
        <div>
          <button 
            className="login"
            type="submit"
            disabled={loading}
          >Resset my password</button>
        </div>
        <div className="helper-block">
          <h3><Link to="/login">Go to login</Link></h3>
        </div>
      </form>
    </div>
  ) 
}
