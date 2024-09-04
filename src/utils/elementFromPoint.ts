let canDrag=[
    "div",
    'img',
    'input',
    'button'
]
document.addEventListener("mousedown",(e:MouseEvent)=>{
    let target=document.elementFromPoint(e.clientX,e.clientY) as HTMLElement|null;          
    if(target){
        if(target.getAttribute('candrag')==='true'){
            target.ondragstart=(e)=>{                
                e.dataTransfer!.setData("directive","create:"+target.innerText);
            }
        }
    }
     
})