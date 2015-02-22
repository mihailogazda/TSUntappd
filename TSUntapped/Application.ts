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

        //this.TestSelector();
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

    public ShowPage(Name: string) {
        this.PageController.ShowPage(Name);
    }
} 