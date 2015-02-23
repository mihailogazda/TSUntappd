/// <reference path="../Page.ts" />

class CompletedPage extends Page {

    constructor() {
        super("CompletedPage");
        this.Private = true;
    }

    public OnShow() {
        var self = this;
        this.Container().appendChild(ElementFactory.CreateHeading1("Thank you for using this app."));

        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateParagraph("Hopefully your images are now imported. :)"));
        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateBR());

        this.Container().appendChild(ElementFactory.CreateButton("Go back to home", StyleController.ButtonSuccessClassName, function () {
            self.Controller.ShowPageWithIndex(0);
        }));
    }

    public OnHide() {

    }
}   