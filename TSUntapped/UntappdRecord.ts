﻿/*
 *  Single Untappd Image Record
 */
class UntappdRecord {

    ImageID: string;
    ImageMediumURL: string;
    ImageLargeURL: string;
    CreatedTimestamp: string;

    constructor(ID: string, Created: string, MediumURL: string, LargeURL: string) {
        this.ImageID = ID;
        this.CreatedTimestamp = Created;
        this.ImageMediumURL = MediumURL;
        this.ImageLargeURL = LargeURL;
    }
}