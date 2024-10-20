import { LayoutType } from "@/types/Vnode"
export const containType = {
    name: '宽松布局',
    type: 'div',
    style: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        backgroundColor: '#f2f2f2'
    },
    sub: [
        {
            name: 'left',
            type: 'div',
            style: {
                width: '200px',
                height: '100vh',
                disply: 'relative',
                backgroundColor: '#f2f2f2'
            }
        }, {
            name: 'right',
            type: 'div',
            style: {
                width: '100%',
                height: '100vh',
                backgroundColor: '#fff'
            },
            sub: [
                {
                    name: 'header',
                    type: 'div',
                    style: {
                        height: '50px',
                        backgroundColor: '#f2f2f2',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    },
                    sub: [
                        {
                            name: 'title',
                            type: 'div',
                            style: {
                                fontSize: '20px',
                                color: '#333',
                                fontWeight: 'bold'
                            },
                            text: '标题'
                        }, {
                            name: 'close',
                            type: 'div',
                            style: {
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: '#333',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer'
                            },
                            text: 'X'
                        }
                    ]
                }, {
                    name: 'content',
                    type: 'div',
                    style: {
                        height: 'calc(100% - 50px)',
                        backgroundColor: '#fff',
                        overflowY: 'auto'
                    },
                }
            ]
        }
    ]
} as LayoutType