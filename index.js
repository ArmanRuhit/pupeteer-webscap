const puppeteer = require('puppeteer')

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const searchWord = 'hello';
    const textAreaSelector = '.gLFyf'
    const url =  'http://google.com';
    
    await page.goto(url);
    await page.type(textAreaSelector, searchWord)
   
    const googleSearchButtonSelector = '.gNO89b';
    await Promise.all([
        page.waitForNavigation(), 
        page.click(googleSearchButtonSelector) 
    ]);

    const searchResultTitleSelector = 'h3.LC20lb.MBeuO.DKV0Md';

    await page.waitForSelector(searchResultTitleSelector);

    const resultTitleArray = await page.evaluate((searchResultTitleSelector) =>{
        
        const h3Elements = document.querySelectorAll(searchResultTitleSelector);
        let array = []
        for(let h3ElementIndex = 0; h3ElementIndex < h3Elements.length; h3ElementIndex++){
            array.push(h3Elements[h3ElementIndex].innerText);
        }

        return array;
    }, searchResultTitleSelector);


    console.log(resultTitleArray);
    await browser.close();
}

run();