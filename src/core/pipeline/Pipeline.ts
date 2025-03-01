import {PipeNode, PipeNodeConfig} from "./PipeNode";

export interface PipelineConfig extends PipeNodeConfig
{

}

export class Pipeline<TConfig extends PipeNodeConfig = PipelineConfig, TInput extends Object | undefined = Object | undefined, TResult extends Object | undefined = Object | undefined> extends PipeNode<TConfig, TInput, TResult>
{
    protected _currentNodeIndex = 0;
    protected _input!: TInput;
    protected readonly _nodes: PipeNode[] = [];

    public execute(input: TInput): void
    {
        this._input = input;
        this._nodes[this._currentNodeIndex = 0].execute(input);
    }

    public registerNode(node: PipeNode): void
    {
        node._pipeLine = this;
        this._nodes.push(node);
    }

    public onNodeComplete(completedNodeOutput: Object | undefined): void
    {
        if(++this._currentNodeIndex === this._nodes.length)
        {
            this._onComplete();
        }
        else
        {
            let input = {...this._input};

            if(completedNodeOutput)
            {
                input = {...input, ...completedNodeOutput};
            }

            this._nodes[this._currentNodeIndex].execute(input);
        }
    }
}