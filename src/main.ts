import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index'
import { createPinia } from "pinia";
import operate from '@/directive'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "@mdi/font/css/materialdesignicons.css"

const vuetify = createVuetify({
    components,
    directives,
  })
const store = createPinia();
createApp(App).use(vuetify).use(router).use(store).use(operate).mount('#app')



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