import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
// import {LoginForm, SignUpForm, EditProfileForm}  from "./Components/Pages/Forms";
// import Login from './Components/Forms/Login'
// import Signup from './Components/Views/Signup'
import Splash from "./Components/Views/Splash";
import { PrivateRoute, AuthRoute } from "./utils/routes";
import Home from "./Components/Views/Home";
// import {getInterests} from './utils/ajax'
import {getInterestsFollowed, getPosts, getIndividualPosts} from './utils/ajax'


export const AppContext = createContext()


export const App = (props) => {
  let {user, access_token:token} = localStorage
  if (user) user = JSON.parse(user) 
  const loggedIn = !!token;
  console.log(loggedIn)

  // const [userState, setUser] = useState(user ? JSON.parse(user) : user);
  // const [tokenState, setTokenState] = useState(access_token);
  
  const [state, setState] = useState({
    user,
    token,
    loggedIn,
    posts: [],
    interests: []
  })
  
  useEffect(()=> {
    (async () => {
      // const tally = {}
      // const {interests} = await getInterests();
      const {interests} = await getInterestsFollowed(user?.email);
      const {posts} = await getPosts(user?.email);
      const {individual_posts:  individualPosts} = await getIndividualPosts(user?.email);
      debugger
      //this converts backend from array to obj
      // [{id: 1, name: name}, ...] -> {id: [name, isUserSubscribed], ...}
      // interests.forEach(i => tally[i.id]= [i.name, false]) 
      setState({user, token, loggedIn,  interests, posts, individualPosts})})();
  }, [])
  

  return (
    <BrowserRouter>
      <Switch>
        <AppContext.Provider value={{state, setState}}>

          <AuthRoute path='/splash' component={Splash} loggedIn={state.loggedIn} />

        {/* <AuthRoute exact path='/' component={Home} />
        <Route path='/splash' component={Splash} /> */}
        {/* <AuthRoute
          path="/splash"
          render={(props)=> <Splash {...props} loggedIn={loggedIn} setUser={setUser} userState={userState} setTokenState={setTokenState}/>} 
        /> */}
          <PrivateRoute exact path="/" component={Home} loggedIn={state.loggedIn} />
        </AppContext.Provider>
      </Switch>
    </BrowserRouter>

  );
};
