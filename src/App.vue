<template>
  <div class="container">
    <TheNavBar/>
    <router-view/>
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar.vue'
export default {
  components: {
    TheNavBar
  }
}
</script>

<style>
@import "assets/bootstrap.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
