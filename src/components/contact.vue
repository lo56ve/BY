<template>
    <div>
      <div class="contactus-wrap">
        <p class="part-wrap"><span class="title">联系我们</span><span class="title-en">CONTACT US</span></p>
        <p><span class="iconfont icon-telphone"></span>咨询电话： 0086-754-82523455</p>
        <p><span class="iconfont icon-fax"></span>传真：0086-754-82521655</p>
        <p><span class="iconfont icon-address"></span>地址：广东省汕头市潮汕路东侧岐山北工业区美联路</p>
        <p><span class="iconfont icon-email"></span>邮箱：邮箱：info@boyust.com</p>
      </div>

      <div class="form-wrap">
        <p class="part-wrap"><span class="title">邮件联系</span><span class="title-en">EMAIL</span></p>
        <form>
          <label>姓名 <span>*</span><input type="text" v-model="formInfo.name"><span class="wrongMsg" v-show="!this.checkInfo.name && this.haschecked">{{ checkMsg.name }}</span></label>
          <label>职位 <span>*</span><input type="text" v-model="formInfo.job"><span class="wrongMsg" v-show="!this.checkInfo.job && this.haschecked">{{ checkMsg.job }}</span></label>
          <label>电话号码 <span>*</span><input type="text" v-model="formInfo.phone"><span class="wrongMsg" v-show="!this.checkInfo.phone && this.haschecked">{{ checkMsg.phone }}</span></label>
          <label>电子邮箱 <span>*</span><input type="text" v-model="formInfo.email"><span class="wrongMsg" v-show="!this.checkInfo.email && this.haschecked">{{ checkMsg.email }}</span></label>
          <label>公司 <span>*</span><input type="text" v-model="formInfo.company"><span class="wrongMsg" v-show="!this.checkInfo.company && this.haschecked">{{ checkMsg.company }}</span></label>
          <label>网站 <span></span><input type="text" v-model="formInfo.website"></label>
          <label class="textarea">留言信息 <span>*</span><textarea v-model="formInfo.message"></textarea><span class="wrongMsg" v-show="!this.checkInfo.message && this.haschecked">{{ checkMsg.message }}</span></label>
          <button @touchstart="check">提交</button>
        </form>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        haschecked: false,      // 是否进行校验
        formInfo: {             // 表单信息
          name: '',
          job: '',
          phone: '',
          email: '',
          company: '',
          website: '',
          message: ''
        },
        checkInfo: {            // 是否校验成功
          name: false,
          job: false,
          phone: false,
          email: false,
          company: false,
          message: false
        },
        checkMsg: {             // 校验错误信息
          name: '姓名不能为空',
          job: '职位不能为空',
          phone: '电话号码不能为空',
          email: '电子邮箱不能为空',
          company: '公司不能为空',
          message: '留言信息不能为空'
        }
      }
    },

    methods: {
      // 测试是否为空
      testspace (value) {
        return !(value.length === 0)
      },
      // 校验手机号码
      testphone (value) {
        let format = /^\d+$/
        return format.test(value)
      },
      // 检测邮箱
      testemail (value) {
        let format = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        return format.test(value)
      },

      check () {
        for (let item in this.formInfo) {
          let value = this.formInfo[item]
          if (item === 'phone') {
            this.checkInfo.phone = this.testspace(value) ? this.testphone(value) : this.testspace(value)
            if (!this.testspace(value)) {
              this.checkMsg.phone = '电话号码不能为空'
            } else if (!this.testphone(value)) {
              this.checkMsg.phone = '电话号码必须为数字'
            }
          } else if (item === 'email') {
            this.checkInfo.email = this.testspace(value) ? this.testemail(value) : this.testspace(value)
            if (!this.testspace(value)) {
              this.checkMsg.email = '电子邮箱不能为空'
            } else if (!this.testemail(value)) {
              this.checkMsg.email = '邮箱格式不正确'
            }
          } else if (item === 'name' || item === 'job' || item === 'company' || item === 'message') {
            this.checkInfo[item] = this.testspace(value)
          }
        }
        this.haschecked = true
      }
    }
  }
</script>

<style lang="scss">
  @import "../css/common";

  .contactus-wrap {
    @include box-wrap;
    background-color: white;
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

  .form-wrap {
    @include box-wrap;
    background-color: white;
    margin-top: 10px;
    .part-wrap {
      @include part-title;
    }
    form {
      margin: 20px 20px 20px 30px;
      overflow: hidden;
      label {
        display: block;
        margin-bottom: 20px;
        line-height: 30px;
        font-size: 12px;
        position: relative;
        span {
          color: red;
        }
        input,textarea {
          float: right;
          width: 250px;
          border: 1px solid $theme-gray-color;
          height: 30px;
          border-radius: 4px;
          padding-left: 10px;
        }
        textarea {
          height: 100px;
        }
        .wrongMsg {
          position: absolute;
          left: 80px;
          bottom: -24px;
        }
      }
      .textarea:after {
        content: '';
        height: 0;
        display: block;
        clear: both;
        visibility: hidden;
      }
      button {
        display: block;
        width: 250px;
        float: right;
        background-color: $theme-font-color;
        color: white;
        height: 30px;
        border-radius: 15px;
        border: 0;
      }
    }
  }
</style>
