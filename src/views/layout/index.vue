<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <app-aside
        class="aside-menu"
        :is-collapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <!--
          class 样式处理
          {
          css 类名：布尔值
          }
          true：作用类名
          false： 不作用类名
          -->
          <i :class="{
          'el-icon-s-fold': isCollapse,
          'el-icon-s-unfold': !isCollapse
          }"
             @click="isCollapse = !isCollapse"
          />
          <span class="shop-name">张小姐传媒股份有限公司</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo"
            alt=""/>
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <!--
              组件默认是不识别原生事件的，除非内部做了处理
              监听某个组件的原生事件监听不到的时候就用native
            -->
            <el-dropdown-item
              @click.native="onLogout"
            >退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!--子路由出口-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AppAside from './components/aside'
  import { getUserProfile } from '@/api/user'
    export default {
        name: 'LayoutIndex',
        components: { AppAside },
        props: {},
        data () {
            return {
              user: {},
              isCollapse: false // 默认是展示左边菜单栏
            }
        },
        computed: {},
        watch: {},
        created () {
          // 组件初始化，获取用户资料
          this.loadUserProfile()
        },
        mounted () {},
        methods: {
          // 除去了登录接口，其他接口都需要提交身份令牌，才能获取用户数据
          loadUserProfile () {
            getUserProfile().then(res => {
               this.user = res.data.data
            })
          },
          onLogout () {
            this.$confirm('确认退出吗？', '退出提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 把用户的登录状态清除
              window.localStorage.removeItem('user')

              // 跳转到登录页面
              this.$router.push('/login')
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消退出'
              })
            })
          }
        }
    }
</script>

<style scoped lang="less">
  .layout-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .aside {
    background-color: #d3dce6;
    .aside-menu{
      height: 100%;
    }
  }
  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .shop-name {
      margin-left: 10px;
      font-size: 18px;
    }
  }
  .main {
    background-color: #e9feef;
  }
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
</style>
