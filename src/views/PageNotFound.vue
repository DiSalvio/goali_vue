<template>
  <div class="text-center">
    <h1>The {{ resource || 'page' }} you're looking for doesn't exist</h1>
    <h1><router-link :to="{name: 'PageHome'}">Home</router-link></h1>
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
