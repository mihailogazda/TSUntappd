/// <reference path="../Page.ts" />
/// <reference path="../UntappdRequest.ts" />
/// <reference path="ErrorPage.ts" />
/// <reference path="../UntappdRecord.ts" />
/// <reference path="ShowUntappdData.ts" />

/*
 *  Page that pulls untappd data 
 */
class PullUntappdData extends Page {

    UserName: string;

    XmlRequest: XMLHttpRequest;
    Loader: HTMLElement;
    ProgressParagraph: HTMLElement;

    UntappdRequest: UntappdRequest;
    JSONObject: JSON;

    UntappdRecords: Array<UntappdRecord>;

    constructor(Username: string) {
        super("PullUntappdData");

        this.Private = true;
        this.UserName = Username;
        this.UntappdRequest = new UntappdRequest(this.UserName);
        this.UntappdRecords = new Array<UntappdRecord>();
    }

    public OnShow() {

        this.Container().appendChild(ElementFactory.CreateHeading2("Loading data for user : " + this.UserName));
        this.Loader = <HTMLElement> this.Container().appendChild(ElementFactory.CreateLoader("Downloading data..."));
        this.ProgressParagraph = <HTMLElement> this.Loader.appendChild(ElementFactory.CreateParagraph(""));

        //  Initial request
        var fullUrl = this.UntappdRequest.GetPhotosRequest();

        this.MakeNewRequest(fullUrl);

    }

    private MakeNewRequest(Url: string) {
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

    private ResolveJSON(LastRequest: string) {

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
                            var photoCreated = item["created_at"];

                            var photo = item["photo"];
                            var photoURL = photo["photo_img_md"];
                            var photoURLLarge = photo["photo_img_lg"];

                            var record = new UntappdRecord(photoID, photoCreated, photoURL, photoURLLarge);
                            this.UntappdRecords.push(record);

                            //Logger.Log(photoURL);

                            this.LoadSingleImage(record);
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

    private AllDone() {
        this.Loader.hidden = true;
        var showDataPage = new ShowUntappdData(this.UntappdRecords);
        this.Controller.AddPage(showDataPage);
        this.Controller.ShowPageWithInstance(showDataPage);
    }

    private LoadSingleImage(Record: UntappdRecord) {
        var counter = this.UntappdRecords.length;
        this.ProgressParagraph.innerHTML = "Downloaded: " + counter + " images...";
        Logger.Log("Pulling image : " + counter);
    }

}  