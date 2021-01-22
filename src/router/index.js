import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'

Vue.use(VueRouter)
//  配置路由表
const routes = [
  {
    path: '/login',
    name: Login,
    component: Login
  },
  {
    path: '/',
    // 如果有默认子路由，就不要给父路由起名字
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path为空会默认为子路由
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

 // 路由守卫，所有的路由导航都会经过这里
 // 守卫页面导航
 // to: 要去的路由页面
 // from： 来自哪里的路由页面
 // next: 放行方法
router.beforeEach((to, from, next) => {
  console.log('加载路由了')
  const user = JSON.stringify(window.localStorage.getItem('user'))
     if (to.path !== '/login') {
       if (user) {
         next()
       } else {
         // 没有登录跳转到登录页面
         next('/login')
       }
     } else {
        next()
     }
      // 路由放行
      next()
})
export default router
