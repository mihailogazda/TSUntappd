/// <reference path="../Page.ts" />
/// <reference path="../InstagramRequest.ts" />
/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />

class VerifyInstagramLogin_v2 extends Page {

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

        var url = window.location.href + "/php/image.php";
        var params = "username=" + InstagramCookie.Username + "&password=" + InstagramCookie.Password;

        var request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        var self = this;
        request.onload = function () {
            if (request.status == 200) {
                self.ProcesJSON(JSON.parse(request.responseText));
            } else {
                self.ShowError(request.statusText);
            }
        }

        request.send(params);
    }

    private ShowError(Text: string) {
        var epage = new ErrorPage(Text);
        this.Controller.AddPage(epage);
        this.Controller.ShowPageWithInstance(epage);
    }


    private ProcesJSON(json: JSON) {
        var code = json[0];
        var message = json[1];
        var omes = message.replace(/\\"/g, '"');

        var data = JSON.parse(omes);
        var user = data["logged_in_user"];

        if (code == 200) {

            var username = user["username"];
            var fullname = user["full_name"];
            var image = <string> user["profile_pic_url"];

            this.Loader.hidden = true;
            this.Container().appendChild(ElementFactory.CreateHeading2("Is this you?"));

            this.Container().appendChild(ElementFactory.CreateImage(image, StyleController.ImageRoundedClassName));
            this.Container().appendChild(ElementFactory.CreateBR());

            this.Container().appendChild(ElementFactory.CreateParagraph("UserName : " + username));
            this.Container().appendChild(ElementFactory.CreateParagraph("Full name : " + fullname));

            var self = this;
            this.Container().appendChild(ElementFactory.CreateButton("Yes", StyleController.ButtonSuccessClassName, function () {
                var page = new EnterUntappdUsername();
                self.Controller.AddPage(page);
                self.Controller.ShowPageWithInstance(page);
            }));

            this.Container().appendChild(ElementFactory.CreateButton("NO", StyleController.ButtonDefaultClassName, function () {
                var page = new LogInToInstagram_v2();
                self.Controller.AddPage(page);
                self.Controller.ShowPageWithInstance(page);
            }));


        } else {
            this.ShowError(message);
        }
    }

    public OnHide() {

    }
}  