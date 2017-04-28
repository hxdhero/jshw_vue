import Vue from 'vue'
import Router from 'vue-router'

import Test from '../views/TestForm.vue'

import NotFound from '../views/NotFound.vue'
import LineList from '../views/TourismLineList.vue'
import User from '../views/User.vue'
import About from '../views/About.vue'
import LineDetail from '../views/TourismLineDetail.vue'
import LineOrder from '../views/TourismLineOrder.vue'
import OrderDetail from '../views/OrderDetail.vue'

//引用router
Vue.use(Router)
export default  new Router({
  mode: 'history',
  routes: [
    {
      path: '/', component: LineList,
    },
    {
      path: '/user', component: User
    },
    {
      path: '/about', component: About
    },
    {
      name: 'lineDetail',
      path: '/lineDetail/:lineId/',
      component: LineDetail
    },
    {
      name: 'lineOrder',
      path: '/lineOrder/:lineId',
      component: LineOrder
    },
    {
      name: 'orderDetail',
      path: '/orderDetail/:orderId',
      component: OrderDetail
    },
    // {path: '/', component: LineOrder},
    {path: '*', component: NotFound},

  ]
})
