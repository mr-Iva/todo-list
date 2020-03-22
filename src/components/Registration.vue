<template>
<div class="form">
  <v-auth-input
  :input="loginInput"
  @input="loginInput = $event"
  inputType="text"
  inputId="login"
  >
    Login
  </v-auth-input>
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
  @click="register"
  >
    Register
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
      loginInput: '',
      emailInput: '',
      passwordInput: ''
    }
  },
  methods: {
    register () {

    }
  }
}
</script>

<style lang="sass">
.form
  padding: 50px
  position: relative
  display: flex
  flex-direction: column
  align-items: center

  &__submit
    width: 150px
    height: 40px
    font-size: 1.3em
    background-color: #595857
    color: #E9EEF2
    border: none
    cursor: pointer

  &__background
    width: 100%
    height: 100%
    top: 0
    position: absolute
    background-color: #b5c5c9
    z-index: -1

.section
  margin-bottom: 35px
</style>
