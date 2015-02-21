
class Logger {

    static Enabled: boolean;
    static _Instance = new Logger();

    public static Log(message : any) {
        Logger._Instance.Log(message);
    }

    private Log(message : any) {
        if (Logger.Enabled) {
            console.log(message);
        }
    }

}

//  Enabled by default
Logger.Enabled = true;