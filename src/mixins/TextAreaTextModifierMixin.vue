<script>
export default {
  data () {
    return {
      startCont: null,
      startPos: 0,
      endCont: null,
      endPos: 0
    }
  },
  methods: {
    changeText (modifier) {
      const selected = window.getSelection()

      if (selected.isCollapsed) return

      for (let i = 0; i < selected.rangeCount; i++) { this.addTag(selected.getRangeAt(i), modifier) }
    },
    getParentTags (child) {
      const parents = []
      let currentParent = child

      const getParent = c => c.parentNode.tagName === 'DIV' ? null : c.parentNode

      while ((currentParent = getParent(currentParent))) { parents.push(currentParent) }

      return parents
    },
    insertTagInNode (modifier) {
      const addedTag = document.createElement('span')

      addedTag.className = `modifier-${modifier}`

      if (this.endPos - this.startPos === this.startCont.textContent.length) {
        this.startCont.parentNode.insertBefore(addedTag, this.startCont)

        addedTag.append(this.startCont)

        return
      }

      const replaceFragment = document.createDocumentFragment()
      const startText = document.createTextNode(this.startCont.textContent.slice(0, this.startPos))
      const endText = document.createTextNode(this.startCont.textContent.slice(this.endPos))

      addedTag.textContent = this.startCont.textContent.slice(this.startPos, this.endPos)

      replaceFragment.append(startText, addedTag, endText)

      this.startCont.parentNode.replaceChild(replaceFragment, this.startCont)
    },
    insertSameTagStart () {
      this.startCont.textContent += this.endCont.textContent.slice(0, this.endPos)
      this.endCont.textContent = this.endCont.textContent.slice(this.endPos)
    },
    insertSameTagEnd () {
      this.endCont.textContent = this.startCont.textContent.slice(this.startPos) + this.endCont.textContent
      this.startCont.textContent = this.startCont.textContent.slice(0, this.startPos)
    },
    addTag (range, modifier) {
      const startParent = range.startContainer.parentNode
      const endParent = range.endContainer.parentNode

      this.startCont = range.startContainer
      this.startPos = range.startOffset
      this.endCont = range.endContainer
      this.endPos = range.endOffset

      if (this.startCont === this.endCont) {
        this.insertTagInNode(modifier)
      } else if (startParent.tagName === modifier && startParent === this.endCont.previousSibling) {
        this.insertSameTagStart()
      } else if (endParent.tagName === modifier && endParent === this.startCont.nextSibling) {
        this.insertSameTagEnd()
      } else {
        console.log('both')
      }
    }
  }
}
</script>
