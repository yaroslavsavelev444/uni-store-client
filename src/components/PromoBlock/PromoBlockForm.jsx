import { useEffect, useState } from "react";
import { adminStore } from "../../main";
import Checkbox from "../CheckBox/CheckBox";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import { API_URL } from "../../http/axios";
import { showToast } from "../../providers/toastService";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { X } from "lucide-react";

const PromoBlockForm = ({ onSuccess, initialData = null }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    link: "",
    reversed: false,
    page: "home",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        link: initialData.link || "",
        reversed: initialData.reversed || false,
        page: initialData.page || "home",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return showToast({ text1: "Заполните данные", type: "error" });
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (image) {
      formData.append("image", image);
    }

    if (initialData?._id) {
      await adminStore.updatePromoBlock(initialData._id, formData);
    } else {
      await adminStore.uploadPromoBlock(formData);
    }

    setForm({});
    setImage(null);
    onSuccess();
  };
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <Input
        type="text"
        placeholder="Заголовок"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        value={form.title}
        label={form.title ? "Заголовок" : ""}
        style={{ width: "100%" }}
      />
      <Input
        type="text"
        placeholder="Подзаголовок"
        onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        value={form.subtitle}
        label={form.subtitle ? "Подзаголовок" : ""}
        style={{ width: "100%" }}
      />
      <Input
        type="text"
        placeholder="Ссылка"
        onChange={(e) => setForm({ ...form, link: e.target.value })}
        value={form.link}
        label={form.link ? "Ссылка" : ""}
        style={{ width: "100%" }}
      />
      <Input
        type="text"
        placeholder="Страница (home, about...)"
        onChange={(e) => setForm({ ...form, page: e.target.value })}
        value={form.page}
        label={form.page ? "Страница" : ""}
        style={{ width: "100%" }}
      />
      <Checkbox
        label="Reversed"
        name="reversed"
        checked={form.reversed}
        onChange={(e) => setForm({ ...form, reversed: e.target.checked })}
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
       {initialData?.image && !image && (
        <img
          src={API_URL + initialData.image}
          alt="Текущее изображение"
          style={{ maxWidth: 150, marginTop: 8 }}
        />
      )}
      <Button type="submit" disabled={adminStore.isLoading}>Сохранить</Button>
      {initialData?._id && (
        <Button
          type="button"
          onClick={() => setModalOpen(true)}
          disabled={adminStore.isLoading}
        >
          <X size={20} color="red" />
        </Button>
      )}
      <ConfirmModal text="Вы действительно хотите удалить?" isOpen={modalOpen} onClose={() => setModalOpen(false)} onConfirm={() => adminStore.deletePromoBlock(initialData._id)}   />
    </form>
  );
};

export default PromoBlockForm;
