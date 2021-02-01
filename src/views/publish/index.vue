<template>
    <div class="publish-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$.route.query.id ? '发布文章': '修改文章'}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div  class="text item">
          <el-form ref="article" :model="article" label-width="50px">
            <el-form-item label="标题">
              <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input type="textarea" v-model="article.content"></el-input>
            </el-form-item>
            <el-form-item label="封面">
              <el-radio-group v-model="article.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
              <el-select v-model="article.channel_id" clearable  placeholder="请选择频道">
                <el-option
                  :label="channel.name"
                  :value="channel.id"
                  v-for="(channel,index) in channels"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onPublish(false)">保存</el-button>
              <el-button @click="onPublish(true)">存入草稿</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
</template>

<script>
  import { getChannels, addArticle, getArticle, updateArticle } from '@/api/article'
    export default {
        name: 'PublishIndex',
        components: {},
        props: {},
        data () {
          return {
            article: {
              title: '',
              cover: {
                type: 0, // 封面类型-1自动，0-无图，1-1张，3-3张
                images: [] // 封面图片绑定
              },
              content: '',
              channel_id: null // 频道
            },
            channels: [
              {
                id: '',
                name: ''
              }
            ]
          }
        },
        computed: {},
        watch: {},
        created () {
          this.loadChannels()
          if (this.$route.query.id) {
             this.loadArticle()
          }
        },
        mounted () {
        },
        methods: {
          loadArticle () {
            getArticle(this.$route.query.id).then(res => { // 获取单个文章
              this.article = res.data.data
            })
          },
          loadChannels () {
            getChannels().then(res => {
              this.channels = res.data.data.channels
              console.log(this.channels, 'this.article.channels')
            })
          },
          onPublish (draft = false) {
            const article = this$.route.query.id
            if (article) {
             updateArticle(article, this.article, draft).then(res => {
               console.log(res)
               this.$message.success(`${draft ? '存入草稿' : '发布'}修改成功`)
             })
              // 跳转到发布页面
              this.$router.push('/article')
            } else {
              console.log(this.article, 'this.article')
              addArticle(this.article, draft).then(res => {
                console.log('submit!')
                this.$message.success(`${draft ? '存入草稿' : '发布'}成功`)
              })
              // 跳转到发布页面
              this.$router.push('/article')
            }
          }
        }
    }
</script>

<style scoped lang="less">
</style>
