const puppeteer = require("puppeteer");
const normalizePrice = require("./utils");

const start_url = "https://www.alza.cz/pocitace/18852653.htm#f&cst=null&cud=0&pg=1&prod=&par170=170-182883,170-570,170-239735394,170-140820,170-607,170-239797861,170-239860885,170-239861161,170-239888269&par173=6--24&par176=8192--131072&sc=2736";
const nextButtonSelector = "a.next.fa.fa-chevron-right";

const getNextPageLink = () => {
    let page = 1;
    return () => `a#pgby${++page}.next.fa.fa-chevron-right`
}

async function* workStationsPaginator() {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    await page.setViewport({
        width: 2000, height: 1000, deviceScaleFactor: 1
    });
    const getNextPageId = getNextPageLink();

    console.log("wsp: Started.");

    await page.goto(start_url);
    await page.waitForSelector("#or-popup")
    await (await page.$(nextButtonSelector)).click();
    await page.setDefaultTimeout(5000);

    console.log("wsp: Begin to traverse pages.")
    while (true) {

        let nextButton = await page.$(nextButtonSelector);

        const buttonId = getNextPageId();

        try{
            await page.waitForSelector(buttonId);
        } catch (e) {}
        await page.waitForSelector("#selected-parameter-176");
        await page.waitForSelector("#boxes");

        const boxes = await page.$$(".box");

        const res = [];
        for (let box of boxes) {
            const {name, href} = await (await box.$(".top .fb a")).evaluate(el => ({name: el.textContent, href: el.href}));
            const price = await (await box.$(".bottom .price-box__price")).evaluate(el => el.textContent);
            res.push({name, href, price: normalizePrice(price)});
        }
        console.log(`wsp: Page traversed, results found: ${res.length}`)

        yield res;

        nextButton = await page.$(nextButtonSelector);
        if(!nextButton) {
            break;
        }
        await nextButton.click();
    }

    await browser.close();
    console.log("Exiting generator");
}


module.exports = workStationsPaginator