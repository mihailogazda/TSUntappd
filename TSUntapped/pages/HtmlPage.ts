/// <reference path="../Page.ts" />

/*
 *  This page loads HTML from static file and loads it into content
 */
class HtmlPage extends Page {
    Path: string;

    constructor(Name: string, Path: string) {
        super(Name);
        this.Path = Path;
    }

    public OnShow() {
        super.OnShow();

        var self = this;
        var xml = new XMLHttpRequest();
        xml.open("get", this.Path, true);
        xml.onload = function (e) {
            self.Container().innerHTML = xml.responseText;
        };
        xml.send();
    }

} 