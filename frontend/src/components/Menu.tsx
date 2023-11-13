"use client";
import React, { ReactNode } from "react";
import "../styles/layout.css";
import "../styles/font.css";
import "../styles/icon.css";
import "../styles/button.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import twitterLogo from "../../public/twitter-logo.svg";
import seiPfp from "../../public/example pfps/sei pfp.jpeg";
import Image from "next/image";

import type { RootState } from "../app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setSelection } from "../app/redux/slices/selectedPage";

interface OptionProps {
  icon: string;
  children: ReactNode;
  onClick?: () => void;
  isBold?: boolean;
}

interface ProfileButtonProps {
  onClick?: () => any;
  profileName: string;
  username: string;
}

function Option(props: OptionProps) {
  return (
    <div
      className="flex-row align-center justify-start sidebar-button"
      onClick={props.onClick}
    >
      <i className={`${props.icon} menu-icon`} />
      <p
        className={`margin-vertical-medium margin-horizontal-x-large font-large ${
          props.isBold ? "font-bold" : "font-light"
        }`}
      >
        {props.children}
      </p>
    </div>
  );
}

function ProfileButton(props: ProfileButtonProps) {
  return (
    <div
      className="flex-row align-center justify-space-between profile-button"
      onClick={props.onClick}
    >
      <div className="flex-row align-center justify start overflow-hidden">
        <Image src={seiPfp} alt="profile picture" className="profile-icon" />
        <div className="flex-column">
          <p className="font-medium margin-null font-bold">
            {props.profileName}
          </p>
          <p className="font-medium margin-null">{props.username}</p>
        </div>
      </div>
      <i className="bi bi-three-dots" />
    </div>
  );
}

export default function Menu() {
  const selected = useSelector(
    (state: RootState) => state.selectedPage.selected
  );
  const dispatch = useDispatch();

  const menuOptions = [
    "Home",
    "Explore",
    "Notifications",
    "Messages",
    "Lists",
    "Bookmarks",
    "Profile",
    "More",
  ];

  type MapMenuOptionsToIcons = {
    [key in (typeof menuOptions)[number]]: string[];
  };

  const mapMenuOptionsToIcons: MapMenuOptionsToIcons = {
    Home: ["bi-house-door", "bi-house-door-fill"],
    Explore: ["bi-search", "bi-search-heart-fill"],
    Notifications: ["bi-bell", "bi-bell-fill"],
    Messages: ["bi-chat-left-dots", "bi-chat-left-dots-fill"],
    Lists: ["bi-file-text", "bi-file-text-fill"],
    Bookmarks: ["bi-bookmark", "bi-bookmark-fill"],
    Profile: ["bi-person", "bi-person-fill"],
    More: ["bi-gear", "bi-gear-fill"],
  };

  return (
    <div className="flex-column menu-size justify-space-between">
      <div className={`flex-column`}>
        <div
          className="twitter-button"
          onClick={() => dispatch(setSelection("home"))}
        >
          <Image
            src={twitterLogo}
            alt="Twitter logo"
            className="twitter-icon"
          />
        </div>
        {menuOptions.map((option) => (
          <Option
            icon={`bi ${
              selected === option.toLowerCase()
                ? mapMenuOptionsToIcons[option][1]
                : mapMenuOptionsToIcons[option][0]
            }`}
            onClick={() => dispatch(setSelection(option.toLowerCase()))}
            isBold={selected === option.toLowerCase()}
            key={option.toLowerCase()}
          >
            {option}
          </Option>
        ))}

        <button
          className="tweet-button"
          onClick={() => window.alert("tweeted")}
        >
          Tweet
        </button>
      </div>
      <ProfileButton
        profileName="Seibast"
        username="@seibast"
        onClick={() => window.alert("This will take to profile settings")}
      />
    </div>
  );
}
