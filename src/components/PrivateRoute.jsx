/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { uniqueId } = useAuth()
  console.log(uniqueId)
  return (
    <Route
      {...rest}
      render={props => uniqueId ? <Component {...props} /> : <Redirect to="/login" />}
    />
  )
}