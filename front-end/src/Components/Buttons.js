import React, { useState } from "react";
import { loginDemo, logoutUser } from "../actions/auth";

import NavBarListElement from "./NavbarLi";
export default function Button({
  text,
  explanation,
  isDisabled = false,
  action,
}) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div
      style={{ border: "1px solid red" }}
      onMouseEnter={() => setShowExplanation(true)}
      onMouseLeave={() => setShowExplanation(false)}
    >
      <div>
        {showExplanation && <div className="">{explanation}</div>}

        <button
          onClick={() => {
            action && action();
          }}
          type="button"
          disabled={isDisabled}
        >
          {text}
        </button>
      </div>
    </div>
  );
}

export const NavBarButton = ({
  onlyPrivate,
  onlyPublic,
  text,
  explanation,
  action,
}) => {
  return (
    <NavBarListElement onlyPrivate={onlyPrivate} onlyPublic={onlyPublic}>
      <Button text={text} explanation={explanation} action={action} />
    </NavBarListElement>
  );
};
export const DemoLoginButton = () => {
  return (
    <NavBarButton
      onlyPublic={true}
      text={"Demo Login"}
      explanation={"click to login as a Demo User"}
      onClick={() => loginDemo()}
      // action={login}
    />
  );
};

export const LoginButton = () => {
  return (
    <NavBarButton
      onlyPublic={true}
      text={"Login"}
      explanation={"click to login"}
      // action={() => getForm("login")}
    />
  );
};
export const SignupButton = () => {
  return (
    <NavBarButton
      onlyPublic={true}
      text={"Signup"}
      explanation={"click to signup"}
      // action={() => getForm("signup")}
    />
  );
};

export const LogoutButton = () => {
  return (
    <NavBarButton
      onlyPrivate={true}
      text={"Logout"}
      explanation={"click to logout"}
      onClick={() => logoutUser()}
    />
  );
};
