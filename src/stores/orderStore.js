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
    getProductsOfOrderForOrderId(idOrder) {
      return axiosService
        .get_products_for_orderId(idOrder)
        .then((response) => {
          //get index of orderId
          let indexOfOrderInStore = this.orders.findIndex(
            (o) => o.id === idOrder
          );
          //set products of order
          this.orders[indexOfOrderInStore].products = response.data;

          //get productorder Details
          axiosService
            .get_productorder_details_for_orderId(idOrder)
            .then((response) => {
              var productorderDetails = response.data;
              //getting the order we are working with
              let orderOfProducts = this.orders[indexOfOrderInStore];
              //foreach product of order set data in store
              //data -> quantityWhenBought && priceWhenBought
              productorderDetails.forEach((po) => {
                //indexOfProductInOrder -> index of product that we need to add properties
                let indexOfProductInOrder = orderOfProducts.products.findIndex(
                  (p) => p.id === po.productId
                );
                orderOfProducts.products[
                  indexOfProductInOrder
                ].quantityWhenBought = po.quantity;
                orderOfProducts.products[
                  indexOfProductInOrder
                ].priceWhenBought = po.price;
              });
            });
        })
        .catch((error) => {
          console.warn(error);
        });
    },
  },
});
