import React, { useEffect, createContext, useContext, useState } from 'react'
import { auth } from '../firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()

  const login = (email, pass) => auth.signInWithEmailAndPassword(email, pass)
  
  const signUp = (email, pass) => auth.createUserWithEmailAndPassword(email, pass)

  const logout = () => auth.signOut()
  
  const value = {
    currentUser,
    login,
    signUp,
    logout
  }

  useEffect(() => {
    const usubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return usubscribe
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)