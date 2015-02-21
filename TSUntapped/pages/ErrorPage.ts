/// <reference path="../Page.ts" />

class ErrorPage extends Page {

    ErrorText: string;

    constructor(Text : string) {
        super("EmptyPage");
        this.ErrorText = Text;
        this.Private = true;
    }

    public OnShow() {

        this.Container().appendChild(ElementFactory.CreateHeading1("Ooops... An error occured... :("));
        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateParagraph(this.ErrorText));
        this.Container().appendChild(ElementFactory.CreateBR());

        var self = this;
        this.Container().appendChild(ElementFactory.CreateButton("Go back to Home", StyleController.ButtonWarningClassName, function () {
            self.Controller.ShowPage("Home");
        }));

    }

    public OnHide() {

    }
}  