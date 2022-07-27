<template>
  <div class="card stacked">
    <img :src="photoPath" alt="" @click="goToProductDetails" />
    <div class="card__content">
      <h2 class="card__title" @click="goToProductDetails">
        {{ card.name }}
      </h2>
      <p class="card__price">{{ card.price }}$</p>
      <button
        class="card__addtocart"
        @click="addProductToCart"
        v-if="card.quantity > 0"
      >
        Add To Cart
      </button>
      <button
        class="card__addtocart card__addtocart--out-of-stock"
        v-if="card.quantity <= 0"
      >
        Out of stock
      </button>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cartStore";
export default {
  name: "HomeProductCard",
  props: { card: Object },
  data() {
    return {
      photoPath: "https://localhost:44379/images/" + this.card.photoId + ".jpg",
    };
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  methods: {
    addProductToCart() {
      this.cartStore.pushProduct(this.card);
    },
    goToProductDetails() {
      var cardId = this.card.id;
      this.$router.push({
        name: "productDetails",
        params: { id: cardId, card: this.card },
      });
    },
  },
};
</script>

<style>
.card {
  /* border: 3px solid hotpink; */
  aspect-ratio: 1 / 1.5;
  max-width: 300px;
}

.card img {
  width: 100%;
  aspect-ratio: 1 / 1.25;
  object-fit: cover;
}

.stacked {
  display: grid;
  height: 100%;
  width: 100%;
}

.stacked > * {
  grid-column: 1/2;
  grid-row: 1/2;
}
.card__content {
  background-color: white;
  align-self: end;
  margin: 0.5rem 0.5rem 2rem;
  padding: 0.5rem;
  border-radius: 3px;
  box-shadow: 0 0.25rem 1rem rgb(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

.card__title {
  font-size: 1.2rem;
  line-height: 1.3rem;
  height: 2.6rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  align-self: center;
}
.card__price {
  font-size: 1.5rem;
  margin-top: 10px;
  margin-right: 10px;
  background-color: rgba(224, 193, 134, 0.24);
  width: 100%;
  text-align: center;
  color: black;
  font-weight: bold;
}

.card__addtocart {
  background-color: lightcoral;
  color: white;
  padding: 0.3rem;
  border: none;
  border-radius: 10px;
  align-self: flex-end;
}
.card__addtocart--out-of-stock {
  background-color: red;
}
</style>
