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
import { getUsersList } from "./actions/auth";
import { getSubscribedInterests, getPosts, getPost } from "./utils/ajax";
import Navbar from "./Components/Navbar";
import * as postActions from "./actions/posts";
export const AppContext = createContext();
export const TabContext = createContext();
export const UIContext = createContext();
export const PostContext = createContext();

export const App = (props) => {
  const defaultUser = () =>
    localStorage.user ? JSON.parse(localStorage.user) : null;

  const [user, setUser] = useState(defaultUser());
  const [posts, setPosts] = useState([]);
  const [interests, setInterests] = useState([]);
  const [token, setToken] = useState(null);

  const [usersList, setUsersList] = useState([]);
  const [post, setPost] = useState({});
  const [refresh, setRefresh] = useState(false);
  const loggedIn = user !== null;
  const [uiMessage, setUiMessage] = useState("");
  const [currentModal, setModal] = useState(null);

  const [selectedTab, setSelectedTab] = useState("posts");
  // useEffect(async () => {
  //   const { interests: data } = await getInterests();
  //   setInterests(data);
  // });
  useEffect(() => {
    async function fetchUsersList() {
      const users = await getUsersList();
      setUsersList(users);
    }
    fetchUsersList();
  }, []);

  const rerender = () => setRefresh((prev) => !prev);

  return (
    <BrowserRouter>
      <UIContext.Provider value={{ uiMessage, setUiMessage }}>
        <PostContext.Provider value={{ post, setPost }}>
          <AppContext.Provider
            value={{
              ui: {
                setModal,
                currentModal,
                rerender,
              },

              slices: {
                user,
                token,
                loggedIn,
                interests,
                posts,
                usersList,
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
              <TabContext.Provider
                value={{
                  selectedTab,
                  setSelectedTab,
                }}
              >
                <AuthRoute
                  path="/splash"
                  component={Splash}
                  loggedIn={loggedIn}
                />
                <PrivateRoute
                  exact
                  path="/interests"
                  loggedIn={loggedIn}
                  component={Interests}
                  // interests={interests}
                />
                <PrivateRoute
                  exact
                  path="/interests/:interestId"
                  loggedIn={loggedIn}
                  component={Interests}

                  // interests={interests}
                />
                <PrivateRoute
                  exact
                  path="/"
                  loggedIn={loggedIn}
                  component={Home}
                />
              </TabContext.Provider>
            </Switch>
          </AppContext.Provider>
        </PostContext.Provider>
      </UIContext.Provider>
    </BrowserRouter>
  );
};
