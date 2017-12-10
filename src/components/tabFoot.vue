<template>
    <div>
      <div class="copyright-wrap">
        <p>汕头博裕塑料有限公司 版权所有</p>
        <p>2017版权所有</p>
        <p>粤ICP备030025021</p>
        <p>电话：0086-754-82523455</p>
      </div>
      <div class="foot-bar">
        <div @touchstart="toHome" :class="{selected: selectIndex === 0}">
          <p>首页</p>
          <p class="text-italic">HOME</p>
        </div>
        <div @touchstart="toProduct" :class="{selected: selectIndex === 1}">
          <p>产品</p>
          <p class="text-italic">PRODUCTS</p>
        </div>
        <div @touchstart="toContact" :class="{selected: selectIndex === 2}">
          <p>联系我们</p>
          <p class="text-italic">CONTACT</p>
        </div>
      </div>
    </div>
</template>

<script>
  import router from '@/router'

  export default {
    data () {
      return {
        selectIndex: 0
      }
    },

    methods: {
      toHome () {
        router.replace({ path: '/' })
        this.selectIndex = 0
      },
      toProduct () {
        router.replace({ path: '/product' })
        this.selectIndex = 1
      },
      toContact () {
        router.replace({ path: '/contact' })
        this.selectIndex = 2
      }
    }
  }
</script>

<style lang="scss" scoped>
  $theme-gray-color: rgb(177, 176, 176);
  $theme-gray-bgcolor: rgb(238, 236, 236);
  $theme-bgcolor: rgb(251, 122, 158);
  $theme-select-color: rgb(253, 158, 182);

  .copyright-wrap {
    padding: 15px 0 65px 0;
    background-color: $theme-gray-bgcolor;
    p {
      text-align: center;
      color: $theme-gray-color;
    }
  }
  .foot-bar {
    height: 50px;
    display: flex;
    flex-flow: row nowrap;
    position: fixed;
    bottom: 0;
    width: 100%;
    div {
      flex: 1;
      text-align: center;
      color: white;
      background-color: $theme-bgcolor;
      padding-top: 8px;
      border-right: 1px solid white;
      &:last-child {
        border: 0;
      }
      .text-italic {
        font-style: italic;
      }
    }
    .selected {
      background-color: $theme-select-color;
    }
  }
</style>
