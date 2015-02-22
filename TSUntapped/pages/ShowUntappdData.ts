/// <reference path="../Page.ts" />

class ShowUntappdData extends Page {

    UntappdRecords: Array<UntappdRecord>;
    ImageContent: HTMLElement;

    constructor(Records: Array<UntappdRecord>) {
        super("ShowUntappdData");
        this.Private = true;
        this.UntappdRecords = Records;
    }

    public OnShow() {

        this.Container().appendChild(ElementFactory.CreateHeading2("Untappd Images Viewer"));
        this.ImageContent = <HTMLElement> this.Container().appendChild(ElementFactory.CreateDiv());

        var self = this;
        this.UntappdRecords.forEach(function (record) {
            self.ShowSingleRecord(record);
        });
    }

    private ShowSingleRecord(Record: UntappdRecord) {
        this.ImageContent.appendChild(ElementFactory.CreateImage(Record.ImageMediumURL, StyleController.ImageRoundedClassName));
    }

    public OnHide() {

    }
}  