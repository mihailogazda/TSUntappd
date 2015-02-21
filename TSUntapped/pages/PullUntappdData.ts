/// <reference path="../Page.ts" />
/// <reference path="../UntappdRequest.ts" />
/// <reference path="ErrorPage.ts" />

class PullUntappdData extends Page {

    UserName: string;

    XmlRequest: XMLHttpRequest;
    Loader: HTMLElement;
    ImageContent: HTMLElement;
    UntappdRequest: UntappdRequest;
    JSONObject: JSON;

    constructor(Username: string) {
        super("PullUntappdData");

        this.Private = true;
        this.UserName = Username;
        this.UntappdRequest = new UntappdRequest(this.UserName);
    }

    public OnShow() {

        this.Container().appendChild(ElementFactory.CreateHeading2("Untappd Images Viewer"));

        var loader = ElementFactory.CreateDiv();
        loader.appendChild(ElementFactory.CreateImage("images/loading.gif"));
        loader.appendChild(ElementFactory.CreateBR());
        loader.appendChild(ElementFactory.CreateParagraph("Loading data for user : " + this.UserName));
        this.Loader = <HTMLElement> this.Container().appendChild(loader);

        this.ImageContent = <HTMLElement> this.Container().appendChild(ElementFactory.CreateDiv());

        //  Initial request
        var fullUrl = this.UntappdRequest.GetPhotosRequest();

        this.MakeNewRequest(fullUrl);

    }

    public MakeNewRequest(Url: string) {
        this.XmlRequest = new XMLHttpRequest();
        this.XmlRequest.open("get", Url, true);
        var self = this;
        this.XmlRequest.onload = function (e) {
            //alert(self.XmlRequest.responseText);
            self.JSONObject = JSON.parse(self.XmlRequest.responseText);
            self.ResolveJSON(Url);
        };
        this.XmlRequest.send();
    }

    public ResolveJSON(LastRequest: string) {

        var meta = this.JSONObject["meta"];
        var errorCode = meta["code"];

        if (errorCode == 200) {
            var response = this.JSONObject["response"];
            if (response) {
                //  Load media
                var media = response["media"];

                if (media) {
                    var count = media["count"];
                    if (count > 0) {

                        var items = media["items"];

                        for (var i = 0; i < count; i++) {
                            var item = items[i];
                            var photoID = item["photo_id"];
                            var photo = item["photo"];
                            var photoURL = photo["photo_img_md"];

                            //Logger.Log(photoURL);

                            this.ImageContent.appendChild(ElementFactory.CreateImage(photoURL, StyleController.ImageRoundedClassName));

                        }
                    }
                }

                //  Check pagination
                var continued = false;
                var pagination = response["pagination"];
                if (pagination) {
                    var nextURL = pagination["next_url"];
                    if (nextURL && nextURL.length > 0) {

                        nextURL = this.UntappdRequest.GetAuthenticatedApiString(nextURL);
                        continued = true;
                        Logger.Log("Continuing with : " + nextURL);
                        this.MakeNewRequest(nextURL);
                    }
                }

                if (!continued) {
                    this.AllDone();
                }
            }
        } else {
            var detail = meta["error_detail"];
            var epage = new ErrorPage(detail);
            this.Controller.AddPage(epage);
            this.Controller.ShowPageWithInstance(epage);
        }
    }

    public AllDone() {
        this.Loader.hidden = true;
    }

}  