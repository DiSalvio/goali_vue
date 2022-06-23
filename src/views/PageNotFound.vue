<template>
  <div class="text-center">
    <h1 id="message">The {{ resource || 'page' }} you're looking for doesn't exist</h1>
    <h1 id="go-home-link"><router-link :to="{name: 'PageHome'}">Home</router-link></h1>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      required: false,
      type: String
    }
  }
}
</script>
