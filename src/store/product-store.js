import { makeAutoObservable, runInAction } from "mobx";
import ProductService from "../services/productService";

export default class ProductStore {
  isLoading = false;
  categories = [];
  orders = [];
  products = [];
  reviews = [];
  userReviews = [];
  company = {};
  currentProduct = {};
  cart = [];
  mainMaterials = [];
  comments = [];
  files = [];
  userCompanies = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories) {
    runInAction(() => {
      this.categories = categories;
      console.log("Categories set to:", this.categories);
    });
  }
  setIsLoading(bool) {
    runInAction(() => {
      this.isLoading = bool;
      console.log("Loading set to:", this.isLoading);
    });
  }

  setFiles(files) {
    runInAction(() => {
      this.files = files;
      console.log("Files set to:", this.files);
    });
  }
  setProducts(products) {
    runInAction(() => {
      this.products = products;
      console.log("Products set to:", this.products);
    });
  }

  setUserCompanies(userCompanies) {
    runInAction(() => {
      this.userCompanies = userCompanies;
      console.log("User companies set to:", this.userCompanies);
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

  setCart(cart) {
    runInAction(() => {
      this.cart = cart;
      console.log("Cart set to:", this.cart);
    });
  }
  setUserReviews(userReviews) {
    runInAction(() => {
      this.userReviews = userReviews;
      console.log("userReviews set to:", this.userReviews);
    });
  }
  setComments(comments) {
    runInAction(() => {
      this.comments = comments;
      console.log("Comments set to:", this.comments);
    });
  }
  setCurrentProduct(product) {
    runInAction(() => {
      this.currentProduct = product;
      console.log("Current product set to:", this.currentProduct);
    });
  }

  setOrders(orders) {
    runInAction(() => {
      this.orders = orders;
      console.log("Orders set to:", this.orders);
    });
  }
  //MATERIALS
  setMainMaterials(mainMaterials) {
    runInAction(() => {
      this.mainMaterials = mainMaterials;
      console.log("Main materials set to:", this.mainMaterials);
    });
  }

  async fetchCart() {
    try {
      const response = await ProductService.getCart();
      console.log("fetchCartresponse", response.data);
      this.setCart(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async setCartItem(id, quantity, action, showToast) {
    console.log("id" + id);
    console.log("quantity" + quantity);
    console.log("action" + action);

    if (!id) {
      console.log(id, quantity);
      console.log("Не передана категория");
      return;
    }
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
      console.log("addToCartresponse", response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchMaterials() {
    try {
      this.setIsLoading(true);
      this.setMainMaterials([]);
      const response = await ProductService.getMaterials();
      console.log("fetchMaterialsresponse", response.data);
      this.setMainMaterials(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchCategories() {
    try {
      this.setIsLoading(true);
      this.setCategories([]);
      const response = await ProductService.getCategories();
      console.log("fetchCategoriesresponse", response.data);
      this.setCategories(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
  async fetchProducts(categoryId, selectedValue, showOnMainPage) {
    console.log("fetchProducts", categoryId,selectedValue,  showOnMainPage);
    try {
      this.setIsLoading(true);
      this.setProducts([]);
      const response = await ProductService.getProducts(
        categoryId,
        selectedValue,
        showOnMainPage
      );
      console.log("fetchProductsresponse", response.data);
      this.setProducts(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
  async fetchUserReviews() {
    try {
      this.setIsLoading(true);
      const response = await ProductService.getUserReviews();
      console.log("fetchsetProductReviewsresponse", response.data);
      this.setUserReviews(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchCompany() {
    try {
      this.setIsLoading(true);
      const response = await ProductService.fetchCompany();
      console.log("fetchfetchCompanyresponse", response.data);
      this.setCompany(response.data[0]);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchItemDetails(id) {
    if (!id) {
      console.log("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await ProductService.getItemDetails(id);
      this.setCurrentProduct(response.data);
      console.log("fetchItemDetailsresponse", response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async sendContactForm(data, showToast) {
    if (!data) {
      console.log("Не передана данные");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await ProductService.sendContactForm(data);
      console.log("sendContactFormresponse", response.data);
      if (response.status === 200) {
        showToast({
          text1: "Сообщение отправлено",
          type: "success",
        });
      }
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchOrgReviews() {
    try {
      this.setIsLoading(true);
      const response = await ProductService.fetchOrgReviews();
      console.log("fetchCommentsresponse", response.data);
      this.setComments(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async addOrgReview(data) {
    if (!data) {
      console.log("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await ProductService.addOrgReview(data);
      console.log("addReviewresponse", response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async updateCommentStatus(id, status) {
    if (!id) {
      console.log("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await ProductService.updateCommentStatus(id, status);
      if (response.status === 200) {
        this.fetchOrgReviews();
      }
      console.log("updateCommentStatusresponse", response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  //ORDER

  async fetchOrders () {
    try {
      this.setIsLoading(true);
      const response = await ProductService.getOrders();
      console.log("fetchOrdersresponse", response.data);
      this.setOrders(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async cancelOrder(id) {
    if (!id) {
      console.log("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await ProductService.cancelOrder(id);
      if(response.status === 200){
        this.fetchOrders();
      }
      console.log("cancelOrderresponse", response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
  async createOrder(data, showToast) {
    if (!data ) {
      console.log("Не передана категория");
      showToast({
        text1: "Нужно выбрать товары",
        type: "error",
      });
      return;
    }
    try {
      this.setIsLoading(true);
        const response = await ProductService.createOrder(data);
        if (response.status === 200) {
          this.fetchCart();
        }
      } catch (e) {
      console.log(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message || "Неизвестная ошибка",
        type: "error",
      });
    } finally {
      this.setIsLoading(false);
    }
  }

  async clearCart() {
    try {
      this.setIsLoading(true);
      const response = await ProductService.clearCart();
      console.log("clearCartresponse", response.data);
      if (response.status === 200) {
        this.fetchCart();
      }
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchUserCompanies() {
    try {
      this.setIsLoading(true);
      const response = await ProductService.getUserCompanies();
      console.log("fetchUserCompaniesresponse", response.data);
      this.setUserCompanies(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async deleteUserCompany(id) {
    if(!id) return console.log("Не передан id");
    try {
      this.setIsLoading(true);
      const response = await ProductService.deleteUserCompany(id);
      console.log("deleteUserCompanyresponse", response.data);
      if (response.status === 200) {
        this.fetchUserCompanies();
      }
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async sendOrderReviewData (data, productId, showToast) {
    if (!data || !productId) {
      console.log("Не передана категория");
      return;
    }
    try {
      this.setIsLoading(true);
      const response = await ProductService.sendOrderReviewData(data, productId);
      console.log("sendOrderReviewDataresponse", response.data);
      if(response.status === 200){
        this.fetchItemDetails();
        showToast({
          text1: "Отзыв отправлен",
          type: "success",
        })
      }
    } catch (e) {
      console.log(e.response?.data?.message);
      showToast({
        text1: e.response?.data?.message || "Неизвестная ошибка",
        type: "error",
      })
    } finally {
      this.setIsLoading(false);
    }
  }
}
