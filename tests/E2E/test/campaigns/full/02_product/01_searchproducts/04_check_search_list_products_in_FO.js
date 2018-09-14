const {AddProductPage} = require('../../../../selectors/BO/add_product_page');
const {AccessPageBO} = require('../../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../../selectors/FO/access_page');
const {SearchProductPage} = require('../../../../selectors/FO/search_product_page');
const commonScenarios = require('../../../common_scenarios/product');

let ProductsData = [
  {
    name: 'x-maxx',
    price: '5',
    image_name: '1.png',
    reference: 'robe',
    quantity: "15",
  },
  {
    name: 'e-maxx',
    price: '15',
    image_name: '1.png',
    reference: 'robe',
    quantity: "2",
  },
  {
    name: 't-maxx',
    price: '50',
    image_name: '1.png',
    reference: 'robe',
    quantity: "20",
  }
];
let ProductResult = ["> " + ProductsData[0].name];
let promise = Promise.resolve();

scenario('Login in the Back Office', client => {
  test('should open the browser', () => client.open());
  test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
}, 'product/product');

for (let i = 0; i < ProductsData.length; i++) {
  commonScenarios.createProduct(AddProductPage, ProductsData[i], false);
}
scenario('Search the created product "' + ProductsData[0].name + '" from the Front Ofiice and verify the result', client => {
  scenario('Search the created product "' + ProductsData[0].name + '" in the Front Office', client => {
    test('should go to the "Front Office"', () => client.accessToFO(AccessPageFO));
    test('should change the "Language"', () => client.changeLanguage());
    test('should search products by "' + ProductsData[0].name + '" and verify that the result is only "' + ProductsData[0].name + '" product', () => {
      return promise
        .then(() => client.waitAndSetValue(SearchProductPage.search_input, ProductsData[0].name))
        .then(() => client.getResultsBySelector(SearchProductPage.search_results_lists, 1000))
        .then(() => expect(ProductResult).to.deep.equal(searchResults))
    });
  }, 'product/product');
  scenario('Delete all the created products', client => {
    test('should go to the "Back Office"', () => client.accessToBO(AccessPageBO));
    for (let i = 0; i < ProductsData.length; i++) {
      commonScenarios.deleteProduct(AddProductPage, ProductsData[i], false);
    }
  }, 'product/check_product', true);

}, 'product/check_product');
