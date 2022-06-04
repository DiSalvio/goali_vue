<template>
  <div v-if="token" class="navbar px-0 py-2 mb-3 navbar-border">
    <button id="back-button" @click="$router.back()" class="btn btn-secondary ml-2">
      <font-awesome-icon icon="backward-step" />
      Back
    </button>
    <button id="home-button" @click="$router.push({name: 'PageHome'})" class="btn btn-success text-white">
      <img src="../assets/hiking.png">
      Home
      <img src="../assets/mission-medium.png">
    </button>
    <button id="log-out-button" @click="logOut" class="btn btn-primary mr-2">
      Log Out
      <font-awesome-icon icon="door-open" />
    </button>
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
  async created () {
    if (localStorage.getItem('token')) {
      await this.$store.dispatch('refreshTokenState', localStorage.getItem('token'))
    }
  }
}
</script>

<style>
.navbar-border {
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
