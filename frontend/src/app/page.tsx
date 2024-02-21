import React from "react";
import "../styles/layout.css";
import "../styles/icon.css";
import "../styles/font.css";
import "../styles/button.css";
import Image from "next/image";
import twitterLogo from "../../public/twitter-logo.svg";

export default function Welcome() {
  return (
    <div className="flex-column justify-center" style={{ height: "100vh" }}>
      <div className="flex-row justify-space-evenly">
        <div className="flex-column justify-center">
          <Image
            className="twitter-icon-gigantic"
            src={twitterLogo}
            alt="Big Twitter Logo"
          />
        </div>
        <div className="flex-column justify-start align-baseline">
          <h1 className="font-gigantic">Happening now</h1>
          <div className="flex-column">
            <h2 className="font-xx-large">Sign up today</h2>
            <button className="create-account-button">Create account</button>
            <h2 className="font-large">Already have an account?</h2>
            <button className="login-button">Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
}
