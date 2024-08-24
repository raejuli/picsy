import {Assets, Container, Graphics, Sprite} from "pixi.js";

export interface ReelConfig
{
    root: Container;
    mask: Graphics;
    height: number;
    symbolHeight: number;
    symbolWidth: number;
}

export class Reel
{
    private _symbols: Container[] = [];
    private _top: number = -1;

    public async init(config: ReelConfig): Promise<void>
    {
        for(let i = -1; i < config.height + 1; i++)
        {
            const texture = await Assets.load('assets/test.png');
            const sprite = new Sprite(texture);
            sprite.y = this._top * config.symbolHeight;
            sprite.mask = config.mask;
            this._symbols.push(sprite);
            config.root.addChild(sprite);

            this._top++;
        }
    }
}