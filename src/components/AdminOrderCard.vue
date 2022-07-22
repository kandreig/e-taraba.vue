<template>
  <div>
    <div>
      <h3>ID</h3>
      <p>{{ card.id }}</p>
    </div>
    <div>
      <h3>NAME</h3>
      <p class="scroll">
        {{ card.name }}
      </p>
    </div>
    <div>
      <h3>PHOTO</h3>
      <img class="square" :src="localhost + card.photoId + '.jpg'" alt="" />
    </div>
    <div>
      <h3>DESCRIPTION</h3>
      <p class="scroll">
        {{ card.description }}
      </p>
    </div>
    <div>
      <h3>QUANTITY</h3>
      <p>{{ card.quantity }} <i>pcs</i></p>
    </div>
    <div>
      <h3>PHOTO ID</h3>
      <p>{{ card.photoId }}</p>
    </div>
    <div>
      <h3>PHOTO PAHT</h3>
      <p>{{ card.photoFolderPath }}</p>
    </div>
    <div>
      <h3>PRICE</h3>
      <p>{{ card.price }}<i>$</i></p>
    </div>
    <button
      class="content card__put"
      @click="click_update_order_not_implemented"
    >
      PUT
    </button>
    <button
      class="content card__delete"
      @click="click_delete_order_not_implemented"
    >
      DELETE
    </button>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import { useUserStore } from "@/stores/userStore";
import ProductPutForm from "@/components/Forms/ProductPutForm.vue";

export default {
  name: "AdminProductCard",
  components: { ProductPutForm },
  props: {
    card: {
      type: Object,
    },
  },
  data() {
    return {
      localhost: "https://localhost:44379/images/",
      putFormVisibility: false,
    };
  },
  setup() {
    const productStore = useProductStore();
    const userStore = useUserStore();

    return { productStore, userStore };
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
