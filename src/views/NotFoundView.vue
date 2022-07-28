<template>
  <div class="center">
    <h1 class="h1__title">Oops!</h1>
    <h3 class="h3__info-msg">
      The {{ resource }} that you are looking for is not here @_@
    </h3>
    <router-link :to="{ name: 'home' }" class="router-link"
      >Go back to Home page</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: "page",
    },
  },
};
</script>

<style>
.center {
  text-align: center;
}
.h1__title {
  margin-top: 1rem;
}
.h3__info-msg {
  margin-block: 2rem;
}
.router-link {
  color: darkblue;
}
.router-link:hover {
  text-decoration-line: underline;
  text-decoration-color: darkblue;
  text-decoration-style: solid;
  text-decoration-thickness: 1px;
}
</style>
