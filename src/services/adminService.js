import $api from "../http/axios";

export default class adminService {

   //PRODUCT
  static async getUsers() {
    return $api.get("/admin/getUsers");
  }

  static async addProduct(formData) {
    return $api.post("/admin/addProduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",  // Указываем, что передаем formData
      },
    });
  }
 static async editProduct(id, formData){
  return $api.post(`/admin/editProduct/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",  // Указываем, что передаем formData
    },
  });
 }

  //CATEGORY
  static async addCategory(formData) {
    return $api.post("/admin/addCategory", formData, {
      headers: {
        "Content-Type": "multipart/form-data",  // Указываем, что передаем formData
      },
    });
  }

  static async editCategory(id, formData) {
    return $api.put(`/admin/editCategory/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async deleteCategory(id){
    return $api.delete(`/admin/deleteCategory/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  //COMPANY
  static async addCompany(formData){
    return $api.post(`/admin/addOrgData`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",  
      },
    });
  }
  static async editCompany(formData){
    return $api.put(`/admin/editOrgData`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",  
      },
    });
  }
  static async deleteCompany(id){
    return $api.delete(`/admin/deleteOrgData/${id}`);
  }

  //CONTACTS 
  
  static async getContacts() {
    return $api.get("/admin/getContacts");
  }

  static async updateContactStatus(contactId, status) {
    return $api.post("/admin/updateContactStatus", { contactId, status });
  }

  //ORDERS
  static async fetchOrders() {
    return $api.get("/admin/getOrders");
  }
}