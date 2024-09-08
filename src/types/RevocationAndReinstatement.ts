export type Action={
    type: "CREATE_ELEMENT"|"MOVE_ELEMENT"|"DELETE"|"SET_ELEMENT_STYLE",
    revocation:()=>void,
    reinstatement:()=>void,
    destory:()=>void
}