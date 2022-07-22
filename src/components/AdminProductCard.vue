<template>
  <div class="db__card">
    <div class="content id">
      <h3>ID</h3>
      <p>{{ card.id }}</p>
    </div>
    <div class="content name">
      <h3>NAME</h3>
      <p class="scroll">
        {{ card.name }}
      </p>
    </div>
    <div class="content photo">
      <h3>PHOTO</h3>
      <img class="square" :src="localhost + card.photoId + '.jpg'" alt="" />
    </div>
    <div class="content description">
      <h3>DESCRIPTION</h3>
      <p class="scroll">
        {{ card.description }}
      </p>
    </div>
    <div class="content quantity">
      <h3>QUANTITY</h3>
      <p>{{ card.quantity }} <i>pcs</i></p>
    </div>
    <div class="content photo__id">
      <h3>PHOTO ID</h3>
      <p>{{ card.photoId }}</p>
    </div>
    <div class="content path">
      <h3>PHOTO PAHT</h3>
      <p>{{ card.photoFolderPath }}</p>
    </div>
    <div class="content price">
      <h3>PRICE</h3>
      <p>{{ card.price }}<i>$</i></p>
    </div>
    <button class="content card__put" @click="toggleFormVisibile">PUT</button>
    <button class="content card__delete" @click="deleteProduct">DELETE</button>
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

<style>
.db__card {
  min-width: 350px;
  width: 50%;
  display: flex;
  padding: 5px;
  margin-block: 10px;
  flex-direction: column;
  background-color: #fafafa;
}
.left__side {
  width: 70%;
}
.content:nth-child(odd) {
  background-color: #dddd;
}
.content > * {
  vertical-align: middle;
  display: inline-block;
}
.content {
  margin-block: 5px;
}

.content h3 {
  margin-right: 15px;
}

.scroll {
  width: 100%;
  line-height: 1.3rem;
  height: 3.9rem;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 5px;
  margin-bottom: 5px;
  box-shadow: 1px 1px 3px 1px #333;
}

.right__side > * {
  width: 100%;
  display: block;
}
img.square {
  aspect-ratio: 1/1;
  object-fit: cover;
  width: 100px;
}
.card__put {
  background-color: lightblue !important;
}
.card__delete {
  background-color: rgb(253, 72, 72) !important;
}
</style>
<style scoped>
button {
  border: none;
  display: inline-block;
}
textarea {
  display: block !important;
}
</style>
