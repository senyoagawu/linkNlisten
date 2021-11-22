import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import * as authActions from "./actions/auth";
// import {LoginForm, SignUpForm, EditProfileForm}  from "./Components/Pages/Forms";
// import Login from './Components/Forms/Login'
// import Signup from './Components/Views/Signup'
import Splash from "./Components/Views/Splash";
import { PrivateRoute, AuthRoute } from "./utils/routes";
import Home from "./Components/Views/Home";
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
  const defaultToken = () =>
    localStorage.access_token ? localStorage.access_token : null;

  // window.user = user;

  // const [userState, setUser] = useState(user ? JSON.parse(user) : user);
  // const [tokenState, setTokenState] = useState(access_token);
  // initial load

  const [user, setUser] = useState(defaultUser());
  const [posts, setPosts] = useState([]);
  const [interests, setInterests] = useState([]);
  const [token, setToken] = useState(defaultToken());

  // const setState = (user, token, interests, posts) => {
  //   setUser(user || defaultUser());
  //   setToken(token || defaultToken());
  //   setInterests(interests || []);
  //   setPosts(posts || []);
  //   return { user, token, interests, posts };
  // };

  const loggedIn = () => user !== null;

  const [state, setState] = useState({
    user,
    token,
    posts: [],
    interests: [],
    loggedIn,
  });

  useEffect(() => {
    (async () => {
      window.loginUser = authActions.loginUser;
      window.signupUser = authActions.signupUser;
      window.logoutUser = authActions.logoutUser;
      window.loginDemo = authActions.loginDemo;

      // const { interests } = await getSubscribedInterests(user?.email);
      // const { posts } = await getPosts(user?.email);
      // const { individual_posts: individualPosts } = await getIndividualPosts(
      //   user?.email
      // );
      //this converts backend from array to obj
      // [{id: 1, name: name}, ...] -> {id: [name, isUserSubscribed], ...}
      // interests.forEach(i => tally[i.id]= [i.name, false])
      // setInterests(interests);
      // setPosts(posts);
      // setState({ user, token, loggedIn, interests, posts, individualPosts });
    })();
  }, []);

  const [modalStates, setModal] = useState({
    whichModal: undefined,
  });

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          state,
          setState,
          setModal,
          modalStates,
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
        <Navbar setModal={setModal} loggedIn={loggedIn} />

        <Switch>
          <AuthRoute path="/splash" component={Splash} loggedIn={loggedIn()} />

          <PrivateRoute
            exact
            path="/interests"
            components={Interests}
            loggedIn={loggedIn()}
          />
          <PrivateRoute path="/" components={Home} loggedIn={loggedIn()} />
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  );
};
