import React from "react";
import * as PATHS from "../../utils/paths";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../context/User.context";

function AdminRoute(props) {
  const { exact, path, component, ...componentProps } = props;

  const { user } = React.useContext(UserContext);
  if (!user) {
    return <Redirect to={PATHS.LOGIN_PAGE} />;
  }

  if (user.role !== "admin") {
    return <Redirect to={PATHS.HOME_PAGE} />;
  }

  const Component = component;

  return (
    <Route
      exact={exact}
      path={path}
      render={(reactRouterProps) => (
        <Component {...reactRouterProps} {...componentProps} user={user} />
      )}
    />
  );
}

export default AdminRoute;
