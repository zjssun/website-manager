<template>
   <el-header>
      <div class="left">
         <el-icon @click="handleCollapse"><i class="fa-solid fa-building-columns"></i></el-icon>
         <span style="margin-left:10px;">企业门户管理系统</span>
      </div>
      <div class="right">
         <span>欢迎admin回来,</span>
         <el-dropdown>
              <el-icon  class="el-icon--right">
                  <i class="fa-solid fa-chevron-down"></i>
              </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                <el-dropdown-item @click="handleExit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
      </div>
   </el-header>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore();
const router = useRouter();
//折叠展开
const handleCollapse = ()=>{
   store.commit("changeCollapse");
}
//跳转到个人中心
const handleCenter = ()=>{
   router.push("/center");
}
//退出登录
const handleExit = ()=>{
   localStorage.removeItem('token');
   router.push("/login");
}

</script>
<style lang="less" scoped>
.el-header{
   background-color: #2d3a4b;
   width: 100%;
   color: white;
   height: 60px;
   line-height: 60px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   .left,.right{
      display: flex;
   }
   .left{
      i{
         margin: auto;
      }
   }
   .right{
      .el-dropdown{
         color: white;
         margin: auto;
      }
   }
}
</style>
