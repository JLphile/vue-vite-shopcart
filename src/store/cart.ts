import { defineStore } from 'pinia'
import { IProduct, buyProducts } from '../api/shop'

import { useProductsStore } from './products'

type CartProduct = {
  quantity: number
} & Omit<IProduct, 'inventory'>

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cartProducts: [] as CartProduct[],
      checkoutStatus: null as null | string,
    }
  },
  getters: {
    totalPrice(state) {
      return state.cartProducts.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    },
  },
  actions: {
    addProductToCart(product: IProduct) {
      // 检查商品有没有库存
      if (product.inventory < 1) {
        return
      }
      // 检查购物车是否已有该商品，如果有则数量+1，else添加到购物车列表中
      const cartItem = this.cartProducts.find(item => item.id === product.id)
      if (cartItem) {
        cartItem.quantity++
      } else {
        this.cartProducts.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1, //首次添加数量为1
        })
      }
      //更新商品库存
      const productsStore = useProductsStore()
      productsStore.decrementProduct(product)
    },

    async checkout() {
      const ret = await buyProducts()

      this.checkoutStatus = ret ? '成功' : '失败'
      if (ret) {
        this.cartProducts = []
      }
    },
  },
})
