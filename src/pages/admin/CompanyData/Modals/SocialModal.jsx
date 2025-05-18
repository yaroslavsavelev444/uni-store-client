import { useState } from "react";
import { adminStore, productStore, store } from "../../../../main";
import SocialItems from "../../../../components/SocialItem/SocialItems";
import Button from "../../../../components/Buttons/Button";


export default function SocialModal() {
      const [socialLinks, setSocialLinks] = useState([{ icon: null, url: "" }]);
    // const handleDelete = async () => {
    //     await adminStore.deleteCompany(CompanyData._id);
    //     await productStore.fetchCompany();
    //   };
    
      const handleAddSocialLink = () => {
        setSocialLinks((prev) => [...prev, { icon: null, url: "" }]);
      };
    
      const handleRemoveSocialLink = (index) => {
        setSocialLinks((prev) => prev.filter((_, i) => i !== index));
      };
    
      const handleSocialIconChange = (index, file) => {
        setSocialLinks((prev) => {
          const newLinks = [...prev];
          newLinks[index].icon = file;
          return newLinks;
        });
      };
    
      const handleSocialUrlChange = (index, url) => {
        setSocialLinks((prev) => {
          const newLinks = [...prev];
          newLinks[index].url = url;
          return newLinks;
        });
      };
    
      const handleSubmitSocialLinks = () => {
        const validLinks = socialLinks.filter((link) => link.icon && link.url);
        if (validLinks.length === 0) return;
    
        const formData = new FormData();
        validLinks.forEach(({ icon, url }) => {
          formData.append("icon", icon);
          formData.append("url", url);
        });
    
        adminStore.addSocialLinks(formData, productStore.company._id);
      };

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
        <SocialItems links={store?.company?.socialLinks} />
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
