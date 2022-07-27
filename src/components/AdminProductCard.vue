<template>
  <div class="admin-card">
    <div class="admin-card__id">
      <h3 class="admin-card__header">ID</h3>
      <p>{{ card.id }}</p>
    </div>
    <div class="admin-card__name">
      <h3>NAME</h3>
      <p class="scroll-three-rows">
        {{ card.name }}
      </p>
    </div>
    <div class="admin-card__photo">
      <h3>PHOTO</h3>
      <img
        class="img--square"
        :src="localhost + card.photoId + '.jpg'"
        alt=""
      />
    </div>
    <div class="admin-card__description">
      <h3>DESCRIPTION</h3>
      <p class="scroll-three-rows">
        {{ card.description }}
      </p>
    </div>
    <div class="admin-card__quantity">
      <h3>QUANTITY</h3>
      <p>{{ card.quantity }} <i>pcs</i></p>
    </div>
    <div class="admin-card__photo-id">
      <h3>PHOTO ID</h3>
      <p>{{ card.photoId }}</p>
    </div>
    <div class="admin-card__path">
      <h3>PHOTO PAHT</h3>
      <p>{{ card.photoFolderPath }}</p>
    </div>
    <div class="admin-card__price">
      <h3>PRICE</h3>
      <p>{{ card.price }}<i>$</i></p>
    </div>
    <button
      class="admin-card__btn admin-card__btn--put"
      @click="toggleFormVisibile"
    >
      PUT
    </button>
    <button
      class="admin-card__btn admin-card__btn--delete"
      @click="deleteProduct"
    >
      DELETE
    </button>
  </div>
  <ProductPutForm
    v-if="putFormVisibility"
    :card="card"
    @close="this.putFormVisibility = !this.putFormVisibility"
  ></ProductPutForm>
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
