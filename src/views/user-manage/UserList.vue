<template>
   <div>
      <el-card>
         <template #header>
            <div class="card-header">
               <el-page-header content="添加用户" icon="" title="用户管理"/>
            </div>
         </template>
         <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180"/>
            <el-table-column label="头像" width="180" >
               <template #default="scope">
                  <div v-if="scope.row.avatar">
                     <el-avatar :size="50" :src="'http://localhost:3000'+scope.row.avatar"></el-avatar>
                  </div>
                  <div v-else>
                     <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                  </div>
               </template>
            </el-table-column>
            <el-table-column label="角色" >
               <template #default="scope">
                  <el-tag v-if="scope.row.role === 1" type="warning">管理员</el-tag>
                  <el-tag v-else type="success">编辑</el-tag>
               </template>
            </el-table-column>
            <el-table-column label="操作">
               <template #default="scope">
                  <el-button type="primary"  @click="handleEdit(scope.row)">编辑</el-button>
                  <el-popconfirm title="确定要删除吗?" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelete(scope.row)">
                     <template #reference>
                        <el-button type="danger">删除</el-button>
                     </template>
                  </el-popconfirm>
               </template>
            </el-table-column>
         </el-table>
      </el-card>
      <el-dialog
         v-model="dialogVisible"
         title="编辑用户"
         width="500"
         >
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
         </el-form>
         <template #footer>
            <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleEditSubmit">
               Confirm
            </el-button>
            </div>
         </template>
      </el-dialog>
   </div>
</template>
<script setup>
import { ref,onMounted,reactive } from 'vue';
import axios from 'axios';

const tableData = ref([]);

const dialogVisible = ref(false);

//表单Ref
const userFormRef = ref();
let userForm = ref({
   username:"",
   password:"",
   gender:0,
   role:2,//1 管理员，2编辑
   introduction:"",
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

onMounted(()=>{
   getTableData();
});

//获取用户列表数据
const getTableData = async ()=>{
   const res = await axios.get("http://localhost:3000/adminapi/user/list");
   tableData.value = res.data.data;
}

//编辑用户
const handleEdit = async data=>{
   //获取用户信息
   const res = await axios.get(`http://localhost:3000/adminapi/user/list/${data._id}`);
   userForm.value = res.data.data[0];
   dialogVisible.value = true;
   getTableData();
}
//编辑用户提交
const handleEditSubmit = async()=>{
   userFormRef.value.validate(async (valid) => {
      if(valid){
         await axios.put(`http://localhost:3000/adminapi/user/list/${userForm.value._id}`,userForm.value);
         dialogVisible.value = false;
         getTableData();
      }
   });
}
//删除用户
const handleDelete = async (data)=>{
  await axios.delete(`http://localhost:3000/adminapi/user/list/${data._id}`);
  getTableData();
}

</script>
<style lang="less" scope>

</style>