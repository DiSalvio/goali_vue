<template>
  <div class="row h-100 justify-content-center align-items-center mt-5 mb-5">
    <div class="col-10 col-md-8 col-lg-6">
      <div v-if="signUpFailed" class="alert alert-danger" role="alert">
        <h2 id="sign-up-failed" class="mb-0">Sign Up Failed</h2>
      </div>
      <form  @submit.prevent="signUp">
        <h1 id="sign-up-header" class="mb-4">Sign Up</h1>
        <div class="form-outline mb-4">
          <label for="email">Email</label>
          <input id="email" v-model="email" name="email" type="text" class="form-control">
        </div>
        <div class="form-outline mb-4">
          <label for="username">Username</label>
          <input id="username" v-model="username" name="username" type="text" class="form-control">
        </div>
        <div class="form-outline mb-4">
          <label for="firstName">First Name</label>
          <input id="first-name" v-model="firstName" name="firstName" type="text" class="form-control">
        </div>
        <div class="form-outline mb-4">
          <label for="lastName">Last Name</label>
          <input id="last-name" v-model="lastName" name="lastName" type="text" class="form-control">
        </div>
        <div class="form-outline mb-4">
          <label for="password">Password</label>
          <input id="password" v-model="password" name="password" type="password" class="form-control">
        </div>
        <div class="form-outline mb-4">
          <label for="confirmPassword">Confirm Password</label>
          <input id="confirm-password" v-model="confirmPassword" name="confirmPassword" type="password" class="form-control">
        </div>
        <div>
          <button id="sign-up-button" class="btn btn-primary btn-block mb-4">Sign Up</button>
          <router-link
            id="login-page-link"
            :to="{name: 'PageLogin'}"
            class="btn btn-light btn-block mb-4"
          >
            Login Page
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      signUpFailed: false
    }
  },
  methods: {
    async signUp () {
      const signUpStatus = await this.$store.dispatch('signUp', { 
        email: this.email,
        username: this.username, 
        password: this.password,
        confirmPassword: this.confirmPassword,
        firstName: this.firstName,
        lastName: this.lastName
      })
      if (signUpStatus) {
        this.signUpFailed = false
        this.$router.push({ name: 'PageLogin', params: { signUpSuccess: true }})
      } else {
        this.signUpFailed = true
      }
    }
  }
}
</script>
