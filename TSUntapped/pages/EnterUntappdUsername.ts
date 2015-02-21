/// <reference path="../Page.ts" />


class EnterUntappdUsername extends Page {

    constructor() {
        super("EnterUntappdUsername");
        this.Private = true;
    }

    public OnShow() {

        var head = <HTMLElement> this.Container().appendChild(document.createElement("h3"));
        head.innerHTML = " Please enter your Untappd.com UserName to begin.";

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