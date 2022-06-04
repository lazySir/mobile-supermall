<template>
  <div class="cart-list">
    <Scroll ref='scroll' class="content-cartList">
      <CartListItem v-for="(item, index) in cartList" :index='index' :key="index" :product="item" />
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'
import CartListItem from './CartListItem.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'cartList',
  computed: {
    ...mapGetters(['cartList']),
  },
  components: {
    Scroll,
    CartListItem,
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}

.content-cartList {
  height: 100%;
  overflow: hidden;
}
</style>
