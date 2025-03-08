import {CommandStateProcessor} from "./CommandStateProcessor";
import {State, StateConfig} from "./State";

export interface CommandStateConfig extends StateConfig
{
    commandStateProcessorConstructor: new () => CommandStateProcessor;
}

export class CommandState<TConfig extends CommandStateConfig = CommandStateConfig, TInput extends Object | undefined = Object | undefined, TResult extends Object | undefined = Object | undefined> extends State<TConfig, TInput, TResult>
{
    private _processor: CommandStateProcessor = new this._config.commandStateProcessorConstructor();

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