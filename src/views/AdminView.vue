<template>
  <div class="admin">
    <aside class="aside">
      <div class="tables" v-for="(table, index) in tables" :key="index">
        <h5 class="table" @click="test(index)">{{ table }}</h5>
      </div>
    </aside>
    <main class="main">
      <div class="db__nav">
        <input
          type="text"
          class="db__search"
          placeholder="search item in database"
        />
        <button class="search__button">GET</button>
        <button class="search__button" @click="displayPostForm">POST</button>
      </div>
      <div class="db__results">
        <AdminProductCard @put-item="putItem"></AdminProductCard>
      </div>
    </main>
  </div>
  <Form v-if="showForm" @close="hideForm"></Form>
</template>

<script>
import AdminProductCard from "../components/AdminProductCard.vue";
import Form from "../components/Forms/PostForm.vue";
export default {
  name: "AdminView",
  components: { AdminProductCard, Form },
  data() {
    return {
      tables: ["Products", "Orders", "ProductOrderDetails"],
      showForm: null,
    };
  },
  methods: {
    test(index) {
      console.log(index);
    },
    hideForm() {
      this.showForm = false;
    },
    displayPostForm() {
      this.showForm = true;
    },
    putItem() {
      this.showForm = true;
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
  text-align: center;
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
