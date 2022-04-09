<template>
  <div class="row h-100 justify-content-center align-items-center">
    <div class="col-10 col-md-8 col-lg-6">
      <div v-if="signUpFailed" class="alert alert-danger" role="alert">
        <h2 class="mb-0">Sign Up Failed</h2>
      </div>
      <form  @submit.prevent="signUp">
        <h1 class="mb-4">Sign Up</h1>
        <div class="form-outline mb-4">
          <label for="email">Email</label>
          <input v-model="email" name="email" type="text" class="form-control">
        </div>
        <div class="form-outline mb-4">
          <label for="username">Username</label>
          <input v-model="username" name="username" type="text" class="form-control">
        </div>
        <div class="form-outline mb-4">
          <label for="firstName">First Name</label>
          <input v-model="firstName" name="firstName" type="text" class="form-control">
        </div>
        <div class="form-outline mb-4">
          <label for="lastName">Last Name</label>
          <input v-model="lastName" name="lastName" type="text" class="form-control">
        </div>
        <div class="form-outline mb-4">
          <label for="password">Password</label>
          <input v-model="password" name="password" type="password" class="form-control">
        </div>
        <div class="form-outline mb-4">
          <label for="confirmPassword">Confirm Password</label>
          <input v-model="confirmPassword" name="confirmPassword" type="password" class="form-control">
        </div>
        <div>
          <button class="btn btn-primary btn-block mb-4">Sign Up</button>
          <router-link
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
        confirm_password: this.confirmPassword,
        first_name: this.firstName,
        last_name: this.lastName
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
