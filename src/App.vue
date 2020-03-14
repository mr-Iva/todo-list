<template>

<div id="app">

  <v-main-header v-if="authorized"></v-main-header>

  <router-view></router-view>

</div>

</template>

<script>
import mainHeader from './components/MainHeader.vue'

export default {
  components: {
    'v-main-header': mainHeader
  },
  data () {
    return {
      authorized: false
    }
  }
}

</script>

<style lang="sass">

body
  margin: 0

</style>
