var wd = require("selenium-webdriver");
var d = new wd.Builder().forBrowser("chrome").build();
d.get("https://translate.google.com/#en/ru/");

/*  d.findElements(wd.By.css("#textContent context:nth-child(odd) tran:nth-child(1)")).then(function(elems){
    card(elems).forEach(function (elem) {
        elem.click();
        d.wait(wd.until.elementLocated({css : "div.transword__show-full"}));
        d.findElement(wd.By.css("div.transword__show-full")).click();
        d.wait(wd.until.elementLocated({css : "div.transwidget.arrow-up.show-additional-info"}));
        d.findElement(wd.By.css("body > div.transwidget.show-additional-info")).getAttribute("innerHTML").then(function(profile) {
            //console.log(profile);
        });
    });
});*/
d.findElement(wd.By.css("#source")).then(function(elem){
        elem.sendKeys("name");
        d.wait(wd.until.elementLocated({xpath : "//span[text() = 'name']"}));
        d.findElement(wd.By.xpath("//span[text() = 'name']")).getAttribute("innerHTML").then(function(profile) {
            console.log(profile);
    });
});
