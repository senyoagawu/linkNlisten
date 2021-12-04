import React, { useEffect, useState, useRef, useContext } from "react";
import { AppContext } from "../../App";
import { NavBarButton } from "../Buttons";
import DropdownMenu from "./DropdownMenu";
const gear = <image alt="open menu icon" src="/static/gear.png"></image>;
export default function Dropdown() {
  const {
    slices: { user },
  } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const loggedIn = user !== null;
  useEffect(() => {
    const closeMenu = (event) => {
      if (ref.current.contains(event.target)) return;
      setOpen(false);
    };

    document.body.addEventListener("click", closeMenu);

    // cleanup function
    return () => {
      document.body.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <div ref={ref}>
      <NavBarButton
        onPrivate={true}
        explanation="click to open menu"
        text="menu"
        action={() => setOpen(true)}
        svg={gear}
      />
      {open && <DropdownMenu />}
    </div>
  );
}
