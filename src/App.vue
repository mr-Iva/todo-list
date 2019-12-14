<template>

<div id="app">

  <v-main-page/>

</div>

</template>

<script>

import MainPage from "./views/MainPage.vue";

export default {

    components: {

        "v-main-page": MainPage,

    },

    data() {

        return {



        }

    }

}

</script>

<style lang="sass">

body

    margin: 0

</style>
