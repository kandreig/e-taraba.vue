<template>
  <div class="admin">
    <aside class="aside">
      <div class="tables">
        <div class="table">
          <input
            v-model="selectedTable"
            type="radio"
            id="products"
            value="products"
            checked
          />
          <label for="products"> <strong>Products Table</strong> </label>
        </div>
        <div class="table">
          <input
            v-model="selectedTable"
            type="radio"
            id="orders"
            value="orders"
          />
          <label for="orders"> <strong>Orders Table</strong> </label>
        </div>
        <!-- <div class="table">
          <input
            v-model="selectedTable"
            type="radio"
            id="productorder"
            value="productorder"
          />
          <label for="productorder">
            <strong>Product Order Table</strong>
          </label> -->
        <!-- </div> -->
      </div>
    </aside>
    <main class="main">
      <div class="db__nav">
        <input
          type="text"
          class="db__search"
          placeholder="search item in database"
        />
        <button class="search__button" @click="getCardsFromDb">GET</button>
        <button
          class="search__button"
          @click="togglePostFormVisible"
          v-if="this.selectedTable === 'products'"
        >
          POST
        </button>
      </div>
      <div
        class="db__results"
        v-if="this.productStore.cards && this.selectedTable === 'products'"
      >
        <AdminProductCard
          v-for="(card, index) in this.productStore.cards"
          :key="index"
          :card="card"
        ></AdminProductCard>
        <!-- :card e prop -->
      </div>
      <div
        class="db__results"
        v-if="this.orderStore.orders && this.selectedTable === 'orders'"
      >
        <AdminOrderCard
          v-for="(card, index) in this.orderStore.orders"
          :key="index"
          :card="card"
        ></AdminOrderCard>
        <!-- :card e prop -->
      </div>
    </main>
  </div>
  <ProductPostForm
    v-if="postFormVisibilityAndType === 'products'"
    @close="hideForm"
  ></ProductPostForm>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import { useOrderStore } from "@/stores/orderStore";
import AdminProductCard from "../components/AdminProductCard.vue";
import AdminOrderCard from "../components/AdminOrderCard.vue";
import ProductPostForm from "../components/Forms/ProductPostForm.vue";
export default {
  name: "AdminView",
  components: { AdminProductCard, ProductPostForm, AdminOrderCard },
  data() {
    return {
      selectedTable: "products",
      postFormVisibilityAndType: null,
    };
  },
  setup() {
    const productStore = useProductStore();
    const orderStore = useOrderStore();
    return { productStore, orderStore };
  },
  methods: {
    test(index) {
      console.log(index);
    },
    hideForm() {
      this.postFormVisibilityAndType = false;
    },
    togglePostFormVisible() {
      this.postFormVisibilityAndType = this.selectedTable;
    },
    getCardsFromDb() {
      const selectedTable = this.selectedTable;
      if (selectedTable === "products") {
        this.productStore
          .getProducts()
          .then(() => {
            console.log("get products success");
          })
          .catch((error) => {
            console.log(error);
          });
        return;
      }
      if (selectedTable === "orders") {
        this.orderStore
          .getOrders()
          .then(() => {
            console.log("get orders success");
          })
          .catch((error) => {
            console.log(error);
          });
        return;
      }
    },
  },
};
</script>

<style>
.admin {
  width: min(100%, 1500px);
  display: grid;
  grid-template-areas: " sidebar main ";
  margin: 10px auto;
  grid-template-columns: 20rem 1fr;
  gap: 10px;
  align-items: start;
  background-color: #f2f2f7;
}
.tables {
  text-align: start;
}
.table {
  font-weight: 800;
  margin: 0.5em 0;
}

.db__results {
  display: flex;
  justify-content: center;
  flex: auto;
  flex-wrap: wrap;
}
.db__nav {
  text-align: start;
}
.db__search {
  width: 20%;
}

.search__button {
  width: 5%;
}
</style>
<style>
/* style for forms */
.form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  padding: 30px;
  background: white;
  max-width: 500px;
  margin: 2rem auto;
}

.form__field {
  display: inline-flex;
  flex-direction: column;
  margin-block: 1em;
}

.form__field label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #666666;
}

.form__field input,
.form__field textarea {
  font-size: 1.1rem;
}
.form__field img {
  max-width: 200px;
  max-height: 200px;
}
.form__field input[type="number"] {
  align-self: flex-start;
  text-align: center;
}
.form__field input[type="file"] {
  font-size: 1rem;
}
.form__button {
  width: 70px;
  border: none;
  border-radius: 3px;
  align-self: flex-start;
  padding-inline: auto;
  padding-block: 2px;

  margin-block: 10px;
  margin-right: 10px;
  font-size: 1rem;
  color: white;
}
.form__button--post {
  background-color: limegreen;
}
.form__button--cancel {
  background-color: red;
}

.form__field__input-image input {
  display: none;
}
.form__field__input-image label {
  font-weight: 900;
  border-bottom: 1px solid gray;
  align-self: start;
  cursor: pointer;
}
</style>

<style>
.admin-card {
  min-width: 300px;
  width: 40%;
  display: flex;
  flex: auto;
  padding: 10px;
  margin-inline: 5px;
  margin-block: 1em;
  flex-direction: column;
  background-color: #fafafa;
}

.admin-card--margin-block > * {
  margin-block: 10px;
}
.admin-card .admin-card__header {
  margin-right: 1%;
}

.admin-card__id {
  display: flex !important;
  align-items: center;
}

.left__side {
  width: 70%;
}
.admin-card > * {
  vertical-align: middle;
  display: inline-block;
}
.scroll-three-rows {
  width: 100%;
  line-height: 1.3rem;
  height: 3.9rem;
  overflow-x: hidden;
  overflow-y: scroll-three-rows;
  padding: 5px;
  margin-bottom: 5px;
  box-shadow: 1px 1px 3px 1px #333;
}

.img--square {
  aspect-ratio: 1/1;
  object-fit: cover;
  width: 100px;
}
.admin-card__btn--put {
  background-color: lightblue !important;
}
.admin-card__btn--delete {
  background-color: rgb(253, 72, 72) !important;
}
</style>
