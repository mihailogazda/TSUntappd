/// <reference path="../Page.ts" />

class ImportImagesToInstagram extends Page {

    UntappdRecords: Array<UntappdRecord>;

    constructor(Records : Array<UntappdRecord>) {
        super("ImportImagesToInstagram");
        this.Private = true;
        this.UntappdRecords = Records;
    }

    public OnShow() {

        this.Container().appendChild(ElementFactory.CreateHeading1("Importing images..."));

    }

    public OnHide() {

    }
}  