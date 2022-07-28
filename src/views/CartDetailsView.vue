<template>
  <main>
    <h2>Cos de cumparaturi</h2>
    <div class="wrapper">
      <div class="cart-details-card__list">
        <CartDetailsCard
          v-for="(card, index) in this.cartStore.cartItems"
          :key="index"
          :card="card"
        ></CartDetailsCard>
      </div>
      <div class="order__details">
        <div class="customer">
          <h3>Order Data</h3>
          <div class="order-details-form">
            <div class="firstname">
              <label for="firstname">First name</label>
              <input
                v-model="customerFirstName"
                type="text"
                name="firstname"
                id="firstname"
              />
            </div>
            <div class="lastname">
              <label for="lastname">Last name</label>
              <input
                v-model="customerLastName"
                type="text"
                name="lastname"
                id="lastname"
              />
            </div>
            <div class="phone">
              <label for="phone">Phone</label>
              <input
                v-model="customerPhone"
                type="text"
                name="phone"
                id="phone"
              />
            </div>
            <div class="error">
              <em>{{ error }}</em>
            </div>
          </div>
        </div>
        <div class="cart__summary">
          <p>total: {{ this.cartStore.totalPrice }}$</p>
          <button @click="postOrder">Send Order</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CartDetailsCard from "@/components/CartDetailsCard.vue";
import { useCartStore } from "@/stores/cartStore";
export default {
  components: { CartDetailsCard },
  data() {
    return {
      customerFirstName: "",
      customerLastName: "",
      customerPhone: "",
      error: "",
    };
  },
  setup() {
    const cartStore = useCartStore();

    return { cartStore };
  },
  methods: {
    postOrder() {
      const error = this.validateDetails();
      if (error) {
        this.error =
          "please input valid details; name not empty & less than 100 characters, phone not empty & less than 10 chars";
        return;
      }
      let orderToPost = {
        customerFirstName: this.customerFirstName,
        customerLastName: this.customerLastName,
        customerPhone: this.customerPhone,
        total: this.cartStore.totalPrice,
      };
      this.cartStore.postOrder(orderToPost);
      this.$router.push({ name: "home" });
    },
    validateDetails() {
      let error = false;
      const CUSTOMER_NAME_MAXLENGTH = 100;
      const CUSTOMER_PHONE_MAXLENGTH = 10;
      if (
        this.customerFirstName === "" ||
        this.customerFirstName.length > CUSTOMER_NAME_MAXLENGTH ||
        this.customerLastName === "" ||
        this.customerLastName.length > CUSTOMER_NAME_MAXLENGTH ||
        this.customerPhone === "" ||
        this.customerPhone.length > CUSTOMER_PHONE_MAXLENGTH
      ) {
        error = true;
      }
      return error;
    },
  },
};
</script>

<style scoped>
.cart-details-card__list {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-self: start;
}

.wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

input {
  width: 100px;
}
.customer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.order-details-form {
  text-align: end;
}

.order__details {
  position: sticky;
  top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart__summary {
  margin-top: 20px;
  text-align: center;
}
.error {
  width: 175px;
}
</style>
