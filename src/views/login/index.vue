<template>
  <div class="login-container">
    <!--
    el-from 表单组件，每个表单项都必须使用 el-from-item 组件包裹
    -->
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
    <el-form class="login-form" ref="form" :model="user" @keyup.enter.native="onLogin" >
      <el-form-item >
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item >
        <el-input
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item >
        <el-checkbox v-model="check">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="loginLoading"
          @click="onLogin"
        >登录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request'
  export default {
    name: 'Login',
    components: {},
    props: {},
    data () {
      return {
        user: {
          mobile: '',
          code: ''
        },
        check: false, // 是否同意协议的选中状态
        loginLoading: false // 开启加载状态

      }
    },
    computed: {},
    watch: {},
    created () {
    },
    mounted () {

    },
    methods: {
      onLogin () {
        // 获取表单数据（根据接口要求绑定数据）
        const user = this.user
        console.log(user, 'user')
        this.loginLoading = true
        request({
          method: 'POST',
          url: '/mp/v1_0/authorizations',
          data: user
        }).then(res => {
           console.log(res, 'res')
          this.loginLoading = false
        this.$message.success('登录成功:)')
        }).catch(err => {
          this.loginLoading = false
          console.log('错误信息是!', err)
          this.$message.error('登录失败:(')
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("./login_bg.jpg") no-repeat;
    background-size: cover;
    .login-form-wrap {
      min-width: 300px;
      padding: 30px 50px 10px;
      background-color: #fff;
      .login-head {
        display: flex;
        justify-content: center;
        .logo {
          width: 200px;
          height: 57px;
          background: url("./logo_index.png") no-repeat;
          background-size: contain;
        }
      }
      .login-form {
        .login-btn {
          width: 100%;
        }
      }
    }
  }
</style>
