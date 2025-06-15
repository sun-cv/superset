
type Listener = (value: any) => void

function assignEmitter(obj: any)
{
    const listeners: Listener[] = [];

    obj.subscribe = (fn: Listener) => 
    {
        listeners.push(fn);
    };

    obj.emit = (obj: any) => 
    {
        listeners.forEach(fn => fn(obj));
    };

    return obj;
}

export default assignEmitter