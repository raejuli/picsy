export class Configurable<TConfig = unknown>
{
    protected _config: TConfig;

    constructor(config: TConfig)
    {
        this._config = config;
    }
}

export interface IExecutable<TInput = Object | undefined, TResult = Object | undefined>
{
    execute(input: TInput): void;
    getOutput(): TResult;
}