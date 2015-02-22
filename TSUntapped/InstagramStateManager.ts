
/*
 *  Instagram state types
 */
enum InstagramStateType {
    NOT_INSTAGRAM,
    INSTAGRAM_OK,
    INSTAGRAM_FAIL
}

/*
 *  Checks instagram state
 */
class InstagramStateManager {

    Token: string;
    State: InstagramStateType;
    ErrorMessage: string;

    constructor() {
        this.ErrorMessage = "Unknown Instagram Error";
        this.GetInstagramState();
    }

    private GetInstagramState() {
        var href = window.location.href;

        //  Then check if token is fetched
        if (href.indexOf("#access_token=") != -1) {
            //  parse token
            var token = "#access_token=";
            this.Token = href.substr(href.indexOf(token) + token.length);
            this.State = InstagramStateType.INSTAGRAM_OK;
        }
        //  First check if user denied
        else if (href.indexOf("?error_reason") != -1) {
            //  get message
            var error = "&error_description=";
            var index = href.indexOf(error);
            this.ErrorMessage = href.substring(index + error.length);
            this.State = InstagramStateType.INSTAGRAM_FAIL;
        }
        else {
            //  this is not a instagram state
            this.State = InstagramStateType.NOT_INSTAGRAM;
        }
    }


} 