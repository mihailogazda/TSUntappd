
class UntappdRequest {

    ClientID: string;
    ClientSecret: string;
    Username: string;
    ApiBase: string;

    constructor(Username: string) {
        this.ClientID = "90EC6DA7893C58FD2DC6289B4FEEC245A4C38A7A";
        this.ClientSecret = "E38234FC65C90F022AE50187172BD958C3B55C1E";
        this.ApiBase = "https://api.untappd.com/v4/";
        this.Username = Username;
    }

    public GetImageAPI() {
    }

    public GetStringSuffix() {
        return "&client_id=" + this.ClientID + "&client_secret=" + this.ClientSecret;
    }

    public GetPhotosRequest() {
        return this.GetFullApiString("user/photos/");
    }

    /*
     *  Forms full request with just method name.
     *  E.g. Pass user/photos/ to get 
     *  https://api.untappd.com/v4/user/photos/mihailogazda?client_id=90EC6DA7893C58FD2DC6289B4FEEC245A4C38A7A&client_secret=E38234FC65C90F022AE50187172BD958C3B55C1E
     */
    public GetFullApiString(ApiRequest: string) {
        return this.GetAuthenticatedApiString(this.ApiBase + ApiRequest + this.Username + "?m=true");
    }

    /*
     *  Just adds authenitication data to already formed URL API
     *  E.g. Pass https://api.untappd.com/v4/user/photos/mihailogazda to get 
     *  https://api.untappd.com/v4/user/photos/mihailogazda?client_id=90EC6DA7893C58FD2DC6289B4FEEC245A4C38A7A&client_secret=E38234FC65C90F022AE50187172BD958C3B55C1E
     */
    public GetAuthenticatedApiString(ApiRequest: string) {
        ApiRequest = ApiRequest.replace("http://", "https://");
        return ApiRequest + this.GetStringSuffix();
    }

} 