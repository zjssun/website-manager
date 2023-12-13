import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/index'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'
import RoutesConfig from './config'


const routes = [
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/mainbox',
    name:'mainbox',
    component:MainBox
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.name==='login'){
    next();
  }else{
    if(localStorage.getItem("token")){
      next({
        path:'/login'
      });
    }else{
      if(!store.state.isGetterRouters){
        ConfigRouter();
        next({
          path:to.fullPath
        });
      }else{
        next();
      }
    }
  }
});

const ConfigRouter = ()=>{
  RoutesConfig.forEach(item=>{
    router.addRoute("mainbox",item)
  });
  store.commit('changeGetterRouters',true);
}



export default router
