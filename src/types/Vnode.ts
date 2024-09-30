export type Vnode={
    id: number;
    top: number;
    left: number;
    width: number;
    height: number;
    type: 'img'|'div'|'input'|'textarea'|string;
    style:string;
    events: {[key:string]:()=>void};
    children: Vnode[];
    parent: Vnode|undefined;
    text: string|undefined;
    createElement: () => void;
    createVnode: () => void;
}
export type VnodeOptions=Partial<Vnode>;

export type plainVnode=Vnode[]