<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton @click.native="checkClick()" :is-checked="product.checked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>

      <div class="info-bottom">
        <div @click="showBtn" class="item-price">￥{{ product.price }}</div>
        <div class="item-count">
          <button @click.stop="decrement(index)" :class="{ min: isDisabled }" v-show="isShow" class="decrementBtn">-</button>
          <i v-show="!isShow">x</i>
          <i @click="showBtn" :class="{ isClickedPrice: isShow }">{{ product.count }}</i>
          <button @click.stop="increment(index)" v-show="isShow" class="incrementBtn">+</button>
          <button @click='remove(index)' class="removeBtn">移除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
  name: 'CartListItem',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
    index: {
      type: Number,
    },
  },
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked
    },
    showBtn() {
      this.isShow = !this.isShow
    },
    increment(index) {
      // this.product.count++
      this.$store.commit('increment', index)
      this.isDisabled = false
    },
    decrement(index) {
      if (this.product.count == 1) {
        this.isDisabled = true
        this.$toast.show('已经不能再减少啦', 2000)
      } else {
        this.$store.commit('decrement', index)
      }
    },
    remove(index){
      this.$store.commit('remove',index)
      this.$toast.show('删除商品成功！',1000)
    }
  },
  data() {
    return {
      isShow: false,
      isDisabled: false,
    }
  },
}
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  overflow: hidden;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom .item-price {
  color: orangered;
}
.info-bottom {
  margin-top: 25px;
}
.item-info {
  align-self: center;
}
.item-price {
  float: left;
}
.item-count {
  float: right;
}
.incrementBtn,
.decrementBtn {
  width: 20px;
  background-color: white;
  border: none;
}
.removeBtn {
  margin-left: 10px;
  background-color: red;
  color: white;
  border-color: #708090;
}
.min {
  color: #708090;
}
.isClickedPrice {
  text-align: center;
  padding: 0px 5px;
}
</style>
