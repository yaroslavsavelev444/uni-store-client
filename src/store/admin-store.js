import { makeAutoObservable, runInAction } from "mobx";
import AdminService from "../services/adminService";
import { productStore } from "../main";
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
      console.log("Users set to:", this.users);
    });
  }
  setIsLoading(bool) {
    runInAction(() => {
      this.isLoading = bool;
      console.log("Loading set to:", this.isLoading);
    });
  }
  setOrders(orders) {
    runInAction(() => {
      this.orders = orders;
      console.log("Orders set to:", this.orders);
    });
  }

  setComments(comments) {
    runInAction(() => {
      this.comments = comments;
      console.log("Comments set to:", this.comments);
    });
  }

  setReviews(reviews) {
    runInAction(() => {
      this.reviews = reviews;
      console.log("Reviews set to:", this.reviews);
    });
  }

  setContacts(contacts) {
    runInAction(() => {
      this.contacts = contacts;
      console.log("Contacts set to:", this.contacts);
    });
  }
  async fetchUsers() {
    try {
      const response = await AdminService.getUsers();
      console.log("response", response.data);
      this.setUsers(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async addProduct(formData) {
    console.log('addProduct', formData);
    try {
      this.setIsLoading(true);
      const response = await AdminService.addProduct(formData); // Отправляем FormData через сервис
      console.log("Продукт успешно добавлен:", response.data);
    } catch (error) {
      console.log("Ошибка при добавлении продукта:", error.response?.data?.message);
    }
    finally {
      this.setIsLoading(false);
    }
  }

  async editProduct(id, formData){
    console.log('editProduct', id, formData);
    if(!formData || !id){
      console.log("Не переданы");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.editProduct(id, formData); // Отправляем FormData через сервис
      console.log("Продукт успешно добавлен:", response.data);
    } catch (error) {
      console.log("Ошибка при добавлении продукта:", error.response?.data?.message);
    }
    finally {
      this.setIsLoading(false);
    }
  }

  async addCategory(formData) {
    console.log("addCategory", formData);
    try {
      this.setIsLoading(true);
      const response = await AdminService.addCategory(formData); // Отправляем FormData через сервис
      console.log("Категория успешно добавлена:", response.data);
      productStore.fetchCategories();
    } catch (error) {
      console.log("Ошибка при добавлении категории:", error.response?.data?.message);
    }
    finally {
      this.setIsLoading(false);
    }
  }
  async editCategory(id, formData) {
    try {
      this.setIsLoading(true);
      const response = await AdminService.editCategory(id, formData);
      console.log("Категория успешно обновлена:", response.data);
      productStore.fetchCategories();
    } catch (error) {
      console.log("Ошибка при редактировании категории:", error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async deleteCategory (id) {
    if(!id){
      console.log("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.deleteCategory(id);
      console.log("Категория успешно обновлена:", response.data);
      productStore.fetchCategories();
    } catch (error) {
      console.log("Ошибка при редактировании категории:", error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async addCompany(formData) {
    if(!formData){
      console.log("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.addCompany(formData);
      console.log("КОмпнаия успешно добавлена:", response.data);
      productStore.fetchCompany();
    } catch (error) {
      console.log("Ошибка при редактировании категории:", error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async editCompany(formData) {
    if(!formData){
      console.log("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.editCompany(formData);
      console.log("КОмпнаия успешно обновлена:", response.data);
      productStore.fetchCompany();
    } catch (error) {
      console.log("Ошибка при редактировании категории:", error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
  async deleteCompany(id) {
    if(!id){
      console.log("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.deleteCompany(id);
      console.log("КОмпнаия успешно удалена:", response.data);
      productStore.fetchCompany();
    } catch (error) {
      console.log("Ошибка при редактировании категории:", error.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchContacts () {
    try {
      this.setIsLoading(true);
      const response = await AdminService.getContacts();
      console.log("fetchContactsresponse", response.data);
      this.setContacts(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
    finally {
      this.setIsLoading(false);
    }
  }

  async updateContactStatus(contactId, status) {
    if(!contactId || !status){
      console.log("Не передан контакт");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await AdminService.updateContactStatus(contactId, status);
      if(response.status === 200){
        this.fetchContacts();
      }
      console.log("updateContactStatusresponse", response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
    finally {
      this.setIsLoading(false);
    }
  }

  async fetchOrders () {
    console.log("fetchOrders");
    try {
      this.setIsLoading(true);
      const response = await AdminService.fetchOrders();
      console.log("fetchOrdersresponse", response.data);
      this.setOrders(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async changeOrderStatus(orderId, status) {
    if(!orderId || !status){
      console.log("Не передан контакт");
      return;
    }
    console.log("changeOrderStatus", orderId, status);
    
    try {
      this.setIsLoading(true);
      const response = await AdminService.changeOrderStatus(orderId, status);
      if(response.status === 200){
        this.fetchOrders();
      }
      console.log("changeOrderStatusresponse", response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
    finally {
      this.setIsLoading(false);
    }
  }
  async cancelOrder(id, text) {
      if (!id || !text) {
        console.log("Не передана ");
        return;
      }
      try {
        this.setIsLoading(true);
        const response = await AdminService.cancelOrder(id, text);
        console.log("cancelOrderresponse", response.data);
        if(response.status === 200){
          this.fetchOrders();
        }
      } catch (e) {
        console.log(e.response?.data?.message);
      } finally {
        this.setIsLoading(false);
      }
    }
    async uploadFiles(formData, id) {
      console.log('uploadedFiles', formData, id);
      try {
        this.setIsLoading(true);
        const response = await AdminService.uploadFiles(formData, id); // Отправляем FormData через сервис
        console.log("Файлы успешно добавлены:", response.data);
      } catch (error) {
        console.log("Ошибка при выгрузке файлов:", error.response?.data?.message);
      }
      finally {
        this.setIsLoading(false);
      }
    }

    async deleteFile(filePath, id) {
      console.log('deleteFile', filePath,'id', id);
      try {
        this.setIsLoading(true);
        const response = await AdminService.deleteFile(filePath, id); // Отправляем FormData через сервис
        console.log("Файл успешно удален:", response.data);
        if(response.status === 200){
          productStore.fetchCompany();
        }
      } catch (error) {
        console.log("Ошибка при удалении файлов:", error.response?.data?.message);
      }
      finally {
        this.setIsLoading(false);
      }
    }

    async addSocialLinks(formData, id) {
      console.log('addSocialLinks', formData, id);
      try {
        this.setIsLoading(true);
        const response = await AdminService.addSocialLinks(formData, id); // Отправляем FormData через сервис
        console.log("Социальные ссылки успешно добавлены:", response.data);
      } catch (error) {
        console.log("Ошибка при добавлении социальных ссылок:", error.response?.data?.message);
      }
      finally {
        this.setIsLoading(false);
      }
    }

    async uploadOrderFile(formData , id) {
      console.log('uploadOrderFile', formData, id);
      try {
        this.setIsLoading(true);
        const response = await AdminService.uploadOrderFile(formData, id); // Отправляем FormData через сервис
        if(response.status === 200){
          this.fetchOrders();
        }
        console.log("Файлы успешно добавлены:", response.data);
      } catch (error) {
        console.log("Ошибка при выгрузке файлов:", error.response?.data?.message);
      }
      finally {
        this.setIsLoading(false);
      }
    }

    async deleteOrderFile(id) {
      console.log('deleteOrderFile', id);
      try {
        this.setIsLoading(true);
        const response = await AdminService.deleteOrderFile(id); // Отправляем FormData через сервис
        if(response.status === 200){
          this.fetchOrders();
        }
        console.log("Файл успешно удален:", response.data);
      } catch (error) {
        console.log("Ошибка при удалении файлов:", error.response?.data?.message);
      }
      finally {
        this.setIsLoading(false);
      }
    }

    async fetchReviews() {
      try {
        this.setIsLoading(true);
        const response = await AdminService.getReviews();
        console.log("fetchReviewsresponse", response.data);
        this.setReviews(response.data);
      } catch (e) {
        console.log(e.response?.data?.message);
      } finally {
        this.setIsLoading(false);
      }
    }

    async changeReviewStatus(id, action) {
      if(!id){
        console.log("Не передана категория");
        return;
      }
      try {
        this.setIsLoading(true);
        const response = await AdminService.changeReviewStatus(id, action);
        if(response.status === 200){
          this.fetchReviews();
        }
        console.log("changeReviewStatusresponse", response.data);
      } catch (e) {
        console.log(e.response?.data?.message);
      }
      finally {
        this.setIsLoading(false);
      }
    }
}