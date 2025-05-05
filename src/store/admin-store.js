import { makeAutoObservable, runInAction } from "mobx";
import AdminService from "../services/adminService";
import { API_URL } from "../http/axios";
import { productStore } from "../main";
export default class AdminStore {
 users=[];
 comments=[];
 orders=[];
 contacts=[];
 isLoading = false;

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

}