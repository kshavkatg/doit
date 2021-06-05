/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'

export const Login = () => {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
console.log(`username: ${username} password: ${password}`)

return  (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
        <label>
          <input 
            type="text"
            placeholder="username" 
            onChange={(e) => setUsername(e.target.value)}
            />
        </label>
        <label>
          <input
            type="password"
            placeholder="password" 
            onChange={(e) => setPassword(e.target.value)}
            />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  ) 
}

