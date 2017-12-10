<template>
    <div>
      <div class="product-wrap">
        <p class="part-wrap"><span class="title" @touchstart="hideDetail">最新产品 >></span><span class="product-sort" v-html="currentItem.sort"></span><span class="iconfont icon-menu" @touchstart="showMenu"></span></p>

        <div class="menu-wrap" v-show="isShowMenu"></div>

        <ul class="product-list" v-show="!isShowCurrent">
          <li v-for="item in products" @touchstart="showDetail(item)">
            <img :src="item.src[0]" alt="">
            <div>{{ item.itemId }}</div>
          </li>
        </ul>

        <div v-show="isShowCurrent">
          <img :src="item" alt="" v-for="item in currentItem.src">
        </div>

      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        products: [],
        currentItem: '',
        isShowCurrent: false,
        isShowMenu: false
      }
    },
    created () {
      for (let i = 0; i < 10; i++) {
        this.products.push({
          src: [
            '/static/images/product/product_02.jpg',
            '/static/images/product/product_01.jpg'
          ],
          itemId: 5182,
          sort: '口红'
        })
      }
    },
    methods: {
      showDetail (item) {
        this.isShowCurrent = true
        this.currentItem = item
      },
      hideDetail () {
        this.isShowCurrent = false
        this.currentItem = ''
      },
      showMenu () {
        this.isShowMenu = !this.isShowMenu
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/common";

  .product-wrap {
    @include box-wrap;
    position: relative;
    .part-wrap {
      @include part-title;
      margin-bottom: 0;
      .product-sort {
        color: $theme-font-color;
        font-size: 18px;
        margin-left: 5px;
      }
      .iconfont {
        float: right;
        color: $theme-font-color;
        margin-top: 5px;
        margin-right: 10px;
      }
    }
    .menu-wrap {
      margin: 0 15px;
      height: 40px;
      width: 345px;
      box-sizing: border-box;
      background-color: $theme-font-color;
      position: fixed;
      top: 100px;
    }
    .product-list {
      margin: 0 15px;
      display: flex;
      flex-flow: row wrap;
      margin-bottom: 20px;
      li {
        width: 172px;
        border-bottom: 1px solid $theme-border-color;
        &:nth-child(2n-1) {
          border-right: 1px solid $theme-border-color;
        }
        div {
          text-align: center;
          font-weight: bold;
          height: 20px;
          line-height: 20px;
        }
      }
    }
  }
</style>
