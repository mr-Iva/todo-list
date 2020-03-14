<template>
<section
 class="authorization"
>
  <form class="authorization__input">
    <input
      type="text"
      v-model="login"
      placeholder="Login"
    >
    <input
      type="password"
      v-model="password"
      placeholder="Password"
    >
    <input
      type="text"
      v-model="email"
      placeholder="Email"
    >
    <button>Register</button>
  </form>
</section>
</template>

<script>
export default {
  data () {
    return {
      login: '',
      password: '',
      email: ''
    }
  }
}
</script>

<style lang="sass">
.authorization
  height: 100vh
  widht: 100vw
  background-color: purple
  display: flex
  justify-content: center
  align-items: center

  &__input
    padding: 50px
    display: flex
    flex-direction: column
    align-items: center
    background-color: blue
    border-radius: 10px

    & input
      background-color: brown
      color: #07efd4
      margin-bottom: 25px

    & button
      background-color: #3a1f0d
      color: white
</style>
