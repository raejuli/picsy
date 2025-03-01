export class AssetHandler
{
    private static _instance?: AssetHandler;

    private constructor()
    {
    }

    public static get(): AssetHandler
    {
        return this._instance ?? new AssetHandler();
    }
}