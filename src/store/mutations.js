import { ADD_COUNTER,ADD_TO_CART, DECREMENT,INCREMENT,REMOVE,REMOVEALL} from './mutation-types'

export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked=true
    state.cartList.push(payload)
  },
  [INCREMENT](state,payload){
    state.cartList[payload].count++
  },
  [DECREMENT](state,payload){
    state.cartList[payload].count--
  },
  [REMOVE](state,payload){
    state.cartList.splice(payload,1)
  },
  [REMOVEALL](state,payload){
    state.cartList.splice(0)
  }
}