import { makeAutoObservable, runInAction } from "mobx";
import ProductService from "../services/productService";

export default class ProductStore {
  categories = [];
  products = [];
  reviews = [];
  orderReviews = [];
  company = {};


  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories) {
    runInAction(() => {
      this.categories = categories;
      console.log("Categories set to:", this.categories);
    });
  }

  setProducts(products) {
    runInAction(() => {
      this.products = products;
      console.log("Products set to:", this.products);
    });
  }
  setCompany(company) {
    runInAction(() => {
      this.company = company;
      console.log("Company set to:", this.company);
    });
  }

  setReviews(reviews) {
    runInAction(() => {
      this.reviews = reviews;
      console.log("Reviews set to:", this.reviews);
    });
  }
  setOrderReviews(orderReviews) {
    runInAction(() => {
      this.orderReviews = orderReviews;
      console.log("Order reviews set to:", this.orderReviews);
    });
  }

  async fetchCategories() {
    try {
      const response = await ProductService.getCategories();
      console.log("fetchCategoriesresponse", response.data);
      this.setCategories(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
  async fetchProducts() {
    try {
      const response = await ProductService.getProducts();
      console.log("fetchProductsresponse", response.data);
      this.setProducts(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
  async fetchReviews() {
    try {
      const response = await ProductService.getReviews();
      console.log("fetchReviewsresponse", response.data);
      this.setReviews(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
  async fetchOrderReviews() {
    try {
      const response = await ProductService.getOrderReviews();
      console.log("fetchOrderReviewsresponse", response.data);
      this.setOrderReviews(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async fetchCompany() {
    try {
      const response = await ProductService.fetchCompany();
      console.log("fetchfetchCompanyresponse", response.data);
      this.setCompany(response.data[0]);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
}
