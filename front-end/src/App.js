import React, { useState, useEffect, createContext } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import * as authActions from "./actions/auth";
import Splash from "./Components/Views/Splash";
import { PrivateRoute, AuthRoute } from "./utils/routes";
import Home from "./Components/Views/Home";
import Modal from "./Components/Modal";
import Sidebar from "./Components/Sidebar";
import Ridebar from "./Components/Ridebar";
import Interests from "./Components/Views/Interests";
import { getInterests } from "./actions/interests";
import {
  getSubscribedInterests,
  getPosts,
  getIndividualPosts,
} from "./utils/ajax";
import Navbar from "./Components/Navbar";
export const AppContext = createContext();

export const App = (props) => {
  const defaultUser = () =>
    localStorage.user ? JSON.parse(localStorage.user) : null;

  const [user, setUser] = useState(defaultUser());
  const [posts, setPosts] = useState([]);
  const [interests, setInterests] = useState([]);
  const [token, setToken] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const loggedIn = user !== null;

  const [currentModal, setModal] = useState(null);

  // useEffect(async () => {
  //   const { interests: data } = await getInterests();
  //   setInterests(data);
  // });

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          ui: {
            setModal,
            currentModal,
            refresh,
          },

          slices: {
            user,
            token,
            loggedIn,
            interests,
            posts,
          },

          stateSetters: {
            setInterests,
            setPosts,
            setUser,
            setToken,
            setRefresh,
          },
        }}
      >
        <Navbar loggedIn={loggedIn} />
        <Modal />
        <Switch>
          <AuthRoute path="/splash" component={Splash} loggedIn={loggedIn} />
          <PrivateRoute
            path="/interests"
            loggedIn={loggedIn}
            component={Interests}
            // interests={interests}
          />
          <PrivateRoute exact path="/" loggedIn={loggedIn} component={Home} />
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  );
};
