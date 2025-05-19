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
    productStore.getPromoBlocks(page); // Просто загружаем
  }, [page]);

  const blocks = productStore.promoBlocks || [];

  return (
    <div className="promo-section">
      {productStore.isLoading ? (
        <Loader size={40} />
      ) : blocks.length !== 0 ? (
        <div className="plus-wrapper">
          <PageHeader title="Может быть интересно" />
          {blocks.map((block) => (
            <PromoBlock
              key={block._id}
              {...block}
              onClick={() => {
                if (store.user.role !== "user" && store.isAuth) {
                  setEditableBlock(block);
                  setIsOpen(true);
                }
              }}
            />
          ))}
        </div>
      ) : (
        <>
          {store.user.role !== "user" && store.isAuth && (
            <div className="plus-wrapper">
              <Plus className="plus-icon" onClick={() => setIsOpen(true)} />
            </div>
          )}
        </>
      )}

      <>
        {store.user.role !== "user" && store.isAuth && (
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
      </>
    </div>
  );
};

export default observer(PromoSection);
