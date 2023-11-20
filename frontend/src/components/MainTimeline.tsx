"use client";
import React from "react";
import TweetBox from "./children/MainTimeline/TweetBox";
import Tweet from "./children/MainTimeline/Tweet";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export default function MainTimeline() {
  const selected = useSelector((state: RootState) => state.timeline);

  return (
    <div className="main-timeline">
      <TweetBox />
      {selected
        .map((tweetInfo, index) => (
          <Tweet
            name={tweetInfo.displayName}
            pfp={tweetInfo.pfp}
            username={tweetInfo.username}
            timestamp={tweetInfo.timestamp}
            key={index}
          >
            {tweetInfo.content}
          </Tweet>
        ))
        .reverse()}
    </div>
  );
}
