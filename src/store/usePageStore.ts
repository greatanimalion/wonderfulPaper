import { defineStore } from "pinia";
import Alert from '@/hooks/useAlert';
const usePageStore = defineStore("pages", {
    state: () => ({
        width: "",
        heigth: "",
        scale: 1,
        created: false,
        vnodePage: false
    }),
    actions: {
        init(width: string, heigth: string) {
            let w = Number(width);
            let h = Number(heigth);
            if (isNaN(h) || isNaN(w)) { Alert('error', '请输入正确的页面宽高');  return false; }
            if (w < 300 || h < 300 || w > 100000 || h > 100000) {  Alert('error', '页面宽高不能超过100000px或低于300px');return false }
            this.width = width + "px";
            this.heigth = heigth + "px";
            this.created = true;
            return true;
        },
        setScale(scale: number) {
            this.scale = scale;
        },
        openVnodePage() {
            this.vnodePage =true
            document.querySelector<HTMLDivElement>('#vnodePage')!.style.display = 'block'
        },
        closeVnodePage() {
            document.querySelector<HTMLDivElement>('#vnodePage')!.style.display = 'none'
            this.vnodePage = false
        }
    }
})

export default usePageStore;