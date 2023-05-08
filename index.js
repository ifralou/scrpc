const puppeteer = require("puppeteer");
const workStationsPaginator = require("./src/alza/workstations/workstationsPaginator");


const filename = "results.txt";
const db = [];

(async () => {

    for await (const box of workStationsPaginator()) {
        for (let {name, href, price} of box) {
            db.push({name, href, price})
        }
    }

    console.log(db);

})();