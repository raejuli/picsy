import {Assets} from "pixi.js";

export class AssetLoader
{
    public static async load(): Promise<void>
    {
        Assets.load("assets/hello-world.png");
        Assets.load("assets/test.png");
    }
}