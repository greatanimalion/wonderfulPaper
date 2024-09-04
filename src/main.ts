import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from '@/router/index.ts'
import { createPinia } from "pinia";
import './utils/elementFromPoint'

const store = createPinia();
// console.log(import.meta.env);
createApp(App).use(Antd).use(router).use(store).mount('#app')


