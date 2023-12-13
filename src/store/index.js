import { createStore } from 'vuex'

export default createStore({
  state: {
    isGetterRouters: false,
  },
  getters: {
  },
  mutations: {
    changeGetterRouters(state,value){
      state.isGetterRouters = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
