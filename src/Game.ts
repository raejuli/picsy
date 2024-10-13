import {Application, Container, Graphics} from "pixi.js";
import {Reel} from "./Reel";

export interface ReelsConfig
{
    app: Application;
    columns: number;
    rows: number;
}

export class Game
{
    private _app!: Application;
    private _reels: Reel[] = [];

    public async init(): Promise<void>
    {
        const app = this._app = new Application();
        await app.init({background: '#1099bb', resizeTo: window});

        document.body.style.margin = '0';
        app.renderer.canvas.style.display = 'block';
        app.renderer.canvas.style.position = 'absolute';
        app.stage.scale = 0.5;

        document.body.appendChild(app.canvas);

        await this._addReels({app, columns: 5, rows: 3});
    }

    private async _update(): Promise<void>
    {
        // stub
    }

    private async _addReels({app, columns, rows}: ReelsConfig): Promise<void>
    {
        const reelsContainer = new Container({x: 0, y: 560});
        app.stage.addChild(reelsContainer);

        const reelsMask = new Graphics().rect(0, 280, 280 * 5, 280 * 3).fill({color: {r: 25, g: 50, b: 100}});
        const testMask = new Graphics().rect(280, 0, 280 * 5, 280 * 3).fill({color: {r: 25, g: 50, b: 100}});
        reelsContainer.addChild(testMask);

        for(let i = 0; i < columns; i++)
        {
            const r = new Reel();
            await r.init({
                root: reelsContainer,
                mask: reelsMask,
                height: rows,
                xOffset: i * 280,
                symbolHeight: 280,
                symbolWidth: 280,
                ticker: app.ticker
            });

            this._reels.push(r);
        }
    }

    public get reels(): Reel[]
    {
        return this._reels;
    }

    public get app(): Application
    {
        return this._app;
    }
}