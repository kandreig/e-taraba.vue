import { defineStore } from "pinia";
import axiosService from "../services/axiosApi";

export const useProductStore = defineStore("productStore", {
  state() {
    return {};
  },
  getters: {},
  actions: {
    createProduct(product, access_token) {
      return axiosService
        .post_product(product, access_token)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          throw error;
        });
    },
  },
});
