<script>
export default {
  props: {
    buttonAttributes: Array
  },
  data () {
    return {
      buttonActive: false,
      description: this.buttonAttributes[0],
      modifier: this.buttonAttributes[1],
      enableButtonToggle: this.buttonAttributes[2],
      offTag: this.buttonAttributes[3]
    }
  },
  methods: {
    toggleButton () {
      this.buttonActive = !this.buttonActive

      if (this.description === 'full' || this.description === 'center' ||
          this.description === 'left' || this.description === 'right') {
        this.$emit('alignButton', this.$el)
      }

      this.$emit('buttonToggled', [this.$el, this.buttonActive])
    }
  }
}
</script>
