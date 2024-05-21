import { createRouter,createWebHashHistory } from "vue-router";
import Home from "@/views/index/index.vue";
const routerInstance=createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
    ],
})
export default routerInstance;