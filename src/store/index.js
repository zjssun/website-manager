import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    isGetterRouters: false,
    isCollapse:false,
  },
  getters: {
  },
  mutations: {
    //判断路由是否初始化
    changeGetterRouters(state,value){
      state.isGetterRouters = value;
    },
    //控制侧边栏展开
    changeCollapse(state){
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths:["isCollapse"]
  })],
})
