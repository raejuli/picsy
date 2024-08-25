
import {Application, Assets, Container, Graphics, Sprite, Ticker} from 'pixi.js';
import {AssetLoader} from './AssetLoader';
import {Reel} from './Reel';
import {SymbolType} from './GameData';

(async () =>
{
    const app = new Application();
    await app.init({background: '#1099bb', resizeTo: window})

    document.body.style.margin = '0';
    app.renderer.canvas.style.display = 'block';
    app.renderer.canvas.style.position = 'absolute';
    app.stage.scale = 0.5;

    document.body.appendChild(app.canvas);

    await AssetLoader.load();

    const texture = await Assets.load('assets/hello-world.png');
    const image = new Sprite(texture);
    app.stage.addChild(image);
    image.anchor.set(0.5, 0.5);
    image.x = app.screen.width / 2;
    image.y = app.screen.height / 2;

    app.ticker.add((ticker) =>
    {
        image.rotation += 0.1 * ticker.deltaTime;
    });

    const reelsContainer = new Container({x: 0, y: 560});
    app.stage.addChild(reelsContainer);

    const reelsMask = new Graphics().rect(0, 280, 280 * 5, 280 * 3).fill({color: {r: 25, g: 50, b: 100}});
    const testMask = new Graphics().rect(280, 0, 280 * 5, 280 * 3).fill({color: {r: 25, g: 50, b: 100}});
    reelsContainer.addChild(testMask);

    const reel = new Reel();
    await reel.init({
        root: reelsContainer,
        mask: reelsMask,
        height: 3,
        symbolHeight: 280,
        symbolWidth: 280,
        ticker: app.ticker
    });

    reel.startSpin();

    let timeTilStop = 5;
    const stopSpinCallback = (ticker: Ticker) =>
    {
        timeTilStop -= ticker.deltaTime;

        if(timeTilStop <= 0)
        {
            reel.stopSpin([SymbolType.HIGH, SymbolType.HIGH, SymbolType.HIGH, SymbolType.HIGH, SymbolType.HIGH]);
            app.ticker.remove(stopSpinCallback, this);
        }
    };

    app.ticker.add(stopSpinCallback, this)
})();