<template>
<ul class="wrapper">
    <li>
        <button
         @click="toggleInput()"
         :title="description"
        ></button>
    </li>
    <li
     v-show="showInput"
     class="wrapper__item-input"
    >
        <v-color-palette @changeColor="customInput = $event" />
        <input
         type="color"
         :class="`text-area__text-formating__button text-area__text-formating__${modifier}-button`"
         @change="customInput = $event.target.value"
        >
        <div
         class="text-area__text-formating__chosen-color"
         :style="`background-color: ${customInput}`"
         @click="changeText(modifier, customInput)"
        ></div>
    </li>
</ul>
</template>

<script>
import colorPalette from './TextAreaColorPalette.vue'
import basicTextButton from '../mixins/TextAreaBasicTextButtonMixin.vue'
import customTextButton from '../mixins/TextAreaCustomTextButtonMixin.vue'

export default {
  components: { 'v-color-palette': colorPalette },
  mixins: [basicTextButton, customTextButton]
}
</script>

<style lang="sass">

.text-area__text-formating__chosen-color
  display: inline-block
  width: 25px
  height: 25px
  border: 5px solid silver
</style>
