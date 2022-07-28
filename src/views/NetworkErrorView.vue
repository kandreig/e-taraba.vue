<template>
  <div class="NetworkError center">
    <h1 class="h1__title">Uh-Oh!</h1>
    <h3 class="h3__info-msg">
      It looks like you are experiencing some Network Issues.
      <a class="router-link" href="#" @click="$router.go(-1)"> Click here </a>to
      try again.
    </h3>
  </div>
</template>

<script>
export default {};
</script>
