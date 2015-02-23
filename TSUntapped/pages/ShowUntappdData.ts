/// <reference path="../Page.ts" />

class ShowUntappdData extends Page {

    UntappdRecords: Array<UntappdRecord>;
    ImageContent: HTMLElement;
    Counter: number;
    LastParent: HTMLElement;

    constructor(Records: Array<UntappdRecord>) {
        super("ShowUntappdData");
        this.Private = true;
        this.UntappdRecords = Records;
        this.Counter = 0;
    }

    public OnShow() {
        var self = this;
        this.Container().appendChild(ElementFactory.CreateHeading2("Step 3: Select images to import"));
        this.Container().appendChild(ElementFactory.CreateParagraph("(Continue button at end of this page)"));

        //  Buttons to select all and nothing
        this.Container().appendChild(ElementFactory.CreateButton("Select all", StyleController.ButtonDefaultClassName, function () {
            self.SelectAllItems(true);
        }));

        this.Container().appendChild(ElementFactory.CreateButton("Select none", StyleController.ButtonDefaultClassName, function () {
            self.SelectAllItems(false);
        }));

        this.Container().appendChild(ElementFactory.CreateBR());
        this.Container().appendChild(ElementFactory.CreateBR());

        //  Image container with records
        this.ImageContent = <HTMLElement> this.Container().appendChild(ElementFactory.CreateDiv("image-container"));
        this.LastParent = this.ImageContent;
        
        this.UntappdRecords.forEach(function (record) {
            self.ShowSingleRecord(record);
        });

        this.Container().appendChild(ElementFactory.CreateBR());
        
        //  Continue button
        this.Container().appendChild(ElementFactory.CreateButton("Continue with selected images", StyleController.ButtonSuccessClassName, function () {
            self.Continue();
        }));

        for (var i = 0; i < 3; i++)
            this.Container().appendChild(ElementFactory.CreateBR());
    }

    private SelectAllItems(Value: boolean) {
        var items = this.ImageContent.getElementsByTagName("input");
        for (var i = 0; i < items.length; i++) {
            items[i].checked = Value;
            items[i].onchange(null);
        }
    }

    private Continue() {
        var counter = 0;
        this.UntappdRecords.forEach(function (record) {
            if (record.Selected) {
                counter++;
            }
        });

        Logger.Log("Continuing with " + counter + " selected photographs.");

        var nextPage = new ImportImagesToInstagram(this.UntappdRecords);
        this.Controller.AddPage(nextPage);
        this.Controller.ShowPageWithInstance(nextPage);
    }

    private ShowSingleRecord(Record: UntappdRecord) {

        var numCols = 4;
        if (this.Counter == 0 || this.Counter % numCols == 0) {
            this.LastParent = <HTMLElement> this.ImageContent.appendChild(ElementFactory.CreateDiv("row"));
        }

        var col = this.LastParent.appendChild(ElementFactory.CreateDiv("col-md-" + 3));

        var span = col.appendChild(ElementFactory.CreateSpan());
        var image = ElementFactory.CreateImage(Record.ImageMediumURL, StyleController.ImageRoundedClassName);

        var check = ElementFactory.CreateCheckbox(Record.ImageID, true, StyleController.UntappdImageCheckboxClassname, function (checked) {
            Logger.Log("Checkbox with ID : " + Record.ImageID + " checked : " + checked);
            Record.Selected = checked;
        });

        span.appendChild(image);
        span.appendChild(check);

        this.LastParent.appendChild(col);
        this.Counter++;
    }

    public OnHide() {

    }
}  