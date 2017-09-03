var wd = require("selenium-webdriver");
var d = new wd.Builder().forBrowser("chrome").build();
d.get("http://lingualeo.com/ru/jungle/the-oxford-3000-wordlist-132154#/page/1");
function card(arrayIt)
{
  var cardArray = [];
  var lengthHalfAr = Math.round(arrayIt.length / 2);
  var bufArray = arrayIt.splice(0, lengthHalfAr);
  bufArray.reverse();
  var partAr;
  while(partAr){
    partAr = bufArray.shift();
    cardArray.push(partAr);
    cardArray.push(arrayIt.shift());
  }
  return cardArray;
}
  d.findElements(wd.By.css("#textContent context:nth-child(odd) tran:nth-child(1)")).then(function(elems){
    card(elems).forEach(function (elem) {
        elem.click();
        d.wait(wd.until.elementLocated({css : "div.transword__show-full"}));
        d.findElement(wd.By.css("div.transword__show-full")).click();
        d.wait(wd.until.elementLocated({css : "div.transwidget.arrow-up.show-additional-info"}));
        d.findElement(wd.By.css("body > div.transwidget.show-additional-info")).getAttribute("innerHTML").then(function(profile) {
            //console.log(profile);
        });
    });
});
