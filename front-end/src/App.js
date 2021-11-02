import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
// import {LoginForm, SignUpForm, EditProfileForm}  from "./Components/Pages/Forms";
// import Login from './Components/Forms/Login'
// import Signup from './Components/Views/Signup'
import Splash from "./Components/Views/Splash";
import { PrivateRoute, AuthRoute } from "./utils/routes";
import Home from "./Components/Views/Home";
// import {getInterests} from './utils/ajax'
import {
  getInterestsFollowed,
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

  const loggedIn = () => user.loggedIn !== null;

  const [state, setState] = useState({
    user,
    token,
    posts: [],
    interests: [],
  });

  useEffect(() => {
    (async () => {
      debugger;
      const { interests } = await getInterestsFollowed(user?.email);
      const { posts } = await getPosts(user?.email);
      const { individual_posts: individualPosts } = await getIndividualPosts(
        user?.email
      );
      //this converts backend from array to obj
      // [{id: 1, name: name}, ...] -> {id: [name, isUserSubscribed], ...}
      // interests.forEach(i => tally[i.id]= [i.name, false])
      setInterests(interests);
      setPosts(posts);
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
          stateSetters: { setInterests, setPosts, setUser, setToken },
        }}
      >
        <Navbar setModal={setModal} loggedIn={loggedIn} />
        <Switch>
          <AuthRoute path="/splash" component={Splash} loggedIn={loggedIn()} />

          {/* <AuthRoute exact path='/' component={Home} />
        <Route path='/splash' component={Splash} /> */}
          {/* <AuthRoute
          path="/splash"
          render={(props)=> <Splash {...props} loggedIn={loggedIn} setUser={setUser} userState={userState} setTokenState={setTokenState}/>}
        /> */}
          <PrivateRoute exact path="/" component={Home} loggedIn={loggedIn()} />
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  );
};
