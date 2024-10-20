import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 初始化样式表
import '@/styles/index.scss'
// 导入svgIcon
import installIcons from '@/icons'
// 导入mock
import '@/mock/index.js'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
app.use(store).use(router).mount('#app')
