<template>
	<div id='detail'>
		<DetailNavBar ref='nav'  @titleClick='titleClick' class='detail-nav' /> <!-- 顶部导航栏 -->
		<Scroll @scroll='contentScroll' :probeType='3' class='content3' ref='scroll'>
			<DetailSwiper :topImages='topImages' /> <!-- //轮播图 -->
			<DetailBaseInfo :goods='goods' /> <!-- 基本信息 -->
			<DetailShop :shop="shop" /> <!-- 店铺信息 -->
			<DetailGoodsInfo :detailInfo="detailInfo" @imageLoad='imageLoad'/> <!-- 图片信息 -->
			<DetailParamInfo ref='params' :paramInfo='paramInfo'></DetailParamInfo> <!-- 参数信息 -->
			<DetailCommentInfo ref='comment' :commentInfo='commentInfo'></DetailCommentInfo> <!-- 评论信息 -->
			<GoodsList ref='recommend' :goods='recommends'></GoodsList>  <!-- 推荐信息 -->
	
		</Scroll> 
		<DetailButtonBar @addCart='addToCart' ></DetailButtonBar>
		<BackTop @click.native='BackTop' v-show='isShowBackTop'></BackTop>
	</div>
</template>

<script>
	//组件相关
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShop from './childComps/DetailShopInfo.vue'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
	import DetailParamInfo from './childComps/DetailParamInfo.vue'
	import Scroll from '../../components/common/scroll/Scroll'
	import DetailButtonBar from'./childComps/DetailButtonBar.vue'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	import GoodsList from '../../components/content/goods/GoodsList.vue'
	import BackTop from'../../components/content/BackTop/BackTop.vue'

	import {mapActions} from 'vuex'






	//网络请求
	import {
		getDetail,
		Goods,
		Shop,
    GoodsParam,
		getRecommend,
	} from '../../network/detail'

	export default {
		name: 'Detail',
		data() {
			return {
				iid: null,
				topImages: null,
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo:{},
				commentInfo:{},
				recommends:[],
				themeTopYs:[],
				isShowBackTop:false,
			}
		},
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShop,
			Scroll,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList,
			DetailButtonBar,
			BackTop,
		},
		created() {
			//1.保存传入的iid
			this.iid = this.$route.params.iid
			//2.根据iid请求详情数据
			getDetail(this.iid).then(res => {
				// console.log(res)
				const data = res.result //中转因为每个地方都要写
				//1.获取顶部的图片轮播数据
				this.topImages = data.itemInfo.topImages
				//2.获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				//3.创建店铺信息
				this.shop = new Shop(data.shopInfo)
				//4.保存商品详情数据
				this.detailInfo = data.detailInfo
				//5.获取参数的信息
				this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

        // 6.获取评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
				//7.获取推荐数据
				getRecommend().then(res=>{
					this.recommends=res.data.list
				})
			})

		},

	methods:{
		...mapActions(['addCart']),
		imageLoad(){
			this.$refs.scroll.refresh()

			this.themeTopYs=[]
			this.themeTopYs.push(0),
			this.themeTopYs.push(this.$refs.params.$el.offsetTop)
			this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
			this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
			// console.log(this.themeTopYs)
		},
		titleClick(index){
			// console.log(index)
			this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
		},
		contentScroll(position){
			//1.获取Y值
			// console.log(-position.y)
			let nowPosition = -position.y
			if(nowPosition>=this.themeTopYs[0]&&nowPosition<this.themeTopYs[1]){
				this.$refs.nav.currentIndex=0
			}else if (nowPosition>=this.themeTopYs[1]&&nowPosition<this.themeTopYs[2]){
				this.$refs.nav.currentIndex=1
			}else if(nowPosition>=this.themeTopYs[2]&&nowPosition<this.themeTopYs[3]){
				this.$refs.nav.currentIndex=2
			}else if(nowPosition>=this.themeTopYs[3]){
				this.$refs.nav.currentIndex=3
			}
			//2.判断是否显示回到顶部
			 this.isShowBackTop = -position.y>1000
		},
		BackTop(){
			//点击回到顶部
			this.$refs.scroll.scrollTo(0,0,300)
		},
		//加入购物车
		addToCart(){
			//1.获取购物车需要展示的信息
			const product={}
			product.image=this.topImages[0]
			product.title=this.goods.title
			product.desc=this.goods.desc
			product.price=this.goods.realPrice
			product.iid=this.iid
			// console.log(product)
			//2.将商品添加到购物车里
			// this.$store.commit('addCart',product)
			// this.$store.dispatch('addCart',product).then(res=>{
			// 	console.log(res)
			this.addCart(product).then(res =>{
				this.$toast.show(res,2000)
			})
		}

		}
	}
	
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 5;
		background-color: #fff;
		/* 设置这个是因为不能完全覆盖nav-bar */
		height: 100vh;
		overflow: hidden;
	}

	.content3 {
		height: calc(100% - 44px - 49px);
	}

	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}

</style>
