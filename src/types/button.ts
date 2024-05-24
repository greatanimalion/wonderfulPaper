
 export type myButtonProps= {
    backgroundColor:string,
    color:string,
    height:string,
    width:string,
    borderRadius:string,
    fontSize:string,
    fontWeight:string,
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