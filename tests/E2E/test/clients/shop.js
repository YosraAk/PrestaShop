var CommonClient = require('./common_client');
let common = require('../common.webdriverio');

class Shop extends CommonClient {

  getShopNumbers(selector) {
    return this.client
      .pause(2000)
      .execute(function (selector) {
        let count = document.getElementById(selector).getElementsByClassName("shop").length;
        return count;
      }, selector)
      .then((count) => {
        global.shopsNumber = count.value;
      });
  }
}

module.exports = Shop;
