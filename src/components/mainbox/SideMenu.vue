<template>
   <el-aside :width="$store.state.isCollapse ? '64px':'200px'">
      <el-menu :collapse="$store.state.isCollapse" :router="true" :default-active="route.fullPath">
         <el-menu-item index="/index">
            <el-icon><i class="fa-solid fa-house"></i></el-icon>
            <span>首页</span>
         </el-menu-item>

         <el-menu-item index="/center">
            <el-icon><i class="fa-solid fa-user"></i></el-icon>
            <span>用户中心</span>
         </el-menu-item>

         <el-sub-menu index="/user-manage">
            <template #title>
              <el-icon><i class="fa-solid fa-users"></i></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user-manage/add">添加用户</el-menu-item>
            <el-menu-item index="/user-manage/list">用户列表</el-menu-item>
         </el-sub-menu>

         <el-sub-menu index="/news-manage">
            <template #title>
              <el-icon><i class="fa-solid fa-newspaper"></i></el-icon>
              <span>新闻管理</span>
            </template>
            <el-menu-item index="/news-manage/add">添加新闻</el-menu-item>
            <el-menu-item index="/news-manage/list">新闻列表</el-menu-item>
         </el-sub-menu>

         <el-sub-menu index="/product">
            <template #title>
              <el-icon><i class="fa-solid fa-store"></i></el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item index="/product/add">添加产品</el-menu-item>
            <el-menu-item index="/product/list">产品列表</el-menu-item>
         </el-sub-menu>
      </el-menu>
   </el-aside>
</template>
<script setup>
import {useRoute} from 'vue-router'

const route = useRoute();
</script>
<style lang="less" scope>
.el-aside{
   height:100vh;
   .el-menu{
      height: 100%;
   }
}
</style>