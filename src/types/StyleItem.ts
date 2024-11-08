export type Item = Record<string,{
    descriptions: string,
    list: {
        description: string,
        value: string
    }[],
    value: string
}>

export  type Sample = Record<string,{
    descriptions: string,
    list?: {
        description: string,
        value: string
    }[],
}>