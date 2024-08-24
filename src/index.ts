
import {Application, Assets, Sprite} from 'pixi.js';

(async () =>
{
    const app = new Application();
    await app.init({background: '#1099bb', resizeTo: window})

    document.body.style.margin = '0';
    app.renderer.canvas.style.display = 'block';
    app.renderer.canvas.style.position = 'absolute';

    document.body.appendChild(app.canvas);

    const texture = await Assets.load('assets/hello-world.png');
    const image = new Sprite(texture);
    app.stage.addChild(image);
    image.anchor.set(0.5, 0.5);
    image.x = app.screen.width / 2;
    image.y = app.screen.height / 2;
})();
