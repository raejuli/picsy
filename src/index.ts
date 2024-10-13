
import {Ticker} from 'pixi.js';
import {AssetLoader} from './AssetLoader';
import {Game} from './Game';
import {SymbolType} from './GameData';

(async () =>
{
    await AssetLoader.load();

    const game = new Game();
    await game.init();

    // Testing
    const reels = game.reels;
    const app = game.app;

    for(const reel of reels)
    {
        reel.startSpin();
    }

    let timeTilStop = 5000;
    const stopSpinCallback = (ticker: Ticker) =>
    {
        timeTilStop -= ticker.elapsedMS;

        if(timeTilStop <= 0)
        {
            reels[0].stopSpin([SymbolType.HIGH, SymbolType.HIGH, SymbolType.HIGH, SymbolType.HIGH, SymbolType.HIGH]);
            app.ticker.remove(stopSpinCallback, this);
        }
    };

    app.ticker.add(stopSpinCallback, this)
})();