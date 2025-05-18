// components/ConfirmModal.jsx
import Button from '../Buttons/Button';
import './ConfirmModal.css';           // мелкий стиль, показан ниже
import Modal from '../Modal/Modal';

/**
 * @param {boolean}  isOpen     – открыт ли модал
 * @param {string}   title      – заголовок (можно не передавать)
 * @param {string}   text       – основной текст вопроса
 * @param {string}   confirmLbl – подпись кнопки подтверждения
 * @param {string}   cancelLbl  – подпись кнопки отмены
 * @param {() => void} onConfirm – действие при подтверждении
 * @param {() => void} onClose   – закрыть модал (отмена)
 */
export default function ConfirmModal({
  isOpen,
  title = 'Подтверждение',
  text,
  confirmLbl = 'Да',
  cancelLbl = 'Отмена',
  onConfirm,
  onClose,
}) {

  if (!isOpen) return null;

return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <h3 className="cm-title">{title}</h3>
        <p className="cm-text">{text}</p>

        <div className="cm-actions">
          <Button variant="secondary" onClick={onClose}>
            {cancelLbl}
          </Button>

          <Button
            style={{ marginLeft: 8 }}
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {confirmLbl}
          </Button>
        </div>
  </Modal>
)
}