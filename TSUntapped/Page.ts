/// <reference path="PageController.ts" />

/*
 *  Base class for all pages in the application.
 */
class Page {

    Name: string;
    Private: boolean;
    Controller: PageController;

    constructor(Name: string) {
        this.Name = Name;
        this.Controller = null;
    }

    public OnShow() {
        Logger.Log("Page " + this.Name + " showing.");
    }

    public OnHide() {
        Logger.Log("Page " + this.Name + " hiding.");
    }

    public Container = function () {
        //  shortcut for easier access to container
        return <HTMLElement> this.Controller.Application.ContentContainer;
    }

}