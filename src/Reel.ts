import {Assets, Container, Graphics, Sprite, Ticker} from "pixi.js";
import {SymbolType} from "./GameData";

export interface ReelConfig
{
    root: Container;
    mask: Graphics;
    height: number;
    symbolHeight: number;
    symbolWidth: number;
    xOffset: number;
    ticker: Ticker
}

export class Reel
{
    private _symbols: Container[] = [];
    private _top: number = -1;
    private _config!: ReelConfig;
    private _stopping: boolean = false;
    private _landingSymbols: SymbolType[] = [];

    public async init(config: ReelConfig): Promise<void>
    {
        this._config = config;

        for(let i = -1; i < config.height + 1; i++)
        {
            const texture = await Assets.load('assets/test.png');
            const sprite = new Sprite(texture);
            sprite.y = i * config.symbolHeight;
            sprite.x = config.xOffset;
            // sprite.mask = config.mask;
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
        let speed = 3;

        if(this._stopping)
        {
            speed = 1;
        }

        const distance = speed * config.symbolHeight * ticker.elapsedMS / 1000;
        console.log(ticker.deltaTime);

        for(let i = 0; i < this._symbols.length; i++)
        {
            const symbol = this._symbols[i];
            symbol.y += distance;
        }

        this._top += distance / config.symbolHeight;

        if(this._top > -1)
        {
            if(this._stopping && this._landingSymbols.length === 0)
            {
                console.log("all symbols added and stopped");
                this._config.ticker.remove(this._update, this);

                return;
            }

            this._top = -2;
            config.root.removeChild(this._symbols.pop()!);
            const texture = await Assets.load('assets/test.png');
            const sprite = new Sprite(texture);
            sprite.y = this._top * config.symbolHeight;
            sprite.x = config.xOffset;
            // sprite.mask = config.mask;
            this._symbols.unshift(sprite);
            config.root.addChild(sprite);

            for(let i = 1; i < this._symbols.length; i++)
            {
                const symbol = this._symbols[i];
                symbol.y = (i - 2) * config.symbolHeight;
            }

            if(this._stopping)
            {
                const symbolType = this._landingSymbols.pop();
            }
        }
    }

    public stopSpin(landingSymbols: SymbolType[]): void
    {
        this._stopping = true;
        this._landingSymbols = landingSymbols;
    }
}