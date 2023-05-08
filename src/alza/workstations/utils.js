function normalizePrice(price) {
   return Number(
       price
           .replace(",-", "")
           .replace(/\xa0/g, "")
           .replace(" ", "")
   );
}

module.exports = normalizePrice;