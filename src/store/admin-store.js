import { makeAutoObservable, runInAction } from "mobx";
import AdminService from "../services/adminService";
import { productStore } from "../main";
import { error, log } from "../utils/logger";
export default class AdminStore {
 users=[];
 comments=[];
 orders=[];
 contacts=[];
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
    try {
      const response = await AdminService.getUsers();
      log("response", response.data);
      this.setUsers(response.data);
    } catch (e) {
      error(e.response?.data?.message);
    }
  }

  async addProduct(formData) {
    log('addProduct', formData);
    try {
      this.setIsLoading(true);
      const response = await AdminService.addProduct(formData); // Отправляем FormData через сервис
      log("Продукт успешно добавлен:", response.data);
    } catch (error) {
      error("Ошибка при добавлении продукта:", error.response?.data?.message);
    }
    finally {
      this.setIsLoading(false);
    }
  }

  async editProduct(id, formData){
    log('editProduct', id, formData);
    if(!formData || !id){
      error("Не переданы");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.editProduct(id, formData); // Отправляем FormData через сервис
      log("Продукт успешно добавлен:", response.data);
    } catch (error) {
      error("Ошибка при добавлении продукта:", error.response?.data?.message);
    }
    finally {
      this.setIsLoading(false);
    }
  }

  async addCategory(formData) {
    log("addCategory", formData);
    try {
      this.setIsLoading(true);
      const response = await AdminService.addCategory(formData); // Отправляем FormData через сервис
      log("Категория успешно добавлена:", response.data);
      productStore.fetchCategories();
    } catch (error) {
      error("Ошибка при добавлении категории:", error.response?.data?.message);
    }
    finally {
      this.setIsLoading(false);
    }
  }
  async editCategory(id, formData) {
    try {
      this.setIsLoading(true);
      const response = await AdminService.editCategory(id, formData);
      log("Категория успешно обновлена:", response.data);
      productStore.fetchCategories();
    } catch (error) {
      error("Ошибка при редактировании категории:", error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async deleteCategory (id) {
    if(!id){
      error("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.deleteCategory(id);
      log("Категория успешно обновлена:", response.data);
      productStore.fetchCategories();
    } catch (error) {
      error("Ошибка при редактировании категории:", error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async addCompany(formData) {
    if(!formData){
      error("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.addCompany(formData);
      log("КОмпнаия успешно добавлена:", response.data);
      productStore.fetchCompany();
    } catch (error) {
      error("Ошибка при редактировании категории:", error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async editCompany(formData) {
    if(!formData){
      error("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.editCompany(formData);
      log("КОмпнаия успешно обновлена:", response.data);
      productStore.fetchCompany();
    } catch (error) {
      error("Ошибка при редактировании категории:", error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
  async deleteCompany(id) {
    if(!id){
      error("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.deleteCompany(id);
      log("КОмпнаия успешно удалена:", response.data);
      productStore.fetchCompany();
    } catch (error) {
      error("Ошибка при редактировании категории:", error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchContacts () {
    try {
      this.setIsLoading(true);
      const response = await AdminService.getContacts();
      log("fetchContactsresponse", response.data);
      this.setContacts(response.data);
    } catch (e) {
      error(e.response?.data?.message);
    }
    finally {
      this.setIsLoading(false);
    }
  }

  async updateContactStatus(contactId, status) {
    if(!contactId || !status){
      error("Не передан контакт");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.updateContactStatus(contactId, status);
      if(response.status === 200){
        this.fetchContacts();
      }
      log("updateContactStatusresponse", response.data);
    } catch (e) {
      error(e.response?.data?.message);
    }
    finally {
      this.setIsLoading(false);
    }
  }

  async fetchOrders () {
    log("fetchOrders");
    try {
      this.setIsLoading(true);
      const response = await AdminService.fetchOrders();
      log("fetchOrdersresponse", response.data);
      this.setOrders(response.data);
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async changeOrderStatus(orderId, status) {
    if(!orderId || !status){
      error("Не передан контакт");
      return;
    }
    log("changeOrderStatus", orderId, status);
    
    try {
      this.setIsLoading(true);
      const response = await AdminService.changeOrderStatus(orderId, status);
      if(response.status === 200){
        this.fetchOrders();
      }
      log("changeOrderStatusresponse", response.data);
    } catch (e) {
      error(e.response?.data?.message);
    }
    finally {
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
        if(response.status === 200){
          this.fetchOrders();
        }
      } catch (e) {
        error(e.response?.data?.message);
      } finally {
        this.setIsLoading(false);
      }
    }
    async uploadFiles(formData, id) {
      log('uploadedFiles', formData, id);
      try {
        this.setIsLoading(true);
        const response = await AdminService.uploadFiles(formData, id); // Отправляем FormData через сервис
        log("Файлы успешно добавлены:", response.data);
      } catch (error) {
        error("Ошибка при выгрузке файлов:", error.response?.data?.message);
      }
      finally {
        this.setIsLoading(false);
      }
    }

    async deleteFile(filePath, id) {
      log('deleteFile', filePath,'id', id);
      try {
        this.setIsLoading(true);
        const response = await AdminService.deleteFile(filePath, id); // Отправляем FormData через сервис
        log("Файл успешно удален:", response.data);
        if(response.status === 200){
          productStore.fetchCompany();
        }
      } catch (error) {
        error("Ошибка при удалении файлов:", error.response?.data?.message);
      }
      finally {
        this.setIsLoading(false);
      }
    }

    async addSocialLinks(formData, id) {
      log('addSocialLinks', formData, id);
      try {
        this.setIsLoading(true);
        const response = await AdminService.addSocialLinks(formData, id); // Отправляем FormData через сервис
        log("Социальные ссылки успешно добавлены:", response.data);
      } catch (error) {
        error("Ошибка при добавлении социальных ссылок:", error.response?.data?.message);
      }
      finally {
        this.setIsLoading(false);
      }
    }

    async uploadOrderFile(formData , id) {
      log('uploadOrderFile', formData, id);
      try {
        this.setIsLoading(true);
        const response = await AdminService.uploadOrderFile(formData, id); // Отправляем FormData через сервис
        if(response.status === 200){
          this.fetchOrders();
        }
        log("Файлы успешно добавлены:", response.data);
      } catch (error) {
        error("Ошибка при выгрузке файлов:", error.response?.data?.message);
      }
      finally {
        this.setIsLoading(false);
      }
    }

    async deleteOrderFile(id) {
      log('deleteOrderFile', id);
      try {
        this.setIsLoading(true);
        const response = await AdminService.deleteOrderFile(id); // Отправляем FormData через сервис
        if(response.status === 200){
          this.fetchOrders();
        }
        log("Файл успешно удален:", response.data);
      } catch (error) {
        error("Ошибка при удалении файлов:", error.response?.data?.message);
      }
      finally {
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
      } finally {
        this.setIsLoading(false);
      }
    }

    async changeReviewStatus(id, action) {
      if(!id){
        error("Не передана категория");
        return;
      }
      try {
        this.setIsLoading(true);
        const response = await AdminService.changeReviewStatus(id, action);
        if(response.status === 200){
          this.fetchReviews();
        }
        log("changeReviewStatusresponse", response.data);
      } catch (e) {
        error(e.response?.data?.message);
      }
      finally {
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
        } finally {
          this.setIsLoading(false);
        }
      }
      
}