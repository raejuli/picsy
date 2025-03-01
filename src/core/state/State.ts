import {Pipeline, PipelineConfig} from "../pipeline";


export interface StateConfig extends PipelineConfig
{
}

export class State<TInput extends Object | undefined = Object | undefined, TResult extends Object | undefined = Object | undefined> extends Pipeline<TInput, TResult>
{
    protected _pipeCompleteCount = 0;
    protected readonly _nodes: Pipeline[] = [];

    public execute(input: TInput): void
    {
        this._pipeCompleteCount = 0;
        this._input = input;

        for(const node of this._nodes)
        {
            node._pipeLine = this;
            node.execute(input);
        }
    }

    public onNodeComplete(completedNodeOutput: Object | undefined): void
    {
        if(++this._pipeCompleteCount === this._nodes.length)
        {
            this._onComplete();
        }
    }
}