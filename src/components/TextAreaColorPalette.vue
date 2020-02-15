<template>
<ul class="color-palette">
    <li
     v-for="(paletteLine, index) in colorArr"
     :key="`paletteLine${index}`"
     class='color-palette__color-line'
    >
        <div
         v-for="(paletteColor, index) in paletteLine"
         :key="`color${index}`"
         @click="$emit('changeColor', paletteColor)"
         class="color-palette__color-line__color-block"
         :style="`background-color: ${paletteColor}`"
        ></div>
    </li>
</ul>
</template>

<script>
export default {
  data () {
    return {
      colorArr: [
        ['#f7f7f7', '#ffd6d6', '#ffded6', '#ffefd6', '#f7ffd6', '#f7ffd6', '#d6ffd6', '#d6ffff', '#d6f7ff', '#d6d6ff', '#efd6ff', '#ffd6ff', '#ffd6ef'],
        ['#d6d6d6', '#ffa5a5', '#ffbda5', '#ffd6a5', '#ffff94', '#d6ff94', '#a5ffa5', '#a5ffff', '#a5e7ff', '#a5a5ff', '#d6a5ff', '#ffa5ff', '#ffa5d6'],
        ['#b5b5b5', '#ff8484', '#ff9473', '#ffb563', '#ffff42', '#c6ff63', '#73ff73', '#73ffff', '#84d6ff', '#8484ff', '#c684ff', '#ff73ff', '#ff84c6'],
        ['#949494', '#ff5252', '#ff7342', '#ff9c31', '#f7f700', '#9cff00', '#52ff52', '#00f7f7', '#52c6ff', '#6363ff', '#ad52ff', '#ff42ff', '#ff52ad'],
        ['#636363', '#ff2121', '#ff4200', '#e77300', '#c6c600', '#84d600', '#00e700', '#00d6d6', '#00adff', '#3131ff', '#9421ff', '#ff00ff', '#ff2194'],
        ['#525252', '#ff0000', '#e73900', '#d66b00', '#b5b500', '#73c600', '#00d600', '#00c6c6', '#0094e7', '#2121ff', '#8400ff', '#e700e7', '#ff0084'],
        ['#424242', '#e70000', '#c63100', '#b55a00', '#a5a500', '#63a500', '#00b500', '#00a5a5', '#0084c6', '#0000ff', '#7300e7', '#c600c6', '#e70073'],
        ['#313131', '#c60000', '#a52900', '#a55200', '#949400', '#5a9400', '#00a500', '#009494', '#006ba5', '#0000d6', '#6300c6', '#a500a5', '#c60063'],
        ['#212121', '#940000', '#942100', '#844200', '#737300', '#528400', '#008400', '#008484', '#006394', '#0000a5', '#4a0094', '#940094', '#94004a'],
        ['#101010', '#730000', '#731800', '#633100', '#636300', '#396300', '#006300', '#006363', '#004a73', '#000084', '#390073', '#730073', '#730039'],
        ['#000000', '#520000', '#521000', '#522900', '#525200', '#315200', '#005200', '#005252', '#003152', '#000052', '#290052', '#520052', '#520029']

      ]
    }
  }
}
</script>

<style lang="sass">
.color-palette

    list-style: none
    padding: 0
    margin: 0
    width: 325px
    height: 275px

.color-palette__color-line

    height: 25px
    padding:0
    margin: 0

.color-palette__color-line__color-block

    width: 15px
    height: 15px
    display: inline-block
    cursor: pointer
    border: 5px solid silver
</style>
