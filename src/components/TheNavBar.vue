<template>
  <div v-if="token" id="nav">
    <router-link :to="{name: 'PageHome'}">Home</router-link>
    <button @click="logOut" class="btn btn-primary">Log Out</button>
  </div>
</template>

<script>
export default {
  computed: {
    token () {
      return this.$store.getters.token
    }
  },
  methods: {
    async logOut () {
      console.log(this.token)
      const loggedOut = await this.$store.dispatch('logOut', this.token)
      if (loggedOut) {
        this.$router.push({name: 'PageLogin'})
      }
    }
  },
}
</script>
