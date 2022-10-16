

```VUE
<!-- src/components/ProductList.vue -->
<template>
  <ul>
    <li
      v-for="product in products"
      :key="product.id">
      {{ product.title }} - {{ currency(product.price) }}
      <br>
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product)">
        Add to cart
      </button>
    </li>
  </ul>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import { currency } from '../currency'


export default {
  computed: mapState({
    products: state => state.products.all
  }),
  methods: {
    ...mapActions('cart', [
      'addProductToCart'
    ]),
    currency
  },
  created () {
    this.$store.dispatch('products/getAllProducts')
  }
}
</script>
```



```vue
<!-- src/components/ShoppingCart.vue -->
<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!products.length">
      <i>Please add some products to cart.</i>
    </p>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ currency(product.price) }} x {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ currency(total) }}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { currency } from '../currency'

export default {
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotalPrice'
    })
  },
  methods: {
    currency,
    checkout (products) {
      this.$store.dispatch('cart/checkout', products)
    }
  }
}
</script>
```

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <h1>Shopping Cart Example</h1>
    <hr>
    <h2>Products</h2>
    <ProductList/>
    <hr>
    <ShoppingCart/>
  </div>
</template>

<script>
import ProductList from './ProductList.vue'
import ShoppingCart from './ShoppingCart.vue'

export default {
  components: { ProductList, ShoppingCart }
}
</script>
```



```vue
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
```



```vue
/**
 * Mocking client-server processing
 */
const _products = [
  { 'id': 1, 'title': 'iPad 4 Mini', 'price': 500.01, 'inventory': 2 },
  { 'id': 2, 'title': 'H&M T-Shirt White', 'price': 10.99, 'inventory': 10 },
  { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 19.99, 'inventory': 5 }
]

export default {
  async getProducts () {
    await wait(100)
    return _products
  },

  async buyProducts (products) {
    await wait(100)
    if (
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.webdriver)
    ) {
      return
    } else {
      throw new Error('Checkout error')
    }
  }
}

function wait (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

```













