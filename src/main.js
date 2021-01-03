import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false // 关闭生产环境提示

// 创建view根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
