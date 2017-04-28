// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import App from './App'
import router from './router/router.js'
import store from './vuex/store.js'
import ls from '../assets/js/store.min.js'
// in ES6 modules
// require('vue-swipe/dist/vue-swipe.css');
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueValidator)
Vue.use(MintUI)
//使用饿了么组件
// Vue.component(Swipe.name, Swipe);

//store例子
ls.set('foo', 1)
console.log(ls.get('foo'))
store.state.cu=ls.get('cu')
if (!store.state.cu){
  store.state.cu = false
}
Vue.http.options.root = process.env.NODE_ENV === 'development' ? 'localhost:8081' : ''
Vue.http.options.emulateJSON = true
Vue.http.options.timeout = 10000
Vue.http.interceptors.push(function (request, next) {
  next(function (response) {
    switch (response.status) {
      case 0:
      case 504:
        response.body = "连接服务器超时";
        break;
      case 404:
        response.body = "找不到服务器";
        break;
      case 500:
        response.body = "服务器内部错误"
        break;
    }
  });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  methods: {
    hello: function () {
      alert("hello vue!")
    }
  }
})
