import $api from "../http/axios";

export default class productService {

  static async getCart() {
    return $api.get("/cart/getCart");
  }
  static async setCartItem(id, quantity, action) {
    return $api.post("/cart/setCartItem", { id , quantity, action});
  }
  
  static async getCategories() {
    return $api.get("/categories/getCategories");
  }

  static async getProducts(categoryId, showOnMainPage) {
    return $api.get("/products/getProducts", { params: { categoryId, showOnMainPage } });
  }

  static async getReviews() {
    return $api.get("/reviews/getUserReviews");
  }

  static async getOrderReviews() {
    return $api.get("/products/getOrderReviews");
  }

  static async fetchCompany(){
    return $api.get("/org/getOrg");
  }
  static async getItemDetails(id) {
    return $api.get(`/products/getProductDetails`, { params: { id } });
  }
  static async sendContactForm(data) {
    console.log("sendContactForm", data);
    return $api.post("/contacts/sendContactForm", data);
  }
  static async fetchOrgReviews() {
    return $api.get("/reviews/getOrgReviews");
  }

  static async addOrgReview(data) {
    return $api.post("/reviews/addOrgReview", data);
  }

  static async updateCommentStatus(id, status) {
    return $api.post("/admin/updateReviewStatus", { id, status });
  }

  static async checkAvailableItems(items) {
    return $api.post("/cart/checkAvailableItems", { items });
  }

  static async createOrder(data) {
    return $api.post("/cart/createOrder", data);
  }

  static async getOrders() {
    return $api.get("/orders/getOrders");
  }
}
