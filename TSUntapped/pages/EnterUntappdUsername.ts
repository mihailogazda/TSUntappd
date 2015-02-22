/// <reference path="../Page.ts" />


class EnterUntappdUsername extends Page {

    constructor() {
        super("EnterUntappdUsername");
        this.Private = true;
    }

    public OnShow() {
        
        this.Container().appendChild(ElementFactory.CreateHeading1("Step 2: Enter Untappd.com username"));
        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateBR());

        this.Container().appendChild(ElementFactory.CreateParagraph("Please enter your Untappd username to continue."));

        var input = <HTMLInputElement> this.Container().appendChild(ElementFactory.CreateTextInput("Your Untappd username", StyleController.InputTextClassName));

        this.Container().appendChild(ElementFactory.CreateBR());

        var self = this;
        //  Button and handler
        this.Container().appendChild(ElementFactory.CreateButton("Submit", StyleController.ButtonSuccessClassName, function () {
            var value = input.value;

            if (value.length > 2) {
                self.SubmitClicked(value);
            } else {
                alert("Please a valid user name (min 2 characters).");
            }

        }));// end button handler


    }

    public SubmitClicked(Username: string) {

        var pullPage = new PullUntappdData(Username);
        this.Controller.AddPage(pullPage);
        this.Controller.ShowPageWithInstance(pullPage);

    }

}  