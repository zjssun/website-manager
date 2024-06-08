<template>
   <div>
      <el-page-header content="编辑新闻" @back="handback()" icon="" title="新闻管理"/>
      <el-form
         ref="NewsFormRef"
         :model="NewsForm"
         :rules="NewsFormRules"
         label-width="80px"
         class="demo-ruleForm"
         status-icon>

         <!-- 新闻标题 -->
         <el-form-item label="标题" prop="title">
            <el-input v-model="NewsForm.title"/>
         </el-form-item>

         <!-- 新闻内容 -->
         <el-form-item label="内容" prop="content">
            <editor @event="handleEditorChange" :content="NewsForm.content" v-if="NewsForm.content"/>
         </el-form-item>

         <!-- 新闻分类 -->
         <el-form-item label="分类" prop="category">
            <el-select
               v-model="NewsForm.category"
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

         <!-- 新闻封面图 -->
         <el-form-item label="封面" prop="cover">
            <Upload :avatar="NewsForm.cover" @uploadChange="handleCoverChange"></Upload>
         </el-form-item>
      </el-form>

      <!-- 按钮 -->
      <el-form-item>
         <el-button type="primary" @click="subitForm">更新新闻</el-button>
      </el-form-item>
   </div>
</template>
<script setup>
import Upload from "@/components/upload/Upload"
import upload from '@/util/upload'
import editor from "@/components/editor/Editor";
import { ref, reactive, onMounted } from 'vue';
import {useRouter,useRoute} from 'vue-router'
import axios from "axios";

const router = useRouter();
const route = useRoute();

//表单Ref
const NewsFormRef = ref();
const NewsForm = reactive({
   title: "",
   content: "",
   category: 1, //1.最新动态 2.典型案例 3.通知公告
   cover:"",
   file:null,
   isPublish:0, //0.未发布 1.已发布
});

const NewsFormRules = reactive({
   title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ], 
  category: [
    { required: true, message: '请选择分类', trigger: 'blur' },
  ], 
  cover: [
    { required: true, message: '请上传封面图', trigger: 'blur' },
  ], 
  content: [
    { required: true, message: '请填写新闻', trigger: 'blur' },
  ], 
});

const options = [
   {
      "value": 0,
      "label": "最新动态"
   },
   {
      "value": 1,
      "label": "典型案例"
   },
   {
      "value": 2,
      "label": "通知公告"
   },
];

onMounted(async ()=>{
   const res = await axios.get(`http://localhost:3000/adminapi/news/list/${route.params.id}`);
   Object.assign(NewsForm,res.data.data[0]);
});

//每次editor内容改变时触发
const handleEditorChange = (data)=>{
   NewsForm.content = data;
}

const handleCoverChange = (file)=>{
   NewsForm.cover = URL.createObjectURL(file);
   NewsForm.file = file;
}

//提交表单
const subitForm = () => {
   NewsFormRef.value.validate(async (valid) => {
      if(valid){
         await upload("http://localhost:3000/adminapi/list",NewsForm);
         router.back();
      }
   });
}

const handback = ()=>{
   router.back();
}
</script>
<style lang="less" scope>

</style>