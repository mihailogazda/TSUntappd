/// <reference path="PageController.ts" />
/// <reference path="NavBarItem.ts" />

class NavBarController {

    NavBarOwner: HTMLElement;
    NavBarElement: HTMLElement;
    PageController: PageController;
    Items: Array<NavBarItem>;

    constructor(Controller: PageController, Owner: HTMLElement) {
        this.NavBarOwner = Owner;
        this.PageController = Controller;
        this.NavBarElement = null;
        this.Items = new Array<NavBarItem>();

        this.Create();
    }

    public OnPageAdded(Page: Page) {
        var element = <HTMLElement> this.NavBarElement.appendChild(document.createElement("li"));
        this.Items.push(new NavBarItem(this, Page, element));
    }

    public OnPageChanged(Page: Page) {
        var self = this;
        this.Items.forEach(function (item) {
            item.SetActive(item.Page == Page);
        });
    }

    private Create() {
        var self = this;

        this.NavBarElement = <HTMLElement> this.NavBarOwner.appendChild(document.createElement("ul"));
        this.NavBarElement.setAttribute("class", StyleController.NavBarOwnerClassName);
        Logger.Log("Creating element : " + this.NavBarElement);
    }

} 