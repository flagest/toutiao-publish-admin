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
            <el-radio-group v-model="form.resource">
              <el-radio label="全部"></el-radio>
              <el-radio label="草稿"></el-radio>
              <el-radio label="待审核"></el-radio>
              <el-radio label="审核通过"></el-radio>
              <el-radio label="审核失败"></el-radio>
              <el-radio label="已删除"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="form.region" placeholder="请选择频道">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="form.value1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form >
      </el-card>

      <!--下方卡片-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>更据筛选条件查询到 46147 条结果：</span>
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
        >
          <el-table-column
            prop="cover.images"
            label="封面"
          >
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
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                circle
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页插件-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          class="page"
        >
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
  import { getArticles } from '@/api/article'
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
              }]
            }
        },
        computed: {},
        watch: {},
        created () {
          this.loadArticles()
        },
        mounted () {
        },
        methods: {
          onSubmit () {
            console.log('submit!')
          },
          loadArticles () {
            getArticles().then(res => {
             this.tableData = res.data.data.results
              console.log(this.article)
              console.log(res)
            })
          },
          handleEdit (index, row) {
            console.log(index, row)
          },
          handleDelete (index, row) {
            console.log(index, row)
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

</style>
