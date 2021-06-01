import React from "react";
import * as CONSTS from "../utils/consts";
import * as AUTH_SERVICE from "../service/auth.service";

export const UserContext = React.createContext();

function UserWrapper(props) {
  const { children } = props;
  const [user, setUser] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const myAccessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!myAccessToken) {
      return setIsLoading(false);
    }
    AUTH_SERVICE.GET_ME(myAccessToken)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.error(err.response);
        return;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function authenticate(user) {
    setUser(user);
  }

  function logout() {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    setUser(null);
    localStorage.removeItem(CONSTS.ACCESS_TOKEN);
    return AUTH_SERVICE.LOGOUT(accessToken);
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <UserContext.Provider value={{ logout, authenticate, user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserWrapper;

export function useUser() {
  return React.useContext(UserContext);
}
