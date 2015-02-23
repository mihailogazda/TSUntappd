/// <reference path="Logger.ts" />
/// <reference path="ElementFactory.ts" />
/// <reference path="PageController.ts" />
/// <reference path="NavBarController.ts" />
/// <reference path="InstagramStateManager.ts" />

class Application {

    NavBarContainer: HTMLElement;
    ContentContainer: HTMLElement;
    PageController: PageController;

    constructor(NabBarContainer: HTMLElement, ContentContainer: HTMLElement) {
        this.NavBarContainer = NabBarContainer;
        this.ContentContainer = ContentContainer;
        this.PageController = new PageController(this);
    }

    public Start() {

        //  Create base pages
        var home = new HtmlPage("Home", "pages/static/main.html");
        var about = new HtmlPage("About", "pages/static/about.html");
        
        //  Preload because its called from HTML
        var loginToInstagram = new LogInToInstagram_v2();

        //  Add base pages
        this.PageController.AddPage(home);
        this.PageController.AddPage(about);
        this.PageController.AddPage(loginToInstagram);

        //  Check which page to display depending on instagram data
        /*
                USING OFFICIAL API DISABLED SINCE IMAGE UPLOAD IS NOT 
                    SUPPORTED. SWITCHED TO MANUAL DEVICE EMULATION
                                WITH PHP SCRIPTS.

        var instagramManager = new InstagramStateManager();

        Logger.Log("Instagram state : " + instagramManager.State);

        if (instagramManager.State == InstagramStateType.INSTAGRAM_OK) {
            //  User logged in to instagram
            this.TestInstagramLogin();
        } else if (instagramManager.State == InstagramStateType.INSTAGRAM_FAIL) {
            //  user did not authenticate application
            var error = new ErrorPage(instagramManager.ErrorMessage);
            this.PageController.AddPage(error);
            this.PageController.ShowPageWithInstance(error);
        }
        else {*/
            //  Just show regular main page
            this.PageController.ShowPageWithIndex(0);
        /*}*/
    }

    public ShowPage(Name: string) {
        this.PageController.ShowPage(Name);
    }




} 