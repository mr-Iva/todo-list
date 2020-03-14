<template>

<main class="main-page">

  <section class="add-item">
    <input
     type="text"
     placeholder="Add project"
     class="add-item__button"
     @keyup.enter="addNewProject"
    />
    <input
     type="text"
     placeholder="Add todo"
     class="add-item__button"
     @keyup.enter="addNewTodo"
    />
  </section>

  <ul class="items-list">

    <li
     v-for="(item, index) in itemsArr"
     :key="index"
     :class="`items-list__item item-${item.id}`"
    >

      <div class="items-list__item-controls">
        <button
         class="items-list__item-controls__button items-list__item-controls__button--show"
         @click="item.showContent = !item.showContent"
        ></button>

        <h3 class="items-list__item-controls__name">{{ item.title }}</h3>

        <button
         class="items-list__item-controls__button items-list__item-controls__button--delete"
         @click="itemsArr.splice(itemsArr.indexOf(item), 1)"
        ></button>
      </div>

      <v-text-area
       v-if="item.showContent"
       :textContent="item.textContent"
       @saveText="item.textContent = $event"
      /> <!-- i need to decide to use v-if or v-show -->

    </li>

  </ul>

</main>

</template>

<script>

// later make it global or return to App.vue in absolute position
import TextArea from '../components/TextArea.vue'

export default {
  components: {
    'v-text-area': TextArea
  },
  data () {
    return {
      itemsArr: [],
      itemsGlobalId: 0,
      draggedItem: null
    }
  },
  mounted () {
    document.addEventListener('dragstart', event => {
      this.draggedItem = event.target

      this.draggedItem.style.opacity = 0.5
    })

    document.addEventListener('dragover', event => { event.preventDefault() })
    document.addEventListener('dragend', event => { this.draggedItem.style.opacity = 1 })

    document.addEventListener('drop', event => {
      const itemArr = document.getElementsByClassName('items-list__item')
      let dropAfter = null

      for (const item of itemArr) {
        if (item === this.draggedItem) continue

        if (event.clientY > item.offsetTop) {
          dropAfter = item
        } else {
          dropAfter = item.previousSibling

          break
        }
      }

      if (dropAfter !== null) {
        this.draggedItem.remove()

        document.querySelector('.items-list').insertBefore(this.draggedItem, dropAfter.nextSibling)
      }
    })
  },
  methods: {
    test (value) {
      console.log(value)
    },
    addNewProject (event) {
      this.itemsArr.push({
        id: this.itemsGlobalId++,
        type: 'project',
        title: event.target.value,
        showContent: false
      })

      event.target.value = ''
    },
    addNewTodo (event) {
      this.itemsArr.push({
        id: this.itemsGlobalId++,
        type: 'todo',
        title: event.target.value,
        showContent: false,
        textContent: ''
      })

      event.target.value = ''
    }
  }
}

</script>

<style lang="sass">
.main-page
  height: 100vh
  width: 100vw
  background-color: #E8E5DF

.items-list
  margin: 50px 100px
  padding: 0
  list-style: none

  &__item
    margin-bottom: 25px

  &__item-controls
    height: 50px
    background-color: #4ECFA4

    &__name
      display: inline-block
      margin-left: 25px

    &__button
      height: 50px
      width: 50px
      display: inline-block
      // background-color: transparent
      // while I there is no icons for button this property isn't needed
      border: none
      cursor: pointer

      &--show
        float: left

      &--delete
        float: right

.add-item
  height: 25px
  margin: 50px 100px

  &__button
    width: 45%
    cursor: pointer
    background-color: #DAF0EC
    border: 2px dashed #40CFBE
    border:
      top-left-radius: 2% 50%
      top-right-radius: 2% 50%
      bottom-right-radius: 2% 50%
      bottom-left-radius: 2% 50%
    color: #40CFBE
    letter-spacing: 5px
    transition: background-color .3s

    &:hover
      background-color: #B8E6DE

    &:last-child
      float: right
</style>
