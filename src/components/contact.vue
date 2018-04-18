<template>
    <div>
      <div class="contactus-wrap">
        <p class="part-wrap"><span class="title">联系我们</span><span class="title-en">CONTACT US</span></p>
        <p><span class="iconfont icon-telphone"></span>咨询电话： {{companyInfo.phone}}</p>
        <p><span class="iconfont icon-fax"></span>传真： {{companyInfo.fax}}</p>
        <p><span class="iconfont icon-address"></span>地址： {{companyInfo.address}}</p>
        <p><span class="iconfont icon-email"></span>邮箱： {{companyInfo.email}}</p>
      </div>

      <div class="form-wrap">
        <p class="part-wrap"><span class="title">邮件联系</span><span class="title-en">EMAIL</span></p>
        <form>
          <label>姓名 <span>*</span><input type="text" v-model="formInfo.name"><span class="wrongMsg" v-show="!this.checkInfo.name && this.haschecked">{{ checkMsg.name }}</span></label>
          <label>职位 <span>*</span><input type="text" v-model="formInfo.position"><span class="wrongMsg" v-show="!this.checkInfo.position && this.haschecked">{{ checkMsg.position }}</span></label>
          <label>电话号码 <span>*</span><input type="text" v-model="formInfo.phone"><span class="wrongMsg" v-show="!this.checkInfo.phone && this.haschecked">{{ checkMsg.phone }}</span></label>
          <label>电子邮箱 <span>*</span><input type="text" v-model="formInfo.email"><span class="wrongMsg" v-show="!this.checkInfo.email && this.haschecked">{{ checkMsg.email }}</span></label>
          <label>公司 <span>*</span><input type="text" v-model="formInfo.company"><span class="wrongMsg" v-show="!this.checkInfo.company && this.haschecked">{{ checkMsg.company }}</span></label>
          <label>网站 <span></span><input type="text" v-model="formInfo.website"></label>
          <label class="textarea">留言信息 <span>*</span><textarea v-model="formInfo.content"></textarea><span class="wrongMsg" v-show="!this.checkInfo.content && this.haschecked">{{ checkMsg.content }}</span></label>
          <span class="btn-submit" @click="check">提交</span>
        </form>
      </div>
    </div>
</template>

<script>
  import http from '../common/http'
  import api from '../common/api'

  export default {
    data () {
      return {
        haschecked: false,      // 是否进行过校验
        checkSuccess: false,    // 信息是否全部填写正确
        companyInfo: '',        // 公司信息
        formInfo: {             // 表单信息
          name: '',
          position: '',
          phone: '',
          email: '',
          company: '',
          website: '',
          content: ''
        },
        checkInfo: {            // 是否校验成功
          name: false,
          position: false,
          phone: false,
          email: false,
          company: false,
          content: false
        },
        checkMsg: {             // 校验错误信息
          name: '姓名不能为空',
          position: '职位不能为空',
          phone: '电话号码不能为空',
          email: '电子邮箱不能为空',
          company: '公司不能为空',
          content: '留言信息不能为空'
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
          } else if (item === 'name' || item === 'position' || item === 'company' || item === 'content') {
            this.checkInfo[item] = this.testspace(value)
          }
        }
        this.haschecked = true
        if (this.checkInfo.name && this.checkInfo.position && this.checkInfo.phone && this.checkInfo.email && this.checkInfo.company && this.checkInfo.content) {
          http.post(api.message, this.formInfo).then(res => {
            if (res.errcode === 0) {
              alert('提交成功')
              this.formInfo = {             // 提交成功之后清空表单
                name: '',
                position: '',
                phone: '',
                email: '',
                company: '',
                website: '',
                content: ''
              }
            }
          })
        }
      }
    },

    mounted () {
      http.get(api.contact).then(res => {
        this.companyInfo = res.data
      })
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
      .btn-submit {
        display: block;
        width: 250px;
        float: right;
        background-color: $theme-font-color;
        color: white;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        font-size: 18px;
        border: 0;
        text-align: center;
      }
    }
  }
</style>
