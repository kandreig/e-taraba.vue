<template>
  <div>
    <div>
      <label>id</label>
      <p>{{ card.id }}</p>
    </div>
    <div>
      <label>Customer fullname</label>
      <p>
        {{ card.customerFirstName + " " + card.customerLastName }}
      </p>
    </div>
    <div>
      <label>Customer phone</label>
      <p>
        {{ card.customerPhone }}
      </p>
    </div>
    <div>
      <label>Total amount of order: </label>
      <p>{{ card.total }} <i>pcs</i></p>
    </div>
    <button @click="click_details_order_not_implemented">see details</button>
    <!-- <div>
      <h4>Order details:</h4>
      <label>Number of products:</label>
      <p>{{ this.productorderDetails.numberOfProductsForOrder }}</p>
      <ProductOfOrder.. v-for.. ></ProductOfOrder>
    </div> -->
  </div>
</template>

<script>
import { useOrderStore } from "@/stores/orderStore";

export default {
  name: "AdminOrderCard",
  components: {},
  props: {
    card: {
      type: Object,
    },
  },
  data() {
    return {};
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
  },
};
</script>

<style></style>
