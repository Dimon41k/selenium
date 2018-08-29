var webdriver = require("selenium-webdriver");
var tr = require("google-translate-api");
var fs = require('fs');
//var d = new wd.Builder().forBrowser("chrome").build();
//d.get("http://lingualeo.com/ru/jungle/the-oxford-3000-wordlist-132154#/page/1");

fs.readFile("./archive/20k-oxf.js", "utf8", (err, data)=>{
    data = JSON.parse(data);
    console.log(data.length);
    fs.readFile('./archive/word_list_with_audio.js', 'utf8', (er, compData)=>{
        compData = JSON.parse(compData);
        var newData = data.map(x=>{
            newElem = compData.find(findElem =>{
                return findElem.engWord == x.engWord
            })
            if(newElem)return newElem;
            else return x;
        });
        //fs.writeFile('./archive/20k-oxf.js', JSON.stringify(newData));

    })
    //translateWord(data);
    //data = data.split('\n').reduce((a,x)=>{x=x.replace(' ', ''); return [...a, {engWord: x}];}, [])
    //fs.writeFile('./archive/20k.js', JSON.stringify(data));



});


async function translateWord(engWordArray){
    let counter = 0;
    var driver = new webdriver.Builder().forBrowser("chrome").build();
    await driver.get('https://www.macmillandictionary.com/dictionary/british');
    for(oneWord of engWordArray){
        var element = await driver.findElement(webdriver.By.id('search_input'));
        await element.sendKeys(oneWord.engWord);
        await element.submit();
        await driver.findElement(webdriver.By.id('search_submit')).submit();
        var voice = await driver.findElements(webdriver.By.css('#headbar > span.PRONS > img'));
        var transcription = await driver.findElements(webdriver.By.css('#headbar > span.PRONS > span.PRON.show_less'));
        var senseDefinition = await driver.findElements(webdriver.By.css('.SENSE .DEFINITION'));
        var senseExamples = await driver.findElements(webdriver.By.css('.SENSE .EXAMPLES'));
        let dataObject = {};
        if(voice[0])
            dataObject.voiceUrl = await voice[0].getAttribute("data-src-mp3");
        if(transcription[0])
            dataObject.transcriptionText = await transcription[0].getAttribute("innerText");

        var senseDefinitionsTextArray =  [];
        var senseExamplesTextArray =  [];
        for(x of senseDefinition){
            let def = await x.getAttribute("innerText");
            senseDefinitionsTextArray.push(def);
        }

        for(x of senseExamples){
            let exemp = await x.getAttribute("innerText");
            senseExamplesTextArray.push(exemp);
        }
        dataObject.senseDefinitionsTextArray = senseDefinitionsTextArray;
        dataObject.senseExamplesTextArray = senseExamplesTextArray;
        Object.assign(oneWord, dataObject);
        console.log(oneWord, "counter: ", counter++);

    }

    fs.writeFile("./archive/word_list_with_audio.js", JSON.stringify(engWordArray), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });


}





