<template>
  <!--
  el-menu-item的index不能重复
  -->
  <el-menu
    class="nav-menu el-menu-vertical-demo"
    default-active="/"
    background-color="#002033"
    text-color="#fff"
    router
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <el-menu-item index="/">
        <i class="el-icon-location"></i>
        <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-menu"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image" >
      <i class="iconfont iconimage"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont iconpublish"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont iconcomment"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-setting"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <span slot="title">个人管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
    export default {
        name: 'Aside',
        components: {},
        props: ['is-collapse'],
        data () {
            return {}
        },
        computed: {},
        watch: {},
        created () {
        },
        mounted () {
        },
        methods: {}
    }
</script>

<style scoped lang="less">
  .nav-menu {
    .iconfont {
      margin-right: 10px;
      padding-left: 5px;
    }
  }
</style>
