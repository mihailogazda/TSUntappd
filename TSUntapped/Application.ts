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

        var untappdUsername = new EnterUntappdUsername();
        var loginToInstagram = new LogInToInstagram();

        //  Add base pages
        this.PageController.AddPage(home);
        this.PageController.AddPage(about);
        this.PageController.AddPage(untappdUsername);
        this.PageController.AddPage(loginToInstagram);

        //  Check which page to display depending on instagram data
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
        else {
            //  Just show regular main page
            this.PageController.ShowPageWithIndex(0);
        }

        //this.TestSelector();
        //this.TestInstagramLogin();
    }

    public ShowPage(Name: string) {
        this.PageController.ShowPage(Name);
    }

    private TestInstagramLogin() {
        var page = new VerifyInstagramLogin();
        this.PageController.AddPage(page);
        this.PageController.ShowPageWithInstance(page);
    }

    private TestSelector() {
        var records = new Array<UntappdRecord>();
        for (var i = 0; i < 50; i++) {
            var record = new UntappdRecord("100", "unknown", "https://scontent-vie.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10410891_10152593344278562_1888852273573356703_n.jpg?oh=83b229ae207e5e412e076c8c6a6a417a&oe=55942B5C", "https://scontent-vie.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10410891_10152593344278562_1888852273573356703_n.jpg?oh=83b229ae207e5e412e076c8c6a6a417a&oe=55942B5C");
            records.push(record);
        }

        var pp = new ShowUntappdData(records);
        this.PageController.AddPage(pp);
        this.PageController.ShowPageWithInstance(pp);
    }

    private TestImporter() {
        var records = new Array<UntappdRecord>();
        for (var i = 0; i < 50; i++) {
            var record = new UntappdRecord("" + i + 1, "unknown", "https://scontent-vie.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10410891_10152593344278562_1888852273573356703_n.jpg?oh=83b229ae207e5e412e076c8c6a6a417a&oe=55942B5C", "https://scontent-vie.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10410891_10152593344278562_1888852273573356703_n.jpg?oh=83b229ae207e5e412e076c8c6a6a417a&oe=55942B5C");
            records.push(record);
        }

        var pp = new ImportImagesToInstagram(records);
        this.PageController.AddPage(pp);
        this.PageController.ShowPageWithInstance(pp);
    }


} 