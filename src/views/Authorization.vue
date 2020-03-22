<template>
<section class="authorization">
  <div class="wrapper">
    <div class="auth-switch">
      <button
       :class="'auth-switch__button ' + loginSwitch"
       @click="currentComponent = 'v-login'"
      >
        Login
      </button>
      <button
       :class="'auth-switch__button ' + registrationSwitch"
       @click="currentComponent = 'v-registration'"
      >
        Registration
      </button>
    </div>
    <component :is='currentComponent'></component>
  </div>

  <div class="authorization__background"></div>
</section>
</template>

<script>
import login from '../components/Login.vue'
import registration from '../components/Registration.vue'

export default {
  components: {
    'v-login': login,
    'v-registration': registration
  },
  data () {
    return {
      currentComponent: 'v-registration'
    }
  },
  computed: {
    loginSwitch () {
      return this.currentComponent === 'v-registration' ? 'deactiveted' : 'activeted'
    },
    registrationSwitch () {
      return this.currentComponent === 'v-registration' ? 'activeted' : 'deactiveted'
    }
  }
}
</script>

<style lang="sass">
.authorization
  height: 100vh
  width: 100vw
  display: flex
  justify-content: center
  font-size: 18px

  & .wrapper
    position: relative
    top: calc(50% - 200px)

  &__background
  width: 100vw
  height: 100vh
  position: absolute
  z-index: -2
  background-color: #A8BBBF

  & .auth-switch
    &__button
      width: 50%
      height: 50px
      cursor: pointer
      border: none

.activeted
  background-color: #b5c5c9

.deactiveted
  background-color: #A8BBBF

button::focus
  border: none

button::-moz-focus-inner
  border: none
</style>
