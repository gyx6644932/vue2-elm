// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/router'
import {routerMode} from './config/env'
import './config/rem'
import store from './vuex/store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题
Vue.use(MuseUI)

// 懒加载模块,由于暂时没有几张图，主要为后续使用做准备，使用方法见https://github.com/hilongjw/vue-lazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/images/lazy.jpg',
  loading: 'static/images/lazy.jpg',
  attempt: 1,
  listenEvents: ['scroll']
})

// 在vue原型中添加$http方法等于axios
Vue.prototype.$http = axios
// 设置默认打开的页面

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
        return { x: 0, y: to.meta.savedPosition ||0}
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  // 注入路由
  router,
  // 注入vuex的store
  store,
  components: { App },
  // 组件创建前，进行异步数据数据请求
  beforeCreate() {
    this.$store.dispatch('getAllData', this)
  }
})
