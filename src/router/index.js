import Vue from 'vue'
import Router from 'vue-router'

const Home =     ()=> import('../views/home/Home.vue')
const Category = ()=> import('../views/category/Category.vue')
const Profile =  ()=> import('../views/profile/Profile.vue')
const Cart =     ()=> import('../views/cart/Cart.vue')
const Detail =   ()=> import('../views/detail/Detail.vue')
Vue.use(Router)

export default new Router({
  routes: [
{
	path:'/',
	redirect:'/home'
},
{
	path:'/home',
	component:Home
},
{
	path:'/category',
	component:Category
},
{
	path:'/cart',
	component:Cart
},
{
	path:'/profile',
	component:Profile
},
{
	path:'/detail/:iid',
	component:Detail
}

  ],
	mode:'history'
})
