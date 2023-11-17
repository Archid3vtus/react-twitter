import React from "react";
import TweetBox from "./children/MainTimeline/TweetBox";
import Tweet from "./children/MainTimeline/Tweet";

import lvcasPfp from "../../public/example pfps/lvcas pfp.jpg";

export default function MainTimeline() {
  const rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" });
  const relativeReference = ["seconds", "minutes", "hours"];

  const dateNow = new Date();
  const dateThen = new Date("2023-11-16T21:40:00.000Z");
  let relativeDate = (+dateThen - +dateNow) / 1000;
  let referenceIndex = 0;

  while (referenceIndex < 3 && Math.sqrt(relativeDate ** 2) > 60) {
    relativeDate = relativeDate / 60;
    referenceIndex++;
  }

  return (
    <div className="main-timeline">
      <TweetBox />
      <Tweet
        name="Lvcas"
        username="@GermanLvcas"
        pfp={lvcasPfp}
        timeAgo={rtf.format(
          Math.floor(relativeDate),
          relativeReference[referenceIndex] as any
        )}
      >
        singlehandedly preventing my whole family from failing math class
      </Tweet>
    </div>
  );
}
