<template>
  <div class="login-container">
    <!--
    el-from 表单组件，每个表单项都必须使用 el-from-item 组件包裹
    2 给需要验证的表单项，el-from-item 绑定 prop属性，
    注意：prop属性需要指定表单对象中的数据名称
    3 通过el-from组件的rules属性配置为验证规则
    手动触发表单验证
    1，给 el-from 设置ref这个名字
    -->
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form"
               ref="login-form"
               :model="user"
               :rules="formRules"
               @keyup.enter.native="onLogin">
        <el-form-item prop="mobile">
          <el-input
            v-model="user.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="user.code"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            :loading="loginLoading"
            @click="onLogin"
          >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { login } from '@/api/user'
  export default {
    name: 'Login',
    components: {},
    props: {},
    data () {
      return {
        user: {
          mobile: '13911111111',
          code: '246810',
          agree: false // 是否同意协议的选中状态
        },
        loginLoading: false, // 开启加载状态
        formRules: { // 表单验证规则配置
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { pattern: /^1[3|4|5|7|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '验证码不能为空', trigger: 'change' },
            { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'change' }
          ],
          agree: [
            {
              // 自定义校验规则
              // 校验通过callback
              // 校验失败 callback（new Error('错误消息提示')）
              validator: (rule, value, callback) => {
                if (value) {
                  // 验证通过
                  callback()
                }
                // 验证失败
                callback(new Error('请勾选用户协议'))
              },
              trigger: 'change'
            }
          ]
        }
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
        // 表单验证是异步
        this.$refs['login-form'].validate((valid, err) => {
          if (!valid) {
            return
          }
          // 表单验证通过
          this.login()
        })
      },
      login () {
        // 获取表单数据（根据接口要求绑定数据）
        const user = this.user
        this.loginLoading = true
        login(user).then(res => {
          this.$message.success('登录成功:)')
          this.loginLoading = false
          // 将接口返回的用户相关数据存储到本地，方便以后使用
          // 本地只能储存字符串
          window.localStorage.setItem('user', JSON.stringify(res.data.data))
          // 登录成功后路由跳转到首页
          this.$router.push({
            name: 'home'
          })
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
