<template>
<section class="top-nav">
  <img class="user-icon">
  <nav class="top-nav__menu">
    <router-link to="/">Home</router-link>
    <router-link to="/settings">Settings</router-link>
    <router-link to="/authorization">Log out</router-link>
  </nav>
</section>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="sass">
.top-nav
  position: fixed
  top: 0
  right: 0
  display: flex
  align-items: flex-end
  flex-direction: column

  & .user-icon
    width: 50px
    height: 50px

  &__menu
    display: flex
    align-items: flex-end
    flex-direction: column

    & a
      margin-top: 10px
      color: #262626
      text-decoration: none
</style>
