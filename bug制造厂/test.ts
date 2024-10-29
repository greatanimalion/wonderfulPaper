type NumberToArr<T extends number, A extends number[] = []> = A['length'] extends T ?
    A :
    NumberToArr<T, [number, ...A]>
type MinusOne<T extends number> = NumberToArr<T> extends [infer N, ...infer R] ?
    R['length'] :
    never

    type A = MinusOne<5> 

    type ParamType<T> = T extends (arg: infer P)=> infer R ? R : T;
 function fo(A:number):void{

 }
 type a=ReturnType<typeof fo>; // void
 type B = ParamType<typeof fo>; // number