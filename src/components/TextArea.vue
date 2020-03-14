<template>

  <article class="text-editor">
    <section class="text-editor__text-formating">
      <v-textButtonNoCustom
       v-for="(textModifier, index) in noCustomTextModifierArray"
       :key="`noCustom${index}`"
       :buttonAttributes="textModifier[1]"
       @buttonToggled="addActiveButton(...$event)"
       @alignButton="alignBtn"
      />
      <v-textButtonCustomColor
       v-for="(textModifier, index) in customColorTextModifierArray"
       :key="`customColor${index}`"
       :buttonAttributes="textModifier[1]"
       @buttonToggled="addActiveButton(...$event)"
      />
      <v-textButtonCustomInput
       v-for="(textModifier, index) in customInputTextModifierArray"
       :key="`customInput${index}`"
       :buttonAttributes="textModifier[1]"
       @buttonToggled="addActiveButton(...$event)"
      />
      <v-textButtonRemoveFormat />
      <v-textButtonInsertImage />
      <!-- <v-textButtonFontSize
        description="font size"
        modifier="fontSize"
        :enableToggleButton="true"
        @buttonToggled="activeModifierArr.push($event)"
      /> need to decide what to do with this -->

    </section>

    <div
     contenteditable="true"
     class="text-editor__text-area"
     @keyup="checkCaretAfterKey"
     @click="checkCaret"
     v-html="textContent"
    ></div>

  </article>

</template>

<script>
import textButtonNoCustom from './TextAreaTextButtonNoCustom.vue'
import textButtonCustomColor from './TextAreaTextButtonCustomColor.vue'
import textButtonCustomInput from './TextAreaTextButtonCustomInput.vue'
import textButtonRemoveFormat from './TextAreaTextButtonRemoveFormat.vue'
import textButtonInsertImage from './TextAreaTextButtonInsertImage.vue'
// import textButtonFontSize from './TextAreaTextButtonFontSize.vue'

export default {
  components: {
    'v-textButtonNoCustom': textButtonNoCustom,
    'v-textButtonCustomColor': textButtonCustomColor,
    'v-textButtonCustomInput': textButtonCustomInput,
    'v-textButtonRemoveFormat': textButtonRemoveFormat,
    'v-textButtonInsertImage': textButtonInsertImage
    // 'v-textButtonFontSize': textButtonFontSize
  },
  props: {
    textContent: String
  },
  data () {
    return {
      // sort button in the order and change text in buttons to img
      noCustomTextModifierArray: new Map([
        ['B', ['bold', 'bold', true, '']],
        ['I', ['italic', 'italic', true, '']],
        ['U', ['underline', 'underline', true, '']],
        ['STRIKE', ['strike through', 'strikeThrough', true, '']],
        ['OL', ['ordered list', 'insertOrderedList', true, '']],
        ['UL', ['unordered list', 'insertUnorderedList', true, '']],
        ['full', ['full', 'justifyFull', true, '']],
        ['center', ['center', 'justifyCenter', true, '']],
        ['left', ['left', 'justifyLeft', true, '']],
        ['right', ['right', 'justifyRight', true, '']],
        ['BLOCKQUOTE', ['indent', 'indent', true, 'outdent']],
        // ['outdent', ['outdent', 'outdent', false]],
        ['redo', ['redo', 'redo', false, '']],
        ['SUB', ['subscript', 'subscript', true, '']],
        ['SUP', ['superscript', 'superscript', true, '']],
        ['unlink', ['unlink', 'unlink', false, '']]
      ]),
      customColorTextModifierArray: new Map([
        ['SPAN', ['back color', 'backColor', true, '']],
        ['fColor', ['font color', 'foreColor', true, '']]
      ]),
      customInputTextModifierArray: new Map([
        // ['fSize', ['font size', 'fontSize', true]],
        ['A', ['link', 'createLink', false, '']],
        ['SPAN', ['format block', 'formatBlock', false, '']],
        ['H', ['heading', 'heading', false, '']],
        ['fName', ['font name', 'fontName', false, '']] // i need to add sugestions of fonts
        // ['img', ['insert image', 'insertImage', false, '']]
      ]),
      activeModifierArr: []
    }
  },
  beforeDestroy () {
    this.$emit('saveText', this.$el.lastChild.innerHTML)
  },
  methods: {
    test (event) { console.log(event) },
    checkCaret () {
      // replace ('big', 'small') with custom tag and in it change font-size using 'pt' values
      const selection = document.getSelection()

      if (selection.type === 'Range') return

      const newActiveModifiers = []

      const getModifiers = child => {
        const parentTag = child.parentNode.tagName

        if (parentTag !== 'ARTICLE') {
          if (this.noCustomTextModifierArray.has(parentTag) ||
              this.customColorTextModifierArray.has(parentTag) ||
              this.customInputTextModifierArray.has(parentTag)) {
            newActiveModifiers.push(parentTag)
          } else if (child.parentNode.align) {
            newActiveModifiers.push(child.parentNode.align)
          }
          return (getModifiers(child.parentNode))
        }
      }

      getModifiers(selection.focusNode)

      this.activeModifierArr.forEach(activeMod => activeMod.classList.remove('text-area__text-formating__button--active'))
      this.activeModifierArr = []

      newActiveModifiers.forEach(mod => {
        const modData = this.noCustomTextModifierArray.get(mod) ||
                        this.customColorTextModifierArray.get(mod) ||
                        this.customInputTextModifierArray.get(mod)
        const modButton = document.querySelector(`.text-area__text-formating__${modData[1]}-button`)

        modButton.classList.add('text-area__text-formating__button--active')

        this.activeModifierArr.push(modButton)
      })
    },
    checkCaretAfterKey (event) {
      const k = event.key

      if (k !== 'ArrowUp' && k !== 'ArrowDown' &&
          k !== 'ArrowLeft' && k !== 'ArrowRight') {
        return
      }

      this.checkCaret()
    },
    addActiveButton (button, status) {
      if (status) {
        this.activeModifierArr.push(button)
      } else {
        this.activeModifierArr.splice(this.activeModifierArr.indexOf(button), 1)
      }

      button.classList.toggle('text-area__text-formating__button--active', status)
    },
    alignBtn (button) {
      const disableButton = this.activeModifierArr.some(act => act.title === button.title)

      const getParentLine = child => {
        let parentTag = {}

        if (child.parentNode.tagName !== 'DIV') {
          return (parentTag = getParentLine(child.parentNode))
        } else parentTag = child.parentNode

        return parentTag
      }

      if (disableButton) {
        const alingedLine = getParentLine(document.getSelection().focusNode)

        alingedLine.removeAttribute('align')

        return
      }

      const controversialButton = this.activeModifierArr.find(act => (act.title === 'center' || act.title === 'left' || act.title === 'right' || act.title === 'full') && act.title !== button.title)

      if (!controversialButton) return

      const p = this.$children.find(child => child.$el === controversialButton)

      p.buttonActive = !p.buttonActive

      controversialButton.classList.remove('text-area__text-formating__button--active')

      this.activeModifierArr.splice(this.activeModifierArr.indexOf(controversialButton), 1)
    }
    // controversialButton (button) {
    //   const disableButton = this.activeModifierArr.find(act => (act.title === 'center' || act.title === 'left' || act.title === 'right' || act.title === 'full') && act.title !== button.title)

    //   if (!disableButton) return

    //   const disableButtonIndex = this.activeModifierArr.indexOf(disableButton)

    //   disableButton.classList.remove('text-area__text-formating__button--active')

    //   this.activeModifierArr.splice(disableButtonIndex, 1)
    // }
  }
}

</script>

<style lang="sass">

.text-editor
  box-sizing: border-box
  height: 600px
  background-color: grey
  margin: 0 auto

  &__text-formating
    height: 10%
    background-color: red

    &__button
      background-color: white

      &--active
        background-color: grey

  &__text-area
    width: 100%
    height: 90%
    background-color: black
    color: white
  //   & h1, & h2, & h3, & h4, & h5, & h6
  //     margin: 0

  // &__description blockquote
  //   margin: 0 0 0 25px

.wrapper
  display: inline-block
  list-style: none
  padding: 0

  &__item-input
    position: absolute
</style>
