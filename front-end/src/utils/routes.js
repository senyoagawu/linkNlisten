import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, user, ...rest }) => {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={(props) =>
        user === null ? <Redirect to="/splash" /> : <Component {...props} />
      }
    />
  );
};

export const AuthRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user !== null ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
