import { createApp } from 'vue'
import App from './App.vue'
import Particles from "vue3-particles";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'



createApp(App).use(Particles)
.use(ElementPlus)
.use(store)
.use(router)
.mount('#app')
