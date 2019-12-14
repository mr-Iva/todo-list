<template>

<main class="main-page">

    <header class="header">

        <ul class="groups-filters">

            <li
             v-for="filter in groupFiltersArr"
             :key="filter.id"
             :class="'groups-filters__item ' + filter.class"
             :style="filter.color"
             @click="toggleFilter"
            >

                {{ filter.name }}

            </li>

            <li
             :class="addinFilterName"
             @click.self="createFilter = true"
            >

                <input
                 v-if="createFilter"
                 class="groups-filters__add-item__input-name"
                 v-focus
                 placeholder="filters name"
                 @keyup.enter="addNewFilter"
                />
                <button
                 v-if="createFilter"
                 class="groups-filters__add-item__close-button"
                 @click.self="createFilter = false"
                />

            </li>

        </ul>

        <v-profile-section />

    </header>

    <section class="add-item">

        <button
         class="add-item__button"
         @click="createProject"
        >
            Add project
        </button>
        <button
         class="add-item__button"
         @click="addTodo"
        >
            Add todo
        </button>

    </section>

    <ul class="items-list">

        <!-- make drag event to move li -->
        <!-- make special directive to detect whether an element is todo or group and give it v-show or v-if -->

        <li
         v-for="project in itemsArr"
         class="items-list__item"
        >

            <button
             class="items-list__item__button items-list__item__button--show"
             @click="project.showContent = !project.showContent"
            ></button>

            <h3 class="items-list__item__name">{{ project.title }}</h3>

            <button
             class="items-list__item__button items-list__item__button--delete"
             @click="deleteItem(project)"
            ></button>

            <v-text-area v-if="project.showContent" />

        </li>

    </ul>

</main>

</template>

<script>

// later make it global or return to App.vue in absolute position
import TheProfileSection from '../components/TheProfileSection.vue';
import TextArea from '../components/TextArea.vue';

export default {

    components: {

        "v-profile-section": TheProfileSection,
        "v-text-area": TextArea

    },

    directives: {

        focus: {

            inserted(el) { el.focus() }

        }

    },

    data() {

        return {

            pallet: ["#9AE87B", "#4ECFA4", "#40CFBE", "#C7504C", "#E6CFA1"],
            groupFiltersArr: [],
            itemsArr: [],
            itemsGlobalId: 0,
            createFilter: false

        }

    },

    computed: {

        addinFilterName() {

            const cssClass = "groups-filters__add-item groups-filters__item--";
            const modifier = this.createFilter ? "show" : "hidden";

            return cssClass + modifier;

        }

    },

    methods: {

        randomColor() {

            let random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

            let hue = random(0, 360);
            let lightnes = `${random(60, 80)}%`;
            let saturation = `${random(60, 80)}%`;

            for(let filter of this.groupFiltersArr) {

                let hueCopy, difference;

                hueCopy = /\d{1,3},/.exec(filter.color); // should be a better way to find needed hue value
                hueCopy = hueCopy[0].replace(",", "");

                difference = hue - hueCopy;

                if(difference <= 15 && difference >= -15) return this.randomColor();

            }

            return `hsl(${hue}, ${lightnes}, ${saturation})`;

        },

        addNewFilter(event) {

            this.groupFiltersArr.push({

                name: event.target.value.trim(),
                color: `background-color: ${this.randomColor()}`,
                class: "groups-filters__item--active"

            });

            this.createFilter = false;

            // https://ru.vuejs.org/v2/guide/list.html in the bottom of page there is usefull example how can make names for new gruops

        },

        toggleFilter(event) {

            let className = event.target.className.replace(/--\w+/, match => (match === "--hidden") ? "--active" : "--hidden" );

            event.target.className = className;

        },

        createProject() {



        },

        addNewProject(event) {

            console.log(event.target.value);

            this.itemsArr.push({

                id: this.itemsGlobalId++,
                type: "project",
                title: "It is test project",
                showContent: false

            });

        },

        addTodo() {

            this.itemsArr.push({

                id: this.itemsGlobalId++,
                type: "todo",
                title: "Maybe test todo",
                showContent: false

            });

        },

        showItem(item) {

            item.showContent = !item.showContent;

        },

        deleteItem(item) {

            this.itemsArr.splice(this.itemsArr.indexOf(item), 1);

        }

    }

}

</script>

<style lang="sass">

.main-page

    height: 100vh
    width: 100vw
    background-color: #E8E5DF

.header

    width: 100%
    height: 5%
    // position: sticky работает, но он бессмесленен
    position: fixed
    top: 0
    left: 0
    background-color: red

.groups-filters

    width: 100%
    height: 100%
    float: left
    margin: 0 0 0 3%
    padding: 0
    list-style: none

.groups-filters__item

    height: 100%
    display: inline-block
    float: left
    text-align: center
    cursor: pointer

.groups-filters__item--active

    width: 100px

.groups-filters__item--hidden

    width: 30px

.groups-filters__add-item

    @extend .groups-filters__item
    background-color: green
    // &::after
    //
    //     content: "+"
    //     position: relative
    //     left: 30%
    //     top: 25%

.groups-filters__add-item__input-name

    height: 100%
    width: 75px
    float: left
    border: none
    color: black
    background-color: transparent

.groups-filters__add-item__close-button

    width: 25px
    height: 100%
    float: left
    border: none
    background-color: black
    cursor: pointer

.add-item

    height: 25px
    margin: 50px 100px

.add-item__button

    width: 45%
    cursor: pointer
    background-color: #DAF0EC
    border: 2px dashed #40CFBE
    border:
        top-left-radius: 2% 50%
        top-right-radius: 2% 50%
        bottom-right-radius: 2% 50%
        bottom-left-radius: 2% 50%
    color: #40CFBE
    letter-spacing: 5px
    transition: background-color .3s

    &:hover

        background-color: #B8E6DE

    &:last-child

        float: right

.items-list

    margin: 50px 100px
    padding: 0
    list-style: none

.items-list__item

    height: 50px
    margin-bottom: 25px
    background-color: #4ECFA4

.items-list__item__name

    display: inline-block
    float: left
    margin-left: 25px

.items-list__item__button

    height: 50px
    width: 50px
    // background-color: transparent // while I there is no icons for button this property isn't needed
    border: none
    cursor: pointer

.items-list__item__button--show

    float: left

.items-list__item__button--delete

    float: right

</style>
