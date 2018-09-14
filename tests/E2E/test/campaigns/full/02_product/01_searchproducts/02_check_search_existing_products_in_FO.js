const {Installation} = require('../../../../selectors/BO/installation');
const {AccessPageFO} = require('../../../../selectors/FO/access_page');
const commonInstallation = require('../../../common_scenarios/common_installation');
const {SearchProductPage} = require('../../../../selectors/FO/search_product_page');
let promise = Promise.resolve();
let listProducts = ['> Carnet de notes Renard',
  '> Carnet de notes Ours brun',
  '> Carnet de notes Colibri'];

scenario('The shop installation', () => {
  scenario('Open the browser and connect installation interface', client => {
    test('should open the browser', () => client.open());
    test('should go to install page ', () => client.localhost(URL));
  }, 'installation');

  commonInstallation.prestaShopInstall(Installation, "fr", install_country);

  scenario('Go to the Front Office then search products by "carnet"', client => {
    test('should go to the "Front Office"', () => client.accessToFO(AccessPageFO));
    test('should search products by "carnet" and verify the results', () => {
      return promise
        .then(() => client.waitAndSetValue(SearchProductPage.search_input, 'carnet'))
        .then(() => client.getResultsBySelector(SearchProductPage.search_results_lists, 1000))
        .then(() => expect(listProducts).to.deep.equal(searchResults))
    })
  }, 'product/check_product');

  scenario('Reinstall english shop', client => {
    test('should go to install page ', () => client.localhost(URL));
    commonInstallation.prestaShopInstall(Installation, "en", install_country);
  }, 'product/check_product',true);
}, 'installation');
