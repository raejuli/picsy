import {Configurable} from "../pipeline";

export interface GameConfig
{

}

export class Game extends Configurable<GameConfig>
{
    public start(): void
    {
        /**
         * init resource locator
         * init pixi
         * load in all assets
         * init command list mapping
         * send in network request
         */
    }

    protected initResourceLocator(): void
    {

    }

    protected initPixi(): void
    {

    }

    protected initCommandStates(): void
    {

    }
}