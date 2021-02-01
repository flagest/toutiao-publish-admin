<template>
    <div class="article-container">
      <!--上方卡片-->
      <el-card class="filter-card">
        <div slot="header" class="clearfix">
          <!--面包屑导航路径-->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">内容管理</a></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!--数据筛选表单-->
        <el-form ref="form" :model="form" label-width="40px" size="small">
          <el-form-item label="状态">
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio label="0">草稿</el-radio>
              <el-radio label="1">待审核</el-radio>
              <el-radio label="2">审核通过</el-radio>
              <el-radio label="3">审核失败</el-radio>
              <el-radio label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="channelId" clearable placeholder="请选择频道">
              <el-option
                v-for="(channle,index) in channels"
                :key="index"
                :label="channle.name"
                :value="channle.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="rangeDate"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="loading"
              @click="loadArticles(1)"
            >查询</el-button>
          </el-form-item>
        </el-form >
      </el-card>

      <!--下方卡片-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>更据筛选条件查询到 {{totalCount}} 条结果：</span>
        </div>
        <!--数据列表-->
        <!--
        prop 用来设定渲染列表项数据
        label 展示列标题
        -->
        <el-table
          stripe
          size="small"
          :data="tableData"
          style="width: 100%"
          class="list-table"
          v-loading="loading"
        >
          <el-table-column
            label="封面"
          >
            <template slot-scope="scope">
              <el-image
                fit="cover"
                v-if="scope.row.cover.images[0]"
                style="width: 100px; height: 100px"
                :src="scope.row.cover.images[0]"
                :preview-src-list="scope.row.cover.images">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <el-image
                v-else
                fit="cover"
                style="width: 100px; height: 100px"
                src="./no-cover.gif"
                :preview-src-list="scope.row.cover.images">
              </el-image>
<!--              <img
                v-if="scope.row.cover.images[0]"
                class="img-size"
                :src="scope.row.cover.images[0]"/>
              <img
                v-else
                class="img-size"
                src="./no-cover.gif"/>-->
              <!--
              下面这种情况是在运行期间动态改变处理的。而本地图片必须在打包的时候就要存在
              -->
 <!--             <img
                class="img-size"
                :src="scope.row.cover.images[0] || 'src=./no-cover.gif'"
                />-->
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <!--如果需要在自定义列模板获取当前遍历项数据，那么就在template上声明-->
            <template slot-scope="scope">
     <!--         <el-tag :type="articleStatus[scope.row.status].type">
                {{ articleStatus[scope.row.status].text }}</el-tag>-->
              <el-tag v-if="scope.row.status===0" type="warning">草稿</el-tag>
              <el-tag v-if="scope.row.status===1">待审核</el-tag>
              <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
              <el-tag v-if="scope.row.status===3" type="danger">审核失败</el-tag>
              <el-tag v-if="scope.row.status===4" type="info">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                circle
                icon="el-icon-edit"
                type="primary"
                @click="$router.push('/publish?id='+scope.row.id.toString())"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                circle
                icon="el-icon-delete"
                @click="handleDelete(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页插件-->
        <el-pagination
          background
          :total= totalCount
          :page-size= pageSize
          class="page"
          layout="prev, pager, next"
          :disabled="loading"
          :current-page.sync="page"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
  import { getArticles, getChannels, deleteArticle } from '@/api/article'
    export default {
        name: 'ArticleIndex',
        components: {},
        props: {},
        data () {
            return {
              form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                value1: ''
              },
              tableData: [{
                id: '',
                title: '',
                status: '',
                pubdate: '',
                cover: {
                  type: '',
                  images: []
                }
              }],
          /*   articleStatus: [
                { status: 0, text: '草稿', type: 'info' },
                { status: 1, text: '待审核', type: '' },
                { status: 2, text: '审核通过', type: 'success' },
                { status: 3, text: '审核失败', type: 'warning' },
                { status: 4, text: '删除', type: 'danger' }
              ], */
              totalCount: 0,
              pageSize: 10,
              status: null, // 默认是null
              channels: [
                {
                  id: '',
                  name: ''
                }
              ],
              channelId: null, // 频道id
              rangeDate: [], // 开始日期，结束日期数组
              loading: true, // 页面展示交互
              page: 1
            }
        },
        computed: {},
        watch: {},
        created () {
          this.loadArticles(1)
        },
        mounted () {
          this.loadChannels()
        },
        methods: {
          loadArticles (page = 1) {
            getArticles({
              page,
              per_page: this.pageSize,
              status: this.status,
              channel_id: this.channelId,
              begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
              end_pubdate: this.rangeDate ? this.rangeDate[1] : null
            }).then(res => {
              const { results, total_count: totalCount } = res.data.data
              this.tableData = results
              this.totalCount = totalCount
              this.loading = false // 关闭加载中的loading
            })
          },
          loadChannels () {
            getChannels().then(res => {
             this.channels = res.data.data.channels
            })
          },
          handleCurrentChange (page) {
            this.loadArticles(page)
          },
          handleEdit (index, row) {
            console.log(index, row)
          },
          handleDelete (articleId) {
            this.$confirm('确定要删除嘛？', '删除提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              deleteArticle(articleId.toString()).then(res => {
                console.log(articleId.toString())
                this.loadArticles(this.page)
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
        }
    }
</script>

<style scoped lang="less">
  .filter-card {
    margin-bottom: 30px;
  }
  .list-table {
    margin-bottom: 30px;
  }
  .page {
   margin-left: 64%;
  }
  .img-size {
    width: 50px;
    height: 50px;
    background-size: cover;
  }

</style>
