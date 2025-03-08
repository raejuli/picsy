import {Configurable} from "../pipeline";
import {ResourceLocator} from "../services/ResourceLocator";

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

    protected _initResourceLocator(): void
    {
        // todo
        ResourceLocator.init({} as any)
    }

    protected _initPixi(): void
    {

    }

    /**
     * todo
     * create the base states of the game
     * and store them
     * these should be passed into the command
     */
    protected _initCommandStates(): void
    {

    }


    protected _initCommandProcessor(): void
    {

    }
}