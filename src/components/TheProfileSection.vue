<template>

    <section class="profile">

        <p class="profile__name">{{ userName }}</p>

        <img
         :src="userIconUrl"
         alt="user_icon"
         class="profile__icon"
        >

    </section>

</template>

<script>

export default {

  data () {
    return {

      userName: 'Dima',
      userIconUrl: ''

    }
  }

}

</script>

<style lang="sass">

.profile

    position: absolute
    top: 1%
    right: 5%

.profile__name

    display: inline-block
    margin: 0 10px 0 0

.profile__icon

    display: inline-block
    // width: 50px
    // height: 50px
    border-radius: 50%
    background-color: purple
    overflow: hidden

</style>
