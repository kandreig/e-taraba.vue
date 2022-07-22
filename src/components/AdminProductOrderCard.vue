<template>
  <div>
    <div>
      <label>id</label>
      <p>{{ card.id }}</p>
    </div>
    <div>
      <label>Product id</label>
      <p>
        {{ card.idProduct }}
      </p>
    </div>
    <div>
      <label>Order id</label>
      <p>
        {{ card.idOrder }}
      </p>
    </div>
    <div>
      <label>Final product price: </label>
      <p>{{ card.price }} <i>pcs</i></p>
    </div>
    <div>
      <label>Number of products in order:</label>
      <p>{{ card.quantity }} <i>pcs</i></p>
    </div>
    <button @click="click_update_order_not_implemented">PUT</button>
    <button @click="click_delete_order_not_implemented">DELETE</button>
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
    deleteProduct() {},
  },
};
</script>

<style></style>
