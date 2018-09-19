const {AddProductPage,ProductList} = require('../../../../selectors/BO/add_product_page');
const {AccessPageBO} = require('../../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../../selectors/FO/access_page');
const {SearchProductPage} = require('../../../../selectors/FO/search_product_page');
const {productPage} = require('../../../../selectors/FO/product_page');
const {CheckoutOrderPage} = require('../../../../selectors/FO/order_page');
let data = require('./../../../../datas/product-data');
const commonScenarios = require('../../../common_scenarios/product');
const {Menu} = require('../../../../selectors/BO/menu.js');

let promise = Promise.resolve();

let productData = {
  name: 'ProductA',
  quantity: "6",
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
  scenario('Deny orders for out of stock products Go in the product page in FO.', client => {
    test('should go to "Quantities" tab', () => client.scrollTo(AddProductPage.product_name_input));
    test('should go to "Quantities" tab', () => client.waitForExistAndClick(AddProductPage.variations_tab,1000));
    test('should click on the "Deny orders" radio button', () => client.waitForExistAndClick(AddProductPage.pack_availability_preferences, 2000));
    test('should go to the "Front Office"', () => client.accessToFO(AccessPageFO));
    test('should change the "Language"', () => client.changeLanguage());
    test('should search the created product "' + productData.name + date_time + '"', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, productData.name + date_time));
    test('should click on "Quick view" button', () => {
      return promise
        .then(() => client.moveToObject(SearchProductPage.product_result_name))
        .then(() => client.waitForExistAndClick(SearchProductPage.quick_view_first_product, 2000))
        .then(() => client.pause(2000))
    });
    test('should set the product "quantity"', () => client.waitAndSetValue(productPage.first_product_quantity, "7",2000));
    test('should check if "ADD TO CART" button is disabled', () => client.isEnabled(productPage.quick_view_add_to_cart,2000,false));
    test('should set the product "quantity"', () => client.isExisting(productPage.product_availability_message));
    test('should click on the "arrow down" button', () => client.waitForExistAndClick(productPage.arrow_down_button));
    test('should check if "ADD TO CART" button is enabled', () => client.isEnabled(CheckoutOrderPage.add_to_cart_button,2000,true));
    test('should set the product "quantity"', () => client.isExisting(productPage.product_availability_message,false));
    test('should click on the "close" button', () => client.waitForExistAndClick(productPage.quick_view_close_button));
    test('should go to the product page', () => client.waitForExistAndClick(AccessPageFO.product_name.replace("%PAGENAME",productData.name+date_time), 2000));
    test('should set the product "quantity"', () => client.waitAndSetValue(productPage.first_product_quantity, "7"));
    test('should check if "ADD TO CART" button is disabled', () => client.isEnabled(CheckoutOrderPage.add_to_cart_button,2000,false));
    test('should set the product "quantity"', () => client.isExisting(productPage.product_availability_message));
    test('should click on the "arrow down" button', () => client.waitForExistAndClick(productPage.arrow_down_button));
    test('should check if "ADD TO CART" button is enabled', () => client.isEnabled(CheckoutOrderPage.add_to_cart_button,2000,true));
    test('should set the product "quantity"', () => client.isExisting(productPage.product_availability_message,false));
    test('should click on the "ADD TO CART" button', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    test('should go to the "Back Office"', () => client.accessToBO(AccessPageBO));
    test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
    test('should search for the created product', () => client.searchProductByName(productData.name + date_time));
    test('should click on the "edit" button', () => client.waitForExistAndClick(ProductList.edit_button,2000));
    test('should set the product "quantity"', () => client.waitAndSetValue(AddProductPage.quantity_shortcut_input, "3",2000));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 2000));
    test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.validation_msg, 'Settings updated.'));
    test('should go to the "Back Office"', () => client.accessToFO(AccessPageFO));
    test('should change the "Language"', () => client.changeLanguage());
    test('should click on the "Cart" button', () => client.waitForExistAndClick(AccessPageFO.shopping_cart_button,1000));
    test('should check if the "Proceed to checkout" button is disbled', () => client.isEnabled(CheckoutOrderPage.proceed_to_checkout_button,false));
    test('should check on the "Proceed to checkout" button', () => client.isExisting(CheckoutOrderPage.alert,true));



  }, 'product/check_product', true);


  // scenario('Enable the created product "' + productData.name + '" in the "Back Office" then search it in the "Front Office"', client => {
  //   test('should go to "Products" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  //   test('should search the created product "' + productData.name + '"', () => client.searchProductByName(productData.name));
  //   test('should click on the "Enable" button', () => client.waitForExistAndClick(ProductList.product_status.replace("%ACTION", "disabled").replace('%I', 1)));
  //   scenario('Search the created product "' + productData.name + '" in the "Front Office"', client => {
  //     test('should go to the "Front Office"', () => client.accessToFO(AccessPageFO));
  //     test('should change the "Language"', () => client.changeLanguage());
  //     test('should search the created product "' + productData.name + '"', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, productData.name));
  //     test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name, 0, 10000));
  //     test('should go back to the "Back Office"', () => client.accessToBO(AccessPageBO));
  //   }, 'product/product');
   //  commonScenarios.deleteProduct(AddProductPage, productData, false);
  // }, 'product/check_product', true);
}, 'product/check_product');
