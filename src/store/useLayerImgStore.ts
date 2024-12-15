import { defineStore } from "pinia";
import html2canvas from 'html2canvas'
let img:HTMLImageElement|null=null
let taraget: HTMLElement|undefined
const useLayerImgStore = defineStore('layerImg', {
    state: () => ({
        layerImg: '',
    }),
    actions: {
        setLayerImg(t?: HTMLElement) {
            taraget = taraget || t
            let innerThis = this;
            if (taraget) html2canvas(taraget).then(function (canvas) {
                let dataURL = canvas.toDataURL("image/png");
                innerThis.layerImg = dataURL;
                img=img||document.querySelector<HTMLImageElement>('.layerThumbnail')
                img!.src=dataURL;
               
            })
        },
    }
})
export default useLayerImgStore;