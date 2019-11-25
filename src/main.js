// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import './permission' //路由拦截

Vue.config.productionTip = false
Vue.prototype.url='http://47.96.117.121:5003';
// Vue.prototype.$http = axios;
// axios.defaults.baseURL = 'http://47.96.117.121:5003/api/'

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
