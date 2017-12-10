<template>
    <div>
      <div class="contactus-wrap">
        <p class="part-wrap"><span class="title">联系我们</span><span class="title-en">CONTACT US</span></p>
        <p><span class="iconfont icon-telphone"></span>咨询电话： 0086-754-82523455</p>
        <p><span class="iconfont icon-fax"></span>传真：0086-754-82521655</p>
        <p><span class="iconfont icon-address"></span>地址：广东省汕头市潮汕路东侧岐山北工业区美联路</p>
        <p><span class="iconfont icon-email"></span>邮箱：邮箱：info@boyust.com</p>
      </div>
    </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  @import "../css/common";

  .contactus-wrap {
    @include box-wrap;
    .part-wrap {
      @include part-title;
    }
    p {
      padding: 5px 10px;
      .iconfont {
        display: inline-block;
        margin-right: 7px;
        color: $theme-font-color;
      }
    }
  }
</style>
