<template>
<ul class="wrapper">
    <li>
        <button
         @click="toggleInput"
         title="insert image"
         class="text-area__text-formating__button"
        >
            insert image
        </button>
    </li>
    <li
     class="wrapper__item-input"
     v-show="showInput"
    >
        <input
        type="text"
        :class="`text-area__text-formating__insertImage-button`"
        v-model="customInput"
        >
        <button @click="changeText('insertImage', customInput)">done</button>
    </li>
</ul>
</template>

<script>

export default {
  data () {
    return {
      selectedRanges: [],
      showInput: false,
      customInput: ''
    }
  },
  methods: {
    restoreSelected () {
      const currentSelection = document.getSelection()

      currentSelection.removeAllRanges()

      this.selectedRanges.forEach(range => currentSelection.addRange(range))
      this.selectedRAnges = []
    },
    toggleInput () {
      if (this.showInput === true) {
        this.customInput = ''

        this.restoreSelected()
      } else {
        const selected = document.getSelection()

        for (let i = 0; i < selected.rangeCount; i++) {
          this.selectedRanges.push(selected.getRangeAt(i))
        }
      }

      this.showInput = !this.showInput
    },
    changeText (command, customValue = null) {
      this.restoreSelected()

      console.log(customValue)
      console.log(/^htt(p|ps):\/\//.test(customValue))

      if (/^htt(p|ps):\/\//.test(customValue)) {
        document.execCommand(command, false, customValue)
        console.log('url')
      } else if (/^file:\/\/\//.test(customValue)) {
        // file:///home/akooka/Code/chess/ref/chess%20pieces.jpeg

        console.log('file directory')
      } else console.log('inert corret url for image !!!')

      this.customInput = ''
      this.showInput = !this.showInput
    }
  }
}
</script>
