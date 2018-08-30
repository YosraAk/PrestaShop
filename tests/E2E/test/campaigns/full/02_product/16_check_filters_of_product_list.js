const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Product} = require('../../../selectors/BO/product_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const commonProductScenarios = require('../../common_scenarios/product');

let promise = Promise.resolve();
let filters = [
  "Name",
  "Reference",
  "Category",
  "Price",
  "Quantity-Min",
  "Quantity-Max",
  "Active-Status",
  "Inactive-Status",
  "ID"
];
scenario('Login in the Back Office', client => {
  test('should open the browser', () => client.open());
  test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
}, 'common_client');


scenario('Check product Filters', client => {
  test('should go to "Product" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should go to "Items per page" select and set the value of the paginator to 100', () => {
    return promise
      .then(() => client.isVisible(Product.paginator_select, 3000))
      .then(() => {
        if (global.isVisible) {
          client.waitAndSelectByValue(Product.paginator_select, 100);
          client.scrollTo(Product.name_input);
        }
      })
      .then(() => client.isVisible(Product.symfony_toolbar, 3000))
      .then(() => {
        if (global.isVisible) {
          client.waitForExistAndClick(Product.symfony_toolbar);
        }
      })
      .then(() => client.isVisible(Product.paginator_select, 3000))
      .then(() => {
        if (global.isVisible) {
          client.waitAndSelectByValue(Product.paginator_select, 100);
          client.scrollTo(Product.name_input);
        }
      })
      .then(() => {
        let close = false;
        for (let i = 0; i < filters.length; i++) {
          if (i === ((filters.length) - 1)) {
            close = true;
          }
          commonProductScenarios.filterProducts(filters[i], close);
        }
      })
  });
}, 'common_client');
