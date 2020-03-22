<template>

<main class="main-page">

  <section class="add-item">
    <button
     class="add-item__button add-item__project"
     v-show="creatingItem"
     @click="addNewProject"
    >
      project +
    </button>
    <input
     type="text"
     class="add-item__input"
     v-model="itemName"
     @focus="creatingItem = true"
     @blur="hideInput"
    />
    <button
     class="add-item__button add-item__todo"
     v-show="creatingItem"
     @click="addNewTodo"
    >
      todo +
    </button>
  </section>

  <section class="items-list">

    <div
     v-for="(item, index) in itemsArr"
     :key="index"
     :class="`items-list__item item-${item.id}`"
    >
      <div class="item-wrapper">
        <button
          class="item__button item__button--show"
          @click="item.showContent = !item.showContent"
        ></button>

        <h3 class="item__name">{{ item.title }}</h3>

        <button
          class="item__button item__button--delete"
          @click="itemsArr.splice(itemsArr.indexOf(item), 1)"
        ></button>
      </div>

      <v-text-area
       v-if="item.showContent"
       :textContent="item.textContent"
       @saveText="item.textContent = $event"
      /> <!-- i need to decide to use v-if or v-show -->

    </div>

  </section>

</main>

</template>

<script>

// later make it global or return to App.vue in absolute position
import textArea from '../components/TextArea.vue'

export default {
  components: {
    'v-text-area': textArea
  },
  data () {
    return {
      creatingItem: false,
      itemName: '',
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
    hideInput (event) {
      if (event.target.value.length === 0) {
        this.creatingItem = false
      }
    },
    addNewProject () {
      this.itemsArr.push({
        id: this.itemsGlobalId++,
        type: 'project',
        title: this.itemName,
        showContent: false
      })

      this.itemName = ''

      this.creatingItem = false
    },
    addNewTodo (event) {
      this.itemsArr.push({
        id: this.itemsGlobalId++,
        type: 'todo',
        title: this.itemName,
        showContent: false,
        textContent: ''
      })

      this.itemName = ''

      this.creatingItem = false
    }
  }
}

</script>

<style lang="sass">
.main-page
  height: 100vh
  width: 100vw
  padding-top: 75px
  display: flex
  flex-direction: column
  align-items: center

.items-list
  width: 80%
  margin-top: 50px

  &__item
    margin-bottom: 25px

    & .item-wrapper
      display: flex
      justify-content: space-between
      align-items: center
      background-color: #595857

    & .item
      &__name
        display: inline-block
        color: #E9EEF2
        margin: 0

      &__button
        height: 50px
        width: 50px
        display: inline-block
        // background-color: transparent
        // while I there is no icons for button this property isn't needed
        border: none
        cursor: pointer

        &--show
          // background-image: showimg

        &--delete
          // background-image: delimg
          background-color: #BF848F

.add-item
  display: flex

  &__input
    height: 25px
    padding: 0
    background-color: #595857
    color: #E9EEF2
    border: none

  &__button
    height: 25px
    width: 75px
    background-color: #C4C4C4
    color: #595857
    border: none
    cursor: pointer
</style>
