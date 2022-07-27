<template>
  <div class="cart__display">
    <!-- To implement display of cart items logic -->
    <!-- To separate cart display from navbar -> create CartDisplay.vue component -->
    <div class="cart__items">
      <div
        class="cart__item"
        v-for="(cartItem, index) in this.cartStore.cartItems"
        :key="index"
      >
        <img
          :src="
            'https://localhost:44379/images/' +
            cartItem.product.photoId +
            '.jpg'
          "
          alt=""
          class="item__img"
        />
        <div class="item__content">
          <p class="item__title card__title">
            {{ cartItem.product.name }}
          </p>
          <div class="dev">
            <p class="item__price">
              {{ cartItem.product.price }}$
              <i class="item__quantity"
                >(x<i class="item__quantity">{{ cartItem.quantityInCart }}</i
                >)
              </i>
            </p>
          </div>
          <button class="item__remove" @click="removeItem(cartItem)">x</button>
        </div>
      </div>
    </div>

    <p class="total__price">
      Total: <i>{{ this.cartStore.totalPrice }} $</i>
    </p>
    <button class="cart__button" @click="goToCartDetails">
      Finalizeaza comanda
    </button>
  </div>
</template>

<script>
// to implement all logic
import { useCartStore } from "@/stores/cartStore";
export default {
  setup() {
    const cartStore = useCartStore();

    return { cartStore };
  },
  methods: {
    removeItem(cartItem) {
      this.cartStore.removeFromStore(cartItem.product);
    },
    goToCartDetails() {
      this.$router.push({ name: "cartDetails" });
    },
  },
};
</script>

<style>
.cart__display {
  background-color: lightgray;

  position: absolute;
  top: 25px;
  right: -50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 19em;
  padding: 5px;
}
.cart__items {
  max-height: 183px;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
}
.cart__item {
  background-color: white;
  border-bottom: 1px solid lightgray;
  padding: 5px;
  display: flex;
}
.item__img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
.item__content {
  padding-inline: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 80%;
}

/* .item__price {
} */

.item__quantity {
  font-size: 0.8rem;
}

.item__remove {
  color: red;
  position: absolute;
  bottom: 0;
  right: 10px;
  cursor: pointer;
}
</style>
<style scoped>
.item__title {
  font-size: 0.8rem;
  line-height: 1.2em;
  height: 1.2em;
  -webkit-line-clamp: 1;
}
.add {
  margin-inline: 10px;
}
</style>
