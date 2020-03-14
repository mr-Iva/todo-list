<template>
  <section class="settings">
    <aside>
      <button
       @click=""
      >
        Modifiers' Styles
      </button>
    </aside>
    <section>
      <v-user-styles v-if=""></v-user-styles>
    </section>
  </section>
</template>

<script>
import settingsUserStyles from '../components/SettingsUserStyles.vue'

export default {
  components: {
    'v-user-styles': settingsUserStyles
  },
  data () {
    return {}
  }
}
</script>

<style lang="sass">

.settings
  width: 100vw
  height: 100vh
  background-color: black

</style>
