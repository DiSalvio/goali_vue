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
      return this.$store.state.userModule.token
    }
  },
  methods: {
    async logOut () {
      const loggedOut = await this.$store.dispatch('logOut', this.token)
      if (loggedOut) {
        this.$router.push({name: 'PageLogin'})
      }
    }
  },
  created () {
    this.$store.dispatch('refreshTokenState', localStorage.getItem('token'))
  }
}
</script>
