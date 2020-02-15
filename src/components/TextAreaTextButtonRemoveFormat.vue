<template>
<button
 @click="removeFormat"
 class="text-area__text-formating__button text-area__text-formating__remove-button"
>
  remove format
</button>
</template>

<script>
export default {
  methods: {
    removeFormat () {
      const getParents = child => {
        if (child.parentNode.tagName[0] === 'H') {
          heading = child.parentNode
        } else if (child.parentNode.tagName === 'DIV') {
          return (parentLine = child.parentNode)
        }

        return (getParents(child.parentNode))
      }

      let heading = null
      let parentLine = null

      getParents(document.getSelection().focusNode)

      document.execCommand('removeFormat', false, null)

      if (heading) heading.replaceWith(heading.textContent)
      if (parentLine.align) parentLine.removeAttribute('align')
    }
  }
}
</script>
