import { defineStore } from "pinia";
import html2canvas from 'html2canvas'
let img:HTMLImageElement|null=null
let taraget: HTMLElement|undefined
const useLayerImgStore = defineStore('layerImg', {
    state: () => ({
        layerImg: '',
        WH: 'width',
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
                if(innerThis.WH=='width'){
                    img!.style.width='170px';
                    img!.style.height='auto';
                }else{
                    img!.style.width='auto';
                    img!.style.height='100px';
                }
            })
        },
        setMaxLen(WH: 'width'|'height') {
            this.WH = WH;
        },
    }
})
export default useLayerImgStore;