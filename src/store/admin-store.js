import { makeAutoObservable, runInAction } from "mobx";
import AdminService from "../services/adminService";
import { productStore } from "../main";
import { error, log } from "../utils/logger";
import { showToast } from "../providers/toastService";
export default class AdminStore {
  users = [];
  comments = [];
  orders = [];
  contacts = [];
  isLoading = false;
  reviews = [];
  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users) {
    runInAction(() => {
      this.users = users;
      log("Users set to:", this.users);
    });
  }
  setIsLoading(bool) {
    runInAction(() => {
      this.isLoading = bool;
      log("Loading set to:", this.isLoading);
    });
  }
  setOrders(orders) {
    runInAction(() => {
      this.orders = orders;
      log("Orders set to:", this.orders);
    });
  }

  setComments(comments) {
    runInAction(() => {
      this.comments = comments;
      log("Comments set to:", this.comments);
    });
  }

  setReviews(reviews) {
    runInAction(() => {
      this.reviews = reviews;
      log("Reviews set to:", this.reviews);
    });
  }

  setContacts(contacts) {
    runInAction(() => {
      this.contacts = contacts;
      log("Contacts set to:", this.contacts);
    });
  }
  async fetchUsers() {
    this.setIsLoading(true);
    try {
      const response = await AdminService.getUsers();
      if (response.status === 200) {
        showToast({
          text1: "Пользователи успешно получены",
          type: "success",
        });
        log("response", response.data);
        this.setUsers(response.data);
      }
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async toggleAdminRules(id) {
    if (!id) {
      return error("Не передан id");
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.toggleAdminRules(id);
      if (response.status === 200) {
        showToast({
          text1: "Права успешно изменены",
          type: "success",
        });
        log("toggleAdminRulesresponse", response.data);
        this.fetchUsers();
      }
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async addProduct(formData) {
    log("addProduct", formData);
    try {
      this.setIsLoading(true);
      const response = await AdminService.addProduct(formData); // Отправляем FormData через сервис
      if (response.status === 200) {
        showToast({
          text1: "Продукт успешно добавлен",
          type: "success",
        });
        log("Продукт успешно добавлен:", response.data);
      }
    } catch (error) {
      error("Ошибка при добавлении продукта:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async editProduct(id, formData) {
    log("editProduct", id, formData);
    if (!formData || !id) {
      showToast({
        text1: "Не переданы данные",
        type: "error",
      });
      error("Не переданы");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.editProduct(id, formData); // Отправляем FormData через сервис
      if (response.status === 200) {
        showToast({
          text1: "Продукт успешно обновлен",
          type: "success",
        });
        log("Продукт успешно добавлен:", response.data);
      }
    } catch (error) {
      error("Ошибка при добавлении продукта:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async addCategory(formData) {
    log("addCategory", formData);
    try {
      this.setIsLoading(true);
      const response = await AdminService.addCategory(formData); // Отправляем FormData через сервис
      if (response.status === 200) {
        showToast({
          text1: "Категория успешно добавлена",
          type: "success",
        });
        log("Категория успешно добавлена:", response.data);
        productStore.fetchCategories();
      }
    } catch (error) {
      error("Ошибка при добавлении категории:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }
  async editCategory(id, formData) {
    try {
      this.setIsLoading(true);
      const response = await AdminService.editCategory(id, formData);
      if (response.status === 200) {
        showToast({
          text1: "Категория успешно обновлена",
          type: "success",
        });
        log("Категория успешно обновлена:", response.data);
        productStore.fetchCategories();
      }
    } catch (error) {
      error(
        "Ошибка при редактировании категории:",
        error.response?.data?.message
      );
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async deleteCategory(id) {
    if (!id) {
      showToast({
        text1: "Не передана категория",
        type: "error",
      });
      error("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.deleteCategory(id);
      if (response.status === 200) {
        showToast({
          text1: "Категория успешно удалена",
          type: "success",
        });
        log("Категория успешно обновлена:", response.data);
        productStore.fetchCategories();
      }
    } catch (error) {
      error(
        "Ошибка при редактировании категории:",
        error.response?.data?.message
      );
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async addCompany(formData) {
    if (!formData) {
      error("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.addCompany(formData);
      if (response.status === 200) {
        showToast({
          text1: "Компания успешно добавлена",
          type: "success",
        });
        log("КОмпнаия успешно добавлена:", response.data);
        productStore.fetchCompany();
      }
    } catch (error) {
      error(
        "Ошибка при редактировании категории:",
        error.response?.data?.message
      );
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async editCompany(formData) {
    if (!formData) {
      error("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.editCompany(formData);
      if (response.status === 200) {
        showToast({
          text1: "Компания успешно обновлена",
          type: "success",
        });
        log("КОмпнаия успешно обновлена:", response.data);
        productStore.fetchCompany();
      }
    } catch (e) {
      error("Ошибка при редактировании категории:", e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }
  async deleteCompany(id) {
    if (!id) {
      error("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.deleteCompany(id);
      if (response.status === 200) {
        showToast({
          text1: "Компания успешно удалена",
          type: "success",
        });
        log("КОмпнаия успешно удалена:", response.data);
        productStore.fetchCompany();
      }
    } catch (e) {
      error("Ошибка при редактировании категории:", e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchContacts() {
    try {
      this.setIsLoading(true);
      const response = await AdminService.getContacts();
      log("fetchContactsresponse", response.data);
      this.setContacts(response.data);
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async updateContactStatus(contactId, status) {
    if (!contactId || !status) {
      error("Не передан контакт");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.updateContactStatus(
        contactId,
        status
      );
      if (response.status === 200) {
        showToast({
          text1: "Статус обновлен",
          type: "success",
        });
        this.fetchContacts();
      }
      log("updateContactStatusresponse", response.data);
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchOrders() {
    log("fetchOrders");
    try {
      this.setIsLoading(true);
      const response = await AdminService.fetchOrders();
      log("fetchOrdersresponse", response.data);
      this.setOrders(response.data);
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async changeOrderStatus(orderId, status) {
    if (!orderId || !status) {
      showToast({
        text1: "Не передан контакт",
        type: "error",
      });
      error("Не передан контакт");
      return;
    }
    log("changeOrderStatus", orderId, status);

    try {
      this.setIsLoading(true);
      const response = await AdminService.changeOrderStatus(orderId, status);
      if (response.status === 200) {
        showToast({
          text1: "Заказ успешно обновлен",
          type: "success",
        });
        this.fetchOrders();
      }
      log("changeOrderStatusresponse", response.data);
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }
  async cancelOrder(id, text) {
    if (!id || !text) {
      error("Не передана ");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.cancelOrder(id, text);
      log("cancelOrderresponse", response.data);
      if (response.status === 200) {
        showToast({
          text1: "Заказ успешно отменен",
          type: "success",
        });
        this.fetchOrders();
      }
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }
  async uploadFiles(formData, id) {
    log("uploadedFiles", formData, id);
    try {
      this.setIsLoading(true);
      const response = await AdminService.uploadFiles(formData, id); // Отправляем FormData через сервис
      if (response.status === 200) {
        showToast({
          text1: "Файл успешно добавлен",
          type: "success",
        });
      }
      log("Файлы успешно добавлены:", response.data);
    } catch (error) {
      error("Ошибка при выгрузке файлов:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async deleteFile(filePath, id) {
    log("deleteFile", filePath, "id", id);
    try {
      this.setIsLoading(true);
      const response = await AdminService.deleteFile(filePath, id); // Отправляем FormData через сервис
      log("Файл успешно удален:", response.data);
      if (response.status === 200) {
        showToast({
          text1: "Файл успешно удален",
          type: "success",
        });
        productStore.fetchCompany();
      }
    } catch (error) {
      error("Ошибка при удалении файлов:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async addSocialLinks(formData, id) {
    log("addSocialLinks", formData, id);
    try {
      this.setIsLoading(true);
      const response = await AdminService.addSocialLinks(formData, id); // Отправляем FormData через сервис
      if (response.status === 200) {
        showToast({
          text1: "Социальные ссылки успешно добавлены",
          type: "success",
        });
      }
      log("Социальные ссылки успешно добавлены:", response.data);
    } catch (error) {
      error(
        "Ошибка при добавлении социальных ссылок:",
        error.response?.data?.message
      );
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async removeSocialLink(linkId) {
    try {
      this.setIsLoading(true);
      const res = await AdminService.removeSocialLink(linkId);
      if (res.status === 200) {
        showToast({ text1: "Ссылка удалена", type: "success" });
      }
    } catch (err) {
      showToast({
        text1: err.response?.data?.message || "Ошибка при удалении ссылки",
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async uploadOrderFile(formData, id) {
    log("uploadOrderFile", formData, id);
    try {
      this.setIsLoading(true);
      const response = await AdminService.uploadOrderFile(formData, id); // Отправляем FormData через сервис
      if (response.status === 200) {
        showToast({
          text1: "Файл успешно добавлен",
          type: "success",
        });
        this.fetchOrders();
      }
      log("Файлы успешно добавлены:", response.data);
    } catch (error) {
      error("Ошибка при выгрузке файлов:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async deleteOrderFile(id) {
    log("deleteOrderFile", id);
    try {
      this.setIsLoading(true);
      const response = await AdminService.deleteOrderFile(id); // Отправляем FormData через сервис
      if (response.status === 200) {
        showToast({
          text1: "Файл успешно удален",
          type: "success",
        });
        this.fetchOrders();
      }
      log("Файл успешно удален:", response.data);
    } catch (error) {
      error("Ошибка при удалении файлов:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchReviews() {
    try {
      this.setIsLoading(true);
      const response = await AdminService.getReviews();
      log("fetchReviewsresponse", response.data);
      this.setReviews(response.data);
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async changeReviewStatus(id, action) {
    if (!id) {
      error("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.changeReviewStatus(id, action);
      if (response.status === 200) {
        this.fetchReviews();
      }
      log("changeReviewStatusresponse", response.data);
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchOrgReviews() {
    try {
      this.setIsLoading(true);
      const response = await AdminService.fetchOrgReviews();
      log("fetchCommentsresponse", response.data);
      this.setComments(response.data);
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async updateCommentStatus(id, status) {
    try {
      this.setIsLoading(true);
      const response = await AdminService.updateCommentStatus(id, status);
      log("updateCommentStatusresponse", response.data);
      if (response.status === 200) {
        showToast({
          text1: "Отзыв успешно обновлен",
          type: "success",
        });
        this.fetchOrgReviews();
      }
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async uploadPromoBlock(formData) {
    log("uploadPromoBlock", formData);
    try {
      this.setIsLoading(true);
      const response = await AdminService.uploadPromoBlock(formData); // Отправляем FormData через сервис
      if (response.status === 200) {
        showToast({
          text1: "Блок успешно добавлен",
          type: "success",
        });
      }
      log("Блок успешно добавлен:", response.data);
    } catch (error) {
      error("Ошибка при добавлении блока:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async updatePromoBlock(id, formData) {
    log("updatePromoBlock", formData);
    try {
      this.setIsLoading(true);
      const response = await AdminService.updatePromoBlock(id, formData);
      if (response.status === 200) {
        showToast({ text1: "Блок успешно обновлён", type: "success" });
        await this.getPromoBlocks(); // обновим список
      }
    } catch (error) {
      error("Ошибка при обновлении блока:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message || "Ошибка",
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async deletePromoBlock(id) {
    try {
      this.setIsLoading(true);
      const response = await AdminService.deletePromoBlock(id);
      if (response.status === 200) {
        showToast({ text1: "Блок успешно удалён", type: "success" });
        await this.getPromoBlocks(); // обновим список
      }
    } catch (error) {
      error("Ошибка при удалении блока:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message || "Ошибка",
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async uploadMainMaterial (formData) {
    try {
      this.setIsLoading(true);
      const response = await AdminService.uploadMainMaterial(formData);
      if (response.status === 200) {
        showToast({ text1: "Материал успешно добавлен", type: "success" });
      }
      log("Материал успешно добавлен:", response.data);
    } catch (error) {
      error("Ошибка при добавлении материала:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message,
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async updateMainMaterial (id, formData) {
    try {
      this.setIsLoading(true);
      const response = await AdminService.updateMainMaterial(id, formData);
      if (response.status === 200) {
        showToast({ text1: "Материал успешно обновлён", type: "success" });
        await this.getMainMaterials(); // обновим список
      }
    } catch (error) {
      error("Ошибка при обновлении материала:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message || "Ошибка",
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async deleteMainMaterial (id) {
    try {
      this.setIsLoading(true);
      const response = await AdminService.deleteMainMaterial(id);
      if (response.status === 200) {
        showToast({ text1: "Материал успешно удалён", type: "success" });
        await this.getMainMaterials(); // обновим список
      }
    } catch (error) {
      error("Ошибка при удалении материала:", error.response?.data?.message);
      showToast({
        text1: error.response?.data?.message || "Ошибка",
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }
}
