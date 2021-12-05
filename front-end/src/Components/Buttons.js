import React, { useState, forwardRef } from "react";
import { loginDemo, logoutUser } from "../actions/auth";

import NavBarListElement from "./NavbarLi";
export default function Button({
  text,
  explanation,
  isDisabled = false,
  action,
  svg,
}) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowExplanation(true)}
      onMouseLeave={() => setShowExplanation(false)}
    >
      {!isDisabled && showExplanation && <div className="">{explanation}</div>}

      <button
        onClick={() => {
          action && action();
        }}
        type="button"
        disabled={isDisabled}
      >
        {text}
        {svg}
      </button>
    </div>
  );
}

export const NavBarButton = forwardRef(
  ({ onlyPrivate, onlyPublic, text, explanation, action, svg }, ref) => {
    return (
      <NavBarListElement onlyPrivate={onlyPrivate} onlyPublic={onlyPublic}>
        <Button
          text={text}
          explanation={explanation}
          action={action}
          svg={svg || null}
        />
      </NavBarListElement>
    );
  }
);
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
