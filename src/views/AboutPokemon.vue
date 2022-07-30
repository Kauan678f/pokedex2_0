<template>
  <div class="about">
    <nav class="is-fullwidth">
      <router-link to="/" style="color: white;" class="navbar-item">pokedex</router-link>
    </nav>
  </div>
</template>
<script>
export default {
  created() {
    console.log(this.$route.params.url)
  },
  data() {
    return {
      parametroDaRota: ""
    }
  }
}
</script>
<style scoped>
  nav {
    background-color: green;
    font-size: 130%;
  }
</style>
