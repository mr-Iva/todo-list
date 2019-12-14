<template>

    <article class="text-area">

        <section class="text-area__text-formating">

            <button @click="boldText">bold</button>

        </section>

        <section
         contenteditable
         class="text-area__description"
        >

        </section>

    </article>

</template>

<script>

export default {

    data() {

        return {

            selectedText: ""

        }

    },

    methods: {

        boldText() {

            this.selectedText = window.getSelection().toSource();
            // this.selectedText = window.getSelection().toString();

        }

    }

}

</script>

<style lang="sass">

.text-area

    box-sizing: border-box
    height: 600px
    background-color: grey
    margin: 0 auto

.text-area__text-formating

    height: 10%
    background-color: red

.text-area__description

    width: 100%
    height: 90%
    background-color: black
    color: white

</style>
