<template>
   <div>
      <el-page-header content="添加用户" icon="" title="用户管理"/>

      <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="userFormRules"
      label-width="80px"
      class="demo-ruleForm"
      status-icon>
         <!-- 用户名 -->
         <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username"/>
         </el-form-item>
         <!-- 密码 -->
         <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password"/>
         </el-form-item>
         <!-- 性别 -->
         <el-form-item label="角色" prop="role">
            <el-select
               v-model="userForm.role"
               class="m-2"
               placeholder="Select"
               style="width: 100%">
               <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
            </el-select>
         </el-form-item>
          <!-- 个人简介 -->
          <el-form-item label="个人简介" prop="introduction">
            <el-input type="textarea" v-model="userForm.introduction" />
         </el-form-item>
          <!-- 头像 -->
          <el-form-item label="头像" prop="avatar">
            <Upload :avatar="userForm.avatar" @uploadChange="handleChange"></Upload>
         </el-form-item>
         <!-- 按钮 -->
         <el-form-item>
            <el-button type="primary" @click="subitForm">
               提交
            </el-button>
         </el-form-item>
      </el-form>
   </div>
</template>
<script setup>
import { ref,reactive } from 'vue';
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'

import { useRouter } from "vue-router"

const router = useRouter();

//表单Ref
const userFormRef = ref();
const userForm = reactive({
   username:"",
   password:"",
   gender:0,
   role:2,//1 管理员，2编辑
   introduction:"",
   avatar:"",
   file:null,
});

const userFormRules = reactive({
   username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ], 
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入介绍', trigger: 'blur' },
  ],
  avatar: [
    { required: true, message: '请输上传头像', trigger: 'blur' },
  ],
})

const options = [
   {
      "value": 1,
      "label": "管理员"
   },
   {
      "value": 2,
      "label": "编辑"
   },
];

//选择完图片后回调
const handleChange = (file)=>{
   userForm.avatar = URL.createObjectURL(file);
   userForm.file = file;
}

const subitForm = ()=>{
   userFormRef.value.validate(async (valid)=>{
      if(valid){
         await upload("http://localhost:3000/adminapi/user/add",userForm);
         router.push(`/user-manage/list`);
      }
   })
}
</script>
<style lang="less" scoped>
.demo-ruleForm{
   margin-top: 50px;
}
</style>