"use client";
import Image from "next/image";
import React, { TextareaHTMLAttributes, useRef, useState } from "react";
import seiIcon from "../../../../public/example pfps/sei pfp.jpeg";

export default function TweetBox() {
  const mapTweetAttachmentIconsToPurpose: { [key: string]: string } = {
    "bi-image": "Media",
    "bi-filetype-gif": "GIF",
    "bi-list-ul": "Poll",
    "bi-emoji-smile": "Emoji",
    "bi-calendar4-event": "Schedule",
    "bi-geo-alt": "Geolocation",
  };

  function setTextAreaHeight(event: any) {
    const { target: textArea } = event;

    textArea.style.height = "0px";
    textArea.style.height = textArea.scrollHeight + "px";
  }

  return (
    <div className="flex-row tweet-box">
      <div>
        <Image src={seiIcon} alt="posting icon" className="profile-icon" />
      </div>
      <div className="flex-column tweet-content">
        <textarea
          className="tweet-text font-large font-normal"
          placeholder="What's happening?"
          onInput={setTextAreaHeight}
        />
        <div className="flex-row align-center tweet-reach">
          <i className="bi bi-globe-americas"></i>
          <p className="margin-null font-bold font-small">Everyone can reply</p>
        </div>
        <div className="flex-row justify-space-between align-baseline tweet-attachments-post">
          <div className="flex-row tweet-attachments">
            {Object.keys(mapTweetAttachmentIconsToPurpose).map((icon) => {
              return (
                <i
                  className={`bi ${icon} attachment-button`}
                  onClick={() =>
                    window.alert(
                      `This button is for ${mapTweetAttachmentIconsToPurpose[icon]}`
                    )
                  }
                  key={icon}
                />
              );
            })}
          </div>
          <button className="send-tweet">Tweet</button>
        </div>
      </div>
    </div>
  );
}
