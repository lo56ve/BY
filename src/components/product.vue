<template>
    <div>
      <ul class="sort-wrap" v-show="!isShowCurrent" v-if="sortArr.length > 0">
        <li v-for="(item, index) in sortArr" :class="{'is-selected': index === selectIndex}" @touchstart="selectSort(index)">
          {{item.name}}
          <img v-show="index === selectIndex" src="/index/images/selected.png" alt="">
        </li>
      </ul>

      <div class="product-wrap">
        <p class="part-wrap">
          <span class="title" @touchstart="hideDetail" v-if="sortArr.length > 0">{{sortArr[selectIndex].name}} >></span>
          <span class="product-sort" v-show="isShowCurrent">{{currentItem.type}} >> {{currentItem.name}}</span>
          <input class="search-text" type="text" v-focus="isShowSearch" v-model="searchKey" v-if="isShowSearch && !isShowCurrent" placeholder="搜索" @blur="hideSearch" @keyup.enter="search">
          <i class="iconfont icon-search search-click-btn" v-show="isShowSearch && !isShowCurrent" @click="search"></i>
          <i class="iconfont icon-back return" v-show="isShowCurrent" @touchstart="hideDetail"></i>
          <span class="pull-right" v-show="!isShowSearch && !isShowCurrent"><span class="iconfont icon-search" @click="showSearch" v-show="!isShowSearch"></span></span>
          <span class="pull-right" v-show="!isShowSearch && !isShowCurrent && selectIndex === 1"><input id="checkbox1" type="checkbox"><label :class="{checked: isChecked1}" for="checkbox1" @click="selectSubsort1"></label>口红管</span>
          <span class="pull-right" v-show="!isShowSearch && !isShowCurrent && selectIndex === 1"><input id="checkbox2" type="checkbox"><label :class="{checked: isChecked2}" for="checkbox2" @click="selectSubsort2"></label>唇彩管</span>
          <span class="pull-right" v-show="!isShowSearch && !isShowCurrent && selectIndex === 2"><input id="checkbox4" type="checkbox"><label :class="{checked: isChecked4}" for="checkbox4" @click="selectSubsort4"></label>眼线管</span>
          <span class="pull-right" v-show="!isShowSearch && !isShowCurrent && selectIndex === 2"><input id="checkbox3" type="checkbox"><label :class="{checked: isChecked3}" for="checkbox3" @click="selectSubsort3"></label>睫毛管</span>
          <span class="pull-right" v-show="!isShowSearch && !isShowCurrent && selectIndex === 2"><input id="checkbox5" type="checkbox"><label :class="{checked: isChecked5}" for="checkbox5" @click="selectSubsort5"></label>眼影盒</span>
        </p>

        <ul class="product-list" v-show="!isShowCurrent">
          <li v-for="item in products" @click="showDetail(item.id)">
            <div class="img-wrap">
              <img :src="item.img_url" alt="">
            </div>
            <div class="name-wrap">{{ item.name }}</div>
          </li>
        </ul>

        <div v-show="isShowCurrent">
          <!--<img :src="item" alt="" v-for="item in currentItem.src">-->
          <div v-html="currentItem.content"></div>
        </div>

      </div>
    </div>
</template>

<script>
  import http from '../common/http'
  import api from '../common/api'

  export default {
    data () {
      return {
        products: [],
        productsFlag: [],   // 复制一份产品列表备份
        sortArr: [],
        selectIndex: 0,
        currentItem: '',
        isShowCurrent: false,
        isShowSearch: false,
        searchKey: '',    // 搜索的关键词
        // 多选框全部重做
        isChecked1: false,
        isChecked2: false,
        isChecked3: false,
        isChecked4: false,
        isChecked5: false
      }
    },
    methods: {
      // 显示产品详情
      showDetail (itemId) {
        http.get(api.info, {id: itemId}).then(res => {
          this.currentItem = res.data
        })
        this.isShowCurrent = true
      },
      // 隐藏产品详情
      hideDetail () {
        this.isShowCurrent = false
        this.currentItem = ''
//        this.products = this.productsFlag
      },
      // 获得相应的产品接口
      getProduct (param) {
        return new Promise((resolve, reject) => {
          http.get(api.productlist, param).then(res => {
            this.products = res.data.product_list
            resolve()
          })
        })
      },
      // 选择分类
      selectSort (index) {
        this.selectIndex = index
        this.getProduct({category_id: index}).then(() => {
          this.productsFlag = this.products
        })
      },
      // 显示搜索
      showSearch () {
        this.searchKey = ''
        this.isShowSearch = true
      },
      // 隐藏搜索
      hideSearch () {
        this.isShowSearch = false
      },
      // 搜索
      search () {
        this.isShowSearch = true
        if (this.searchKey.length > 0) {
          http.get(api.search, {key: this.searchKey}).then(res => {
            if (res.data.length > 0) {
              this.products = res.data
            } else {
              alert('搜索不到该产品，请重新输入')
            }
          })
        } else {
          alert('搜索关键字不能为空！')
        }
      },
      selectSubsort1 () {
        this.isChecked1 = !this.isChecked1
        this.getProductList(1)
      },
      selectSubsort2 () {
        this.isChecked2 = !this.isChecked2
        this.getProductList(1)
      },
      selectSubsort3 () {
        this.isChecked3 = !this.isChecked3
        this.getProductList(2)
      },
      selectSubsort4 () {
        this.isChecked4 = !this.isChecked4
        this.getProductList(2)
      },
      selectSubsort5 () {
        this.isChecked5 = !this.isChecked5
        this.getProductList(2)
      },
      getProductList (category) {
        let products = []
        let param = category === 1 ? [this.isChecked1, this.isChecked2] : [this.isChecked3, this.isChecked4, this.isChecked5]
        param.forEach((item, index) => {
          if (item) {
            this.getProduct({category_id: category, type_id: parseInt(index + 1)}).then(list => { products = products.concat(list) })
          }
        })
        if (!param.every(item => item)) {
          this.products = this.productsFlag
        }
      }
//      getQueryString () {
//        let search = window.location.href.match(/id=\d+/)[0].split('=')[1]
//        console.log(search)
//      }
    },
    mounted () {
      http.get(api.productlist).then(res => {
        let newProduct = {
          category_id: 0,
          name: '最新产品'
        }
        this.sortArr = res.data.category_list
        this.sortArr.unshift(newProduct)
        this.products = res.data.product_list
        this.productsFlag = this.products

        let id = window.location.href.match(/id=\d+/)
        let sortIndex = window.location.href.match(/sortindex=\d+/i)
        if (id) {   // 如果是banner图过来产品
          this.showDetail(parseInt(id[0].split('=')[1]))
        } else if (sortIndex) {   // 如果是公众号跳转进来的链接，跳转相应的index
          this.selectSort(parseInt(sortIndex[0].split('=')[1]))
        }
      })
      // 如果是banner图过来产品
//      if (this.$route.query.id) {
//        this.showDetail(this.$route.query.id)
//      }
//      // 如果是公众号跳转进来的链接，跳转相应的index
//      if (this.$route.query.sortindex) {
//        this.selectSort(parseInt(this.$route.query.sortindex))
//      }
    },
    // 自定义指令，实现输入框聚焦
    directives: {
      focus: {
        inserted: function (el, {value}) {
          if (value) {
            el.focus()
          }
        }
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
        padding-right: 27px;
      }
      .search-click-btn {
        position: absolute;
        z-index: 200;
        right: 15px;
        top: 8px;
      }
      .return {
        position: absolute;
        z-index: 200;
        right: 15px;
        top: 8px;
      }
    }
    .product-list {
      // width: 345px;``
      margin: 0 auto;
      display: flex;
      flex-flow: row wrap;
      margin-bottom: 20px;
      li {
        width: 50%;
        border-bottom: 1px solid $theme-border-color;
        padding: 0 0.3rem;
        &:nth-child(2n-1) {
          border-right: 1px solid $theme-border-color;
        }
        .img-wrap {
          height: 190px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .name-wrap {
          text-align: center;
          font-weight: bold;
          height: 20px;
          line-height: 20px;
        }
      }
    }
  }
</style>
