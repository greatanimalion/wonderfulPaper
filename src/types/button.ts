
 export type myButtonProps= {
    background_color:string,
    color:string,
    height:string,
    width:string,
    border_radius:string,
    font_size:string,
    font_weight:string,
    padding:string,
    border:string,
    cursor:string,
}

export type myconfirmBtn  ={
    x:number,
    y:number,
    text:string,
    onClick?:VoidFunction[],
    onHover?:VoidFunction[],
    onLeave?:VoidFunction[],
    disabled?:boolean;
}& myButtonProps