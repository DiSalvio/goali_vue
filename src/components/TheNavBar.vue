<template>
  <div v-if="token" class="navbar p-2 mb-2">
    <button @click="$router.back()" class="btn btn-light">Back</button>
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
    if (localStorage.getItem('token')) {
      this.$store.dispatch('refreshTokenState', localStorage.getItem('token'))
    }
  }
}
</script>
