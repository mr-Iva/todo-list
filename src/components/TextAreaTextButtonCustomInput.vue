<template>
<ul class="button-wrapper">
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
     class="button-wrapper__item-input"
     v-show="showInput"
    >
        <input
        type="text"
        :class="`text-area__text-formating__${modifier}-button`"
        v-model="customInput"
        >
        <button @click="changeText(modifier, customInput)">done</button>
    </li>
</ul>
</template>

<script>
import basicTextButton from '../mixins/TextAreaBasicTextButtonMixin.vue'
import customTextButton from '../mixins/TextAreaCustomTextButtonMixin.vue'

export default {
  mixins: [basicTextButton, customTextButton]
}
</script>
