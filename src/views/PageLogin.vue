<template>
  <div class="row h-100 justify-content-center align-items-center mt-5 mb-5">
    <div class="col-10 col-md-8 col-lg-6">
      <div v-if="signUpSuccess" class="alert alert-success" role="alert">
        <h2 class="mb-0">Sign up successful, Log in now</h2>
      </div>
      <div v-if="loginFailed" class="alert alert-danger" role="alert">
        <h2 class="mb-0">Login Failed</h2>
      </div>
      <form @submit.prevent="login">
        <h1 class="mb-4">Login</h1>
        <div class="form-outline mb-4">
          <label for="username">Username</label>
          <input v-model="username" name="username" type="text" class="form-control">
        </div>
        <div class="form-outline mb-4">
          <label for="password">Password</label>
          <input v-model="password" name="password" type="password" class="form-control">
        </div>
        <div>
          <button type="submit" class="btn btn-primary btn-block mb-4">Login</button>
          <router-link
            :to="{name: 'PageSignUp'}"
            class="btn btn-light btn-block mb-4"
          >
            Sign Up
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    signUpSuccess: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      username: '',
      password: '',
      loginFailed: false
    }
  },
  methods: {
    async login () {
      const loginStatus = await this.$store.dispatch('login', { 
        username: this.username, 
        password: this.password
      })
      if (loginStatus) {
        this.loginFailed = false
        this.$router.push({ name: 'PageHome' })
      } else {
        this.loginFailed = true
      }
    }
  }
}
</script>
