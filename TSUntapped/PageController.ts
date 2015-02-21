/// <reference path="Page.ts" />
/// <reference path="NavBarController.ts" />

/*
 *  Controller class to display and stack pages.
 *
 */
class PageController {
    CurrentPage: Page;
    Application: Application;
    NavBarController: NavBarController;
    Pages: Array<Page>;

    constructor(App: Application) {
        this.CurrentPage = null;
        this.Pages = new Array<Page>();
        this.Application = App;
        this.NavBarController = new NavBarController(this, this.Application.NavBarContainer);
    }

    public AddPage(Page: Page) {
        Page.Controller = this;
        this.Pages.push(Page);

        if (!Page.Private) {
            this.NavBarController.OnPageAdded(Page);
        }
    }

    public GetPage(Name: string): Page {
        var retValue: Page;
        this.Pages.forEach(function (page) {
            //Logger.Log("Page name : " + page.Name);
            if (page.Name == Name) {
                retValue = page;
                return;
            }
        });
        return retValue;
    }

    public ShowPageWithIndex(Index: number) {
        var page = this.Pages[Index];
        this.ShowPage(page.Name);
    }

    public ShowPage(Name: string) {
        var page = this.GetPage(Name);
        if (page) {
            this._ShowPage(page);
        } else {
            Logger.Log("Cannot find page " + Name);
        }
    }

    public ShowPageWithInstance(Page: Page) {
        this._ShowPage(Page);
    }

    private _ShowPage(Page: Page) {

        //  Do nothing if current page
        if (this.CurrentPage == Page) {
            return;
        }

        //  Notify old page that we are hiding now
        if (this.CurrentPage != null) {
            this.CurrentPage.OnHide();
        }

        //  Reset container content
        this.Application.ContentContainer.innerHTML = "";

        //  Play next page
        this.CurrentPage = Page;
        this.CurrentPage.OnShow();

        //  Let navbar controller avare of change
        this.NavBarController.OnPageChanged(Page);
    }

}