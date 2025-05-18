import $api from "../http/axios";

export default class adminService {
  static async toggleAdminRules(id) {
    return $api.post(`/admin/toggleAdminRules`, { id });
  }
  //PRODUCT
  static async getUsers() {
    return $api.get("/admin/getUsers");
  }

  static async addProduct(formData) {
    return $api.post("/admin/addProduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static async editProduct(id, formData) {
    return $api.post(`/admin/editProduct/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  //CATEGORY
  static async addCategory(formData) {
    return $api.post("/admin/addCategory", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

  static async deleteCategory(id) {
    return $api.delete(`/admin/deleteCategory/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  //COMPANY
  static async addCompany(formData) {
    return $api.post(`/admin/addOrgData`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static async editCompany(formData) {
   return $api.post(`/admin/editOrgData`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
  }
  static async deleteCompany(id) {
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

  static async changeOrderStatus(orderId, status) {
    return $api.patch("/admin/updateOrderStatus", { orderId, status });
  }

  static async cancelOrder(id, text) {
    return $api.post("/admin/cancelOrder", { id, text });
  }

  static async uploadFiles(formData, id) {
    return $api.post(`/admin/uploadOrgFiles/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async deleteFile(filePath, id) {
    return $api.post(`/admin/deleteOrgFile/${id}`, { filePath });
  }

  static async addSocialLinks(formData, id) {
    return $api.post(`/admin/addOrgSocialLinks/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async uploadOrderFile(formData, id) {
    return $api.post(`/admin/uploadOrderFile/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async deleteOrderFile(id) {
    return $api.delete(`/admin/deleteOrderFile/${id}`);
  }

  static async getReviews() {
    return $api.get("/admin/getReviews");
  }

  static async changeReviewStatus(id, action) {
    return $api.post(`/admin/updateReviewStatus/${id}`, { action });
  }

  static async fetchOrgReviews() {
    return $api.get("/admin/getOrgReviews");
  }

  static async updateCommentStatus(id, status) {
    return $api.post(`/admin/updateOrgReviewStatus/${id}`, { status });
  }
}
