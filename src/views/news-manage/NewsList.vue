<template>
   <div>
      <el-card>
         <template #header>
            <div class="card-header">
               <span>Card name</span>
            </div>
         </template>
         <el-table fixed :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="标题" width="500" />
            <el-table-column prop="category" label="分类" width="180">
               <template #default="scope">
                  {{categoryFormat(scope.row.category)}}
               </template>
            </el-table-column>
            <el-table-column label="更新时间" width="250">
               <template #default="scope">
                  {{TimeFormat.getTime(scope.row.editTime)}}
               </template>
            </el-table-column>
            <el-table-column label="是否发布" width="180">
               <template #default="scope">
                  <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0" @change="handleSwitchChange(scope.row)"/>
               </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
               <template #default="scope">
                  <el-button circle :icon="Star" type="success" @click="handlePreview(scope.row)"></el-button>
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
      <el-dialog
         v-model="dialogVisible"
         title="娱乐新闻"
         width="50%">
         <div>
            <h2>{{ previewData.title }}</h2>
            <div>{{ TimeFormat.getTime(previewData.editTime) }}</div>
            <el-divider />
            <div class="html-content" v-html="previewData.content"></div>
         </div>
      </el-dialog>
   </div>
</template>

<script setup>
import axios from 'axios';
import {ref,onMounted} from 'vue';
import {Star,Edit,Delete} from '@element-plus/icons-vue'
import TimeFormat from '@/util/TimeFormat'
import {useRouter} from 'vue-router';

const tableData = ref([]);
const previewData = ref({});
const dialogVisible = ref(false);

const router = useRouter();

onMounted(() => {
   getTableData();
});

const getTableData = async ()=>{
   const res = await axios.get('http://localhost:3000/adminapi/news/list');
   tableData.value = res.data.data;
}

const categoryFormat = (category)=>{
   const arr = ['最新动态','典型案例','通知公告'];
   return arr[category];
}

//是否发布切换
const handleSwitchChange = async (value)=>{
   await axios.put('http://localhost:3000/adminapi/news/publish',{_id:value._id,isPublish:value.isPublish});
}

//预览事件
const handlePreview = (data)=>{
   previewData.value = data;
   dialogVisible.value = true;
}

//删除事件
const handleDelete = async(data)=>{
   await axios.delete(`http://localhost:3000/adminapi/news/list/${data._id}`);
   await getTableData();
}

//编辑事件
const handleEdit = (data)=>{
   router.push(`/news-manage/editnews/${data._id}`);
}
</script>

<style lang="less" scope>
::v-deep .html-content{
   img{
      max-width: 100%;
   }
}
</style>