import React from "react";
import Empty from "../Empty/Empty";
import SocialItem from "./SocialItem";
import "./SocialItem.css";
export default function SocialItems({ links }) {
  return (
    <div className="social-items">
      {links.length === 0 ? (
        <Empty text="Социальные сети отсутствуют" />
      ) : (
        <>
          {links.map((link) => (
            <SocialItem key={link._id} link={link} />
          ))}
        </>
      )}
    </div>
  );
}
