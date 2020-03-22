<template>

<div id="app">

  <v-main-navigation v-if="isAuth"></v-main-navigation>
  <v-main-filters v-if="isAuth"></v-main-filters>

  <router-view></router-view>

</div>

</template>

<script>
import { mapState } from 'vuex'
import mainNavigation from './components/MainNavigation'
import mainFilters from './components/MainFilters'

export default {
  components: {
    'v-main-navigation': mainNavigation,
    'v-main-filters': mainFilters
  },
  data () {
    return {
      // isAuth: JSON.parse(localStorage.getItem('userData')).token
    }
  },
  computed: mapState(['isAuth']),
  watch: {
    isAuth (val) {
      console.log(val)
      if (val) {
        this.$router.push({ name: 'homePage' })
      } else {
        this.$router.push({ name: 'auth' })
      }
    }
  },
  mounted () {
    if (this.isAuth) {
      this.$router.push({ name: 'homePage' })
    } else {
      this.$router.push({ name: 'auth' })
    }
  }
}

</script>

<style lang="sass">
#app
  background-color: #A8BBBF

body
  margin: 0
</style>
