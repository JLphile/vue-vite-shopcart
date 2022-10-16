import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
// 创建pinia实例
const pinia = createPinia()

const app = createApp(App)
// 挂载到根实例
app.use(pinia)

app.mount('#app')
