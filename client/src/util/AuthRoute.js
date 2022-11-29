import { AuthContext } from "../context/auth";
import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
        render={(props) =>
        user ? <Navigate to="/" /> : <Component {...props} />
      }
    />
  );
}
export default AuthRoute;