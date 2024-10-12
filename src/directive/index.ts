import { App } from "vue";


const directives = {
   
};

type DirectiveKeys = keyof typeof directives; // 获取 directives 的键的联合类型

export default {
    install(Vue: App<Element>) {
        Object.keys(directives).forEach(key => {
            Vue.directive(key as DirectiveKeys, directives[key as DirectiveKeys]);
        });
    }
}
