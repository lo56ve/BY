<template>
    <div>
      <ul class="sort-wrap">
        <li v-for="(item, index) in sortArr" :class="{'is-selected': index === selectIndex}" @touchstart="selectSort(index)">
          {{item}}
          <img v-show="index === selectIndex" src="/static/images/selected.png" alt="">
        </li>
      </ul>

      <div class="product-wrap">
        <p class="part-wrap">
          <span class="title" @touchstart="hideDetail">{{sortArr[selectIndex]}} >></span>
          <span class="product-sort" v-html="currentItem.sort"></span>
          <input class="search-text" type="text" v-show="isShowSearch" placeholder="搜索" @blur="hideSearch">
          <label><span class="iconfont icon-search" @touchstart="showSearch" v-show="!isShowSearch"></span></label>
          <label><input type="checkbox">唇彩管</label>
          <label><input type="checkbox">口红管</label>
        </p>

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
        sortArr: ['最新产品', '唇部', '眼部', '脸部', '套装'],
        selectIndex: 0,
        currentItem: '',
        isShowCurrent: false,
        isShowSearch: false
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
      selectSort (index) {
        this.selectIndex = index
      },
      showSearch () {
        this.isShowSearch = true
      },
      hideSearch () {
        this.isShowSearch = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/common";

  .sort-wrap {
    display: flex;
    flex-flow: row nowrap;
    border-top: 2px solid $theme-color;
    border-bottom: 2px solid $theme-color;
    height: 40px;
    background-color: white;
    margin-top: 5px;
    li {
      flex: 1;
      text-align: center;
      line-height: 38px;
      font-size: 14px;
      color: $theme-font-color;
      border-right: 1px solid $theme-font-color;
      position: relative;
      img {
        height: 10px;
        width: 13px;
        position: absolute;
        bottom: -11px;
        left: 50%;
        margin-left: -5px;
        z-index: 100;
      }
      &:last-child {
        border: 0;
      }
    }
    .is-selected {
      background-color: $theme-font-color;
      color: white;
      border: 0;
    }
  }

  .product-wrap {
    @include box-wrap;
    background-color: white;
    position: relative;
    .part-wrap {
      @include part-title;
      margin-bottom: 0;
      color: $theme-font-color;
      position: relative;
      .product-sort {
        font-size: 18px;
        margin-left: 5px;
      }
      label {
        float: right;
        font-size: 13px;
        line-height: 25px;
        margin-right: 10px;
        input {
          vertical-align: middle;
        }
      }
      .search-text {
        position: absolute;
        z-index: 100;
        right: 5px;
        padding-left: 8px;
        height: 22px;
        border-radius: 11px;
        border: 1px solid $theme-font-color;
        outline: none;
        tap-highlight-color: rgba(0, 0, 0, 0);
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
