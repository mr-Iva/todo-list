<template>
  <header class="header">
    <router-link
     to="/"
     class="home-link"
    >
      Home
    </router-link>
    <ul class="groups-filters">
      <li
       v-for="filter in groupFiltersArr"
       :key="filter.id"
       :class="'groups-filters__item ' + filter.class"
       :style="filter.color"
       @click="toggleFilter"
      >{{ filter.name }}</li>

      <li :class="addinFilterName" @click.self="createFilter = true">
        <input
         v-if="createFilter"
         class="groups-filters__add-item__input-name"
         placeholder="filters name"
         @keyup.enter="addNewFilter"
         v-focus
        />
        <button
         v-if="createFilter"
         class="groups-filters__add-item__close-button"
         @click.self="createFilter = false"
        />
      </li>
    </ul>

    <section class="profile">
      <!-- <p class="profile__name">{{ userName }}</p>

      <img
      :src="userIconUrl"
      alt="user_icon"
      class="profile__icon"
      >-->

      <button class="profile__icon" @click="showSettings = !showSettings" />

      <div v-if="showSettings" class="profile__settings">
        <router-link to="/settings">Settings</router-link>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  directives: {
    focus: {
      inserted (el) { el.focus() }
    }
  },
  data () {
    return {
      userName: 'Dima',
      userIconUrl: '',
      showSettings: false,
      pallet: ['#9AE87B', '#4ECFA4', '#40CFBE', '#C7504C', '#E6CFA1'],
      createFilter: false,
      groupFiltersArr: []
    }
  },
  computed: {
    addinFilterName () {
      const cssClass = 'groups-filters__add-item groups-filters__item--'
      const modifier = this.createFilter ? 'show' : 'hidden'

      return cssClass + modifier
    }
  },
  methods: {
    randomColor () {
      const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

      const hue = random(0, 360)
      const lightnes = `${random(60, 80)}%`
      const saturation = `${random(60, 80)}%`

      for (const filter of this.groupFiltersArr) {
        let hueCopy = null

        hueCopy = /\d{1,3},/.exec(filter.color) // should be a better way to find needed hue value
        hueCopy = hueCopy[0].replace(',', '')

        const difference = hue - hueCopy

        // instead of calling this.randomColor use make new hue and check again
        if (difference <= 15 && difference >= -15) return this.randomColor()
      }

      return `hsl(${hue}, ${lightnes}, ${saturation})`
    },
    addNewFilter (event) {
      this.groupFiltersArr.push({
        name: event.target.value.trim(),
        color: `background-color: ${this.randomColor()}`,
        class: 'groups-filters__item--active'
      })

      this.createFilter = false

      // https://ru.vuejs.org/v2/guide/list.html in the bottom of page there is usefull example how can make names for new gruops
    },
    toggleFilter (event) {
      const className = event.target.className.replace(/--\w+/, match => (match === '--hidden') ? '--active' : '--hidden')

      event.target.className = className
    }
  }
}
</script>

<style lang="sass">
.header
  width: 100vw
  height: 50px
  position: fixed
  top: 0
  left: 0
  background-color: red

.home-link
  width: 50px
  float: left

.groups-filters
  height: 100%
  margin: 0 0 0 25px
  padding: 0
  list-style: none
  float: left

  &__item
    height: 100%
    display: inline-block
    float: left
    text-align: center
    cursor: pointer

    &--active
      width: 100px

    &--hidden
      width: 30px

  &__add-item
    @extend .groups-filters__item
    background-color: green

    // &::after
    //   content: "+"
    //   position: relative
    //   left: 30%
    //   top: 25%

    &__input-name
      height: 100%
      width: 75px
      float: left
      border: none
      color: black
      background-color: transparent

    &__close-button
      width: 25px
      height: 100%
      float: left
      border: none
      background-color: black
      cursor: pointer

.profile
  float: right

  &__name
    display: inline-block
    margin: 0 10px 0 0

  &__icon
    display: inline-block
    width: 25px
    height: 25px
    border-radius: 50%
    background-color: purple
    overflow: hidden

  &__settings
    width: 200px
    height: 200px
    background-color: green
</style>
