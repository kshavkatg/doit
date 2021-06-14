import React, { useEffect, createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { auth } from '../firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [uniqueId, setUniqueID] = useState()
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState()
  const history = useHistory()

  const login = (email, pass) => auth.signInWithEmailAndPassword(email, pass)
  
  const signUp = (email, pass) => auth.createUserWithEmailAndPassword(email, pass)

  const ressetPassword = (email) => auth.sendPasswordResetEmail(email)

  const logout = () => {
    auth.signOut()
    localStorage.removeItem("DOIT_id")
    setUniqueID('')
  }
  
  const value = {
    userEmail,
    uniqueId,
    login,
    signUp,
    logout,
    ressetPassword
  }

  useEffect(() => {
    const usubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem("DOIT_id", user.uid)
        setUniqueID(localStorage.getItem("DOIT_id"))
        setUserEmail(user.email)
      }
      setLoading(false)
      history.push('/')
    })

    return usubscribe
  }, [])
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
} 

export const useAuth = () => useContext(AuthContext)