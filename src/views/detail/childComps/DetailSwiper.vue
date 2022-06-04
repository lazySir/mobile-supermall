<template>
		<Swiper class='detail-swiper'>
			<SwiperItem  v-for="item in topImages">
				<img :src="item" alt="">
			</SwiperItem>
		</Swiper>

</template>

<script scoped>
	import {Swiper,SwiperItem} from '../../../components/common/swiper/index.js'
	export default{
		name:'DetailSwiper',
		props:{
			topImages:{
				type:Array,
				default(){
					return[]
				}
			}
		},
		components:{
			Swiper,
			SwiperItem
		}
	}
</script>

<style>
	.detail-swiper{
		height:300px;
		overflow: hidden;
	}
</style>
