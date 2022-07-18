<template>
  <nav>
    <router-link to="/" class="brand" title="E-Taraba 4ever"
      ><img
        class="brand__img"
        src="../assets/logo_transparent.png"
        alt="picture of etaraba logo"
    /></router-link>
    <!-- https://localhost:44379/staticfiles/iphone12.jpg -->
    <form @submit.prevent="searchSubmit" class="search__bar">
      <!-- To implement "searchSubmit" -->
      <input
        class="search__bar__child"
        type="text"
        id="search__bar__text"
        placeholder="Search product"
      /><button
        class="search__bar__child"
        id="search__bar__button"
        type="submit"
      >
        <img
          id="search__bar__button__img"
          src="../assets/search.svg"
          alt="image of magnifying glass"
        />
      </button>
    </form>
    <div class="cart" @click="toggleCart">
      <!-- To implement "toggleCart" -->
      <img class="cart__img" src="/assets/cart.svg" alt="" /><span
        class="cart--nr__items"
        v-if="cartItems"
        >{{ cartItems }}</span
      >
      <!-- To implement "cartItems logic" -->
    </div>
    <CartDisplay></CartDisplay>
    <div class="user" @click="checkLogin">
      <!-- to implement "toggleLogin" -> when click show login form -->
      <img
        class="user__child"
        id="user__picture"
        src="../assets//person.svg"
        alt=""
      />
      <div class="user__child user__child--container">
        <span>{{ userDisplay }}</span>
        <!-- userData -> if user is not logged in show Login? and if it's logged in show USERNAME of user -->
        <img class="user__child" src="../assets/caret.svg" alt="" />
      </div>
      <div class="login" v-show="loginDisplay" @click.stop>
        <!-- same as Cart Display -->
        <h2 class="login__title">Login</h2>
        <!-- V-MODEL THE FORM !!!! -->
        <div class="login__form">
          <form @submit.prevent="submitLogin" class="">
            <div class="login__username">
              <label for="username">Username</label>
              <input v-model="userData.username" type="text" id="username" />
            </div>
            <div class="login__password">
              <label for="password">Password</label>
              <input
                v-model="userData.password"
                type="password"
                id="password"
              />
            </div>
            <input type="submit" value="Login" />
          </form>
          <em class="info" v-show="error">{{ error }}</em>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from "../stores/userStore";
import CartDisplay from "../components/CartDisplay.vue";
export default {
  name: "NavBar",
  data() {
    return {
      loginDisplay: false,
      error: null,
      userDisplay: "Login",
      userData: {
        username: "",
        password: "",
      },
    };
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  components: { CartDisplay },
  methods: {
    submitLogin() {
      console.log(this.userData);
      this.userStore
        .login(this.userData)
        .then(() => {
          this.userDisplay = this.userStore.username;
          this.loginDisplay = false;
          this.$router.push("/admin");
        })
        .catch((error) => {
          this.error = error;
        });
    },
    checkLogin() {
      if (this.userStore.loggedIn) {
        this.$router.push("/admin");
      } else {
        let refresh_token = localStorage.getItem("refresh_token");
        if (refresh_token) {
          // refreshing the token
          this.userStore
            .refresh_token()
            .then(() => {
              this.userDisplay = this.userStore.username;
              console.log("pushadmin");
              this.$router.push("/admin");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.loginDisplay = true;
        }
      }
    },
  },
};
</script>

<style>
nav {
  height: 60px;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: start;
}
.brand {
  width: 160px;
  height: 30px;
}
.brand__img {
  width: 100%;
}

.search__bar {
  display: flex;
  padding: 0 5px 0 10px;
  margin-left: 50px;
  width: 30%;
  border: 1px solid red;
  border-radius: 10px;
}

#search__bar__text {
  width: 95%;
  height: 23px;
}
#search__bar__text:focus {
  outline: none;
}
.search__bar__child {
  border: none;
  background-color: transparent;
}
#search__bar__button__img {
  vertical-align: middle;
}

.cart {
  position: relative;
  margin-left: auto;
  margin-right: 15px;
}
.cart__img {
  width: 20px;
  vertical-align: middle;
}
.cart--nr__items {
  position: absolute;
  background-color: white;
  top: -3px;
  left: 10px;

  font-size: 12px;
  font-weight: 900;
  text-align: center;
  color: black;

  border: 1px solid black;
  border-radius: 100%;

  width: 16px;
  height: 16px;
}

.user {
  position: relative;
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.user__child {
  vertical-align: middle;
}
.user__child--container {
  display: flex;
}

#user__picture {
  width: 25px;
  margin-right: 2px;
}

.login {
  text-align: center;
  position: absolute;
  top: 32px;
  right: 0;
  /* margin-top: 32px; */
  background-color: whitesmoke;
}

.login__form form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login__form input {
  margin: 5px 0;
}
em.info {
  display: block;
}
</style>
