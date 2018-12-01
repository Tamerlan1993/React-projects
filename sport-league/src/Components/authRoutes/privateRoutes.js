import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoutes({ user, component: Comp, ...rest }) {
  return (
    <Route
      {...rest}
      component={props => {
        return user ? <Comp {...props} user={user} /> : <Redirect to="/signin" />;
      }}
    />
  );
}

export default PrivateRoutes;
