import {PipeNode} from "../../../core";

export class StartSpinNode extends PipeNode
{
    public execute(input: unknown): void
    {
        console.log(`StartSpinNode executed`);
        this._onComplete();
    }
}