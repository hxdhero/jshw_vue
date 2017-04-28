import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)
// 创建一个对象来保存应用启动时的初始状态
const state = {
  // TODO: 放置初始状态
  count: 1,
  name:"",
  lines:[{name:"第一条线路"},{name:"第二条线路"}],
  cu:false,
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  setUser(state,user){
    state.cu=user
  },
  setName(state,name){
    state.name=name
  },
  increment (state) {
    state.count++
  },
  del(state){
    state.count--
  },
  doLine(state){
    state.lines=[{},{},{},{}]
  }
}

//相当于预处理格式化
const getters = {
  loginUser:function (state) {
    return state.cu
  },
  countValue: function (state) {
    return state.count
  }
}

const actions = {
  increment: function (o) {
    o.commit('increment')
  },
  del: function (o) {
    o.commit('del')
  }
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})