import {Configurable} from "../pipeline";
import {AssetHandler} from "./AssetHandler";
import {NetworkHandler} from "./NetworkHandler";

export interface ResourceLocatorConfig
{
    networkHandler: NetworkHandler;
    assetHandler: AssetHandler;

}

export class ResourceLocator
{
    private static _instance: ResourceLocator;

    private constructor(config: ResourceLocatorConfig)
    {
    }

    public static init(config: ResourceLocatorConfig): void
    {
        this._instance = this._instance ?? new ResourceLocator(config);
    }

    public static get(): ResourceLocator
    {
        return this._instance;
    }

    public get networkHandler(): NetworkHandler
    {
        return NetworkHandler.get();
    }

    public get assetHandler(): AssetHandler
    {
        return AssetHandler.get();
    }
}