import React from "react";
import { observer } from "mobx-react-lite";
import { Typewriter } from "react-simple-typewriter";
import { productStore } from "../../main";
import { API_URL } from "../../http/axios";
import "./UploadedMaterial.css";

const MainMaterialDisplay = ({ handleEditClick }) => {
  const renderMedia = () =>
    productStore.mainMaterials.map((item, index) => {
      const url = API_URL + item.mediaUrl;
      const altText = `media-${index}`;

      return (
        <div
          className="media-content"
          key={index}
          onClick={() => handleEditClick(item)}
        >
          {item.mediaType === "image" ? (
            <img src={url} alt={altText} className="uploaded-image" />
          ) : item.mediaType === "video" ? (
            <video
              src={url}
              className="uploaded-video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ width: "100%" }}
              onError={(e) => e.target.style.display = 'none'} // скроет битое медиа
            />
          ) : null}
        </div>
      );
    });

  const firstCaption = productStore.mainMaterials.find((m) => m.caption)?.caption;

  return (
    <div className="uploaded-material-wrapper">
      {renderMedia()}

      {firstCaption && (
        <div className="overlay-text">
          <Typewriter
            words={[firstCaption]}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            delaySpeed={1000}
          />
        </div>
      )}
    </div>
  );
};

export default observer(MainMaterialDisplay);