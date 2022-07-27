<template>
  <main>
    <div class="container">
      <img :src="photoPath" alt="" />
      <div class="content">
        <h3>
          {{ productStore.cardToDisplay.name }}
        </h3>
        <em>quantity : {{ productStore.cardToDisplay.quantity }}pcs</em>
        <h4>PRICE: {{ productStore.cardToDisplay.price }}$</h4>
        <button
          @click="addProductToCart"
          v-if="productStore.cardToDisplay.quantity > 0"
        >
          Add to CART!
        </button>
        <i
          class="i--out-of-stock"
          v-if="productStore.cardToDisplay.quantity <= 0"
          >Out of stock! Please be pacient</i
        >
      </div>
    </div>
    <div class="description">
      <h3>Description</h3>
      <p>
        {{ productStore.cardToDisplay.description }}
      </p>
    </div>
  </main>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      photoPath: null,
    };
  },
  setup() {
    const productStore = useProductStore();
    const cartStore = useCartStore();

    return { productStore, cartStore };
  },
  beforeRouteEnter(to, from, next) {
    next((cb) => {
      const productStore = useProductStore();
      productStore.getProductById(cb.$props.id).then(() => {
        // photoPath: "https://localhost:44379/images/" + this.card.photoId + ".jpg"
        cb.$data.photoPath =
          "https://localhost:44379/images/" +
          productStore.cardToDisplay.photoId +
          ".jpg";
      });
    });
  },
  methods: {
    addProductToCart() {
      this.cartStore.pushProduct(this.productStore.cardToDisplay);
    },
  },
};
</script>

<style scoped>
main img {
  width: 300px;
  height: 400px;
  object-fit: cover;
}

.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.content {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
}
.content h3 {
  margin-block: 20px;
}
.content em {
  border-bottom: 1px solid black;
}
.content button {
  display: block;
  margin-block: 10px;
  padding: 5px;
  background-color: lightgreen;
  outline: none;
  border: none;
  border-radius: 8px;
}
.i--out-of-stock {
  color: red;
}
.description {
  margin-block: 10%;
  padding-inline: 1%;
}
</style>
<style></style>
