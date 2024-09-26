import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from '@/router/index'
import { createPinia } from "pinia";
import './utils/elementFromPoint'
// import { notification } from 'ant-design-vue';
const store = createPinia();
// console.log(import.meta.env);
createApp(App).use(Antd).use(router).use(store).mount('#app')

// setTimeout(()=>{
//     notification.open({
//         message: '网站正在建设中，请耐心等待！！！！！',
//         description:
//           '您可以看看基本功能，感谢您的支持',
//       });
// },1000)
