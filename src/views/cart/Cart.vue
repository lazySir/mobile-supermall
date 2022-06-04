<template>
  <!-- 导航 -->
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
      <div @click="removeAll" slot="right">清空</div>
    </NavBar>
    <!-- 商品列表 -->
    <CartList />
    <!-- 底部 -->
    <CartBottomBar />
  </div>
</template>

<script>
import NavBar from '../../components/common/nav/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // ...mapGetters(['cartLength','cartList']) 数组语法
    //对象语法
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList',
    }),
  },
  methods: {
    removeAll() {
      if (this.$store.state.cartList.length) {
        this.$store.commit('removeAll')
        this.$toast.show('清空购物车成功！', 1000)
      }
			else{
				this.$toast.show('请先加入购物车',1000)
			}
    }
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-size: 15px;
}
</style>
