import React, { useContext } from "react";
import "./Splash.module.css";
import { useHistory, NavLink } from "react-router-dom";
import { AppContext } from "../App";
import NavbarLI from "./NavbarLi";
import { homeSvg, interestsSvg } from "../svgs";
import { ProtectedRoute } from "../utils/routes";
import {
  LoginButton,
  SignupButton,
  DemoLoginButton,
  LogoutButton,
} from "./Buttons";

export default function Navbar() {
  const { setModal, loggedIn } = useContext(AppContext);
  // const modalMap = {
  //   login: <Login setModal={setModal} />,
  //   signup: <Signup setModal={setModal} />,
  //   "": null,
  // };

  const onclick = (e) => {
    setModal({
      whichModal: e.target.id,
    });
  };
  let history = useHistory();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/splash";
  };
  return (
    <>
      <nav>
        <ul>
          <NavbarLI>
            <NavLink
              to={loggedIn ? "/" : "/splash"}
              exact={true}
              activeClassName="active"
            >
              <img className="logo" src="favicon.ico" alt="sweetlogo.navbar" />
              {loggedIn ? "Home" : "Splash"}
            </NavLink>
          </NavbarLI>

          <NavbarLI onlyPrivate={true}>
            <NavLink to="/interests" exact={true} activeClassName="active">
              Interests
            </NavLink>
          </NavbarLI>
          <NavbarLI>
            <LoginButton />
          </NavbarLI>
          <NavbarLI>
            <SignupButton />
          </NavbarLI>
          <NavbarLI>
            <DemoLoginButton />
          </NavbarLI>
          <NavbarLI>
            <LogoutButton />
          </NavbarLI>
        </ul>
      </nav>
    </>
  );
}

// return (
//     <>
//       <nav>
//         <ul>
//           <NavbarLI>
//             <NavLink
//               to={loggedIn ? "/" : "/splash"}
//               exact={true}
//               activeClassName="active"
//             >
//            <img className="logo" src="favicon.ico" lt="sweetlogo.navbar" />
//               {loggedIn ? "Home" : "Splash"}
//             </NavLink>
//           </NavbarLI>
//           <NavbarLI>
//             <NavLink
//               to="/interests"
//               exact={true}
//               activeClassName="active"
//             >
//            <img className="logo" src="favicon.ico" lt="sweetlogo.navbar" />
//               {loggedIn ? "Home" : "Splash"}
//             </NavLink>
//           </NavbarLI>

//   return loggedIn ? (
//     <div className={styles.navbar_container}>
//       <div className="splash navbar_logo">
//         <img
//           className={styles.logo}
//           src="/assets/images/2.png"
//           alt="sweetlogo"
//         />
//       </div>
//       <div>
//         <div className={styles.splash_links}>
//           <a
//             className="splash navbar_links navbar_link_about"
//             id="about"
//             href="http://sdkag.github.io"
//           >
//             about
//           </a>
//           <div
//             className="splash navbar_links navbar_link_login"
//             id="profile"
//             onClick={onclick}
//           >
//             profile
//           </div>
//           <div
//             className="splash navbar_links navbar_link_login"
//             id="logout"
//             onClick={logout}
//           >
//             logout
//           </div>
//           <div
//             className="splash navbar_links navbar_link_signup"
//             id=""
//             onClick={onclick}
//           >
//             home
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className={styles.navbar_container}>
//       <div
//         className="splash navbar_logo"
//         onClick={() => {
//           history.push("/");
//         }}
//       >
//         <img
//           className={styles.logo}
//           src="/assets/images/2.png"
//           alt="sweetlogo"
//         />
//       </div>
//       <div className={styles.splash_links}>
//         <a
//           className="splash navbar_links navbar_link_about"
//           id="about"
//           href="http://sdkag.github.io"
//         >
//           about
//         </a>
//         <div
//           className="splash navbar_links navbar_link_login"
//           id="login"
//           onClick={onclick}
//         >
//           login
//         </div>
//         <div
//           className="splash navbar_links navbar_link_signup"
//           id="signup"
//           onClick={onclick}
//         >
//           signup
//         </div>
//       </div>
//     </div>
//           <NavbarLI onlyPrivate={true}>
// +            <NavLink to="/interests" exact={true} ctiveClassName="active">
//               Interests
//             </NavLink>
//           </NavbarLI>
//           <NavbarLI onlyPrivate={true}>
// +            <NavLink to="/groups" exact={true} ctiveClassName="active">
//               Groups
//             </NavLink>
//           </NavbarLI>
//           <LoginButton />
//           <SignupButton />
//           <DemoLoginButton />
//           <LogoutButton />
//         </ul>
//       </nav>
//     </>
//    ;
// };
// -
// -export default Navbar;
// +}
// diff --git a/front-end/src/Components/Views/Home.js b/front-end/src/Components/Views/Home.js
// index 148c8ea..e0d041f 100644
// --- a/front-end/src/Components/Views/Home.js
// +++ b/front-end/src/Components/Views/Home.js
// @@ -7,7 +7,7 @@ import Post from "../Forms/CreatePost";
//  import styles from "./Home.module.css";
//  import Sidebar from "../Sidebar";
//  import {
// -  getInterestsFollowed,
// +  getSubscribedInterests,
//    getPosts,
//    getIndividualPosts,
//  } from "../../utils/ajax";
// diff --git a/front-end/src/utils/ajax.js b/front-end/src/utils/ajax.js
// index e0ba75d..e97ba8f 100644
// --- a/front-end/src/utils/ajax.js
// +++ b/front-end/src/utils/ajax.js
// @@ -59,7 +59,7 @@ export const getUsersEmails = () => {
//    return myGet(backendUrl + "/users");
//  };

// -export const getInterestsFollowed = (email) => {
// +export const getSubscribedInterests = (email) => {
//    //!how is this working (asynchronicity)
//    // if (!email) return;
//    return myGet(backendUrl + `/interests/${email}/`);
// @@ -95,3 +95,5 @@ export const editPost = (postId, userId, data) => {
//  export const deletePost = (postId, userId) => {
//    return myDelete(backendUrl + `/posts/${postId}/${userId}`);
//  };
// +
// +loginDemo;
