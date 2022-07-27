<template>
  <div class="product-order">
    <p>
      id: <i>{{ product.id }}</i>
    </p>
    <p>
      name: <i>{{ product.name }}</i>
    </p>
    <p>
      quantity: <i>{{ product.quantityWhenBought }}</i>
    </p>
    <p>
      price: <i>{{ product.priceWhenBought }}$</i>
    </p>
    <button @click="goToProductDetails">view details</button>
  </div>
</template>

<script>
export default {
  props: { product: {} },
  methods: {
    goToProductDetails() {
      this.$router.push({
        name: "productDetails",
        params: { id: this.product.id },
      });
    },
  },
};
</script>

<style>
.product-order {
  border-bottom: 1px solid lightgray;
  padding-left: 15px;
}
.product-order,
.product-order > * {
  margin-block: 10px;
}
</style>
