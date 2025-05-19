import { useState } from "react";
import { observer } from "mobx-react-lite";
import { adminStore, productStore, store } from "../../../../main";
import SocialItems from "../../../../components/SocialItem/SocialItems";
import Button from "../../../../components/Buttons/Button";
import { log, error as logError } from "../../../../utils/logger";
import { showToast } from "../../../../providers/toastService";
import './SocialModal.css';
import { Plus, X } from "lucide-react";
const MAX_SOCIAL_LINKS = 10;
const MAX_FILE_SIZE_MB = 2;

const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch (e) {
    return false;
  }
};

const isValidFile = (file) => {
  if (!file || !file.type.startsWith("image/")) return false;
  const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

const SocialModal = () => {
  const [socialLinks, setSocialLinks] = useState([{ icon: null, url: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSocialLink = () => {
    if (socialLinks.length < MAX_SOCIAL_LINKS) {
      setSocialLinks((prev) => [...prev, { icon: null, url: "" }]);
    }
  };

  const handleRemoveSocialLink = (index) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSocialIconChange = (index, file) => {
    if (!isValidFile(file)) {
      showToast({
        text1: `Файл должен быть изображением и не больше ${MAX_FILE_SIZE_MB} МБ`,
        type: "error",
      });
      return;
    }

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

  const handleSubmitSocialLinks = async () => {
    log("handleSubmitSocialLinks", socialLinks);
    const validLinks = socialLinks.filter(
      (link) => isValidFile(link.icon) && isValidUrl(link.url)
    );

    if (validLinks.length === 0) {
      showToast({
        text1: "Пожалуйста, добавьте хотя бы одну корректную ссылку",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    validLinks.forEach(({ icon, url }) => {
      formData.append("icon", icon);
      formData.append("url", url);
    });

    try {
      setIsSubmitting(true);
      await adminStore.addSocialLinks(formData, productStore.company._id);
      showToast({ text1: "Ссылки добавлены", type: "success" });
      setSocialLinks([{ icon: null, url: "" }]); // сброс формы
    } catch (err) {
      logError(
        "Ошибка при отправке соц. ссылок:",
        err?.response?.data?.message
      );
      showToast({ text1: "Ошибка отправки", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const allValid = socialLinks.every(
    (link) =>
      (!link.icon && !link.url) ||
      (isValidFile(link.icon) && isValidUrl(link.url))
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>Социальные сети</h3>
      <SocialItems links={productStore?.company?.socialLinks} edit />

      {socialLinks.map((link, index) => (
        <div
          key={index}
          className="social-line"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleSocialIconChange(index, e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Ссылка на соц.сеть"
            value={link.url}
            onChange={(e) => handleSocialUrlChange(index, e.target.value)}
            style={{ flex: 1 }}
          />
          <Button onClick={() => handleRemoveSocialLink(index)}><X color="red" size={20} /></Button>
        </div>
      ))}

      {socialLinks.length < MAX_SOCIAL_LINKS && (
        <Button onClick={handleAddSocialLink}><Plus size={20} /></Button>
      )}

      {socialLinks.length > 0 && (
        <Button onClick={handleSubmitSocialLinks} style={{ marginTop: 10 }}>
          {isSubmitting ? "Отправка..." : "Отправить"}
        </Button>
      )}
    </div>
  );
};

export default observer(SocialModal);
