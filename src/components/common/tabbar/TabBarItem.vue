<template>
<div class='tab-bar-item' @click="itemClick">
	<div v-if='!isActive' ><slot name='item-icon'></slot></div>
	<div v-else ><slot name='item-icon-active'></slot></div>
	
	<div :style='activeStyle'><slot  name='item-text'></slot></div>
</div>
</template>

<script>
	export default{
		name:'TabBarItem',
		props:{
			activeColor:{
				type:String,
				default:'red'
			},
			path:String
		},
		data(){
			return{
				// isActive:true,
			}
		},
		computed:{
			isActive(){
				             //home---->item1(/home) =true
										 //home---->item1(/category)=false
										 //indexOf---如果前面有找到就不是-1 如果没找到就是-1
				return this.$route.path.indexOf(this.path) !==-1
			},
			activeStyle(){
				return this.isActive?{color:this.activeColor}:{}
			}
		},
		methods:{
			itemClick(){
				this.$router.push(this.path)
			}
		}
	}
</script>

<style>
	.tab-bar-item{
		flex: 1;
		text-align: center;
		height:49px;  /* 49为常用的高度 */
		font-size:14px
	}
	.tab-bar-item img{
		margin-top:3px;
		width:24px;
		height:24px;
		vertical-align:middle;/* 去掉图片下边距 */
		margin-bottom: 2px;
	}
/* 	.active{
		color:
	} */
	</style>
