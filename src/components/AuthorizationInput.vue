<template>
  <div class="section">
    <input
     class="section__input"
     :type="inputType"
     :value="input"
     :id="inputId"
     @input="$emit('input', $event.target.value)"
     @focus='inputFocus = true'
     @blur='inputFocus = false'
    >
    <label
     :for="inputId"
     :class="getFocus"
    >
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    input: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      required: true
    },
    inputId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      inputFocus: false
    }
  },
  computed: {
    getFocus () {
      return this.inputFocus || this.input.length > 0 ? 'label-top' : ''
    }
  }
}
</script>

<style lang="sass">
.section
  & label
    position: absolute
    left: 50px
    color: #595857
    cursor: text
    transition: all 0.2s

  &__input
    width: 250px
    background-color: transparent
    color: #595857
    border: none
    border-bottom: 1px solid #595857

    &:focus
      border-bottom-color: #BF848F

      & + label
        color: #BF848F

.label-top
  transform: translateY(-20px)
  font-size: 14px
  color: #BF848F
</style>
