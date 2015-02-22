/// <reference path="../Page.ts" />

class ImportImagesToInstagram extends Page {

    UntappdRecords: Array<UntappdRecord>;

    constructor(Records: Array<UntappdRecord>) {
        super("ImportImagesToInstagram");
        this.Private = true;
        this.UntappdRecords = Records;
    }

    public OnShow() {

        this.Container().appendChild(ElementFactory.CreateHeading1("Importing images..."));
        this.Container().appendChild(ElementFactory.CreateBR());

        var selectedRecordsCount = 0;
        this.UntappdRecords.forEach(function (record) {
            if (record.Selected) {
                selectedRecordsCount++;
            }
        });

        //  Create progress bar
        var progressImage = <HTMLImageElement> this.Container().appendChild(ElementFactory.CreateImage("", StyleController.ImageRoundedClassName));
        progressImage.width = 128;
        progressImage.height = 128;

        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateBR());
        var progressMessage = <HTMLElement> this.Container().appendChild(ElementFactory.CreateParagraph(""));

        var progressBar = this.Container().appendChild(ElementFactory.CreateDiv(StyleController.ProgressBarParentClassName));
        var innerProgressBar = <HTMLElement> progressBar.appendChild(ElementFactory.CreateDiv(StyleController.ProgressBarInnerClassName));
        innerProgressBar.setAttribute("role", "progressbar");

        this.Container().appendChild(progressBar);

        var self = this;
        //  Next button is hiddne
        var nextButton = <HTMLElement> this.Container().appendChild(ElementFactory.CreateButton("Finish", StyleController.ButtonSuccessClassName, function () {
            //  Continue to next level
            var next = new CompletedPage();
            self.Controller.AddPage(next);
            self.Controller.ShowPageWithInstance(next);
        }));

        nextButton.hidden = true;
        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateBR());

        var errors = this.Container().appendChild(ElementFactory.CreateDiv());

        //  Now upload images
        var counter = 0, successCounter = 0;
        this.UntappdRecords.forEach(function (record) {                               
            //  Skip unselected records
            if (!record.Selected)
                return;

            //  Form url for upload
            var url = window.location.href;
            url = url.substr(0, url.lastIndexOf("/"));
            url += "/php/upload.php?username=" + InstagramCookie.Username + "&password=" + InstagramCookie.Password + "&image=" + record.ImageLargeURL + "&caption=" + "UntappdImage " + record.ImageID;

            try {
                //  Upload image
                var req = new XMLHttpRequest();
                req.open("get", url, true);
                req.onload = function () {
                    //  success?
                    counter++;

                    if (req.responseText == "Success") {
                        successCounter++;
                    }

                    //  Set progress message
                    var i = counter + 1;
                    progressMessage.innerHTML = "Processing image : " + record.ImageID + " (Successfull: " + successCounter + ")";
                    innerProgressBar.setAttribute("style", "width:" + ((i / selectedRecordsCount) * 100) + "%;");
                    progressImage.src = record.ImageMediumURL;

                };
                req.send();
            } catch (e) {
                errors.appendChild(ElementFactory.CreateParagraph("Failed to upload " + record.ImageLargeURL));
            }

            counter++;
        });


        //  Unide next button
        nextButton.hidden = false;
    }

    public OnHide() {

    }
}  