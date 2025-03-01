import {Pipeline} from "./Pipeline";
import {Configurable, IExecutable} from "./Types";

export interface PipeNodeConfig
{

}

export class PipeNode<TConfig extends PipeNodeConfig = PipeNodeConfig, TInput extends Object | undefined = Object | undefined, TResult extends Object | undefined = Object | undefined> extends Configurable<TConfig> implements IExecutable<TInput, TResult>
{
    public _pipeLine!: Pipeline;
    protected _output!: TResult;

    public execute(input: unknown): void
    {
        // set output here
        console.log(`PipeNode executed`);
    }

    public getOutput(): TResult
    {
        return this._output;
    }

    protected _onComplete(): void
    {
        this._pipeLine.onNodeComplete(this.getOutput());
    }
}