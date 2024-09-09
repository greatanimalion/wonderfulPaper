import getElementRelativeToElement from "./getElementRelativeToElement";

let targetEl:HTMLElement|null=null;
let contain:HTMLDivElement|null=null;
document.addEventListener("mousedown",(e:MouseEvent)=>{
    let target=document.elementFromPoint(e.clientX,e.clientY) as HTMLElement|null;  
    if(target){
        //重基本元素框中取出的元素
        if(target.getAttribute('draggable')==='true'){
            target.ondragstart=(e)=>{                
                e.dataTransfer!.setData("directive","create:"+target.innerText);
            }
        }else if(target.getAttribute('candrag')){
            targetEl=target;
            contain=document.querySelector('.content')!
        }
    }
})
document.addEventListener('mouseup',()=>{
    targetEl=null;
})
document.addEventListener('mousemove',(e:MouseEvent)=>{  
    if(targetEl&&contain){
        let {finalX,finalY}=getElementRelativeToElement(e,contain!,'page');
        finalX-=targetEl.offsetWidth/2;
        finalY-=targetEl.offsetHeight/2;
        targetEl.style.top=finalY+'px';
        targetEl.style.left=finalX+'px';
    }
})