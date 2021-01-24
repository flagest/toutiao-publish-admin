import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式
import './style/index.less'
// 加载bigint
/*
import JsonBigInt from 'json-bigint'
const str = '{"id":1352872864734248960}'
const strBigInt = JsonBigInt.parse(str).id.toString()
console.log(strBigInt, 'strBigInt')
*/

// 全局注册Element-ui组件
Vue.use(ElementUI)
// 关闭生产环境提示
Vue.config.productionTip = false

// 创建view根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
