import {Application, Container, Graphics} from "pixi.js";
import {Reel} from "./Reel";

export interface ReelsConfig
{
    app: Application;
}

export class Game
{
    private _app!: Application;
    private _reels!: Reel[];

    public async init(): Promise<void>
    {
        const app = this._app = new Application();
        await app.init({background: '#1099bb', resizeTo: window});

        document.body.style.margin = '0';
        app.renderer.canvas.style.display = 'block';
        app.renderer.canvas.style.position = 'absolute';
        app.stage.scale = 0.5;

        document.body.appendChild(app.canvas);

        await this._addReels({app});
    }

    private async _update(): Promise<void>
    {

    }

    private async _addReels({app}: ReelsConfig): Promise<void>
    {
        const reelsContainer = new Container({x: 0, y: 560});
        app.stage.addChild(reelsContainer);

        const reelsMask = new Graphics().rect(0, 280, 280 * 5, 280 * 3).fill({color: {r: 25, g: 50, b: 100}});
        const testMask = new Graphics().rect(280, 0, 280 * 5, 280 * 3).fill({color: {r: 25, g: 50, b: 100}});
        reelsContainer.addChild(testMask);

        const reel = new Reel();
        const reel2 = new Reel();
        await reel.init({
            root: reelsContainer,
            mask: reelsMask,
            height: 3,
            xOffset: 0,
            symbolHeight: 280,
            symbolWidth: 280,
            ticker: app.ticker
        });
        await reel2.init({
            root: reelsContainer,
            mask: reelsMask,
            height: 3,
            xOffset: 280,
            symbolHeight: 280,
            symbolWidth: 280,
            ticker: app.ticker
        });

        this._reels = [reel, reel2];
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