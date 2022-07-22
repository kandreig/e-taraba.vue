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
        <div class="table">
          <input
            v-model="selectedTable"
            type="radio"
            id="productorder"
            value="productorder"
          />
          <label for="productorder">
            <strong>Product Order Table</strong>
          </label>
        </div>
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
        <button class="search__button" @click="togglePostFormVisible">
          POST
        </button>
      </div>
      <div class="db__results" v-if="this.productStore.cards">
        <AdminProductCard
          v-for="(card, index) in this.productStore.cards"
          :key="index"
          :card="card"
        ></AdminProductCard>
        <!-- :card e prop -->
      </div>
    </main>
  </div>
  <PostForm v-if="postFormVisibility" @close="hideForm"></PostForm>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import AdminProductCard from "../components/AdminProductCard.vue";
import PostForm from "../components/Forms/ProductPostForm.vue";
export default {
  name: "AdminView",
  components: { AdminProductCard, PostForm },
  data() {
    return {
      selectedTable: "products",
      postFormVisibility: null,
      type: null,
    };
  },
  setup() {
    const productStore = useProductStore();
    return { productStore };
  },
  methods: {
    test(index) {
      console.log(index);
    },
    hideForm() {
      this.postFormVisibility = false;
    },
    togglePostFormVisible() {
      this.type = "post";
      this.postFormVisibility = true;
    },
    getCardsFromDb() {
      const selectedTable = this.selectedTable;
      if (selectedTable === "products") {
        this.productStore
          .getProducts()
          .then(() => {
            console.log("get cards was gooood");
          })
          .catch((error) => {
            console.log(error);
          });
        return;
      }
      if (selectedTable === "orders") {
        return;
      }
      if (selectedTable === "productorder") {
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
