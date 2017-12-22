<template>
    <div>
      <ul class="sort-wrap" v-show="!isShowCurrent">
        <li v-for="(item, index) in sortArr" :class="{'is-selected': index === selectIndex}" @touchstart="selectSort(index)">
          {{item}}
          <img v-show="index === selectIndex" src="/index/images/selected.png" alt="">
        </li>
      </ul>

      <div class="product-wrap">
        <p class="part-wrap">
          <span class="title" @touchstart="hideDetail">{{sortArr[selectIndex]}} >></span>
          <span class="product-sort" v-html="currentItem.sort"></span>
          <input class="search-text" type="text" v-show="isShowSearch && !isShowCurrent" placeholder="搜索" @blur="hideSearch">
          <span class="pull-right" v-show="!isShowSearch && !isShowCurrent"><span class="iconfont icon-search" @touchstart="showSearch" v-show="!isShowSearch"></span></span>
          <span class="pull-right" v-show="!isShowSearch && !isShowCurrent"><input id="checkbox1" type="checkbox"><label :class="{checked: isChecked1}" for="checkbox1" @click="selectSubsort1"></label>口红管</span>
          <span class="pull-right" v-show="!isShowSearch && !isShowCurrent"><input id="checkbox2" type="checkbox"><label :class="{checked: isChecked2}" for="checkbox2" @click="selectSubsort2"></label>唇彩管</span>
        </p>

        <ul class="product-list" v-show="!isShowCurrent">
          <li v-for="item in products" @click="showDetail(item)">
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
        isShowSearch: false,
        // 多选框全部重做
        isChecked1: false,
        isChecked2: false
      }
    },
    created () {
      for (let i = 0; i < 10; i++) {
        this.products.push({
          src: [
            '/index/images/product_02.jpg',
            '/index/images/product_01.jpg'
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
      },
      selectSubsort1 () {
        this.isChecked1 = !this.isChecked1
      },
      selectSubsort2 () {
        this.isChecked2 = !this.isChecked2
      }
    },
    mounted () {
      if (this.$route.query.id === '123') {
        this.isShowCurrent = true
        this.currentItem = this.products[0]
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
      color: $theme-font-color;
      position: relative;
      .title {
        font-size: 14px;
      }
      .product-sort {
        font-size: 14px;
        margin-left: 5px;
      }
      .pull-right {
        float: right;
        font-size: 13px;
        margin-right: 10px;
        line-height: 20px;
        input {
          display: none;
        }
        label {
          background-color: #fafafa;
          border: 1px solid $theme-font-color;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
          padding: 7px;
          border-radius: 3px;
          display: inline-block;
          position: relative;
          margin-right: 3px;
          margin-bottom: -2px;
        }
        .checked {
          &:after {
            content: '\2714';
            font-size: 20px;
            position: absolute;
            top: -5px;
            left: 0px;
            color: $theme-font-color;
          }
        }
      }
      .search-text {
        position: absolute;
        z-index: 100;
        right: 5px;
        padding-left: 8px;
        height: 22px;
        border-radius: 11px;
        width: 160px;
        border: 1px solid $theme-font-color;
        outline: none;
        tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
    .product-list {
      width: 345px;
      margin: 0 auto;
      display: flex;
      flex-flow: row wrap;
      margin-bottom: 20px;
      li {
        width: 50%;
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
