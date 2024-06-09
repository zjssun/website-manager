<template>
   <div>
      <el-card>
         <template #header>
            <div class="card-header">
               <span>产品列表</span>
            </div>
         </template>
         <el-table fixed :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="标题" width="500" />
            <el-table-column prop="introduction" label="简要介绍" width="500" />
            <el-table-column label="更新时间" width="250">
               <template #default="scope">
                  {{TimeFormat.getTime(scope.row.editTime)}}
               </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
               <template #default="scope">

                  <el-button circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>

                  <el-popconfirm title="您确定要删除吗?" @confirm="handleDelete(scope.row)">
                     <template #reference>
                        <el-button circle :icon="Delete" type="danger" ></el-button>
                     </template>
                  </el-popconfirm>
               </template>
            </el-table-column>
         </el-table>
      </el-card>
   </div>
</template>

<script setup>
import axios from 'axios';
import {ref,onMounted} from 'vue';
import {Edit,Delete} from '@element-plus/icons-vue'
import TimeFormat from '@/util/TimeFormat'
import {useRouter} from 'vue-router';

const tableData = ref([]);

const router = useRouter();

onMounted(() => {
   getTableData();
});

const getTableData = async ()=>{
   const res = await axios.get('http://localhost:3000/adminapi/product/list');
   tableData.value = res.data.data;
}

const categoryFormat = (category)=>{
   const arr = ['最新动态','典型案例','通知公告'];
   return arr[category];
}

//删除事件
const handleDelete = async(data)=>{
   await axios.delete(`http://localhost:3000/adminapi/product/list/${data._id}`);
   await getTableData();
}

//编辑事件
const handleEdit = (data)=>{
   router.push(`/product/edit/${data._id}`);
}
</script>

<style lang="less" scope>
::v-deep .html-content{
   img{
      max-width: 100%;
   }
}
</style>