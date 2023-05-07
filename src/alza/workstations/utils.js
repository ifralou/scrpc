function normalizePrice(price) {
   return Number(price.replace(",-", "").replace(/\xa0/g, ""));
}

module.exports = normalizePrice;