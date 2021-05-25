import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import NormalRoute from "./components/routing/NormalRoute";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import HomePageComponent from "./pages/HomePage";
import LoginPage from "./pages/Login.page";
import MoviesPage from "./pages/MoviesPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import SingleMoviePage from "./pages/SingleMoviePage";
import AddMoviePage from "./pages/AddMoviePage";
import * as AUTH_SERVICE from "./service/auth.service";
import * as CONSTS from "./utils/consts";
import * as PATHS from "./utils/paths";

function App() {
  const [user, setUser] = React.useState(null);
  const [isCool, setIsCool] = React.useState(true);
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

    if (false) {
      setIsCool(true);
    }
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
    <div>
      <Navbar user={user} logout={logout} />
      <Switch>
        {/* <Route exact path={PATHS.HOME_PAGE} component={HomePageComponent} /> */}
        <NormalRoute
          exact
          path={PATHS.HOME_PAGE}
          component={HomePageComponent}
        />
        {/* <Route
          exact
          path={PATHS.HOME_PAGE}
          render={(reactRouterProps) => (
            <HomePageComponent {...reactRouterProps} />
          )}
        /> */}

        <NormalRoute
          exact
          path={PATHS.LOGIN_PAGE}
          authenticate={authenticate}
          component={LoginPage}
        />

        <NormalRoute
          exact
          path={PATHS.SIGNUP_PAGE}
          authenticate={authenticate}
          component={SignupPage}
        />

        <ProtectedRoute
          // exact={true}
          exact
          path={PATHS.PROFILE_PAGE}
          component={ProfilePage}
          user={user}
          isCool={isCool}
          friendName="Tadej"
          authenticate={authenticate}
        />

        {/* <Route
          exact
          path={PATHS.PROFILE_PAGE}
          render={(reactRouterProps) => (
            <ProfilePage
              {...reactRouterProps}
              user={user}
              isCool={false}
              friendsName="Tadej"
            />
          )}
        /> */}

        <NormalRoute exact path={PATHS.MOVIES_PAGE} component={MoviesPage} />
        <ProtectedRoute
          exact
          path={PATHS.ADD_MOVIES}
          component={AddMoviePage}
          user={user}
        />
        {/* <Route exact path={PATHS.MOVIES_PAGE} component={MoviesPage} /> */}
        {/* <Route exact path="/movies/add" component={AddMoviePage}/> */}
        <NormalRoute
          exact
          path={PATHS.SINGLE_MOVIE}
          component={SingleMoviePage}
        />
        {/* <Route exact path={PATHS.SINGLE_MOVIE} component={SingleMoviePage} /> */}
        {/* <Route exact path="movies/:movieId/edit" component={EditSinglePage}/> */}
        {/* <Route exact path="/:username" component={SingleUserPage}/> */}
      </Switch>
    </div>
  );
}

export default App;
