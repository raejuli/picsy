import {State} from "./State";

export class CommandState<TInput extends Object | undefined = Object | undefined, TResult extends Object | undefined = Object | undefined> extends State<TInput, TResult>
{
    public execute(input: TInput): void
    {
        console.log("executing command state");
        super.execute(input);
    }

    protected _onComplete(): void
    {
        // this._pipeLine.onNodeComplete(this.getOutput());
        /**
         * todo
         * communicate back to probably the game and say this state is complete
         * so the game con move to the next one in the commands list
         * these command states are registered to the types of commands
         */
        console.log("command state complete");
    }
}