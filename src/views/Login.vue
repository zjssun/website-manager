<template>
   <div class="body">
      <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="option"/>
      <div class="wrapper">
         <form action="#">
            <h2>Login</h2>
               <div class="input-field">
               <input type="text" v-model="loginForm.username" required>
               <label>请输入账户</label>
            </div>
            <div class="input-field">
               <input type="password" v-mode="loginForm.password" required>
               <label>请输入密码</label>
            </div>
            <button @click="LoginHandle">登录</button>
         </form>
      </div>
   </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import { loadSlim } from "tsparticles-slim";
import { useRoute } from 'vue-router';


const particlesInit = async engine => {
    //await loadFull(engine);
    await loadSlim(engine);
};

const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};
//登录数据
const loginForm = reactive({
   username:"",
   password:""
});
//路由
const router = useRoute();
//登录事件
const LoginHandle = ()=>{
   if(loginForm.password || loginForm.username){
      localStorage.setItem("token","123");
      router.push("/index");
   }else{
      console.log("请输入用户名和密码");
   }
}
const option = {
   background: {
      color: {
            value: '#2d3a4b'
      }
   },
   fpsLimit: 120,
   interactivity: {
      events: {
            onClick: {
               enable: true,
               mode: 'push'
            },
            onHover: {
               enable: true,
               mode: 'repulse'
            },
            resize: true
      },
      modes: {
            bubble: {
               distance: 400,
               duration: 2,
               opacity: 0.8,
               size: 40
            },
            push: {
               quantity: 4
            },
            repulse: {
               distance: 200,
               duration: 0.4
            }
      }
   },
   particles: {
      color: {
            value: '#ffffff'
      },
      links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
      },
      move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 6,
            straight: false
      },
      number: {
            density: {
               enable: true,
               area: 800
            },
            value: 80
      },
      opacity: {
            value: 0.5
      },
      shape: {
            type: 'circle'
      },
      size: {
            random: true,
            value: 5
      }
   },
   detectRetina: true
}

</script>
<style lang="less" scoped>
.body{
   width: 100%;
   height: 100vh;
}
.wrapper {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 400px;
   border-radius: 8px;
   padding: 30px;
   text-align: center;
   border: 1px solid rgba(255, 255, 255, 0.5);
   backdrop-filter: blur(9px);
   -webkit-backdrop-filter: blur(9px);
 }
 form {
   display: flex;
   flex-direction: column;
 }
 h2 {
   font-size: 2rem;
   margin-bottom: 20px;
   color: #fff;
 }
 .input-field {
   position: relative;
   border-bottom: 2px solid #ccc;
   margin: 15px 0;
 }
 .input-field label {
   position: absolute;
   top: 50%;
   left: 0;
   transform: translateY(-50%);
   color: #fff;
   font-size: 16px;
   pointer-events: none;
   transition: 0.15s ease;
 }
 .input-field input {
   width: 100%;
   height: 40px;
   background: transparent;
   border: none;
   outline: none;
   font-size: 16px;
   color: #fff;
 }
 .input-field input:focus~label,
 .input-field input:valid~label {
   font-size: 0.8rem;
   top: 10px;
   transform: translateY(-120%);
 }
 button {
   margin-top: 50px;
   background: #fff;
   color: #000;
   font-weight: 600;
   border: none;
   padding: 12px 20px;
   cursor: pointer;
   border-radius: 3px;
   font-size: 16px;
   border: 2px solid transparent;
   transition: 0.3s ease;
 }
 button:hover {
   color: #fff;
   border-color: #fff;
   background: rgba(255, 255, 255, 0.15);
 }
</style>