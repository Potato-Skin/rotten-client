import React, { useState } from "react";
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
import SingleUserPage from "./pages/SingleUserPage";
import UltraProtectedNoOneCanSee from "./pages/UltraProtectedNoOneCanSee";
import AdminRoute from "./components/routing/AdminRoute";
import UserWrapper from "./context/User.context";
import InboxPage from "./pages/InboxPage";
import axios from "axios";

function App() {
  const [conversations, setConversations] = useState([]);
  function getConversations() {
    const myAccessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!myAccessToken) {
      return;
    }
    axios
      .get(`${CONSTS.SERVER_URL}/conversations`, {
        headers: { authorization: myAccessToken },
      })
      .then((response) => {
        // console.log("response:", response);
        setConversations(response.data);
      });
  }

  React.useEffect(() => {
    let conversationTimer = setInterval(() => {
      getConversations();
    }, 5000);

    return () => clearInterval(conversationTimer);
  }, []);

  return (
    <UserWrapper>
      <Navbar conversations={conversations} />
      <Switch>
        <NormalRoute
          exact
          path={PATHS.HOME_PAGE}
          component={HomePageComponent}
        />

        <NormalRoute exact path={PATHS.LOGIN_PAGE} component={LoginPage} />

        <NormalRoute exact path={PATHS.SIGNUP_PAGE} component={SignupPage} />

        <ProtectedRoute
          exact
          path={PATHS.PROFILE_PAGE}
          component={ProfilePage}
          friendName="Tadej"
        />

        <NormalRoute exact path={PATHS.MOVIES_PAGE} component={MoviesPage} />
        <ProtectedRoute
          exact
          path={PATHS.ADD_MOVIES}
          component={AddMoviePage}
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
        <AdminRoute
          exact
          path={PATHS.SUPER_IMPORTANT}
          component={UltraProtectedNoOneCanSee}
        />
        <ProtectedRoute exact path={PATHS.MESSAGES} component={InboxPage} />
        <NormalRoute
          exact
          path={PATHS.SINGLE_USER}
          component={SingleUserPage}
        />
      </Switch>
    </UserWrapper>
  );
}

export default App;
