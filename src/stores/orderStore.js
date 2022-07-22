import { defineStore } from "pinia";
import axiosService from "../services/axiosApi";

export const useOrderStore = defineStore("orderStore", {
  state() {
    return { orders: [] };
  },
  getters: {},
  actions: {
    getOrders() {
      return axiosService
        .get_orders()
        .then((response) => {
          this.orders = response.data.orders;
        })
        .catch((error) => {
          throw error;
        });
    },
  },
});
