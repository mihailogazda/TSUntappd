
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

    public static CreateSpan(Text: string = "") {
        var span = <HTMLElement> document.createElement("span");
        span.innerText = Text;
        return span;
    }

    public static CreateCheckbox(Text: string, Checked: boolean, Class: string = "", Handler: Function = null) {
        var span = this.CreateSpan("");
        span.setAttribute("class", Class);

        var checkbox = <HTMLInputElement> document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("checked", Checked ? "true" : "false");
        checkbox.onchange = function (event) {
            Handler(checkbox.checked);
        };
        span.appendChild(checkbox);

        span.appendChild(this.CreateSpan(Text));

        return <HTMLElement>span;
    }

    public static CreateLoader(Text: string) {
        var loader = ElementFactory.CreateDiv();
        loader.appendChild(ElementFactory.CreateImage("images/loading.gif"));
        loader.appendChild(ElementFactory.CreateBR());
        loader.appendChild(ElementFactory.CreateParagraph(Text));
        return loader;
    }

}; 