<template>
  <p>{{ mainStore.count }}</p>
  <p>{{ mainStore.foo }}</p>
  <p>{{ mainStore.arr }}</p>
  <p>{{ mainStore.count10 }}</p>
  <p>{{ mainStore.count10 }}</p>
  <p>{{ mainStore.count10 }}</p>

  <hr />
  <p>{{ count }}</p>
  <p>{{ foo }}</p>
  <hr />
  <button @click="handleChangeState">修改数据</button>
</template>

<script setup lang="ts">
import { useMainStore } from '../store/index'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
console.log(mainStore.count)

// 此处用解构赋值语法是有问题的，数据是一次性的不是响应式的
// const { count, foo } = mainStore

// 解决办法就是使用storeToRefs
// 把解构处理的数据做ref 响应式代理
const { count, foo } = storeToRefs(mainStore)
console.log(count.value)

const handleChangeState = () => {
  // 方式一：最简单的方式修改数据
  // mainStore.count++
  // mainStore.foo = 'hello'

  // 方式二：如果修改多个数据，建议使用$patch批量更新
  // mainStore.$patch({
  //   count: mainStore.count + 1,
  //   foo: 'hello',
  //   arr: [...mainStore.arr, 4],
  // })

  // 方式三：$patch 一个函数,批量更新
  // mainStore.$patch(state => {
  //   state.count++
  //   state.foo = 'hello'
  //   state.arr.push(4)
  // })

  // 方式四：逻辑比较多的时候可以封装到actions 做处理,可以传入参数
  mainStore.changeState(10)
}
</script>

<style scoped></style>
