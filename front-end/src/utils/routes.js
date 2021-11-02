import React from "react";
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(rest)
  return (
    <Route {...rest} render={(props) => (
      !rest.loggedIn

      ? <Redirect to="/splash" />
      : <Component {...props} />
    )} />
  )
}

export const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      rest.loggedIn
      ? <Redirect to="/" />
      : <Component {...props} />
    )} />
  )
}