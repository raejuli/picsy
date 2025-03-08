import {Configurable} from "../pipeline";
import {CommandState, CommandStateConfig} from "../state";

export interface CommandProcessorConfig
{

}

export class CommandProcessor extends Configurable<CommandProcessorConfig>
{
    private readonly _idMapping: Map<string, CommandState> = new Map();

    public registerID(id: string, commandStateConstructor: new (_: CommandStateConfig) => CommandState, config: CommandStateConfig): void
    {
        this._idMapping.set(id, new commandStateConstructor(config));
    }

    public registerCommand(): void
    {

    }

    //to do for now
    //in futur eit should go through the network proxy which calls register command
    //that way commands that aren't off the server i.e. begin spin state can be executed
    public processServerResult(input: Record<string, Record<string, any>>): void
    {
        // todo
        for(const commandID in input)
        {
            const serverCommandData = input[commandID];

            /**
             * todo
             * should do command state proccessor here
             * then command state execute
             */
        }
    }
}