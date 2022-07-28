import { defineStore } from "pinia";
import axiosService from "../services/axiosApi";

export const useProductStore = defineStore("productStore", {
  state() {
    return {
      cards: [],
      cardToDisplay: {},
    };
  },
  getters: {},
  actions: {
    createProduct(product_object) {
      // console.log(product.get("Name"));

      // this.product.PhotoId = uuidv4();
      // this.product.PhotoFolderPath = "d://";

      // formData creation
      let formData_product = new FormData();
      formData_product.append("Name", product_object.Name);
      formData_product.append("Description", product_object.Description);
      formData_product.append("Quantity", product_object.Quantity);
      formData_product.append("Image", product_object.Image);
      // formData.append("PhotoId", this.product.PhotoId);
      // formData.append("PhotoFolderPath", this.product.PhotoFolderPath);
      formData_product.append("Price", parseFloat(product_object.Price));
      // formData creation

      return axiosService
        .post_product(formData_product)
        .then((response) => {
          this.cards.push(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            console.log("unauthorized caught");
          }
          throw error;
        });
    },
    getProducts() {
      this.cards = [];
      return axiosService
        .get_products()
        .then((response) => {
          this.cards = response.data.products;
          console.log(response);
        })
        .catch((error) => {
          throw error;
        });
    },
    getProductById(id) {
      return axiosService
        .get_product_by_id(id)
        .then((response) => {
          this.cardToDisplay = response.data;
          console.log("reqqq");
          console.log(response);
        })
        .catch((error) => {
          throw error;
        });
    },
    getProductsWithFilter(minPrice, maxPrice) {
      this.cards = [];
      return axiosService
        .get_products_with_price_filter(minPrice, maxPrice)
        .then((response) => {
          this.cards = response.data.products;
        })
        .catch((error) => {
          throw error;
        });
    },
    getProductsWithSearchQuery(searchQuery) {
      this.cards = [];
      return axiosService
        .get_products_with_search_query(searchQuery)
        .then((response) => {
          this.cards = response.data.products;
        })
        .catch((error) => {
          throw error;
        });
    },
    deleteProduct(card) {
      return axiosService
        .delete_product(card.id)
        .then(() => {
          const index = this.cards.indexOf(card);
          this.cards.splice(index, 1);
        })
        .catch((error) => {
          throw error;
        });
    },
    updateProduct(product_object_to_update) {
      let form_data = new FormData();

      form_data.append("Name", product_object_to_update.name);
      form_data.append("Description", product_object_to_update.description);
      form_data.append("Quantity", product_object_to_update.quantity);
      form_data.append("Image", product_object_to_update.image);
      form_data.append("Price", product_object_to_update.price);

      return axiosService
        .update_product(product_object_to_update.id, form_data)
        .then(() => {
          this.getProducts();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
