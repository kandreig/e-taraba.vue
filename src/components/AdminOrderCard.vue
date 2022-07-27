<template>
  <div class="admin-card admin-card--margin-block">
    <div class="admin-card__id">
      <h3 class="admin-card__header">id</h3>
      <p>{{ card.id }}</p>
    </div>
    <div class="admin-card__name">
      <h3>Customer fullname</h3>
      <p>
        {{ card.customerFirstName + " " + card.customerLastName }}
      </p>
    </div>
    <div>
      <h3>Customer phone</h3>
      <p>
        {{ card.customerPhone }}
      </p>
    </div>
    <div class="admin-card__price">
      <h3>Total amount of order:</h3>
      <p>{{ card.total }}<i>$</i></p>
    </div>
    <button @click="getProductsOfOrder">see details</button>
    <div v-if="card.products && detailsVisibility" class="admin-card__details">
      <h4 class="admin-card__details__title">Order details</h4>
      <h5>Number of products: {{ card.products.length }}</h5>
      <h5>Products:</h5>
      <ProductOfOrder
        v-for="(product, index) in card.products"
        :key="index"
        :product="product"
      ></ProductOfOrder>
    </div>
  </div>
</template>

<script>
import { useOrderStore } from "@/stores/orderStore";
import ProductOfOrder from "@/components/AdminOrderProductOfOrder.vue";

export default {
  name: "AdminOrderCard",
  components: { ProductOfOrder },
  props: {
    card: {
      type: Object,
    },
  },
  data() {
    return {
      detailsVisibility: false,
    };
  },
  setup() {
    const orderStore = useOrderStore();

    return { orderStore };
  },
  methods: {
    deleteProduct() {
      this.productStore.deleteProduct(this.card);
    },
    toggleFormVisibile() {
      this.putFormVisibility = true;
    },
    getProductsOfOrder() {
      if (this.detailsVisibility === true) {
        this.detailsVisibility = false;
      } else {
        this.detailsVisibility = true;
        this.orderStore.getProductsOfOrderForOrderId(this.card.id);
      }
    },
  },
};
</script>

<style></style>
