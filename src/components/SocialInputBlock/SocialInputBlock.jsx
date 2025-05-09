import React from "react";
import Button from "../Buttons/Button";
import { API_URL } from "../../http/axios";
import SocialItem from "../SocialItem/SocialItem";
import SocialItems from "../SocialItem/SocialItems";

export default function SocialInputBlock({
  socialLinks,
  handleSocialIconChange,
  handleSocialUrlChange,
  handleAddSocialLink,
  handleRemoveSocialLink,
  handleSubmitSocialLinks,
  store,
}) {
  return (
    <div>
      <div
      className="block-background"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        <h3>Социальные сети</h3>
        <SocialItems links={store.company.socialLinks} />
        {socialLinks.map((link, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", width: "50%" }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleSocialIconChange(index, e.target.files[0])}
              style={{ marginRight: 10 }}
            />
            <input
              type="text"
              placeholder="Ссылка на соц.сеть"
              value={link.url}
              onChange={(e) => handleSocialUrlChange(index, e.target.value)}
              style={{ marginRight: 10, flex: 1 }}
            />
            <Button onClick={() => handleRemoveSocialLink(index)}>
              Удалить
            </Button>
          </div>
        ))}
        {socialLinks.length < 10 && (
          <Button onClick={handleAddSocialLink} style={{ marginTop: 10 }}>
            +
          </Button>
        )}
        {socialLinks.length > 0 && (
          <Button onClick={handleSubmitSocialLinks}>Отправить</Button>
        )}
      </div>
    </div>
  );
}
