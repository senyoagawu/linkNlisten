import React, { useEffect, useState, useRef, useContext } from "react";
import { AppContext } from "../../App";
import Button, { NavBarButton } from "../Buttons";
import DropdownMenu from "./DropdownMenu";
const hamburger = (
  <img
    style={{
      height: 40,
      height: 40,
      padding: "0 15px",
      boxSizing: "border-box",
    }}
    alt="open menu icon"
    src="/static/hamburger.png"
  ></img>
);
export default function Dropdown() {
  const {
    slices: { user },
  } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const loggedIn = user !== null;
  useEffect(() => {
    const closeMenu = (event) => {
      if (ref && ref.current && ref.current.contains(event.target)) return;
      setOpen(false);
    };

    document.body.addEventListener("click", closeMenu);

    // cleanup function
    return () => {
      document.body.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <>
      <li ref={ref}>
        <Button action={() => setOpen(true)} svg={hamburger} />
        {/* <NavBarButton
          ref={ref}
          onPrivate={true}
        /> */}
      </li>
      {open && <DropdownMenu />}
    </>
  );
}
