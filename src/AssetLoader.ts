import {Assets} from "pixi.js";

export class AssetLoader
{
    // Pre-load all assets so that they're cached ready for runtime
    public static async load(): Promise<void>
    {
        Assets.load("assets/hello-world.png");
        Assets.load("assets/test.png");
    }
}