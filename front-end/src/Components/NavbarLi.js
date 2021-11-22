import React, { useContext } from "react";
import { AppContext } from "../App";
export default function NavBarListItem({ onlyPrivate, onlyPublic, children }) {
  const {
    slices: { user, loggedIn },
  } = useContext(AppContext);

  const show = (onlyPrivate, onlyPublic, loggedIn) => {
    if (loggedIn) {
      if (onlyPrivate) {
        return true;
      } else if (onlyPublic) {
        return false;
      } else if (!onlyPublic && !onlyPrivate) {
        return true;
      } else if (onlyPublic && onlyPrivate) {
        return null; /// should never happen
      }
    } else {
      if (onlyPrivate) {
        return false;
      } else if (onlyPublic) {
        return true;
      } else if (!onlyPublic && !onlyPrivate) {
        return true;
      } else if (onlyPublic && onlyPrivate) {
        return null; /// should never happen
      }
    }
  };
  // const show = (private, public, loggedIn) => loggedIn ? (public ? false : private ? true: false) : false

  return show(onlyPrivate, onlyPublic, loggedIn) === true ? (
    <li>{children}</li>
  ) : null;
}
