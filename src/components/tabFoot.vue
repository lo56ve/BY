<template>
    <div>
      <div class="copyright-wrap">
        <p>汕头XXXX有限公司 版权所有</p>
        <p>2018版权所有</p>
        <p>粤ICP备12345678</p>
        <p>电话：0086-888-88888888</p>
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
  export default {
    data () {
      return {
        selectIndex: 0
      }
    },

    mounted () {
      window.eventBus.$on('jumpTab', () => {
        this.selectIndex = 1
      })
    },

    methods: {
      toHome () {
        this.$router.replace({ path: '/' })
        this.selectIndex = 0
      },
      toProduct () {
        this.$router.replace({ path: '/product' })
        this.selectIndex = 1
      },
      toContact () {
        this.$router.replace({ path: '/contact' })
        this.selectIndex = 2
      }
    }
  }
</script>

<style lang="scss" scoped>
  $theme-gray-color: rgb(177, 176, 176);
  $theme-bgcolor: rgb(251, 122, 158);
  $theme-select-color: rgb(253, 158, 182);

  .copyright-wrap {
    padding: 15px 0 65px 0;
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
