
class Tests {

    public TestInstagramLogin() {
        var page = new VerifyInstagramLogin();
        ApplicationInstance.PageController.AddPage(page);
        ApplicationInstance.PageController.ShowPageWithInstance(page);
    }

    public TestSelector() {
        var records = new Array<UntappdRecord>();
        for (var i = 0; i < 50; i++) {
            var record = new UntappdRecord("100", "unknown", "https://scontent-vie.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10410891_10152593344278562_1888852273573356703_n.jpg?oh=83b229ae207e5e412e076c8c6a6a417a&oe=55942B5C", "https://scontent-vie.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10410891_10152593344278562_1888852273573356703_n.jpg?oh=83b229ae207e5e412e076c8c6a6a417a&oe=55942B5C");
            records.push(record);
        }

        var pp = new ShowUntappdData(records);
        ApplicationInstance.PageController.AddPage(pp);
        ApplicationInstance.PageController.ShowPageWithInstance(pp);
    }

    public TestImporter() {
        var records = new Array<UntappdRecord>();
        for (var i = 0; i < 50; i++) {
            var record = new UntappdRecord("" + i + 1, "unknown", "https://scontent-vie.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10410891_10152593344278562_1888852273573356703_n.jpg?oh=83b229ae207e5e412e076c8c6a6a417a&oe=55942B5C", "https://scontent-vie.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10410891_10152593344278562_1888852273573356703_n.jpg?oh=83b229ae207e5e412e076c8c6a6a417a&oe=55942B5C");
            records.push(record);
        }

        var pp = new ImportImagesToInstagram(records);
        ApplicationInstance.PageController.AddPage(pp);
        ApplicationInstance.PageController.ShowPageWithInstance(pp);
    }
} 