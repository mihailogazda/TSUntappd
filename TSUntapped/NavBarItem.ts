/// <reference path="NavBarController.ts" />

class NavBarItem {
    Page: Page;
    Controller: NavBarController;
    Element: HTMLElement;

    constructor(Owner: NavBarController, Page: Page, Element: HTMLElement) {
        this.Element = Element;
        this.Page = Page;
        this.Controller = Owner;

        var link = <HTMLElement> this.Element.appendChild(document.createElement("a"));
        link.innerHTML = this.Page.Name;

        var self = this;
        link.onclick = function () {
            var isAccepted = true;
            var currentPageIsPrivate = self.Controller.PageController.CurrentPage.Private;
            if (currentPageIsPrivate) {
                isAccepted = confirm("Current page with name \"" + self.Controller.PageController.CurrentPage.Name + "\" is private and you might not be able to return to this page. Are you sure you want to continue?");
            }
            if (isAccepted) {
                self.Page.Controller.ShowPageWithInstance(self.Page);
            }
        };
    }

    public SetActive(Active: boolean) {
        this.Element.setAttribute("class", Active ? "active" : "");
    }
} 