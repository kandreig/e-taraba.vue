import { defineStore } from "pinia";
import axiosService from "../services/axiosApi";

// import axiosService from "../services/axiosApi";

export const useCartStore = defineStore("cartStore", {
  state() {
    return {
      cartItems: [],
    };
  },
  getters: {
    numberOfItemsInCart() {
      return this.cartItems.length;
    },
    totalPrice() {
      let sum = 0;
      this.cartItems.forEach((item) => {
        sum += item.product.price * item.quantityInCart;
      });
      return sum;
    },
  },
  actions: {
    pushProduct(product) {
      let indexOfProductInStore = this.cartItems.findIndex(
        (p) => p.product.id === product.id
      );
      //check if items exists in cart store
      if (indexOfProductInStore >= 0) {
        let quantityInCart =
          this.cartItems[indexOfProductInStore].quantityInCart;
        let quantityOfProductInDatabase =
          this.cartItems[indexOfProductInStore].product.quantity;
        //check if quantity in cart is less than quantity of item in database
        if (quantityInCart < quantityOfProductInDatabase) {
          this.cartItems[indexOfProductInStore].quantityInCart++;
        }
      } else {
        let quantityInCart = 1;
        let cartItem = {
          product,
          quantityInCart,
        };

        this.cartItems.push(cartItem);
      }
    },
    updateQuantityInCart(newQuantity, productId) {
      let indexOfProductInStore = this.cartItems.findIndex(
        (p) => p.product.id === productId
      );

      this.cartItems[indexOfProductInStore].quantityInCart = newQuantity;
    },
    removeFromStore(product) {
      let indexOfProductInStore = this.cartItems.findIndex(
        (p) => p.product.id === product.id
      );
      console.log(indexOfProductInStore);
      this.cartItems.splice(indexOfProductInStore, 1);
    },
    postOrder(orderToPost) {
      var orderCreated;
      axiosService.post_order(orderToPost).then((response) => {
        orderCreated = response.data;

        this.cartItems.forEach((item) => {
          const product = item.product;
          const quantityInCart = item.quantityInCart;

          const productOrderDetailsToPost = {
            Price: product.price,
            Quantity: quantityInCart,
            ProductId: product.id,
            OrderId: orderCreated.id,
          };

          axiosService.post_productOrderDetails(productOrderDetailsToPost);
        });

        this.cartItems = [];
      });

      // axiosService.post_productorderdetails();
      // axiosService.update_product();
      //post order and productorder details
    },
  },
});
