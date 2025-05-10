import React from "react";
import Empty from "../Empty/Empty";
import SocialItem from "./SocialItem";
import "./SocialItem.css";

export default function SocialItems({ links }) {
  if (!links) {
    // Если links не определены, возвращаем пустой компонент
    return <Empty text="Ссылки отсутствуют" />;
  }

  return (
    <div className="social-items">
      {links.length > 0 ? (
        <>
          {links.map((link) => (
            <SocialItem key={link._id} link={link} />
          ))}
        </>
      ) : (
        <Empty text="Ссылки отсутствуют" />
      )}
    </div>
  );
}