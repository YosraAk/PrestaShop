const {Menu} = require('../../selectors/BO/menu.js');
const {Shop} = require('../../selectors/BO/advancedParameters/multistore');
const {AccessPageFO} = require('../../selectors/FO/access_page');
let promise = Promise.resolve();

module.exports = {
  viewShops: function (index) {
    scenario('View the selected shop in the Front Office', client => {
      test('should click on "View" button', () => {
        return promise
          .then(() => client.isVisible(Shop.view_button.replace('%INDEX', index), 3000))
          .then(() => {
            if (global.isVisible) {
              return promise
                .then(() => client.waitForExistAndClick(Shop.view_button.replace('%INDEX', index), 3000));
            }
            else {
              return promise
                .then(() => client.waitForExistAndClick(Shop.all_shops_btn, 1000))
                .then(() => client.waitForExistAndClick(Shop.view_button.replace('%INDEX', index), 3000));
            }
          });
      });
      test('should go to the Front Office tab then verify it opens the Front Office page', () => {
        return promise
          .then(() => client.switchTab(index + 1))
          .then(() => client.isExisting(AccessPageFO.logo_home_page, 2000))
      });
      test('should go to the Back Office tab', () => client.switchTab(0));
    }, 'shop');
  }
};
