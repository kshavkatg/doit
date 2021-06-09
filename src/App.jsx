import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './context'
import { Main } from './Main';
import { Signup }  from './components/Signup'
import { Login } from './components/Login';
import PrivateRoute from './components/PrivateRoute';

export const App = () => (
  <Router>
    <AuthProvider>
      <Switch>
        <PrivateRoute exact path="/" component={Main} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </AuthProvider>
  </Router>
);  

