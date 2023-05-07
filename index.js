const puppeteer = require("puppeteer");
const workStationsPaginator = require("./src/alza/workstations/workstationsPaginator");


const filename = "results.txt";
const  db = new Map();

(async () => {

   for await ( const box of workStationsPaginator()) {

      for(let [name, price] of box) {
         db.set(name, Math.min(db.get(name) ?? Infinity, price));
      }

   }

   console.log(db);

})();