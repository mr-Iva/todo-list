<template>
<ul class="wrapper">
    <li>
        <button
         @click="toggleInput()"
         :title="description"
         class="text-area__text-formating__button"
        >
            {{ description }}
        </button>
    </li>
    <li
     class="wrapper__item-input"
     v-show="showInput"
    >
        <input
        type="number"
        :class="`text-area__text-formating__${modifier}-button`"
        v-model="customInput"
        >
        <button @click="changeText(modifier, customInput)">done</button>
    </li>
</ul>
</template>

<script>
import basicButton from '../mixins/TextAreaBasicTextButtonMixin'
import customInputButton from '../mixins/TextAreaCustomTextButtonMixin'

export default {
  mixins: [basicButton, customInputButton],
  methods: {
    changeText (command, customValue = null) {
      // const modifiedText = null

      if (this.enableToggleButton) this.toggleButton()

      this.restoreSelected()

      console.log(this.selectedRanges)

      console.log('-------before exec -----------')
      console.log(document.getSelection().anchorNode)
      console.log(document.getSelection().focusNode)
      console.log('-------------------------')

      document.execCommand(command, false, customValue)

      console.log('-------after exec -----------')
      console.log(document.getSelection().anchorNode)
      console.log(document.getSelection().focusNode)
      console.log('------------------------')

      const r = []

      for (let i = 0; i < document.getSelection().rangeCount; i++) {
        r.push(document.getSelection().getRangeAt(i))
      }

      console.log(r.forEach(ra => console.log(ra)))

      // modifiedText = document.getSelection()
      // console.log(modifiedText)

      // for (let i = 0; i < modifiedText.rangeCount; i++) {
      //     const range = modifiedText.getRangeAt(i)
      //     const start = range.startContainer.nextSibling
      //     const end = range.endContainer.parentNode

      //     console.log(range)
      //     console.log(end)

      //     if (start !== end) {
      //         start.removeAttribute('size')
      //         start.style.fontSize = this.customInput + 'pt'
      //     }

      //     end.removeAttribute('size')
      //     end.style.fontSize = this.customInput + 'pt'
      // }

      this.customInput = ''
      this.showInput = !this.showInput
    }
  }
}
</script>
