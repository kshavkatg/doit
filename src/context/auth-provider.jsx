import React, { useEffect, createContext, useContext, useState } from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [uniqueId, setUniqueId] = useState('')

  const login = (email, pass) => auth.signInWithEmailAndPassword(email, pass)
  
  const signUp = (email, pass) => auth.createUserWithEmailAndPassword(email, pass)

  const logout = () => {
    auth.signOut()
    setUniqueId('')
  }
  
  const value = {
    uniqueId,
    login,
    signUp,
    logout
  }

  useEffect(() => {
    const usubscribe = auth.onAuthStateChanged(user => user && setUniqueId(user.uid))

    return usubscribe
  }, [])
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)