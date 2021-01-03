import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式
import './style/index.less'

// 全局注册Element-ui组件
Vue.use(ElementUI)
// 关闭生产环境提示
Vue.config.productionTip = false

// 创建view根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
