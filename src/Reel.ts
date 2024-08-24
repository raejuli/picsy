import {Assets, Container, Graphics, Sprite, Ticker} from "pixi.js";

export interface ReelConfig
{
    root: Container;
    mask: Graphics;
    height: number;
    symbolHeight: number;
    symbolWidth: number;
    ticker: Ticker
}

export class Reel
{
    private _symbols: Container[] = [];
    private _top: number = -1;
    private _config!: ReelConfig;

    public async init(config: ReelConfig): Promise<void>
    {
        this._config = config;

        for(let i = -1; i < config.height + 1; i++)
        {
            const texture = await Assets.load('assets/test.png');
            const sprite = new Sprite(texture);
            sprite.y = i * config.symbolHeight;
            sprite.mask = config.mask;
            this._symbols.push(sprite);
            config.root.addChild(sprite);
        }
    }

    public startSpin(): void
    {
        this._config.ticker.add(this._update, this)
    }

    private async _update(ticker: Ticker): Promise<void>
    {
        const config = this._config;
        const speed = 5;
        const distance = speed * ticker.deltaTime;

        for(let i = 0; i < this._symbols.length; i++)
        {
            const symbol = this._symbols[i];
            symbol.y += distance;
        }

        this._top += distance / config.symbolHeight;

        if(this._top >= -1)
        {
            config.root.removeChild(this._symbols.pop()!);
            const texture = await Assets.load('assets/test.png');
            const sprite = new Sprite(texture);
            sprite.y = this._top * config.symbolHeight;
            sprite.mask = config.mask;
            this._symbols.unshift(sprite);
            config.root.addChild(sprite);

            this._top -= 1;
        }
    }
}