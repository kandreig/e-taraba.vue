<template>
  <Navbar></Navbar>
  <router-view />
  <footer>
    <p>Copyright reserved to Roweb</p>
  </footer>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  position: relative;
  width: min(100%, 1500px);
  margin-inline: auto;
}

nav a.router-link-exact-active {
  color: #42b983;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  line-height: 1.3;
  color: #333;
  background-color: #f7f8fc;
}

a {
  text-decoration: none;
  color: #333;
}

nav,
aside,
main,
footer,
header {
  background-color: #fff;
  padding: 20px;
}

footer {
  position: sticky;
  bottom: 0;
  height: 50px;
}

.modal-form-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.error {
  color: red;
  font: 0.7em;
}

.border-red {
  border: 1px solid red;
}
</style>
