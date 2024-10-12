import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd, { message } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from '@/router/index'
import { createPinia } from "pinia";
import operate from '@/directive'
import './utils/elementFromPoint'

// import { notification } from 'ant-design-vue';
const store = createPinia();
// console.log(import.meta.env);
createApp(App).use(Antd).use(router).use(store).use(operate).mount('#app')

// setTimeout(()=>{
//     notification.open({
//         message: '网站正在建设中，请耐心等待！！！！！',
//         description:
//           '您可以看看基本功能，感谢您的支持',
//       });
// },1000)


let muen:HTMLDivElement|null = null;
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
document.addEventListener('mousedown', function (e) {
    if (e.button === 2) {
        muen =muen|| document.querySelector<HTMLDivElement>('#menu-vnode')!
        muen.style.display = 'block'
        muen.style.left = e.clientX + 'px'
        muen.style.top = e.clientY + 'px'
    }
    else {
        setTimeout(()=>{
            if(muen)muen.style.display = 'none'
        },100)
    }
})