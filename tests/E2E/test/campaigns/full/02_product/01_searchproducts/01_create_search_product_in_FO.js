const {AddProductPage, ProductList} = require('../../../../selectors/BO/add_product_page');
const {AccessPageBO} = require('../../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../../selectors/FO/access_page');
const {SearchProductPage} = require('../../../../selectors/FO/search_product_page');
const {Menu} = require('../../../../selectors/BO/menu.js');
const commonScenarios = require('../../../common_scenarios/product');

let productData = {
  name: 'test',
  quantity: "10",
  price: '5',
  image_name: '1.png',
  reference: 'robe',
};

scenario('Login in the Back Office', client => {
  test('should open the browser', () => client.open());
  test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
}, 'product/product');
scenario('Create a Product in the Back Office', client => {

  commonScenarios.createProduct(AddProductPage, productData, false, false);
  scenario('Enable the created product "' + productData.name + '" in the "Back Office" then search it in the "Front Office"', client => {
    test('should go to "Products" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
    test('should search the created product "' + productData.name + '"', () => client.searchProductByName(productData.name));
    test('should click on the "Enable" button', () => client.waitForExistAndClick(ProductList.product_status.replace("%ACTION", "disabled").replace('%I', 1)));
    scenario('Search the created product "' + productData.name + '" in the "Front Office"', client => {
      test('should go to the "Front Office"', () => client.accessToFO(AccessPageFO));
      test('should change the "Language"', () => client.changeLanguage());
      test('should search the created product "' + productData.name + '"', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, productData.name));
      test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name, 0, 10000));
      test('should go back to the "Back Office"', () => client.accessToBO(AccessPageBO));
    }, 'product/product');

    commonScenarios.deleteProduct(AddProductPage, productData, false);
  }, 'product/check_product', true);
}, 'product/check_product');
