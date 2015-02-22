/// <reference path="../Page.ts" />
/// <reference path="../InstagramRequest.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />

class VerifyInstagramLogin extends Page {

    InstagramRequest: InstagramRequest;
    Loader: HTMLElement;

    constructor() {
        super("VerifyInstagramLogin");
        this.Private = true;
        this.InstagramRequest = new InstagramRequest();
    }

    public OnShow() {

        //  Create waiting gif
        this.Loader = <HTMLElement> this.Container().appendChild(ElementFactory.CreateLoader("Verifying login..."));

        var request = this.InstagramRequest.GetFullApiString("users/self/");
        var self = this;
        Logger.Log("Triggering: " + request);

        this.MakeAjaxRequest(request, function (json) {
            self.ProcessJSON(json);
        }, function (error) {
                self.ShowError(error.responseText);
            });
    }

    public MakeAjaxRequest(Url: string, HandlerSucess: Function, HandlerFail: Function = null) {
        //  Make AJAX request from JQuery to bypass cross-domain restrictions
        $.ajax({
            type: 'GET',
            url: Url,
            async: false,
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function (json) {
                HandlerSucess(json);
            },
            error: function (e) {
                HandlerFail(e);
            }
        });
    }

    private ShowError(Text: string) {
        var epage = new ErrorPage(Text);
        this.Controller.AddPage(epage);
        this.Controller.ShowPageWithInstance(epage);
    }

    private ProcessJSON(JSON: JSON) {
        var meta = JSON["meta"];
        var code = meta["code"];

        if (code != 200) {
            var etype = meta["error_type"];
            var emessage = meta["error_message"];
            var message = etype + " (" + emessage + ")";
            this.ShowError(message);
        }
        else {

            var data = JSON["data"];
            var username = data["username"];
            var picture = data["profile_picture"];

            this.Loader.innerHTML = "";
            this.Loader.appendChild(ElementFactory.CreateBR());
            this.Loader.appendChild(ElementFactory.CreateBR());
            this.Loader.appendChild(ElementFactory.CreateImage(picture));
            this.Loader.appendChild(ElementFactory.CreateParagraph("Logged in as : " + username));
            this.Loader.appendChild(ElementFactory.CreateBR());
            this.Loader.appendChild(ElementFactory.CreateBR());

            this.Loader.appendChild(ElementFactory.CreateButton("Continue", StyleController.ButtonSuccessClassName, function () {
                //  go to next page
                ApplicationInstance.ShowPage("EnterUntappdUsername");
            }));
        }
    }

    public OnHide() {

    }
}  