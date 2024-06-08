import Home from '../views/home/Home.vue'
import Center from '../views/center/Center.vue'
import UserAdd from '../views/user-manage/UserAdd.vue'
import UserList from '../views/user-manage/UserList.vue'
import NewAdd from '../views/news-manage/NewsAdd.vue'
import NewsList from '../views/news-manage/NewsList.vue'
import NewsEdit from '../views/news-manage/NewEdit.vue'
import ProductAdd from '../views/product-manage/ProductAdd.vue'
import ProductList from '../views/product-manage/ProductList.vue'
import NotFound from '../views/notfound/NotFound.vue'

const routes = [
   {
      path: "/index",
      component: Home,
   },
   {
      path: "/center",
      component: Center,
   },
   {
      path:"/user-manage/add",
      component:UserAdd,
      requireAdmin:true,
   },
   {
      path:"/user-manage/list",
      component:UserList,
      requireAdmin:true,
   },
   {
      path:"/news-manage/add",
      component:NewAdd,
   },
   {
      path:"/news-manage/list",
      component:NewsList,
   },
   {
      path:"/product/add",
      component:ProductAdd,
   },
   {
      path:"/product/list",
      component:ProductList,
   },
   {
      path:"/news-manage/editnews/:id",
      component:NewsEdit,
   },
   {
      path:"/",
      redirect: "/index",
   },
   {
      path:"/:pathMatch(.*)*",
      name:"notFound",
      component: NotFound,
   },
];

export default routes;