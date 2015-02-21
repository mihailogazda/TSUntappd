/// <reference path="Logger.ts" />
/// <reference path="ElementFactory.ts" />
/// <reference path="PageController.ts" />
/// <reference path="NavBarController.ts" />

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

        var home = new HtmlPage("Home", "pages/static/main.html");
        var about = new HtmlPage("About", "pages/static/about.html");

        var step1 = new EnterUntappdUsername();
        

        this.PageController.AddPage(home);
        this.PageController.AddPage(about);
        this.PageController.AddPage(step1);

        this.PageController.ShowPageWithIndex(0);
    }

    public ShowPage(Name: string) {
        this.PageController.ShowPage(Name);
    }
} 