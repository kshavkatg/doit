/* eslint-disable no-unused-expressions */
import React, { useEffect, createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { auth } from '../firebase'

export const AuthContext = createContext()

// const getUid = () => {
//   return localStorage.getItem("DOIT_id")
// }

// const setUid = () => {
//   return 
// }

export const AuthProvider = ({ children }) => {
  const [uniqueId, setUniqueID] = useState()
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const login = (email, pass) => auth.signInWithEmailAndPassword(email, pass)
  
  const signUp = (email, pass) => auth.createUserWithEmailAndPassword(email, pass)

  const logout = () => {
    auth.signOut()
    localStorage.removeItem("DOIT_id")
    setUniqueID('')
  }
  

  const value = {
    uniqueId,
    login,
    signUp,
    logout
  }

  // auth.onAuthStateChanged(user => {
  //   console.log('form provider')
  //   user && localStorage.setItem("DOIT_id", user.uid)
  //   setUniqueID(localStorage.getItem("DOIT_id"))
  //   // console.log(`loading state: ${loading}`)  
  //   // console.log(`unique id: ${uniqueId}`)
  //   setLoading(false)
  //   history.push('/')
  // })

  useEffect(() => {
    const usubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem("DOIT_id", user.uid)
        setUniqueID(localStorage.getItem("DOIT_id"))
        
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