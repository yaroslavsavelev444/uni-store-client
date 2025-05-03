import $api from "../http/axios";

export default class productService {
  static async getCategories() {
    return $api.get("/categories/getCategories");
  }

  static async getProducts() {
    return $api.get("/products/getProducts");
  }

  static async getReviews() {
    return $api.get("/products/getReviews");
  }

  static async getOrderReviews() {
    return $api.get("/products/getOrderReviews");
  }

  static async fetchCompany(){
    return $api.get("/org/getOrg");
  }
}
