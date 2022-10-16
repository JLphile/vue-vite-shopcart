<template>
  <ul>
    <li v-for="item in productsStore.all">
      {{ item.title }}-{{ item.price }}
      <br />
      <button
        :disabled="!item.inventory"
        @click="cartStore.addProductToCart(item)"
      >
        添加到购物车
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useProductsStore } from '../store/products'
import { useCartStore } from '../store/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()

// productsStore是一个proxy对象
// console.log(productsStore)

// 加载商品数据
productsStore.loadAllProducts()
</script>

<style lang="scss" scoped></style>
