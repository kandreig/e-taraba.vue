<template>
  <div class="home">
    <header class="header">
      <img
        class="header__link__img"
        src="../assets/header_img1.jpg"
        alt="advertising image"
      />
    </header>
    <aside class="sidebar">
      <div class="sidebar__search__parameters">
        <p class="sidebar__title">Filters</p>
        <div class="search__parameters">
          <p class="search__parameters__price--title">Price</p>

          <form
            class="search__parameters__form"
            @submit.prevent="filterProducts"
          >
            <div class="search__parameters__price--input">
              <input
                class="input__price"
                type="text"
                placeholder="min. price"
                v-model="minPrice"
              /><span>-</span
              ><input
                class="input__price"
                type="text"
                placeholder="max. price"
                v-model="maxPrice"
              />
            </div>
            <button class="search__parameters__form__button">filter</button>
            <button
              class="search__parameters__form__button"
              @click.prevent="resetProducts"
            >
              reset
            </button>
          </form>
        </div>
      </div>
    </aside>
    <main v-if="this.productStore.cards" class="main">
      <HomeProductCard
        v-for="(card, index) in this.productStore.cards"
        :key="index"
        :card="card"
      ></HomeProductCard>
    </main>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
// @ is an alias to /src
import HomeProductCard from "../components/HomeProductCard.vue";

export default {
  name: "HomeView",
  components: { HomeProductCard },
  data() {
    return {
      minPrice: "",
      maxPrice: "",
    };
  },
  setup() {
    const productStore = useProductStore();
    return { productStore };
  },
  methods: {
    filterProducts() {
      let minPrice = this.minPrice;
      let maxPrice = this.maxPrice;

      if (minPrice === "" && maxPrice === "") {
        return this.productStore.getProducts();
      } else if (minPrice === "") {
        return this.productStore.getProductsWithFilter(0, maxPrice);
      } else if (maxPrice === "") {
        return this.productStore.getProductsWithFilter(minPrice, 9999999);
      } else {
        return this.productStore.getProductsWithFilter(minPrice, maxPrice);
      }
    },
    resetProducts() {
      return this.productStore.getProducts();
    },
  },
};
</script>

<style>
.home {
  background-color: #f2f2f7;
  display: grid;
  grid-template-areas:
    " header header "
    " sidebar main ";
  grid-template-columns: minmax(200px, 1fr) 3fr;
  grid-template-rows: 0.3fr 0.7fr;
  margin: 10px 0 60px 0;
  gap: 10px;
}
header {
  grid-area: header;
  /* align-self: stretch; */
}

.header {
  padding: 0px;
  line-height: 0;
}
.header__link__img {
  width: 100%;
  height: 100%;
  aspect-ratio: 4/1.5;
  object-fit: cover;
}

aside {
  margin-left: 10px;
  grid-area: sidebar;
  align-self: start;
  position: sticky;
  top: 60px;
}
.sidebar {
  background-color: transparent;
  border: none;
  padding: 0;
}

.sidebar__title {
  font-size: 1.3em;
  font-weight: 600;
}

.search__parameters {
  padding: 8px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 3px;
  line-height: 1.5;
}

.search__parameters__price--input {
  display: flex;
}
.search__parameters__price--input > input {
  border-radius: 10px;
  background-color: whitesmoke;
  color: black;
  padding-left: 3px;
  margin-inline: 5px;
}

.input__price {
  width: 50%;
}

.search__parameters__form__button {
  margin: 8px 0 0;
  font-weight: 700;
  padding: 3px;
}
main {
  grid-area: main;
}
</style>
<style scoped>
.main {
  background-color: transparent;
  border: none;
  justify-self: center;
  justify-items: center;
  width: min(100%, 1010px);
  display: grid;
  gap: 0.3rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>
