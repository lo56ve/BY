<template>
    <div>
      <Carousel class="carousel-wrap">
        <div v-for="item in carouselArr" :auto="3000">
          <img :src="item" alt="">
        </div>
      </Carousel>

      <div class="company-intro" v-show="!isEnglish">
        <p class="part-wrap"><span class="title">公司介绍</span><span class="title-en">ABOUT US</span><span class="lang" @touchstart="changeLang">[English]</span></p>
        <p><span class="company-name">汕头博裕塑胶有限公司：</span>成立于2008年，专业生产各式化妆品包装容器。</p>
        <p>公司拥有自建现代化厂房一万六千平方米，配备完整尖端一条龙生产线，集产品设计、模具开发、注塑、喷漆、烫金丝印，包装等于一体。生产设备二百多台，包括高精密注塑成型机，先进多色注塑成型机，吹瓶成型机, 自动化喷涂生产线，真空镀膜机，精准激光雕刻机，印刷机，数控机床及其它先进开模机械设备等。</p>
        <p v-show="showAllText">“没有最好，只有更好”。我们的专业团队在生产的各个环节中严把质量关，以保证产品达到或超过客户的要求。在此基础上，公司力求创新。我们的专业研发团队时刻关注流行趋势，凭借优良的自有配套研发设施如模具厂房等，创造出不少引领潮流的化妆品包材。产品包括口红壳，唇彩瓶，睫毛瓶，眼线瓶，粉盒等彩妆系列。我们也可按客人的要求，制作特定的产品或对现有产品作出适当的更改。</p>
        <p v-show="showAllText">“团结，开拓，求实，创新”是我们的奋斗目标。我们秉承在真诚合作，互惠互利的基础上，会同天下客商，共创产业的辉煌明天！</p>
        <p class="showall-btn" @touchstart="showAll" v-html="showAllText ? '[收起]' : '[显示全文]'"></p>
      </div>

      <div class="company-intro" v-show="isEnglish">
        <p class="part-wrap"><span class="title">公司介绍</span><span class="title-en">ABOUT US</span><span class="lang" @touchstart="changeLang">[中文]</span></p>
        <p><span class="company-name">Shantou Boyu Plastics Co., Ltd：</span>was founded in 2008, specializes in producing kinds of cosmetic packaging.</p>
        <p>Our company owns factory building of 16000 square meters, is equipped with complete top-level production lines. Includes design, mould creation, injection, surface finishing, hot stamp, silk screen, assembling, etc. We have more than two hundred machineries, include high-precision injection machine, modern multi-color injection machine, blow molding machine, UV lacquering machine, vacuum plating, precise laser carving machine, printing, CNC engraving machine & other modern machineries to create new mould, etc.</p>
        <p v-show="showAllText">nothing best, but aiming better’. Our professional team is strict in quality control during all the processing. So to make sure the product to be in accordance with client’s requirements or even better. Besides that, we yearn for innovation. Our R&D team always keep in touch with the fashion trend, in our mould workshop we bring out lots splendid items some even lead the trend. Items include cases for lipstick, lipgloss, mascara, eyeliner, powder, etc. We can also make items as per clients specific requirements or to do changes to our current ones.</p>
        <p v-show="showAllText">We insist ‘United, Developing, Faithful and Innovating’. Base on sincere & mutual profitable cooperation, we are pleased to work with our esteemed client for the brilliance tomorrow!</p>
        <p class="showall-btn" @touchstart="showAll" v-html="showAllText ? '[hide]' : '[show]'"></p>
      </div>

      <div class="company-style">
        <p class="part-wrap"><span class="title">企业风采</span><span class="title-en">TEAM STYLE</span></p>
        <div class="img-wrap">
          <img src="/static/images/company_01.jpg" alt="">
          <img src="/static/images/company_02.png" alt="">
          <img src="/static/images/company_03.png" alt="">
          <img src="/static/images/company_04.png" alt="">
          <img src="/static/images/company_05.png" alt="">
          <img src="/static/images/company_06.png" alt="">
        </div>
      </div>
    </div>
</template>

<script>
  import Carousel from 'vue-m-carousel'

  export default {
    data () {
      return {
        carouselArr: [],
        showAllText: false,
        isEnglish: false
      }
    },
    created () {
      this.carouselArr = [
        '/static/images/carousel/1.jpg',
        '/static/images/carousel/2.jpg',
        '/static/images/carousel/3.jpg'
      ]
    },
    methods: {
      showAll () {
        this.showAllText = !this.showAllText
      },
      changeLang () {
        this.isEnglish = !this.isEnglish
      }
    },
    components: {
      Carousel
    }
  }
</script>

<style lang="scss" scoped>
  @import '../css/common';

  .carousel-wrap {
    @include box-wrap;
  }

  .company-intro {
    @include box-wrap;
    padding-bottom: 7px;
    p {
      text-indent: 15px;
      .company-name {
        font-weight: bold;
        font-size: 14px;
      }
    }
    .part-wrap {
      @include part-title;
    }
    .showall-btn {
      color: $theme-gray-color;
      text-align: right;
    }
  }

  .company-style {
    @include box-wrap;
    padding-bottom: 15px;
    .part-wrap {
      @include part-title;
    }
    .img-wrap {
      width: 320px;
      margin: 0 auto;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      img {
        width: 95px;
        height: 100%;
        flex: 1;
        margin-right: 10px;
        margin-top: 10px;
      }
    }
  }
</style>
