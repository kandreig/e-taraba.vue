<template>
  <div class="cart-details-card">
    <img :src="photoPath" alt="" class="cart-details-card__img" />
    <h4 class="cart-details-card__name">
      {{ card.product.name }}
    </h4>
    <div class="quantity">
      <label for="quantity">Quantity:</label>
      <select
        name="cart-details-card__quantity"
        id="quantity"
        @change="updateQuantity()"
        v-model="newQuantity"
      >
        <option v-for="n in this.card.product.quantity" :key="n">
          {{ n }}
        </option>
      </select>
    </div>
    <div class="cart-details-card__price-pcs">
      <p class="cart-details-card__price-total-text--small">Price/pcs</p>
      <h4>{{ card.product.price }}$</h4>
    </div>
    <div class="cart-details-card__price-total">
      <p class="cart-details-card__price-total-text--small">Total price</p>
      <h4>{{ card.product.price * card.quantityInCart }}$</h4>
    </div>
    <div class="cart-details-card__delete-item">
      <button @click="removeFromCart" class="delete card-details-card__button">
        delete
      </button>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cartStore";
export default {
  props: { card: Object },
  data() {
    return {
      photoPath:
        "https://localhost:44379/images/" + this.card.product.photoId + ".jpg",
      newQuantity: this.card.quantityInCart,
    };
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  methods: {
    updateQuantity() {
      this.cartStore.updateQuantityInCart(
        this.newQuantity,
        this.card.product.id
      );
    },
    removeFromCart() {
      this.cartStore.removeFromStore(this.card);
    },
  },
};
</script>

<style scoped>
.cart-details-card__name {
  flex-basis: 50%;
  line-height: 1.3rem;
  height: 2.6rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.cart-details-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-block: 1em;
}
.cart-details-card__img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
.cart-details-card__price-total-text--small {
  font-size: 0.8em;
}
.delete {
  color: Red;
}
.card-details-card__button {
  outline: none;
  border: none;
  background: none;
}
.cart.delete {
  width: 1%;
}
</style>
