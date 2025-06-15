
type Result<D, E> = Pass<D> | Fail<E>;

interface Pass<D> 
{
    passed(): this is Pass<D>;
    failed(): this is never;

    value: D;
}

interface Fail<E>
{
    passed(): this is never;
    failed(): this is Fail<E>;

    error: E
}


class Pass<D> 
{
    constructor(public value: D) {}

    passed(): this is Pass<D> 
    {
        return true;
    }

    failed(): this is never 
    {
        return false;
    }

    mapPass<N>(callback: (value: D) => N): Pass<N> 
    {
        return new Pass(callback(this.value));
    }

    unwrapPass(): D 
    {
        if (this.failed()) throw new Error('Tried to unwrap a Fail');
        return this.value;
    }

    then<N>(callback: (value: D) => Result<N, any>): Result<N, any> 
    {
        return callback(this.value);
    }
}

class Fail<E> 
{
    constructor(public error: E) 
    {
        this.error = error;
    }

    passed(): this is never
    {
        return false;
    }

    failed(): this is Fail<E> 
    {
        return true;
    }
    
    mapFail<N>(callback: (error: E) => N): Fail<N> 
    {
        return new Fail(callback(this.error));
    }

    unwrapFail(): E
    {
        if (this.passed()) throw new Error('Tried to unwrap a Fail');
        return this.error;
    }

    then<N>(callback: (value: never) => Result<N, E>): Fail<E> 
    {
        return this;
    }
}

function fail<E = Error>(error: E): Fail<E> 
{
    return new Fail(error);
}

function pass<D>(data: D): Pass<D> 
{
    return new Pass(data);
}

function result<D, E = Error>(fn: () => D): Result<D, E> 
{
    try 
    {
        return pass(fn());
    } 
    catch (error) 
    {
        return fail(error as E);
    }
}

async function resultAsync<D, E = Error>(promise: Promise<D>): Promise<Result<D, E>> 
{
    try 
    {
        return pass(await promise);
    } 
    catch (error) 
    {
        return fail(error as E);
    }
}

export { result, resultAsync, pass, fail, type Result };
