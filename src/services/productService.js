import $api from "../http/axios";
import { log } from "../utils/logger";

export default class productService {
  static async getCart() {
    return $api.get("/cart/getCart");
  }
  static async setCartItem(id, quantity, action) {
    return $api.post("/cart/setCartItem", { id, quantity, action });
  }

  static async getCategories() {
    return $api.get("/categories/getCategories");
  }

  static async getProducts(categoryId, selectedValue, showOnMainPage) {
    log("getProducts", categoryId, selectedValue, showOnMainPage);
    return $api.get("/products/getProducts", {
      params: { categoryId, selectedValue, showOnMainPage },
    });
  }
  static async getUserReviews() {
    return $api.get("/reviews/getUserReviews");
  }

  static async fetchCompany() {
    return $api.get("/org/getOrg");
  }
  static async getItemDetails(id) {
    return $api.get(`/products/getProductDetails`, { params: { id } });
  }
  static async sendContactForm(data) {
    log("sendContactForm", data);
    return $api.post("/contacts/sendContactForm", data);
  }
  static async fetchOrgReviews() {
    return $api.get("/reviews/getOrgReviews");
  }

  static async addOrgReview(data) {
    return $api.post("/reviews/addOrgReview", data);
  }

  static async checkAvailableItems(items) {
    return $api.post("/cart/checkAvailableItems", { items });
  }

  static async createOrder(data) {
    return $api.post("/orders/createOrder", data);
  }

  static async getOrders() {
    return $api.get("/orders/getOrders");
  }

  static async cancelOrder(id) {
    return $api.post("/orders/cancelOrder", { id });
  }

  static async clearCart() {
    return $api.post("/cart/clearCart");
  }

  static async getUserCompanies() {
    return $api.get("/orders/getCompanies");
  }

  static async deleteUserCompany(id) {
    return $api.post("/orders/deleteCompany", { id });
  }

  static async createOrderReview(reviewData, productId) {
    return $api.post(`/reviews/addProductReview/${productId}`, reviewData);
  }

  static async deleteItemFromCart(id) {
    return $api.post("/cart/deleteItem", { id });
  }
  
}
