<template>
    <div>
      <Carousel class="carousel-wrap" v-if="carouselArr.length > 0">
        <div v-for="item in carouselArr"  @click="showProduct(item.pid)">
          <img :src="item.img_url" alt="">
        </div>
      </Carousel>

      <div v-show="!isEnglish" :class="[{'hide-text': !showAllText}, 'company-intro']">
        <p class="part-wrap"><span class="title">公司介绍</span><span class="title-en">ABOUT US</span><span class="lang" @touchstart="changeLang">[English]</span></p>

        <p v-for="item in introduceCn">{{item}}</p>

        <p class="showall-btn" @touchstart="showAll" v-html="showAllText ? '[收起]' : '[显示全文]'"></p>
      </div>

      <div v-show="isEnglish" :class="[{'hide-text': !showAllText}, 'company-intro']">
        <p class="part-wrap"><span class="title">公司介绍</span><span class="title-en">ABOUT US</span><span class="lang" @touchstart="changeLang">[中文]</span></p>

        <p v-for="item in introduceEn">{{item}}</p>

        <p class="showall-btn" @touchstart="showAll" v-html="showAllText ? '[hide]' : '[show]'"></p>
      </div>

      <div class="company-style">
        <p class="part-wrap"><span class="title">企业风采</span><span class="title-en">TEAM STYLE</span></p>
        <div class="img-wrap">
          <img src="/index/images/company_01.jpg" alt="" @click="showFullImg('/index/images/company_01.jpg')">
          <img src="/index/images/company_02.png" alt="" @click="showFullImg('/index/images/company_02.png')">
          <img src="/index/images/company_03.png" alt="" @click="showFullImg('/index/images/company_03.png')">
          <img src="/index/images/company_04.png" alt="" @click="showFullImg('/index/images/company_04.png')">
          <img src="/index/images/company_05.png" alt="" @click="showFullImg('/index/images/company_05.png')">
          <img src="/index/images/company_06.png" alt="" @click="showFullImg('/index/images/company_06.png')">
        </div>
      </div>

      <div v-if="imgShow" class="img-show" @click="hideFullImg">
        <img :src="imgShow" alt="">
      </div>
    </div>
</template>

<script>
  import Carousel from 'vue-m-carousel'
  import http from '../common/http'
  import api from '../common/api'

  export default {
    data () {
      return {
        carouselArr: [],          // 轮播图
        showAllText: false,       // 是否显示全文
        isEnglish: false,         // 是否英文
        introduceEn: '',          // 英文介绍
        introduceCn: '',          // 中文介绍
        imgShow: ''               // 点击放大的图片
      }
    },
    mounted () {
      http.get(api.contact).then(res => {
        this.introduceEn = res.data.introduce_en.split('\n')
        this.introduceCn = res.data.introduce_cn.split('\n')
      })
      http.get(api.banner).then(res => {
        this.carouselArr = res.data
      })
    },
    methods: {
      showAll () {
        this.showAllText = !this.showAllText
      },
      changeLang () {
        this.isEnglish = !this.isEnglish
      },
      showProduct (id) {
        window.eventBus.$emit('jumpTab')
        this.$router.push({path: '/product', query: {id: id}})
      },
      showFullImg (img) {
        this.imgShow = img
      },
      hideFullImg () {
        this.imgShow = ''
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
    padding-bottom: 253px!important;
    img {
      height: 253px;
      width: 100%;
    }
  }

  .company-intro {
    @include box-wrap;
    background-color: white;
    padding-bottom: 35px;
    position: relative;
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
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: white;
      height: 25px;
      line-height: 25px;
      color: $theme-gray-color;
      text-align: right;
      padding-right: 20px;
      margin: 0;
    }
  }

  .hide-text {
    max-height: 200px;
    overflow: hidden;
  }

  .company-style {
    @include box-wrap;
    background-color: white;
    padding-bottom: 15px;
    .part-wrap {
      @include part-title;
    }
    .img-wrap {
      max-width: 340px;
      width: 340px;
      margin: 0 auto;
      img {
        width: 100px;
        height: 100%;
        margin-left: 8px;
        margin-top: 10px;
      }
    }
  }

  .img-show {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 100;
    img{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
