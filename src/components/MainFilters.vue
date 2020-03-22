<template>
<section class="global-filters">
  <div>
    <transition name="showMenu">
      <section
       v-show="showFiltersMenu"
       class="global-filters__menu"
      >
        <div class="filter-wrapper">
          <section
           class="favourite-filters"
           v-for="filtersGroup in categorFilters"
           :key="`filter-${filtersGroup.name}`"
          >
            <p
             class="favourite-filters__name"
             @click="filtersGroup.show = !filtersGroup.show"
            >
              {{ filtersGroup.name }}
            </p>
            <ul
             class="favourite-filters__list"
             v-show="filtersGroup.show"
            >
              <li
              v-for="filter in filtersGroup.filters"
              :key="filter.name"
              >
                <label>{{ filter.name }}<input type="checkbox"></label>
              </li>
            </ul>
          </section>
          <div
           v-for="filter in uncategorFilters"
           :key="`filter-${filter.name}`"
          >
            <label>{{ filter.name }}<input type="checkbox"></label>
          </div>
        </div>
      </section>
    </transition>
    <button
      class="global-filters__button global-filters__show-menu"
      @click="showFiltersMenu = !showFiltersMenu"
    ></button>
    <button class="global-filters__button global-filters__show-projects"></button>
    <button class="global-filters__button global-filters__show-list"></button>
  </div>
  <div>
    <ul class="favourite-filtres">
      <li
       class="favourite-filtres__item"
       v-for="filter in favouriteFilter"
       :key="filter.id"
       :style="`background-color: ${filter.color}`"
       @click="toggleFilter"
      >
      </li>
    </ul>
  </div>
</section>
</template>

<script>
export default {
  data () {
    return {
      showFiltersMenu: false,
      categorFilters: [{
        name: 'home',
        show: false,
        filters: [{
          name: 'everyday'
        }]
      }],
      uncategorFilters: [
        { name: 'ocasional' }
      ],
      favouriteFilter: [
        // { color: 'red', id: 'home' },
        // { color: 'green', id: 'link' }
      ] // i will get it from vuex from server
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
    },
    toggleFilter (event) {
      let active = false

      if (!event.target.classList[1]) {
        active = true
      }

      event.target.classList.toggle('favourite-filtres__item--active', active)
    }
  }
}
</script>

<style lang="sass">
@keyframes showMenu
  0%
    width: 50px
    height: 50px
  35%
    width: 250px
    height: 50px
  100%
    width: 250px
    height: 100vh

.showMenu-enter-active
  animation: showMenu 0.25s

.showMenu-leave-active
  animation: showMenu 0.25s reverse

.filter-wrapper
  margin: 60px 10px 0 10px

.favourite-filters
  margin: 10px 10px

  &__name
    margin: 0
    cursor: pointer

  &__list
    list-style: none
    padding: 10px
    margin: 0

.global-filters
  position: fixed
  top: 0px
  left: 0px

  &__menu
    width: 250px
    height: 100vh
    position: absolute
    display: inline-block
    overflow: hidden
    background-color: #262626
    color: #E9EEF2

  &__button
    height: 50px
    width: 50px
    border-radius: 0
    border: none

  &__show-projects
    background-color: #C4C4C4

  &__show-list
    background-color: #595857

  &__show-menu
    background-color: #262626
    position: relative
    z-index: 1

  & .favourite-filtres
    padding: 0
    margin: 0

    &__item
      width: 50px
      height: 50px
      list-style: none
      transition: all 0.25s

      &--active
        width: 100px
</style>
