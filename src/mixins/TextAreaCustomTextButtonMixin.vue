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
      if (this.enableButtonToggle) this.toggleButton()

      this.restoreSelected()

      document.execCommand(command, false, customValue)

      this.customInput = ''
      this.showInput = !this.showInput
    }
  }
}
</script>
