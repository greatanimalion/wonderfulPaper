export default function drag(element: HTMLElement) {
 element.ondragstart=(e:DragEvent)=>{
    (e.dataTransfer as DataTransfer).dropEffect="move";
    (e.dataTransfer as DataTransfer).effectAllowed="move";
 }  
 element.ondragenter=(e:DragEvent)=>{
    console.log(console.log("enter",e));
 }    
 element.ondragend=(e:DragEvent)=>{
    console.log( "drop",e);
 }
}