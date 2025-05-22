import React, { useState } from "react";
import "./OrderCard.css";
import { API_URL } from "../../http/axios";
import { formatDate, formatPrice } from "../../utils/formatMessageTime";
import {
  deliveryOptions,
  getStatusClass,
  orderDeliveryStatusOptions,
  orderPickupStatusOptions,
  statusLabel,
} from "../../utils/options";
import { adminStore, productStore } from "../../main";
import SelectMenu from "../SelectMenu/SelectMenu";
import Button from "../Buttons/Button";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import { Download, X } from "lucide-react";
import { log } from "../../utils/logger";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

export default function OrderCard({ order, role }) {
  log("order", order.file);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [text, setText] = useState("");
  const handleStatusChange = async (status) => {
    try {
      await adminStore.changeOrderStatus(order._id, status);
      adminStore.fetchOrders();
    } catch (error) {
      log(error);
    }
  };

  const handleCancelOrder = async () => {
    try {
      if (role !== "admin" && role !== "superadmin") {
        await productStore.cancelOrder(order._id);
      } else if (role === "admin" || role === "superadmin") {
        await adminStore.cancelOrder(order._id, text);
      }
      setIsModalOpen(false);
      setText("");
    } catch (error) {
      log(error);
    }
  };

  //FILES
  const [uploadedFile, setUploadedFile] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile((prev) => [...prev, { file, displayName: "" }]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFile((prev) => prev.filter((_, i) => i !== index));
  };

  const hanldeUploadFiles = () => {
    if (uploadedFile.length === 0) return;

    const formData = new FormData();
    const { file, displayName } = uploadedFile[0]; // ⬅️ берём только один файл
    formData.append("file", file); // ✅ соответствует .single("file")
    formData.append("displayName", displayName || file.name); // ✅ соответствует req.body.displayName

    adminStore.uploadOrderFile(formData, order._id);
    setUploadedFile([]);
    setIsModalOpen(false);
  };

  const handleDeleteOrderFile = () => {
    adminStore.deleteOrderFile(order._id);
  };

  return (
    <div className="block-background order-card">
      {/* Заголовок */}
      <div className="order-card-header">
        <h2 className="order-card-title">
          Заказ #{order._id.slice(-6) || "?"} от{" "}
          {formatDate(order.createdAt) || "?"}
        </h2>
        <span className={`status-badge ${getStatusClass(order.status)}`}>
          {statusLabel(order.status)}
        </span>
      </div>

      {/* Получатель + доставка */}
      <div className="order-recipient">
        <p>
          <strong>Получатель:</strong> {order.recipientData.name}{" "}
          {order.recipientData.phone}
        </p>
        <p>
          <strong>Способ доставки:</strong>{" "}
          {order.deliveryMethod === "delivery" ? "Доставка" : "Самовывоз"}
        </p>
        {order.deliveryData?.tk && (
          <p>
            <strong>ТК:</strong>{" "}
            {
              deliveryOptions.find(
                (option) => option.value === order.deliveryData.tk
              ).label
            }
          </p>
        )}
        {order.deliveryData?.address && (
          <p>
            <strong>Адрес:</strong> {order.deliveryData.address}
          </p>
        )}
        {order.deliveryData?.comment && (
          <p>
            <strong>Комментарий:</strong> {order.deliveryData.comment}
          </p>
        )}
      </div>

      {/* Компания (если есть) */}
      {order.isCompany && order.companyData?.company && (
        <div className="company-info">
          <p className="company-title">
            Компания: {order.companyData.company.companyName}
          </p>
          <p>
            ИНН: {order.companyData.company.inn}, КПП:{" "}
            {order.companyData.company.kpp}
          </p>
          <p>
            Банк: {order.companyData.company.bankName}, БИК:{" "}
            {order.companyData.company.bik}
          </p>
        </div>
      )}

      {/* Продукты */}
      <div className="order-products">
        {order.products.map((item, idx) => (
          <div key={idx} className="order-product">
            <img
              src={`${API_URL}/${item.product?.images[0]}`}
              alt={item.product?.title}
              className="product-order-image"
            />
            <div className="product-info">
              <h2 className="product-order-title">{item.product?.title || "Удаленный товар"}</h2>
              <p className="product-order-quantity">Кол-во: {item.quantity || "?"}</p>
              <p>Цена: {formatPrice(item.price) || "?"}</p>
              {item.priceWithDiscount !== item.price && (
                <p>Скидка: {formatPrice(item.priceWithDiscount) || "?"}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="order-total">
        <h3 style={{  color: "aliceblue"}}>
          Сумма без скидки: <strong>{formatPrice(order.priceDetails.totalPrice) || "?"}</strong>
        </h3>
       <h3 style={{color: "aliceblue"}}>
          Сумма со скидкой:{" "}
          <strong>{formatPrice(order.priceDetails.totalPriceWithDiscount) || "?"}</strong>
        </h3>
      </div>

      {/* Отмена */}
      {order.status === "cancelled" && order.cancelData?.cancelReason && (
        <div className="cancel-info">
          <p>Причина отмены: {order.cancelData.cancelReason}</p>
          {order.cancelData.cancelDate && (
            <p className="cancel-date">
              Дата отмены:{" "}
              {new Date(order.cancelData.cancelDate).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
      {(role === "admin" || role === "superadmin") && order.status !== "cancelled" && (
        <div className="order-actions">
          <SelectMenu
            className="status-select"
            options={
              order.deliveryMethod === "delivery"
                ? orderDeliveryStatusOptions
                : orderPickupStatusOptions
            }
            value={order.status}
            onChange={(status) => handleStatusChange(status)}
            disabled={order.status === "ready"}
          />
        </div>
      )}
      {order.status !== "cancelled" && order.status !== "ready" && (
        <div className="btn-wrapper-i" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            className="cancel-button"
            onClick={() => {
              setIsModalOpen(true);
              setModalContent("cancelOrder");
            }}
          >
            Отменить заказ
          </Button>
        </div>
          
        )}
      {role === "admin" || role === "superadmin" &&
        order.status !== "cancelled" &&
        order.status !== "ready" &&
        !order?.file?.name && (
          <div className="btn-wrapper-i" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            className="attach-button"
            onClick={() => {
              setIsModalOpen(true);
              setModalContent("uploadFile");
            }}
          >
            Прикрепить файл
          </Button>
          </div>
        )}
      {order?.file?.name && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <div className="order-files">
            <a
              key={order.file.name}
              href={`${API_URL}/uploads/${order.file.path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={25} /> {order.file.name || order.file.path}
            </a>
          </div>
          {role !== "user" && (
            <>
              <Button onClick={handleDeleteOrderFile}>
                <X color="red" size={25} />
              </Button>
            </>
          )}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalContent === "cancelOrder" && (
          <>
            <h2>Вы действительно хотите отменить заказ?</h2>
            <div className="modal-cancel-content">
              {/* Показываем поле ввода причины только для админов */}
              {(role === "admin" || role === "superadmin") && (
                <Input
                  type="text"
                  placeholder="Причина отмены"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{ width: "100%" }}
                />
              )}
              <Button
                onClick={handleCancelOrder}
                disabled={(role === "admin" || role === "superadmin") && !text}
              >
                Да
              </Button>
            </div>
          </>
        )}
        {modalContent === "uploadFile" && (
          <>
            <h2>Прикрепление файлов</h2>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              style={{ marginTop: "10px" }}
            />
            {uploadedFile.map((fileObj, index) => (
              <div key={index} style={{ marginBottom: 10, display: "flex", alignItems: "center", flexDirection: 'column', gap: 10}}>
                <input
                  type="text"
                  placeholder="Введите название файла"
                  value={fileObj.displayName}
                  onChange={(e) => {
                    const newFiles = [...uploadedFile];
                    newFiles[index].displayName = e.target.value;
                    setUploadedFile(newFiles);
                  }}
                  style={{ marginRight: 10 }}
                />
                <span>{fileObj.file.name}</span>
                <Button
                  onClick={() => handleRemoveFile(index)}
                  style={{ marginLeft: 10 }}
                >
                  <X color="red" size={20} />
                </Button>
              </div>
            ))}
            <Button
              onClick={hanldeUploadFiles}
              disabled={uploadedFile.length === 0}
              style={{ marginTop: 10 }}
            >
              Загрузить файл
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
}
