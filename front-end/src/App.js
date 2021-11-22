import React, { useState, useEffect, createContext } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import * as authActions from "./actions/auth";
// import {LoginForm, SignUpForm, EditProfileForm}  from "./Components/Pages/Forms";
// import Login from './Components/Forms/Login'
// import Signup from './Components/Views/Signup'
import Splash from "./Components/Views/Splash";
import { PrivateRoute, AuthRoute } from "./utils/routes";
import Home from "./Components/Views/Home";
import Modal from "./Components/Modal";
import Sidebar from "./Components/Sidebar";
import Ridebar from "./Components/Ridebar";
import Interests from "./Components/Views/Interests";
// import {getInterests} from './utils/ajax'
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

  const loggedIn = user !== null;

  const [currentModal, setModal] = useState(null);

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          ui: {
            setModal,
            currentModal,
          },

          slices: {
            user,
            token,
            loggedIn,
            interests,
            posts,
          },
          stateSetters: { setInterests, setPosts, setUser, setToken },
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
          />
          <PrivateRoute exact path="/" loggedIn={loggedIn} component={Home} />
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  );
};
