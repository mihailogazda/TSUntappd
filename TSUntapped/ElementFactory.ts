
/*
 *  Factory for creating HTML elements
 */
class ElementFactory {

    public static CreateBR() {
        return <HTMLElement> document.createElement("br");
    }

    public static CreateParagraph(Text: string = "", ClassName: string = "") {
        var p = <HTMLParagraphElement> document.createElement("p");
        p.setAttribute("class", ClassName);
        p.innerText = Text;
        return p;
    }

    public static CreateButton(Name: string, Class: string = "", handler: any = null) {
        var elem = <HTMLElement> document.createElement("button");
        elem.innerHTML = Name;
        elem.setAttribute("class", Class);
        elem.onclick = handler;
        return elem;
    }

    public static CreateTextInput(PlaceHolder: string, Class: string = "") {
        var input = <HTMLElement> document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", Class);
        input.setAttribute("placeholder", PlaceHolder);
        return input;
    }

    public static CreateDiv(ClassName: string = "") {
        var div = <HTMLElement> document.createElement("div");
        div.setAttribute("class", ClassName);
        return div;
    }

    public static CreateImage(Url: string, ClassName: string = "") {
        var img = <HTMLImageElement> document.createElement("img");
        img.src = Url;
        img.setAttribute("class", ClassName);
        return img;
    }

    public static CreateHeading1(Text: string) {
        var head = <HTMLElement> document.createElement("h1");
        head.innerText = Text;
        return head;
    }

    public static CreateHeading2(Text: string) {
        var head = <HTMLElement> document.createElement("h2");
        head.innerText = Text;
        return head;
    }

    public static CreateHeading3(Text: string) {
        var head = <HTMLElement> document.createElement("h3");
        head.innerText = Text;
        return head;
    }

}; 