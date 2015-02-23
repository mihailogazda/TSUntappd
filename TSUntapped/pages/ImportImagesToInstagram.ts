/// <reference path="../Page.ts" />

class ImportImagesToInstagram extends Page {

    UntappdRecords: Array<UntappdRecord>;

    Counter: number;
    SuccessCounter: number;
    TotalCounter: number;
    DoneCounter: number;

    ProgressBar: HTMLElement;
    ProgressMessage: HTMLElement;
    ProgressImage: HTMLImageElement;
    ProgressErrors: HTMLElement;
    NextButton: HTMLElement;

    constructor(Records: Array<UntappdRecord>) {
        super("ImportImagesToInstagram");
        this.Private = true;
        this.UntappdRecords = Records;
        this.Counter = 0;
        this.SuccessCounter = 0;
        this.DoneCounter = 0;
    }

    public OnShow() {
        var self = this;

        this.Container().appendChild(ElementFactory.CreateHeading1("Importing images..."));
        this.Container().appendChild(ElementFactory.CreateBR());

        this.TotalCounter = 0;
        this.UntappdRecords.forEach(function (record) {
            if (record.Selected) {
                self.TotalCounter++;
            }
        });

        //  Create progress bar
        this.ProgressImage = <HTMLImageElement> this.Container().appendChild(ElementFactory.CreateImage("", StyleController.ImageRoundedClassName));
        this.ProgressImage.width = 128;
        this.ProgressImage.height = 128;

        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateBR());
        this.ProgressMessage = <HTMLElement> this.Container().appendChild(ElementFactory.CreateParagraph(""));

        var progressBar = this.Container().appendChild(ElementFactory.CreateDiv(StyleController.ProgressBarParentClassName));
        this.ProgressBar = <HTMLElement> progressBar.appendChild(ElementFactory.CreateDiv(StyleController.ProgressBarInnerClassName));
        this.ProgressBar.setAttribute("role", "progressbar");
        self.ProgressBar.setAttribute("style", "width:" + "0%;");

        this.Container().appendChild(progressBar);
        
        //  Next button is hiddne
        this.NextButton = <HTMLElement> this.Container().appendChild(ElementFactory.CreateButton("Finish", "", function () {
            //  Continue to next level
            var next = new CompletedPage();
            self.Controller.AddPage(next);
            self.Controller.ShowPageWithInstance(next);
        }));

        this.NextButton.hidden = true;
        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateBR());

        this.ProgressErrors = <HTMLElement> this.Container().appendChild(ElementFactory.CreateDiv());

        //  Now upload images             
        this.ContinueWithNextRecord();
    }

    private AllDone() {
        //  Unide next button
        Logger.Log("All done");

        this.NextButton.hidden = false;
        this.NextButton.setAttribute("class", StyleController.ButtonSuccessClassName);
    }

    private RefreshProgress(Record: UntappdRecord) {
        //  Set progress message
        this.ProgressBar.setAttribute("style", "width:" + ((this.DoneCounter / this.TotalCounter) * 100) + "%;");
        if (Record) {
            this.ProgressMessage.innerHTML = "Processing image : " + Record.ImageID + " (Successfull: " + this.SuccessCounter + "/" + this.TotalCounter + ")";
            this.ProgressImage.src = Record.ImageMediumURL;
        }
    }

    private ContinueWithNextRecord() {
        if (this.Counter < this.UntappdRecords.length) {
            var record = this.UntappdRecords[this.Counter];
            this.RefreshProgress(record);
            this.ProcessRecord(record);
        } else {
            this.RefreshProgress(null);
            this.AllDone();
        }
    }

    private ProcessRecord(Record: UntappdRecord) {

        //  Skip unselected records
        if (!Record.Selected) {
            this.Counter++;
            this.ContinueWithNextRecord();
            return;
        }

        var self = this;

        //  Form url for upload
        var url = window.location.href;
        url = url.substr(0, url.lastIndexOf("/"));
        url += "/php/upload.php?username=" + InstagramCookie.Username + "&password=" + InstagramCookie.Password + "&image=" + Record.ImageLargeURL + "&caption=" + "UntappdImage " + Record.ImageID;

        try {
            //  Upload image
            var req = new XMLHttpRequest();
            req.open("get", url, true);
            req.onload = function () {

                if (req.responseText == "Success") {
                    self.SuccessCounter++;
                }

                self.Counter++;
                self.DoneCounter++;
                self.ContinueWithNextRecord();
            };
            req.send();
        } catch (e) {
            this.ProgressErrors.appendChild(ElementFactory.CreateParagraph("Failed to upload " + Record.ImageLargeURL));
            this.DoneCounter++;
            this.Counter++;
            this.ContinueWithNextRecord();
        }
    }

    public OnHide() {

    }
}  