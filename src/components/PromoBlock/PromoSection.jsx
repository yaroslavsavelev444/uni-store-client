import { useEffect, useState } from "react";
import PromoBlock from "./PromoBlock";
import { observer } from "mobx-react-lite";
import { productStore, store } from "../../main";
import Loader from "../Loader/Loader";
import { Plus } from "lucide-react";
import PromoBlockForm from "./PromoBlockForm";
import Modal from "../Modal/Modal";
import "./PromoBlock.css";
import PageHeader from "../PageHeader/PageHeader";

const PromoSection = ({ page = "home" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editableBlock, setEditableBlock] = useState(null);

  useEffect(() => {
    // Обернул в try/catch на всякий случай
    try {
      productStore.getPromoBlocks(page);
    } catch (error) {
      console.error("Error loading promo blocks:", error);
    }
  }, [page]);

  const blocks = Array.isArray(productStore.promoBlocks)
    ? productStore.promoBlocks
    : [];

  // Проверка ролей и авторизации
  const canEdit = store?.user?.role !== "user" && store?.isAuth;

  return (
    <div className="promo-section">
      {productStore.isLoading ? (
        <Loader size={40} />
      ) : blocks.length > 0 ? (
        <div className="plus-wrapper">
          <PageHeader title="Может быть интересно" />
          {blocks.map((block) => (
            <PromoBlock
              key={block._id || block.id || Math.random()}
              {...block}
              onClick={() => {
                if (canEdit) {
                  setEditableBlock(block);
                  setIsOpen(true);
                }
              }}
            />
          ))}
        </div>
      ) : (
        <>
          {canEdit && (
            <div className="plus-wrapper">
              <Plus
                className="plus-icon"
                onClick={() => setIsOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsOpen(true);
                }}
                aria-label="Добавить промо блок"
              />
            </div>
          )}
        </>
      )}

      {canEdit && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setEditableBlock(null);
          }}
        >
          <PromoBlockForm
            onSuccess={() => {
              setIsOpen(false);
              setEditableBlock(null);
            }}
            initialData={editableBlock}
          />
        </Modal>
      )}
    </div>
  );
};

export default observer(PromoSection);