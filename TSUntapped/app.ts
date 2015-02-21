/// <reference path="StyleController.ts" />
/// <reference path="Application.ts" />

//  Global Application Instance
var ApplicationInstance: Application;

window.onload = () => {

    Logger.Log("Application started");

    var navBarContainer = document.getElementById("navbar-container");
    var contentContainer = document.getElementById("content-container");

    ApplicationInstance = new Application(navBarContainer, contentContainer);
    ApplicationInstance.Start();
};