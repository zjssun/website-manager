<template>
   <div>
      <el-page-header content="编辑产品" icon="" title="产品管理" @back="handleBack()"/>
      <el-form
      ref="ProductFormRef"
      :model="ProductForm"
      :rules="ProductFormRules"
      label-width="80px"
      class="demo-ruleForm"
      status-icon>
         <!-- 标题 -->
         <el-form-item label="标题" prop="title">
            <el-input v-model="ProductForm.title"/>
         </el-form-item>
         <!-- 介绍 -->
         <el-form-item label="介绍" prop="introduction">
            <el-input type="textarea" v-model="ProductForm.introduction"/>
         </el-form-item>
          <!-- 个人简介 -->
          <el-form-item label="详细" prop="detail">
            <el-input type="textarea" v-model="ProductForm.detail" />
         </el-form-item>
          <!-- 图片 -->
          <el-form-item label="图片" prop="cover">
            <Upload :avatar="ProductForm.cover" @uploadChange="handleChange"></Upload>
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
import { ref,reactive,onMounted } from 'vue';
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'
import axios from 'axios';

import { useRouter,useRoute } from "vue-router"

const router = useRouter();
const route = useRoute();

//表单Ref
const ProductFormRef = ref();
const ProductForm = reactive({
   title:"",
   introduction:"",
   detail:"",
   cover:"",
   file:null,
});

const ProductFormRules = reactive({
   title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ], 
  introduction: [
    { required: true, message: '请填写介绍', trigger: 'blur' },
  ],
  detail: [
    { required: true, message: '请填写详情', trigger: 'blur' },
  ],
  cover: [
    { required: true, message: '请输上传头像', trigger: 'blur' },
  ],
});

onMounted(()=>{
   getData();
});

const getData = async ()=>{
   const res = await axios.get(`http://localhost:3000/adminapi/product/list/${route.params.id}`);
   Object.assign(ProductForm,res.data.data[0]);
}

//选择完图片后回调
const handleChange = (file)=>{
   ProductForm.cover = URL.createObjectURL(file);
   ProductForm.file = file;
}

const subitForm = ()=>{
   ProductFormRef.value.validate(async (valid)=>{
      if(valid){
         await upload("http://localhost:3000/adminapi/product/list",ProductForm);
         router.push(`/product/list`);
      }
   })
}

const handleBack = ()=>{
   router.back();
}
</script>
<style lang="less" scoped>
.demo-ruleForm{
   margin-top: 50px;
}
</style>