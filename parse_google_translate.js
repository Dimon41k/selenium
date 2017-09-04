var wd = require("selenium-webdriver");
var mysql = require('mysql');
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


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "freek_word",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
con.connect(function(err) {
  //if (err) throw err;
  con.query("SELECT * FROM main_words", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
