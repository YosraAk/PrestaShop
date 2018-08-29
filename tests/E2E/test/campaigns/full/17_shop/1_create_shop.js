const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {Menu} = require('../../../selectors/BO/menu');
const {Shop} = require('../../../selectors/BO/advancedParameters/multistore');
const {ShopParameters} = require('../../../selectors/BO/shopParameters/shop_parameters');
const {Multistore} = require('../../../selectors/BO/advancedParameters/multistore');
const commonShop = require('../../common_scenarios/shop');
let promise = Promise.resolve();
let shopData = {
  shop_name: 'My shop',
  virtual_url: 'fr/4-hommes',
};

scenario('Login in the Back Office', client => {
  test('should open the browser', () => client.open());
  test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
}, 'common_client');

scenario('View my shop', client => {
  test('should go to the symfony page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should click on "View my shop" button', () => {
    return promise
      .then(() => client.isVisible(Shop.view_my_shop_button, 1000))
      .then(() => client.waitForExistAndClick(Shop.view_my_shop_button, 1000, 3000))
  });
  test('should verify it opens the Front Office in a new tab.', () => {
    return promise
      .then(() => client.switchTab(1))
      .then(() => client.isExisting(AccessPageFO.logo_home_page,2000))
  });
  test('should go to the Back Office tab', () => client.switchTab(0));
}, 'common_client');

scenario('Create a new shop', client => {
  test('should go to "General" page', () => {
    return promise
      .then(() => client.waitForExistAndClick(Menu.Sell.Catalog.catalog_menu, 2000))
      .then(() => client.pause(2000))
      .then(() => client.goToSubtabMenuPage(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.general_submenu))
      .then(() => client.pause(2000));
  });
  test('should enable multistore', () => client.scrollWaitForExistAndClick(ShopParameters.enable_disable_multistore_toggle_button.replace('%ID', 1)));
  test('should click on "Save" button', () => client.scrollWaitForExistAndClick(ShopParameters.save_button));
  test('should go to "Multistore" page', () => {
    return promise
      .then(() => client.waitForExistAndClick(Menu.Configure.ShopParameters.shop_parameters_menu, 2000))
      .then(() => client.pause(2000))
      .then(() => client.isVisible(Shop.symfony_toolbar, 3000))
      .then(() => {
        if (global.isVisible) {
          client.waitForExistAndClick(Shop.symfony_toolbar);
        }
      })
      .then(() => client.goToSubtabMenuPage(Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.multistore_submenu));
  });
  test('should click on "Add a new shop" button', () => client.waitForExistAndClick(Multistore.add_new_shop_button));
  test('should set "Shop name" input', () => client.waitAndSetValue(Multistore.CreateShop.shop_name_input, shopData.shop_name + date_time));
  test('should click on "Save" button', () => client.scrollWaitForExistAndClick(Multistore.CreateShop.save_button));
  test('should search the created shop "'+shopData.shop_name+ date_time+'" ', () => client.waitAndSetValue(Multistore.shop_name_input, shopData.shop_name + date_time));
  test('should click on "Search" button', () => client.waitForExistAndClick(Multistore.shop_search_button));
  test('should click on "Click here to set a URL for this shop." link', () => client.waitForExistAndClick(Multistore.set_shop_url_link));
  test('should scroll to "Virtual URL" input', () => client.scrollTo(Multistore.SetVirtualUrl.virtual_url_input));
  test('should set "Virtual URL" input', () => client.waitAndSetValue(Multistore.SetVirtualUrl.virtual_url_input, shopData.virtual_url));
  test('should click on "Save" button', () => client.scrollWaitForExistAndClick(Multistore.SetVirtualUrl.save_button));
  test('should go to the symfony page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should view all shops in the Front Office', () => {
    return promise
      .then(() => client.waitForExistAndClick(Shop.all_shops_btn, 5000))
      .then(() => client.getShopNumbers(Shop.all_shops_header))
      .then(() => {
        if (shopsNumber !== 0) {
          for (let i = 1; i < shopsNumber + 1; i++) {
            commonShop.viewShops(i);
          }
        }
      })
      .then(() => {
        scenario('Delete the created shop "'+shopData.shop_name+ date_time+'" then disable the multistore', client => {
          test('should close catalog menu', () => {
            return promise
              .then(() => client.waitForExistAndClick(Menu.Sell.Catalog.catalog_menu, 2000))
              .then(() => client.pause(2000));
          });
          test('should go to the "Multistore" page', () => client.goToSubtabMenuPage(Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.multistore_submenu));
          test('should go click on the created shop "'+shopData.shop_name+ date_time+'"', () => client.waitForExistAndClick(Multistore.shop_link.replace('%SHOPTEXT', shopData.shop_name + date_time)));
          test('should search the created shop "'+shopData.shop_name+ date_time+'" ', () => client.waitAndSetValue(Multistore.shop_name_input, shopData.shop_name + date_time));
          test('should click on "Search" button', () => client.waitForExistAndClick(Multistore.shop_search_button));
          test('should click on "Dropdown" button', () => client.scrollWaitForExistAndClick(Multistore.action_link, 70));
          test('should click on "Delete" action button', () => client.waitForExistAndClick(Multistore.delete_link));
          test('should accept the currently displayed alert dialog', () => client.alertAccept());
          test('should click on "Reset" button', () => client.waitForExistAndClick(Multistore.reset_button));
          test('should go to "General" page', () => client.goToSubtabMenuPage(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.general_submenu));
          test('should disable multistore', () => client.scrollWaitForExistAndClick(ShopParameters.enable_disable_multistore_toggle_button.replace('%ID', 0)));
          test('should click on "Save" button', () => client.scrollWaitForExistAndClick(ShopParameters.save_button));
        }, 'shop',true);
      })
  });
}, 'shop');
