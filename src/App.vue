<!-- <template>
  <HelloWord></HelloWord>
</template>

<script setup lang="ts">
import HelloWord from './components/HelloWorld.vue'
</script>

<style scoped></style> -->

<template>
  <h1>Pinia-购物车示例</h1>
  <hr />
  <h2>商品列表</h2>
  <ProductList></ProductList>
  <hr />
  <ShoppingCart></ShoppingCart>
</template>

<script setup lang="ts">
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'
</script>

<style scoped></style>
