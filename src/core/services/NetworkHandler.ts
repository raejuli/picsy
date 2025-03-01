export class NetworkHandler
{
    private static _instance?: NetworkHandler;

    private constructor()
    {
    }

    public static get(): NetworkHandler
    {
        return this._instance ?? new NetworkHandler();
    }
}