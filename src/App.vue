<template>
  <div id="app">
    <banner></banner>
    <router-view></router-view>
    <tabFoot></tabFoot>
  </div>
</template>

<script>
  import banner from './components/banner.vue'
  import tabFoot from './components/tabFoot.vue'

  export default {
    name: 'app',
    components: {
      banner,
      tabFoot
    }
  }
</script>

<style lang="scss">
</style>
