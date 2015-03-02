

class InstagramRequest {

    ClientID: string;
    BaseAPI: string;

    constructor() {
        this.ClientID = "";
        this.BaseAPI = "https://api.instagram.com/v1/";
    }

    GetAuthentication() {
        return "?access_token=" + new InstagramStateManager().Token;
    }

    GetFullApiString(Request: string) {
        return this.BaseAPI + Request + this.GetAuthentication();
    }

    GetTokenApiString() {
        //https://instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=token
        return "https://instagram.com/oauth/authorize/?client_id=" + this.ClientID + "&redirect_uri=" + window.location + "&response_type=token";
    }
} 
