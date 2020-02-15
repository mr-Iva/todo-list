<template>
<button
 @click="changeText(modifier)"
 :class="`text-area__text-formating__button text-area__text-formating__${modifier}-button`"
 :title="description"
>
    {{ description }}
</button>
</template>

<script>
import basicTextButton from '../mixins/TextAreaBasicTextButtonMixin.vue'

export default {
  mixins: [basicTextButton],
  methods: {
    changeText (command, customValue = null) {
      const comm = this.offTag !== '' && this.buttonActive ? this.offTag : command

      document.execCommand(comm, false, customValue)

      if (this.enableButtonToggle) this.toggleButton()

      document.querySelector('.text-area__description').focus()
    }
  }
}
</script>
