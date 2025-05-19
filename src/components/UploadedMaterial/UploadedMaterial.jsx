import { useEffect, useState } from "react";
import { adminStore } from "../../main";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import { API_URL } from "../../http/axios";
import { showToast } from "../../providers/toastService";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { X } from "lucide-react";

const MainMaterialForm = ({ onSuccess, initialData = null }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [mediaFile, setMediaFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setCaption(initialData.caption || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mediaFile && !initialData) {
      return showToast({ text1: "Добавьте фото или видео", type: "error" });
    }

    const formData = new FormData();
    formData.append("caption", caption);
    if (mediaFile) formData.append("file", mediaFile);

    try {
      if (initialData?._id) {
        await adminStore.updateMainMaterial(initialData._id, formData);
      } else {
        await adminStore.uploadMainMaterial(formData);
      }
      showToast({ text1: "Сохранено", type: "success" });
      setCaption("");
      setMediaFile(null);
      onSuccess();
    } catch (error) {
      showToast({ text1: "Ошибка загрузки", type: "error" });
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await adminStore.deleteMainMaterial(initialData._id);
      showToast({ text1: "Удалено", type: "success" });
      onSuccess();
    } catch (error) {
      showToast({ text1: `Ошибка удаления ${error.response?.data?.message}`, type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <Input
        type="text"
        placeholder="Подпись"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
        label={caption ? "Подпись" : ""}
        style={{ width: "100%" }}
      />

      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setMediaFile(e.target.files[0])}
      />

      {initialData?.mediaUrl && !mediaFile && (
        <>
          {initialData.mediaType === "video" ? (
            <video
              src={API_URL + initialData.mediaUrl}
              controls
              style={{ maxWidth: 300, marginTop: 8 }}
            />
          ) : (
            <img
              src={API_URL + initialData.mediaUrl}
              alt="Материал"
              style={{ maxWidth: 300, marginTop: 8 }}
            />
          )}
        </>
      )}

      <Button type="submit" disabled={adminStore.isLoading}>
        Сохранить
      </Button>

      {initialData?._id && (
        <>
          <Button
            type="button"
            onClick={() => setModalOpen(true)}
            disabled={adminStore.isLoading}
          >
            <X size={20}  color="red"/>
          </Button>
          <ConfirmModal
            text="Вы действительно хотите удалить материал?"
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleDelete}
          />
        </>
      )}
    </form>
  );
};

export default MainMaterialForm;