/// <reference path="../Page.ts" />

class LogInToInstagram_v2 extends Page {

    constructor() {
        super("LogInToInstagram");
        this.Private = true;
    }

    public OnShow() {

        this.Container().appendChild(ElementFactory.CreateHeading1("Step 1: Log-in to Instagram"));
        this.Container().appendChild(ElementFactory.CreateBR());

        this.Container().appendChild(ElementFactory.CreateParagraph("Please enter Instagram username"));
        var userField = <HTMLInputElement> this.Container().appendChild(ElementFactory.CreateTextInput("My Instagram username", StyleController.InputTextClassName));

        this.Container().appendChild(ElementFactory.CreateParagraph("Please enter Instagram password"));
        var passField = <HTMLInputElement> this.Container().appendChild(ElementFactory.CreatePasswordInput("My password", StyleController.InputTextClassName));

        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateParagraph("Please click the button bellow to log in to Instagram."));
        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateBR());

        var self = this;
        this.Container().appendChild(ElementFactory.CreateButton("Log in now", StyleController.ButtonSuccessClassName, function () {
            if (userField.value.length > 0 && passField.value.length > 0) {
                //  store values
                InstagramCookie.Username = userField.value;
                InstagramCookie.Password = passField.value;
                //  go to next page
                self.Continue();
            } else {
                alert("Please enter your credentials.");
            }
        }));

    }

    private Continue() {
        var page = new VerifyInstagramLogin_v2();
        this.Controller.AddPage(page);
        this.Controller.ShowPageWithInstance(page);
    }

    public OnHide() {

    }
}   