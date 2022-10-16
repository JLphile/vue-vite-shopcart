import { defineStore } from 'pinia'

/** 1.定义并导出容器
 * 参数1：容器的ID，必须唯一，将来Pinia会把所有的容器挂载到根容器
 * 参数2：选项对象
 * 返回值：一个函数，调用得到容器实例
 * */
export const useMainStore = defineStore('main', {
  state: () => {
    return {
      count: 100,
      foo: 'bar',
      arr: [1, 2, 3],
    }
  },

  // 类似于组件的 computed，用来封装计算属性，有缓存的功能
  getters: {
    // 函数接受一个可选参数：state状态对象
    // count10(state) {
    //   console.log('count10调用了')
    //   return state.count + 10
    // },

    // 如果在getters中使用了this 则必须手动指定返回值类型，否则类型推导不出来
    count10(): number {
      console.log('count10调用了')
      return this.count + 10
    },
  },

  // 类似组件的methods，封装业务逻辑，修改state
  actions: {
    // 注意：不能使用箭头函数定义action
    changeState(num: number) {
      this.count += num
      this.foo = 'hello'
      this.arr.push(4)

      // this.$patch({})
      // this.$patch(state => {
      //   state.count += num
      // })
    },
  },
})

// 2.使用容器中的state

// 3.修改state

// 4.容器中的action的使用
