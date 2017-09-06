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
  /**/

  //if (err) throw err;
  selectQuery = "SELECT * FROM main_words WHERE description is null";
  con.query(selectQuery, function (err, result, fields) {
    if (err) throw err;
    /*selenium - webdriver*/
    result.map(function(row){
      console.log(row.word);
      (function(word, id){
        d.wait(wd.until.elementLocated({css : "#source"}));
        d.findElement(wd.By.css("#source")).then(function(elem){
        elem.clear();
        elem.sendKeys(word);
        d.wait(wd.until.elementLocated({xpath : "//span[text() = '"+word+"']"}));
        d.findElement(wd.By.xpath("//span[text() = '"+word+"']")).getAttribute("innerHTML").then(function(profile) {
        console.log(profile);
        d.findElement(wd.By.css("#gt-lc > div.gt-cc > div.gt-cc-r")).
        getAttribute("innerHTML").then(function(htmlDesc) {
                          //console.log(htmlDesc);
                          var updateQuery = "UPDATE main_words SET description = '"+htmlDesc+"' WHERE id ="+id;
                          con.query(updateQuery, function (err, result) {
                            try{
                              if (err) throw err;
                              console.log(result.affectedRows + " record(s) updated");
                            } catch(err){
                              console.log("error trouble");
                            }
                          });
                  });
                });
            });
          })(row.word, row.id);
    });
    /*selenium - webdriver*/
  });

});
