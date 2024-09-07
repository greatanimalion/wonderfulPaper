// 任意组件之间的通信
let _instance: Map<string, Function>;
export default () => {
    if (!_instance) {
        _instance = new Map();
    }
    return {
        addFn: (id: string, fn: Function) => {
            _instance.set(id, fn);
        },
        getFn: (id: string) => {
            return _instance.get(id);
        },
        deleteFn: (id: string) => {
            _instance.delete(id);
        }
    };
}
