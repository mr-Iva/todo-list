<template>
  <section class="settings">
    <aside class="settings__sidebar">
      <ul class="settings-menu">
        <li>
          <button @click="currentSettings = 'v-user-profile'">Profile</button>
        </li>
        <li>
          <button @click="currentSettings = 'v-user-styles'">User styles</button>
        </li>
        <li>
          <button @click="currentSettings = 'v-user-delete'">DELETE ACCOUNT</button>
        </li>
      </ul>
    </aside>
    <section class="settings__params">
      <component :is="currentSettings"></component>
    </section>
  </section>
</template>

<script>
import settingsUserStyles from '../components/SettingsUserStyles'
import settingsUserProfile from '../components/SettingsUserProfile'
import settingsUserDelete from '../components/SettingsUserDelete'

export default {
  components: {
    'v-user-styles': settingsUserStyles,
    'v-user-profile': settingsUserProfile,
    'v-user-delete': settingsUserDelete
  },
  data () {
    return {
      currentSettings: 'v-user-styles'
    }
  }
}
</script>

<style lang="sass">

.settings
  width: 100vw
  height: 100vh
  background-color: #E9EEF2
  display: flex
  flex-direction: row

  &__sidebar
    width: 25%
    padding: 10px

    & button
      background-color: transparent
      border: none
      cursor: pointer

  &__params
    width: 75%
    background-color: #A8BBBF

.settings-menu
  list-style: none
  margin: 0
  padding: 0
</style>
