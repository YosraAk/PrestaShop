const {AddProductPage} = require('../../../../selectors/BO/add_product_page');
const {AccessPageBO} = require('../../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../../selectors/FO/access_page');
const {SearchProductPage} = require('../../../../selectors/FO/search_product_page');
const commonScenarios = require('../../../common_scenarios/product');
let promise = Promise.resolve();

let productData = {
  name: 'Dress',
  quantity: "10",
  price: '5',
  image_name: '1.png',
  reference: 'robe',
  type: "combination",
  attribute: {
    variation_quantity: 10
  },
};

scenario('Create "Product" with combination', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  commonScenarios.createProduct(AddProductPage, productData);

  scenario('Edit the combination', client => {
    test('should click on "Combinations" tab', () => client.scrollWaitForExistAndClick(AddProductPage.product_combinations_tab, 50));
    test('should click on "Edit" first combination', () => {
      return promise
        .then(() => client.getCombinationData(1))
        .then(() => client.scrollWaitForExistAndClick(AddProductPage.combination_availability_preferences, 50))
        .then(() => client.waitAndSetValue(AddProductPage.pack_availability_date, "2018-01-11", 1000))
        .then(() => {
          scenario('Save the product', client => {
            test('should go to "Go to Catalog" button', () => client.waitForExistAndClick(AddProductPage.dropdown_button, 2000));
            test('should click on "Go to Catalog" button', () => client.waitForExistAndClick(AddProductPage.go_to_catalog_button));
          }, 'product/product');
          scenario('Search the created product "' + productData.name + date_time + '" in the Front Office', client => {
            test('should go to the Front Office', () => client.accessToFO(AccessPageFO));
            test('should change the "Language"', () => client.changeLanguage());
            test('should search the created product "' + productData.name + date_time + '"', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, productData.name + date_time));
            test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name, 0, 10000));
          }, 'product/product',);
          scenario('Delete all the created products', client => {
            test('should go back to the Back Office', () => client.accessToBO(AccessPageBO));
            commonScenarios.deleteProduct(AddProductPage, productData);
          }, 'product/check_product', true);
        });
    });
  }, 'product/create_combinations');

}, 'product/product');
