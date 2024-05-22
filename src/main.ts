import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from '@/router/index.ts'
import store from '@/store/index.ts'
createApp(App).use(Antd).use(router).use(store).mount('#app')
