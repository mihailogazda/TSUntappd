/// <reference path="../Page.ts" />

class LogInToInstagram extends Page {

    constructor() {
        super("LogInToInstagram");
        this.Private = true;
    }

    public OnShow() {

        this.Container().appendChild(ElementFactory.CreateHeading1("Step 1: Log-in to Instagram"));
        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateParagraph("Please click the button bellow to log in to Instagram."));
        this.Container().appendChild(ElementFactory.CreateParagraph("You will be asked to accept basic permisions in order to import your images."));
        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateBR());

        this.Container().appendChild(ElementFactory.CreateButton("Log in now", StyleController.ButtonSuccessClassName, function () {
            window.location.href = new InstagramRequest().GetTokenApiString();
        }));

    }

    public OnHide() {

    }
}   