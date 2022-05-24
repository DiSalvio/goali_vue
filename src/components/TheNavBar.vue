<template>
  <div v-if="token" class="navbar px-0 py-2 mb-3 navbar-border">
    <button @click="$router.back()" class="btn btn-secondary ml-2">
      <font-awesome-icon icon="backward-step" />
      Back
    </button>
    <router-link class="text-white" :to="{name: 'PageHome'}">
      <button class="btn btn-success">
        <img src="../assets/hiking.png">
        Home
        <img src="../assets/mission-medium.png">
      </button>
    </router-link>
    <button @click="logOut" class="btn btn-primary mr-2">
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
  created () {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('refreshTokenState', localStorage.getItem('token'))
    }
  }
}
</script>

<style>
.navbar-border {
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
