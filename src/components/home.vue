<template>
    <div>
      <Carousel>
        <div v-for="i in 3" :indicators="true" :auto="3000">
          <img :src="'/static/images/carousel/' + i + '.jpg'" alt="">
        </div>
      </Carousel>
    </div>
</template>

<script>
  import Carousel from 'vue-m-carousel'

  export default {
    data () {
      return {
        carouselArr: []
      }
    },
    mounted () {
      this.carouselArr = [
        '/static/images/carousel/1.jpg',
        '/static/images/carousel/2.jpg',
        '/static/images/carousel/3.jpg'
      ]
    },
    components: {
      Carousel
    }
  }
</script>

<style lang="scss" scoped>
  $theme-color: rgb(255, 195, 194);

  .carousel-wrap {
    margin-top: 7px;
    border-top: 1px solid $theme-color;
    border-bottom: 1px solid $theme-color;
  }
</style>
