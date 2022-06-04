<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton 
      :is-checked="isSelectAll" 
      class="check-button" 
      @click.native='checkClick'
      />
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div  class="calculate" @click='calcClick'>去计算：({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        '￥' +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
          .toFixed(2)
      )
    },
    checkedLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length
    },
    isSelectAll() {
      //法一：  性能不太好
      // return  !(this.$store.state.cartList.filter((item) => !item.checked).length)
      if (this.$store.state.cartList.length == 0) return false
      //法二：
      return !this.$store.state.cartList.find((item) => !item.checked)
    },
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){//全部选中的情况
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{//部分选中的情况
        this.$store.state.cartList.forEach(item => item.checked = true)
      }

    },
    calcClick(){
      if(!this.checkedLength){this.$toast.show('请选择购买的商品',2000)}
      else {this.$store.commit('removeAll')
      this.$toast.show('购买成功！',1000)
    }}
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.price {
  margin-left: 40px;
  flex: 1;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
