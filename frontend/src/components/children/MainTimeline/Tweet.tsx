import Image, { StaticImageData } from "next/image";
import React, { ReactNode } from "react";

interface tweetProps {
  children: ReactNode;
  pfp: StaticImageData;
  name: string;
  username: string;
  timestamp: string;
}

export default function Tweet(props: tweetProps) {
  const rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" });
  const relativeReference = ["seconds", "minutes", "hours"];

  const dateNow = new Date();
  const dateThen = new Date(props.timestamp);
  let relativeDate = (+dateThen - +dateNow) / 1000;
  let referenceIndex = 0;

  while (referenceIndex < 3 && Math.sqrt(relativeDate ** 2) > 60) {
    relativeDate = relativeDate / 60;
    referenceIndex++;
  }

  return (
    <div className="flex-row tweet">
      <div>
        <Image className="profile-icon" src={props.pfp} alt="profile picture" />
      </div>{" "}
      {/*profile picture*/}
      <div className="flex-column tweet-text-content">
        <div className="flex-row align-center tweet-post-user-container">
          <p className="tweet-post-display-name margin-null">{props.name}</p>
          <p className="tweet-post-username font-gray margin-null">
            {props.username}
          </p>
          <i className="tweet-post-dot bi bi-dot font-gray margin-null"></i>
          <p className="tweet-post-timeago font-gray margin-null">
            {rtf.format(
              Math.floor(relativeDate),
              relativeReference[referenceIndex] as any
            )}
          </p>
        </div>
        <p className="tweet-post-text margin-null">{props.children}</p>
        <div className="flex-row justify-space-between tweet-interaction-icons">
          <i className="bi bi-chat font-gray"></i>
          <i className="bi bi-repeat font-gray"></i>
          <i className="bi bi-star font-gray"></i>
          <i className="bi bi-share font-gray"></i>
        </div>
      </div>
    </div>
  );
}
