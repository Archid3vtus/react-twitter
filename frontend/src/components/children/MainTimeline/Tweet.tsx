import Image, { StaticImageData } from "next/image";
import React, { ReactNode, useState } from "react";

interface tweetProps {
  children: ReactNode;
  pfp: StaticImageData;
  name: string;
  username: string;
  timestamp: string;
}

export default function Tweet(props: tweetProps) {
  const [replies, setReplies] = useState(0);
  const [retweets, setRetweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [likeRemoval, setLikeRemoval] = useState(1);
  const [retweetRemoval, setRetweetRemoval] = useState(1);

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

  const mapIconToInteractionButton: { [key: string]: [number, Function] } = {
    "bi-chat": [replies, () => setReplies(replies + 1)],
    "bi-repeat": [
      retweets,
      () => {
        setRetweets(retweets + retweetRemoval);
        setRetweetRemoval(retweetRemoval * -1);
      },
    ],
    "bi-star": [
      likes,
      () => {
        setLikes(likes + likeRemoval);
        setLikeRemoval(likeRemoval * -1);
      },
    ],
    "bi-share": [
      0,
      () => window.alert("Sharing sharing sharing is caring caring caring!!!"),
    ],
  };

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
          {Object.keys(mapIconToInteractionButton).map((icon, index) => (
            <div
              className="flex-row align-center gap-small interaction-button"
              onClick={() => mapIconToInteractionButton[icon][1]()}
              key={index}
            >
              <i className={`bi ${icon} font-gray`} />
              <p className="margin-null font-gray font-small">
                {mapIconToInteractionButton[icon][0] > 0
                  ? mapIconToInteractionButton[icon][0]
                  : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
