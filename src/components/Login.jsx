/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { auth } from '../firebase'

export const Login = ({setUser}) => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const handleLogIn = (em, pass) => {
  const promise = auth.signInWithEmailAndPassword(em, pass)
  promise
    .then(()=> setUser(true))
    .catch(e => console.log(e.massage))
}

const handleSignUp = (em, pass) => {
  auth.createUserWithEmailAndPassword(em, pass)
    .catch(e => console.log(e.massage))
}

// const handleLogOut = () => auth.signOut()

auth.onAuthStateChanged(user => {
  if (user) {
    setUser(true)
    console.log(user.uid)
  } else {
    setUser(false)
    console.log('not logged in')
  }
})



return  (
    <div className="login-wrapper">
      <form>
        <div className="inputs-wrapper">
          <label>
            <input 
              type="text"
              placeholder="email" 
              onChange={(e) => setEmail(e.target.value)}
              />
          </label>
          <label>
            <input
              type="password"
              placeholder="password" 
              onChange={(e) => setPassword(e.target.value)}
              />
          </label>
        </div>
        <div>
          <button 
            className="login"
            type="button"
            onClick={() => {
              handleLogIn(email, password)
              setEmail('')
              setPassword('')
            }}
          >Log In</button>
          <button 
            className="signup"
            type="button"
            onClick={() => {
              handleSignUp(email, password)
              setEmail('')
              setPassword('')
            }}
          >Sign Up</button>
        </div>
      </form>
    </div>
  ) 
}

