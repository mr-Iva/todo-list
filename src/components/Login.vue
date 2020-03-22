<template>
<div class="form">
  <v-auth-input
    :input="emailInput"
    @input="emailInput = $event"
    inputType="text"
    inputId="email"
  >
    Email
  </v-auth-input>
  <v-auth-input
    :input="passwordInput"
    @input="passwordInput = $event"
    @passwordEvent="loginPassword = $event"
    inputType="password"
    inputId="password"
  >
    Password
  </v-auth-input>
  <button
    class="form__submit"
    @click="login"
  >
    Login
  </button>
  <div class="form__background"></div>
</div>
</template>

<script>
import authInput from '../components/AuthorizationInput.vue'

export default {
  components: {
    'v-auth-input': authInput
  },
  data () {
    return {
      emailInput: '',
      passwordInput: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('SET_AUTH', { email: this.emailInput, password: this.passwordInput })
    }
  }
}
</script>
