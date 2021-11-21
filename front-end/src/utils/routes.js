import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ components: { C1, C2, C3 }, ...rest }) => {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={(props) =>
        !rest.loggedIn ? (
          <Redirect to="/splash" />
        ) : (
          <>
            <C1 {...props} />
            <C2 {...props} />
            <C3 {...props} />
          </>
        )
      }
    />
  );
};

export const AuthRoute = ({ component: { C1, `C2, C3 }, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.loggedIn ? (
          <Redirect to="/" />
        ) : (
          <>
            <C1 {...props} />
            <C2 {...props} />
            <C3 {...props} />
          </>
        )
      }
    />
  );
};
