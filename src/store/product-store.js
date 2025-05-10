import { makeAutoObservable, runInAction } from "mobx";
import ProductService from "../services/productService";
import { error, log } from "../utils/logger";

export default class ProductStore {
  isLoading = false;
  categories = [];
  orders = [];
  products = [];
  orgReviews = [];
  reviews = [];
  userReviews = [];
  company = {};
  currentProduct = {};
  cart = [];
  mainMaterials = [];
  userCompanies = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories) {
    runInAction(() => {
      this.categories = categories;
      log("Categories set to:", this.categories);
    });
  }
  setIsLoading(bool) {
    runInAction(() => {
      this.isLoading = bool;
      log("Loading set to:", this.isLoading);
    });
  }

  setProducts(products) {
    runInAction(() => {
      this.products = products;
      log("Products set to:", this.products);
    });
  }

  setUserCompanies(userCompanies) {
    runInAction(() => {
      this.userCompanies = userCompanies;
      log("User companies set to:", this.userCompanies);
    });
  }
  setCompany(company) {
    runInAction(() => {
      this.company = company;
      log("Company set to:", this.company);
    });
  }

  setCart(cart) {
    runInAction(() => {
      this.cart = cart;
      log("Cart set to:", this.cart);
    });
  }
  setUserReviews(userReviews) {
    runInAction(() => {
      this.userReviews = userReviews;
      log("userReviews set to:", this.userReviews);
    });
  }

  setCurrentProduct(product) {
    runInAction(() => {
      this.currentProduct = product;
      log("Current product set to:", this.currentProduct);
    });
  }

  setOrders(orders) {
    runInAction(() => {
      this.orders = orders;
      log("Orders set to:", this.orders);
    });
  }

  setMainMaterials(mainMaterials) {
    runInAction(() => {
      this.mainMaterials = mainMaterials;
      log("Main materials set to:", this.mainMaterials);
    });
  }

  setOrgReviews(reviews) {
    runInAction(() => {
      this.reviews = reviews;
      log("reviews set to:", this.reviews);
    });
  }

  //КОРЗИНА
  async fetchCart() {
    try {
      const response = await ProductService.getCart();
      log("fetchCartresponse", response.data);
      this.setCart(response.data);
    } catch (e) {
      error(e.response?.data?.message);
    }
  }

  async setCartItem(id, quantity, action, showToast) {
    if (!id) return error("Не передан id", id);
    try {
      this.setIsLoading(true);
      const response = await ProductService.setCartItem(id, quantity, action);
      if (quantity === 0) {
        this.fetchCart();
        showToast({
          text1: "Товар удален",
          type: "success",
        });
      }
      if (response.status === 200) {
        showToast({
          text1: "Товар добавлен",
          type: "success",
        });
      }
      log("addToCartresponse", response.data);
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
  async clearCart() {
    try {
      this.setIsLoading(true);
      const response = await ProductService.clearCart();
      log("clearCartresponse", response.data);
      if (response.status === 200) {
        this.fetchCart();
      }
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
  async deleteItemFromCart(id) {
    if (!id) return error("Не передан id", id);
    try {
      this.setIsLoading(true);
      const response = await ProductService.deleteItemFromCart(id);
      log("deleteItemFromCartresponse", response.data);
      if (response.status === 200) {
        this.fetchCart();
      }
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  //КАТЕГОРИИ
  async fetchCategories() {
    try {
      this.setIsLoading(true);
      this.setCategories([]);
      const response = await ProductService.getCategories();
      log("fetchCategoriesresponse", response.data);
      this.setCategories(response.data);
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
  //ПРОДУКТЫ

  async fetchProducts(categoryId, selectedValue, showOnMainPage) {
    try {
      this.setIsLoading(true);
      this.setProducts([]);
      const response = await ProductService.getProducts(
        categoryId,
        selectedValue,
        showOnMainPage
      );
      log("fetchProductsresponse", response.data);
      this.setProducts(response.data);
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
  async fetchItemDetails(id) {
    if (!id) return error("Не передан id", id);
    try {
      this.setIsLoading(true);
      const response = await ProductService.getItemDetails(id);
      this.setCurrentProduct(response.data);
      log("fetchItemDetailsresponse", response.data);
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  //ОТЗЫВЫ НА КОМПАНИЮ

  async fetchOrgReviews() {
    try {
      this.setIsLoading(true);
      const response = await ProductService.fetchOrgReviews();
      log("fetchOrgReviewsresponse", response.data);
      this.setOrgReviews(response.data);
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
  async addOrgReview(data, showToast) {
    if (!data) return error("Не переданы данные");
    try {
      this.setIsLoading(true);
      const response = await ProductService.addOrgReview(data);
      log("addReviewresponse", response.data);
      if(response.status === 200){
       showToast({
          text1: "Отзыв отправлен",
          type: "success",
        });
      }
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  //МАТЕРИАЛЫ
  async fetchMaterials() {
    try {
      this.setIsLoading(true);
      this.setMainMaterials([]);
      const response = await ProductService.getMaterials();
      log("fetchMaterialsresponse", response.data);
      this.setMainMaterials(response.data);
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  //ДАННЫЕ КОМПАНИИ
  async fetchCompany() {
    try {
      this.setIsLoading(true);
      const response = await ProductService.fetchCompany();
      log("fetchfetchCompanyresponse", response.data);
      this.setCompany(response.data[0]);
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async sendContactForm(data, showToast) {
    if (!data) return error("Не переданы данные");
    try {
      this.setIsLoading(true);
      const response = await ProductService.sendContactForm(data);
      log("sendContactFormresponse", response.data);
      if (response.status === 200) {
        showToast({
          text1: "Сообщение отправлено",
          type: "success",
        });
      }
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  //ORDER
  async fetchOrders() {
    try {
      this.setIsLoading(true);
      const response = await ProductService.getOrders();
      log("fetchOrdersresponse", response.data);
      this.setOrders(response.data);
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async cancelOrder(id) {
    if (!id) return error("Не передан id");
    try {
      this.setIsLoading(true);
      const response = await ProductService.cancelOrder(id);
      if (response.status === 200) {
        this.fetchOrders();
      }
      log("cancelOrderresponse", response.data);
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
  async createOrder(data, showToast) {
    if (!data) return error("Не переданы данные");
    try {
      this.setIsLoading(true);
      const response = await ProductService.createOrder(data);
      if (response.status === 200) {
        this.fetchCart();
      }
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message || "Неизвестная ошибка",
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }
  async createOrderReview(data, productId, showToast) {
    if (!data || !productId)
      return error("Не переданы данные", data, productId);
    try {
      this.setIsLoading(true);
      const response = await ProductService.createOrderReview(data, productId);
      log("createOrderReview", response.data);
      if (response.status === 200) {
        this.fetchItemDetails();
        showToast({
          text1: "Отзыв отправлен",
          type: "success",
        });
      }
    } catch (e) {
      error(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message || "Неизвестная ошибка",
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  //USER
  async fetchUserCompanies() {
    try {
      this.setIsLoading(true);
      const response = await ProductService.getUserCompanies();
      log("fetchUserCompaniesresponse", response.data);
      this.setUserCompanies(response.data);
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async deleteUserCompany(id) {
    if (!id) return error("Не передан id");
    try {
      this.setIsLoading(true);
      const response = await ProductService.deleteUserCompany(id);
      log("deleteUserCompanyresponse", response.data);
      if (response.status === 200) {
        this.fetchUserCompanies();
      }
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
  async fetchUserReviews() {
    try {
      this.setIsLoading(true);
      const response = await ProductService.getUserReviews();
      log("fetchsetProductReviewsresponse", response.data);
      this.setUserReviews(response.data);
    } catch (e) {
      error(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
}
