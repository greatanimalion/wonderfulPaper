import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index'
import { createPinia } from "pinia";
import operate from '@/directive'

// Vuetify
import 'vuetify/styles'
import "@mdi/font/css/materialdesignicons.css"
import vuetify  from "@/plugins/vuertify"

const store = createPinia();
createApp(App).use(vuetify).use(router).use(store).use(operate).mount('#app')



