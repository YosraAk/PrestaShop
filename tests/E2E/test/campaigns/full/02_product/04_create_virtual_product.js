const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {SearchProductPage} = require('../../../selectors/FO/search_product_page');
const {productPage} = require('../../../selectors/FO/product_page');
const {ProductSettings} = require('../../../selectors/BO/shopParameters/product_settings');
const {ShopParameters} = require('../../../selectors/BO/shopParameters/shop_parameters');
const {Localization} = require('../../../selectors/BO/international/localization.js');
const {Locations} = require('../../../selectors/BO/international/locations.js');
const {InternationalPage} = require('../../../selectors/BO/international/index.js');
const {CheckoutOrderPage} = require('../../../selectors/FO/order_page.js');
const {Menu} = require('../../../selectors/BO/menu.js');
const {accountPage} = require('../../../selectors/FO/add_account_page');
const {Customer} = require('../../../selectors/BO/customers/customer');
const {BO} = require('../../../selectors/BO/customers/index');
let data = require('./../../../datas/product-data');
const commonScenarios = require('../../common_scenarios/product');
let common = require('../../../common.webdriverio');
let promise = Promise.resolve();

let customerData = {
  firstname: 'Presto',
  lastname: 'Test',
  email: 'test.presto@gmail.com',
  password: '123456789',
  country: 'United States'
};

let addressData = {
  postalCode: '88901',
  address: 'State Route 602',
  state: 'Nevada',
  city: 'The Lakes',
  country: 'United States'
};

scenario('Create virtual Product in the Back Office', client => {
  test('should open browser', () => client.open());
  test('should log in successfully in BO', () => client.signInBO(AccessPageBO));
  test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should click on "NEW PRODUCT"', () => client.waitForExistAndClick(AddProductPage.new_product_button));

  scenario('Fill "Basic settings" form', client => {
    test('should check that the "Product name" placeholder', () => client.checkAttributeValue(AddProductPage.product_name_input, 'placeholder', 'Enter your product name'));
    test('should check that the "Product name" is empty', () => client.checkAttributeValue(AddProductPage.product_name_input, 'value', ''));
    test('should set the "product name"', () => client.waitAndSetValue(AddProductPage.product_name_input, data.virtual.name + date_time));
    test('should select the "virtual product" type', () => client.waitAndSelectByValue(AddProductPage.product_type, 2));
    test('should set the "Quantity" of product', () => client.waitAndSetValue(AddProductPage.quantity_shortcut_input, data.common.quantity));
    test('should set the "Reference"', () => client.waitAndSetValue(AddProductPage.product_reference, data.common.product_reference));
    test('should upload the first product picture', () => client.uploadPicture('image_test.jpg', AddProductPage.picture));
    test('should check that the "Product picture" is well displayed', () => client.isExisting(AddProductPage.picture_background.replace('%POS', 1)));
    test('should click on "First image" of product', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.picture_background.replace('%POS', 1), 5000))
        .then(() => client.getAttributeInVar(AddProductPage.picture_background.replace('%POS', 1), 'data-id', 'firstPictureId'))
    });
    commonScenarios.clickOnCoverAndSave(client);
    commonScenarios.clickOnCoverAndSave(client);
    test('should set the "Legend picture"', () => client.waitAndSetValue(AddProductPage.picture_legend_textarea_en, data.virtual.name));
    test('should click on "Save image settings" button', () => client.waitForExistAndClick(AddProductPage.picture_save_image_settings_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.validation_msg, "Settings updated."));
    test('should click on "Close" button', () => client.waitForExistAndClick(AddProductPage.picture_close_button, 1000));
    test('should upload the second product picture', () => client.uploadPicture('2.jpg', AddProductPage.picture));
    test('should change the order of pictures', () => client.dragAndDrop(AddProductPage.picture_element.replace('%ID', 4), AddProductPage.picture_element.replace('%ID', 5)));
    test('should click on "Second image" of product', () => client.waitForExistAndClick(AddProductPage.picture_background.replace('%POS', 1), 2000));
    test('should set the "Legend picture"', () => client.waitAndSetValue(AddProductPage.picture_legend_textarea_en, "Second picture", 3000));
    test('should click on "Save image settings" button', () => client.waitForExistAndClick(AddProductPage.picture_save_image_settings_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.validation_msg, "Settings updated."));
    test('should switch the product online', () => {
      return promise
        .then(() => client.isVisible(AddProductPage.symfony_toolbar, 3000))
        .then(() => {
          if (global.isVisible) {
            client.waitForExistAndClick(AddProductPage.symfony_toolbar)
          }
        })
        .then(() => client.waitForExistAndClick(AddProductPage.product_online_toggle, 2000));
    });
    test('should click on "Preview" button', () => client.waitForExistAndClick(AddProductPage.preview_buttons));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should click on the "Preview" link', () => client.waitForExistAndClick(AddProductPage.preview_link, 2000));
    test('should check that the "Product quantity" is equal to "10"', () => client.checkAttributeValue(productPage.product_quantity, 'data-stock', data.common.quantity, 'equal', 3000));
    test('should check that the "Product pictures" is well ordered', () => {
      return promise
        .then(() => client.checkAttributeValue(productPage.product_pictures.replace('%ID', 1).replace('%LEGEND', "Second picture"), 'title', 'Second picture'))
        .then(() => client.checkAttributeValue(productPage.product_pictures.replace('%ID', 2).replace('%LEGEND', data.virtual.name), 'title', data.virtual.name));
    });
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "First image" of product', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.picture_background.replace('%POS', 1)))
        .then(() => client.getAttributeInVar(AddProductPage.picture_background.replace('%POS', 1), 'data-id', 'secondPictureId'))
    });
    test('should click on "Zoom" button', () => client.waitForExistAndClick(AddProductPage.picture_zoom_button));
    test('should check that the "Product picture" is well displayed in zoom out', () => client.checkAttributeValue(AddProductPage.zoom_picture_img, 'style', 'max-height', 'contain'));
    test('should click on "Close" button', () => client.waitForExistAndClick(AddProductPage.zoom_picture_close_button, 1000));
    test('should click on "Delete" button', () => client.waitForExistAndClick(AddProductPage.picture_delete_button));
    test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));
    test('should check that the "Product picture" is well deleted', () => client.checkAttributeValue(AddProductPage.picture_background.replace('%POS', 1), 'data-id', tab['secondProductId'], 'notequal'));
    test('should check that the "Summary" field is well displayed', () => client.isExisting(AddProductPage.summary_textarea));
    test('should click on "Description" tab', () => client.waitForExistAndClick(AddProductPage.tab_description, 3000));
    test('should check that the "Description" field is well displayed', () => client.isExisting(AddProductPage.description_textarea));
    test('should click on "Summary" tab', () => client.waitForExistAndClick(AddProductPage.tab_summary));
    commonScenarios.checkTinyMceButtons(client, 11);
    test('should click on "Description" tab', () => client.waitForExistAndClick(AddProductPage.tab_description));
    commonScenarios.checkTinyMceButtons(client, 51);
    test('should click on "Summary" tab', () => client.waitForExistAndClick(AddProductPage.tab_summary));
    test('should set the "Summary" text', () => client.setEditorText(AddProductPage.summary_textarea, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));
    test('should click on "SAVE"', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check the appearance of red validation', () => client.checkTextValue(AddProductPage.red_validation_notice, 'Unable to update settings.', 'equal', 2000));
    test('should check that the "Error message" is well displayed', () => client.checkTextValue(AddProductPage.tinymce_validation_message, 'This value is too long. It should have 800 characters or less.'));
    test('should set the "Summary" text', () => client.setEditorText(AddProductPage.summary_textarea, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));
    test('should click on "Description" tab', () => client.scrollWaitForExistAndClick(AddProductPage.tab_description));
    test('should set the "Description" text', () => client.setEditorText(AddProductPage.description_textarea, data.common.description));
    test('should click on "SAVE"', () => client.waitForExistAndClick(AddProductPage.save_product_button, 2000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    commonScenarios.addProductFeature(client, "Frame Size", 0, "40x60cm");
    test('should check that the "Custom value" input is well disabled', () => client.checkAttributeValue(AddProductPage.feature_custom_value.replace('%ID', 0), 'disabled', 'disabled', 'equal', 2000));
    test('should click on "SAVE"', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    commonScenarios.addProductFeature(client, "Compositions", 1, '', "Azerty", "custom_value");
    test('should check that the "Pre-defined value" select is well disabled', () => client.isExisting(AddProductPage.feature_value_select.replace('%ID', 1).replace('%V', '@disabled'), 2000));
    test('should click on "Delete" icon of the second feature', () => client.waitForExistAndClick(AddProductPage.delete_feature_icon.replace('%POS', 2)));
    test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));

    commonScenarios.addProductFeature(client, "Frame Size", 1, "60x90cm");
    commonScenarios.addProductFeature(client, "Frame Size", 2, "80x120cm");
    test('should click on "SAVE"', () => client.waitForExistAndClick(AddProductPage.save_product_button, 5000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should click on "Product Details" tab', () => client.waitForExistAndClick(productPage.product_tab_list.replace('%I', 2), 5000));
    test('should check that the "Frame Size" feature does exist', () => client.isExisting(productPage.product_features.replace('%F', 'Frame Size')));
    test('should check that the first value of "Frame Size" feature does exist', () => client.isExisting(productPage.product_features.replace('%F', '40x60cm')));
    test('should check that the second value of "Frame Size" feature does exist', () => client.isExisting(productPage.product_features.replace('%F', '60x90cm')));
    test('should check that the third value of "Frame Size" feature does exist', () => client.isExisting(productPage.product_features.replace('%F', '80x120cm')));

    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "ADD A BRAND"', () => client.scrollWaitForExistAndClick(AddProductPage.product_add_brand_btn, 50));
    test('should select a brand from the dropdown list', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.product_brand_select))
        .then(() => client.waitForExistAndClick(AddProductPage.product_brand_select_option));
    });

    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should click on "Product Details" tab', () => client.waitForExistAndClick(productPage.product_tab_list.replace('%I', 2), 5000));
    test('should check that the "Graphic Corner" of the picture brand does exist', () => client.isExisting(productPage.manufacturer_picture.replace('%ALT', 'Graphic Corner'), 1000));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Delete" icon of the brand', () => client.scrollWaitForExistAndClick(AddProductPage.delete_brand_icon, 50, 2000));
    test('should click on "No" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'No')));
    test('should click on "Delete" icon of the brand', () => client.waitForExistAndClick(AddProductPage.delete_brand_icon, 2000));
    test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));

    test('should click on "Add related product" button', () => client.waitForExistAndClick(AddProductPage.add_related_product_btn, 2000));
    test('should search and add a related product', () => {
      return promise
        .then(() => client.waitAndSetValue(AddProductPage.search_add_related_product_input, 'mug'))
        .then(() => client.waitForVisibleAndClick(AddProductPage.related_product_item.replace('%I', 1)));
    });
    test('should search and add a related product', () => {
      return promise
        .then(() => client.waitAndSetValue(AddProductPage.search_add_related_product_input, 'mug'))
        .then(() => client.waitForVisibleAndClick(AddProductPage.related_product_item.replace('%I', 2)));
    });
    test('should search and add a related product', () => {
      return promise
        .then(() => client.waitAndSetValue(AddProductPage.search_add_related_product_input, 'mug'))
        .then(() => client.waitForVisibleAndClick(AddProductPage.related_product_item.replace('%I', 3)));
    });
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should check that the first related product does exist', () => client.isExisting(productPage.related_product.replace('%I', 1).replace('%S', 'mug'), 1000));
    test('should check that the second related product does exist', () => client.isExisting(productPage.related_product.replace('%I', 2).replace('%S', 'mug'), 1000));
    test('should check that the third related product does exist', () => client.isExisting(productPage.related_product.replace('%I', 3).replace('%S', 'mug'), 1000));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Delete" icon of the third related product', () => client.scrollWaitForExistAndClick(AddProductPage.related_product_delete_icon.replace('%I', 3), 50, 2000));
    test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
    test('should check that the third related product does not exist', () => client.isNotExisting(AddProductPage.related_product_delete_icon.replace('%I', 3), 2000));
    test('should click on "Delete" icon of the all related product', () => client.scrollWaitForExistAndClick(AddProductPage.delete_related_product_icon, 50, 2000));
    test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should check that the related product does not exist', () => client.isNotExisting(productPage.related_product.replace('%I', 1).replace('%S', 'mug'), 1000));
    test('should go back to the Back Office', () => client.switchWindow(0));

    test('should set the "Tax exclude" price', () => client.setPrice(AddProductPage.priceTE_shortcut, '10'));
    test('should check that the "Tax include" is equal to "12"', () => client.checkAttributeValue(AddProductPage.priceTTC_shortcut, 'value', '12'));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should check that the "Product price" is equal to "€12.00"', () => client.checkTextValue(productPage.product_price, '€12.00', 'equal', 3000));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should set the "Tax include" price', () => client.setPrice(AddProductPage.priceTTC_shortcut, '9'));
    test('should check that the "Tax include" is equal to "7.5"', () => client.checkAttributeValue(AddProductPage.priceTE_shortcut, 'value', '7.5'));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should check that the "Product price" is equal to "€9.00"', () => client.checkTextValue(productPage.product_price, '€9.00', 'equal', 3000));
    test('should go back to the Back Office', () => client.switchWindow(0));

    /*To verify: should we click on collapse then expand button of category*/
    test('should click on "Collapse" button', () => client.scrollWaitForExistAndClick(AddProductPage.category_collapse_button, 150, 2000));

    test('should click on "Create a category" button', () => client.scrollWaitForExistAndClick(AddProductPage.product_create_category_btn));
    test('should set the "New category name" input', () => client.waitAndSetValue(AddProductPage.product_category_name_input, data.virtual.new_category_name + date_time));
    test('should choose "Clothes" as Parent of the category from the dropdown list', () => {
      return promise
        .then(() => client.scrollWaitForExistAndClick(AddProductPage.parent_category_select))
        .then(() => client.waitForVisibleAndClick(AddProductPage.parent_category_option.replace('%N', "Clothes")));
    });
    test('should click on "Create" button', () => client.scrollWaitForExistAndClick(AddProductPage.category_create_btn));
    test('should check that the "Category" is well created', () => client.isExisting(AddProductPage.category_checkbox.replace('%S', data.virtual.new_category_name + date_time), 4000));
    test('should click on "Delete" icon of the created category', () => client.scrollWaitForExistAndClick(AddProductPage.delete_category_icon.replace('%I', 2),0,2000));
    //@TODO check that the category is well unchecked in the expanded list

    //END @TODO
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should click on "Expand" button', () => client.scrollWaitForExistAndClick(AddProductPage.category_expand_button, 150, 5000));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
  }, 'product/product');

  scenario('Fill "Quantities" form', client => {
    test('should click on "Quantities" tab', () => client.scrollWaitForExistAndClick(AddProductPage.product_quantities_tab, 50));
    test('should set the "Quantity" input', () => client.waitAndSetValue(AddProductPage.product_quantity_input, "0"));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should click on "Product Details" tab', () => client.waitForExistAndClick(productPage.product_tab_list.replace('%I', 2), 5000));
    test('should check that the "Product quantity" is equal to "0"', () => client.isNotExisting(productPage.product_quantity));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should set the "label when in stock" input', () => client.waitAndSetValue(AddProductPage.label_in_stock_input, 'product in stock'));
    test('should set the "Label when out of stock (and back order allowed)" input', () => client.waitAndSetValue(AddProductPage.label_out_stock_input, 'product out of stock but orderable'));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
    scenario('Allow the order of products out of stock', client => {
      test('should close the "Catalog" menu', () => client.waitForExistAndClick(Menu.Sell.Catalog.catalog_menu));
      test('should go to "Product settings" page', () => client.clickAndOpenOnNewWindow(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.product_settings_submenu, 2));
      test('should switch "Allow ordering of out-of-stock products" to "Yes"', () => client.scrollWaitForExistAndClick(ProductSettings.allowOrderOutOfStock_button.replace('%I', '1')));
      test('should click on "Save" button', () => {
        return promise
          .then(() => client.isVisible(AddProductPage.symfony_toolbar, 3000))
          .then(() => {
            if (global.isVisible) {
              client.waitForExistAndClick(AddProductPage.symfony_toolbar)
            }
          })
          .then(() => client.scrollWaitForExistAndClick(ProductSettings.save_button.replace('%POS', '3')));
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(ShopParameters.success_box, "Update successful"));
    }, 'common_client');
    scenario('Check the label when the product out of stock', client => {
      test('should go to the Front Office', () => client.switchWindow(1));
      test('should check that the label does exist when the product out of stock', () => client.checkTextValue(productPage.product_availability, 'product out of stock but orderable', 'contain', 3000));
      test('should go back to the Back Office', () => client.switchWindow(0));
    }, 'common_client');
    scenario('Check the behavior when out of stock', client => {
      test('should set the "label when in stock" input', () => client.waitAndSetValue(AddProductPage.label_in_stock_input, ''));
      test('should set the "Label when out of stock (and back order allowed)" input', () => client.waitAndSetValue(AddProductPage.label_out_stock_input, ''));
      test('should click on "Deny orders" radio button', () => client.waitForExistAndClick(AddProductPage.availability_preferences_radio_button.replace('%I', 0)));
      test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
      test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
      test('should go to the Front Office', () => client.switchWindow(1));
      test('should check that the label does exist when the behavior is "Deny orders"', () => client.checkTextValue(productPage.product_availability, 'There are not enough products in stock', 'contain'));
      test('should go back to the Back Office', () => client.switchWindow(0));
      test('should click on "Allow orders" radio button', () => client.waitForExistAndClick(AddProductPage.availability_preferences_radio_button.replace('%I', 1)));
      test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
      test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
      test('should go to the Front Office', () => client.switchWindow(1));
      test('should check that the label does not exist when the behavior is "Allow orders"', () => client.checkTextValue(productPage.product_availability, ''));
      test('should go back to the Back Office', () => client.switchWindow(0));
    }, 'common_client');
    scenario('Check the "Minimum quantity for sale"', client => {
      test('should set the "Minimum quantity for sale" input', () => client.waitAndSetValue(AddProductPage.minimum_quantity_sale_input, '3'));
      test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
      test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
      test('should go to the Front Office', () => client.switchWindow(1));
      test('should check that the label of "Minimum quantity" contains "3"', () => client.checkTextValue(productPage.product_minimal_quantity, '3', 'contain'));
      test('should check that the "Minimum quantity" is equal or greater to "3"', () => client.checkAttributeValue(productPage.product_quantity_input, 'value', parseInt('3'), 'least'));
      test('should change quantity to "2" using the keyboard and push "Enter"', () => {
        return promise
          .then(() => client.waitAndSetValue(productPage.product_quantity_input, '2'))
          .then(() => client.keys('\uE007'))
          .then(() => client.pause(1000));
      });
      test('should check that the "Minimum quantity" is equal or greater to "3"', () => client.checkAttributeValue(productPage.product_quantity_input, 'value', parseInt('3'), 'least'));
      test('should go back to the Back Office', () => client.switchWindow(0));
    }, 'common_client');
    scenario('Check the "Availability date"', client => {
      test('should set the "Availability date"', () => client.waitAndSetValue(AddProductPage.availability_date_input, common.getCustomDate(30), 2000));
      test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
      test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
      test('should go to the Front Office', () => client.switchWindow(1));
      test('should click on "Product Details" tab', () => client.scrollWaitForExistAndClick(productPage.product_tab_list.replace('%I', 1), 0, 5000));
      test('should check that the "Availability date" is equal to "' + common.getCustomDate(30) + '"', () => {
        return promise
          .then(() => client.scrollTo(productPage.product_availability_date,0,2000))
          .then(() => client.checkTextValue(productPage.product_availability_date, common.getCustomDate(30), 'equal', 2000));
      });
      test('should go back to the Back Office', () => client.switchWindow(0));
    }, 'common_client');
    scenario('Check the "Stock Alerts"', client => {
      test('should set the "Quantity" input', () => client.waitAndSetValue(AddProductPage.product_quantity_input, '100', 2000));
      test('should set the "Minimum quantity for sale" input', () => client.waitAndSetValue(AddProductPage.minimum_quantity_sale_input, '1'));
      test('should click on "Send me an email when the quantity is below or equals this level" checkbox', () => client.waitForExistAndClick(AddProductPage.low_stock_level_checkbox));
      test('should set the "Low stock level" input', () => client.waitAndSetValue(AddProductPage.low_stock_level_input, '90'));
      test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
      test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    }, 'common_client');
  }, 'product/product');

  /** Create a new currency **/
  scenario('Create a "Currency"', client => {
    test('should close the "Catalog" menu', () => client.waitForExistAndClick(Menu.Sell.Catalog.catalog_menu));
    test('should go to "Localization" page', () => client.clickAndOpenOnNewWindow(Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu, 3));
    test('should click on "Currencies" tab', () => client.waitForExistAndClick(Menu.Improve.International.currencies_tab));
    test('should click on "Add new currency" button', () => client.waitForExistAndClick(Localization.Currency.add_new_currency_button));
    test('should click on "Status" button', () => client.waitForExistAndClick(Localization.Currency.status_button));
    test('should click on "Save" button', () => client.waitForExistAndClick(Localization.Currency.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(InternationalPage.success_panel, "×\nSuccessful creation.", 'equal', 3000));
    test('should go back to the Catalog page', () => client.switchWindow(0));
  }, 'common_client');

  /** Enable the "United States" country **/
  scenario('Enable the "United States" country', client => {
    test('should close the "Catalog" menu', () => client.waitForExistAndClick(Menu.Sell.Catalog.catalog_menu));
    test('should go to "Locations" page', () => client.clickAndOpenOnNewWindow(Menu.Improve.International.international_menu, Menu.Improve.International.locations_submenu, 4));
    test('should click on "Countries" tab', () => client.waitForExistAndClick(Menu.Improve.International.countries_tab));
    test('should search for "United states" country', () => client.searchByValue(Locations.Countries.search_input, Locations.Countries.search_button, "United States"));
    test('should click on "Edit" button', () => client.waitForExistAndClick(Locations.Countries.edit_button.replace('%I', 1)));
    test('should click on "Status" button', () => client.waitForExistAndClick(Locations.Countries.active_button.replace('%ACTIVE', 'on')));
    test('should click on "Save" button', () => client.waitForExistAndClick(Locations.Countries.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(InternationalPage.success_panel, "×\nSuccessful update."));
    test('should go back to the Catalog page', () => client.switchWindow(0));
  }, 'common_client');

  scenario('Fill "Pricing" form', client => {
    test('should click on "Pricing" tab', () => client.scrollWaitForExistAndClick(AddProductPage.product_pricing_tab, 50, 2000));
    test('should set the "Price (tax incl.)" input', () => client.waitAndSetValue(AddProductPage.product_pricing_ttc_input, '8.5'));
    test('should check that the "Price (tax excl.)" is equal to "7.083333"', () => client.checkAttributeValue(AddProductPage.product_pricing_ht_input, 'value', '7.083333'));
    test('should set the "Price (tax incl.)" input', () => client.waitAndSetValue(AddProductPage.product_pricing_ttc_input, '9,5'));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should check that the "Price (tax incl.)" is equal to "9.5"', () => client.checkAttributeValue(AddProductPage.product_pricing_ttc_input, 'value', '9.5'));
    test('should check that the "Price (tax excl.)" is equal to "7.916667"', () => client.checkAttributeValue(AddProductPage.product_pricing_ht_input, 'value', '7.916667'));
    test('should set the "Price (tax excl.)" input', () => client.waitAndSetValue(AddProductPage.product_pricing_ht_input, '7,5'));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 3000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should check that the "Price (tax incl.)" is equal to "9"', () => client.checkAttributeValue(AddProductPage.product_pricing_ttc_input, 'value', '9'));
    test('should check that the "Price (tax excl.)" is equal to "7.5"', () => client.checkAttributeValue(AddProductPage.product_pricing_ht_input, 'value', '7.5'));
    test('should set the "Tax rule" to "5.5%"', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.pricing_tax_rule_select))
        .then(() => client.waitForExistAndClick(AddProductPage.pricing_tax_rule_option.replace('%T', '5.5%')));
    });
    test('should check that the "Price (tax incl.)" is equal to "7.9125"', () => client.checkAttributeValue(AddProductPage.product_pricing_ttc_input, 'value', '7.9125'));
    test('should set the "Tax rule" to "20%"', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.pricing_tax_rule_select))
        .then(() => client.waitForExistAndClick(AddProductPage.pricing_tax_rule_option.replace('%T', '20%')));
    });
    test('should check that the "Price (tax incl.)" is equal to "9"', () => client.checkAttributeValue(AddProductPage.product_pricing_ttc_input, 'value', '9'));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should check that the "Manage tax rules" link will open in a new tab', () => client.checkAttributeValue(AddProductPage.pricing_manage_tax_rules_link, 'target', '_blank'));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should set the shop language to "English"', () => client.changeLanguage());
    test('should check that the "Product price" is equal to "€9.00"', () => client.checkTextValue(productPage.product_price, '€9.00'));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should set the "Price per unit (tax excl.)" input', () => client.waitAndSetValue(AddProductPage.unit_price, '1'));
    test('should set the "Unit" input', () => client.waitAndSetValue(AddProductPage.unity, 'per kg'));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should check that the "Product unit price" is equal to "(€1.20 per kg)"', () => client.checkTextValue(productPage.product_unit_price, '(€1.20 per kg)'));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Display the "On sale!" flag on the product page, and on product listings." checkbox', () => client.waitForExistAndClick(AddProductPage.on_sale_checkbox));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should check that the product on sale flag does exist', () => client.isExisting(productPage.product_on_sale_flag));
    test('should click on "Home" button', () => client.waitForExistAndClick(productPage.home_button));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.virtual.name + date_time));
    test('should check that the product on sale flag does exist', () => client.isExisting(productPage.product_on_sale_flag));
    test('should click on "Quick view" button', () => {
      return promise
        .then(() => client.moveToObject(SearchProductPage.product_result_name))
        .then(() => client.waitForExistAndClick(SearchProductPage.quick_view_first_product, 2000))
        .then(() => client.pause(2000))
    });
    test('should check that the product on sale flag does exist', () => {
      return promise
        .then(() => client.isVisible(productPage.product_on_sale_flag))
        .then(() => expect(global.isVisible).to.be.true)
    });
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Add a specific price" button', () => client.waitForExistAndClick(AddProductPage.pricing_add_specific_price_button));
    test('should check that the "All currencies" select does exist', () => client.isExisting(AddProductPage.specific_price_for_currency_select, 2000));
    test('should check that the "All countries" select does exist', () => client.isExisting(AddProductPage.specific_price_for_country_select));
    test('should check that the "All groups" select does exist', () => client.isExisting(AddProductPage.specific_price_for_group_select));
    test('should check that the "Customer" input does exist', () => client.isExisting(AddProductPage.specific_price_customer_input));
    test('should check that the "Available from" calendar input does exist', () => client.isExisting(AddProductPage.specific_price_available_from_input));
    test('should check that the "Available to" calendar input does exist', () => client.isExisting(AddProductPage.specific_price_to_input));
    test('should check that the "Starting at" input does exist', () => client.isExisting(AddProductPage.specific_price_starting_at_input));
    test('should check that the "Product price (tax excl.)" input does exist', () => client.isExisting(AddProductPage.specific_product_price_input));
    test('should check that the "Leave initial price" checkbox does exist', () => client.isExisting(AddProductPage.leave_initial_price_checkbox));
    test('should check that the "Apply a discount of" input does exist', () => client.isExisting(AddProductPage.specific_price_discount_input));
    test('should check that the "Discount type" select does exist', () => client.isExisting(AddProductPage.specific_price_reduction_type_select));
    test('should check that the "Tax" select does exist', () => client.isExisting(AddProductPage.specific_price_reduction_tax_select));
    test('should click on "Cancel" button', () => client.scrollWaitForExistAndClick(AddProductPage.specific_price_cancel_button, 150, 2000));
    test('should click on "Add a specific price" button', () => client.waitForExistAndClick(AddProductPage.pricing_add_specific_price_button, 2000));
    test('should click on "Currency" select', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.specific_price_for_currency_select, 2000))
        .then(() => client.waitForVisibleAndClick(AddProductPage.specific_price_for_currency_option.replace('%C', 'Euro')));
    });
    test('should set the "Apply a discount of" input', () => client.waitAndSetValue(AddProductPage.specific_price_discount_input, '10', 2000));
    test('should choose the "Percentage" from the specific price type', () => client.waitAndSelectByValue(AddProductPage.specific_price_reduction_type_select, 'percentage'));
    test('should click on "Apply" button', () => client.waitForExistAndClick(AddProductPage.specific_price_save_button));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should set the shop language to "English"', () => client.changeLanguage());
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.virtual.name + date_time));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name, 2000));
    test('should check that the "Discount" is equal to "Save 10%"', () => client.checkTextValue(CheckoutOrderPage.product_discount_details, 'SAVE 10%'));
    test('should click on "Currency" select and choose "USD $" from the dropdown list', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageFO.currency_select))
        .then(() => client.waitForVisibleAndClick(AccessPageFO.curreny_option.replace('%S', 'US Dollar')));
    });
    test('should check that the product price is equal to "$9.00"', () => client.checkTextValue(productPage.product_price, '$9.00'));
    test('should verify that the discount does not exist', () => client.isNotExisting(CheckoutOrderPage.product_discount_details));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Delete" icon from the specific price table', () => client.waitForExistAndClick(AddProductPage.specific_price_delete_icon, 2000));
    test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));
    test('should click on "Add a specific price" button', () => client.waitForExistAndClick(AddProductPage.pricing_add_specific_price_button, 2000));
    test('should click on "Country" select and choose "France" from the dropdown list', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.specific_price_for_country_select))
        .then(() => client.waitAndSetValue(AddProductPage.specific_price_for_country_search_input, "France"))
        .then(() => client.waitForVisibleAndClick(AddProductPage.specific_price_for_country_option.replace('%C', 'France')));
    });
    test('should set the "Apply a discount of" input', () => client.waitAndSetValue(AddProductPage.specific_price_discount_input, '5'));
    test('should choose the "Percentage" from the specific price type', () => client.waitAndSelectByValue(AddProductPage.specific_price_reduction_type_select, 'percentage'));
    test('should click on "Apply" button', () => client.waitForExistAndClick(AddProductPage.specific_price_save_button));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should set the shop language to "English"', () => client.changeLanguage());
    test('should click on "Currency" select and choose "EUR €" from the dropdown list', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageFO.currency_select))
        .then(() => client.waitForVisibleAndClick(AccessPageFO.curreny_option.replace('%S', 'Euro')));
    });
    test('should click on the "Sign in" link', () => client.waitForExistAndClick(AccessPageFO.sign_in_button));
    test('should click on "No account? Create one here" link', () => client.waitForExistAndClick(accountPage.create_button));
    test('should choose a "Social title" option', () => client.waitForExistAndClick(accountPage.gender_radio_button));
    test('should set the "First name" input', () => client.waitAndSetValue(accountPage.firstname_input, customerData.firstname,2000));
    test('should set the "Last name" input', () => client.waitAndSetValue(accountPage.lastname_input, customerData.lastname,2000));
    test('should set the "Email" input', () => client.waitAndSetValue(accountPage.email_input, customerData.email));
    test('should set the "Password" input', () => client.waitAndSetValue(accountPage.password_input, customerData.password));
    test('should click on "Save" button', () => client.waitForExistAndClick(accountPage.save_account_button));
    test('should click on "User name" button', () => client.waitForExistAndClick(AccessPageFO.customer_name));
    test('should click on "ADD FIRST ADDRESS" button', () => client.waitForExistAndClick(accountPage.add_first_address, 2000));
    test('should set the "Address" input', () => client.waitAndSetValue(accountPage.adr_address, addressData.address));
    test('should set the "Zip/Postal Code" input', () => client.waitAndSetValue(accountPage.adr_postcode, addressData.postalCode));
    test('should set the "City" input', () => client.waitAndSetValue(accountPage.adr_city, addressData.city));
    test('should choose a "Country" from the dropdown list', () => client.waitAndSelectByValue(accountPage.adr_country, '21'));
    test('should choose a "State" from the dropdown list', () => client.waitAndSelectByValue(accountPage.adr_state, '31'));
    test('should click on "SAVE" button', () => client.waitForExistAndClick(accountPage.adr_save));
    test('should check that the success alert message is well displayed', () => client.checkTextValue(accountPage.save_notification, 'Address successfully added!'));
    test('should click on "Home" button', () => client.waitForExistAndClick(productPage.home_button));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.virtual.name + date_time));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name, 2000));
    test('should check that the product price is equal to "€7.50"', () => client.checkTextValue(productPage.product_price, '€7.50', 'equal', 2000));
    test('should check that the "Discount" does not exist', () => client.isNotExisting(CheckoutOrderPage.product_discount_details));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Delete" icon from the specific price table', () => client.waitForExistAndClick(AddProductPage.specific_price_delete_icon, 2000));
    test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));
    test('should click on "Add a specific price" button', () => client.waitForExistAndClick(AddProductPage.pricing_add_specific_price_button, 2000));
    test('should click on "Group" select and choose "Client" from the dropdown list', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.specific_price_for_group_select))
        .then(() => client.waitForVisibleAndClick(AddProductPage.specific_price_for_group_option.replace('%C', 'Customer')));
    });
    test('should set the "Apply a discount of" input', () => client.waitAndSetValue(AddProductPage.specific_price_discount_input, '5'));
    test('should choose the "Percentage" from the specific price type', () => client.waitAndSelectByValue(AddProductPage.specific_price_reduction_type_select, 'percentage'));
    test('should click on "Apply" button', () => client.waitForExistAndClick(AddProductPage.specific_price_save_button));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should click on "Save" button', () => client.waitForExistAndClick(AccessPageFO.sign_out_button));
    test('should check that the product price is equal to "€9.00"', () => client.checkTextValue(productPage.product_price, '€9.00'));
    test('should verify that the discount does not exist', () => client.isNotExisting(CheckoutOrderPage.product_discount_details));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Delete" icon from the specific price table', () => client.waitForExistAndClick(AddProductPage.specific_price_delete_icon, 2000));
    test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));
    test('should click on "Add a specific price" button', () => client.waitForExistAndClick(AddProductPage.pricing_add_specific_price_button, 2000));
    test('should set the "Customer" input', () => {
      return promise
        .then(() => client.waitAndSetValue(AddProductPage.specific_price_customer_input, 'pub@prestashop.com', 2000))
        .then(() => client.waitForVisibleAndClick(AddProductPage.specific_price_customer_option));
    });
    test('should click on "Leave initial price" checkbox', () => client.scrollWaitForExistAndClick(AddProductPage.leave_initial_price_checkbox, 50));
    test('should set the "Product price (tax excl.)" input', () => client.waitAndSetValue(AddProductPage.specific_product_price_input, '6.5', 2000));
    test('should set the "Apply a discount of" input', () => client.waitAndSetValue(AddProductPage.specific_price_discount_input, '10'));
    test('should choose the "Percentage" from the specific price type', () => client.waitAndSelectByValue(AddProductPage.specific_price_reduction_type_select, 'percentage'));
    test('should click on "Apply" button', () => client.waitForExistAndClick(AddProductPage.specific_price_save_button));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should set the shop language to "English"', () => client.changeLanguage());
    test('should check that the product price is equal to "€9.00"', () => client.checkTextValue(productPage.product_price, '€9.00', 'equal', 2000));
    test('should verify that the discount does not exist', () => client.isNotExisting(CheckoutOrderPage.product_discount_details));
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should set the shop language to "English"', () => client.changeLanguage());
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.virtual.name + date_time));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
    test('should check that the product price is equal to "€7.02"', () => client.checkTextValue(productPage.product_price, '€7.02'));
    test('should verify that the discount is equal to "SAVE 10%"', () => client.checkTextValue(CheckoutOrderPage.product_discount_details, 'SAVE 10%'));
    test('should check that the connected "Customer" is equal to "John DOE"', () => client.checkTextValue(AccessPageFO.customer_name, 'John DOE'));
    test('should click on "Sign out" button', () => client.waitForExistAndClick(AccessPageFO.sign_out_button));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Delete" icon from the specific price table', () => client.waitForExistAndClick(AddProductPage.specific_price_delete_icon, 2000));
    test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));
    test('should click on "Add a specific price" button', () => client.waitForExistAndClick(AddProductPage.pricing_add_specific_price_button, 2000));
    test('should set the "Starting at" input', () => client.waitAndSetValue(AddProductPage.specific_price_starting_at_input, '3', 2000));
    test('should set the "Apply a discount of" input', () => client.waitAndSetValue(AddProductPage.specific_price_discount_input, '5'));
    test('should choose the "Percentage" from the specific price type', () => client.waitAndSelectByValue(AddProductPage.specific_price_reduction_type_select, 'percentage'));
    test('should click on "Apply" button', () => client.waitForExistAndClick(AddProductPage.specific_price_save_button));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should set the shop language to "English"', () => client.changeLanguage());
    test('should check that the "Quantity" is equal to "3"', () => client.checkTextValue(productPage.product_discounts_table.replace('%R', 1).replace('%D', 1), '3'));
    test('should check that the "Discount" is equal to "5%"', () => client.checkTextValue(productPage.product_discounts_table.replace('%R', 1).replace('%D', 2), '5%'));
    test('should check that the "You Save" is equal to "Up to €1.35"', () => client.checkTextValue(productPage.product_discounts_table.replace('%R', 1).replace('%D', 3), 'Up to €1.35'));
    test('should set the "Quantity" input', () => {
      return promise
        .then(() => client.waitAndSetValue(productPage.product_quantity_input, '3', 2000))
        .then(() => client.pause(1000));
    });
    test('should check that the product price is equal to "€8.55 "', () => client.checkTextValue(productPage.product_price, '€8.55', 'equal', 4000));
    test('should verify that the discount is equal to "SAVE 5%"', () => client.checkTextValue(CheckoutOrderPage.product_discount_details, 'SAVE 5%'));
    test('should click on "Home" button', () => client.waitForExistAndClick(productPage.home_button));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.virtual.name + date_time));
    test('should check that the product on sale flag does exist', () => client.isExisting(productPage.product_on_sale_flag));
    test('should click on "Quick view" button', () => {
      return promise
        .then(() => client.moveToObject(SearchProductPage.product_result_name))
        .then(() => client.waitForExistAndClick(SearchProductPage.quick_view_first_product, 2000))
        .then(() => client.pause(2000))
    });
    test('should set the "Quantity" input', () => {
      return promise
        .then(() => client.waitAndSetValue(productPage.product_quantity_input, '3', 2000))
        .then(() => client.pause(1000));
    });
    test('should check that the product price is equal to "€8.55"', () => client.checkTextValue(productPage.quick_view_product_price, '€8.55', 'equal', 4000));
    test('should verify that the discount is equal to "SAVE 5%"', () => client.checkTextValue(productPage.quick_view_product_discount, 'SAVE 5%'));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Delete" icon from the specific price table', () => client.waitForExistAndClick(AddProductPage.specific_price_delete_icon, 2000));
    test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));

    test('should click on "Add a specific price" button', () => client.waitForExistAndClick(AddProductPage.pricing_add_specific_price_button, 2000));
    test('should set the "Apply a discount of" input', () => client.waitAndSetValue(AddProductPage.specific_price_discount_input, '3', 2000));
    test('should choose the "Tax excluded" from the specific price tax', () => client.waitAndSelectByValue(AddProductPage.specific_price_reduction_tax_select, '0'));
    test('should click on "Apply" button', () => client.waitForExistAndClick(AddProductPage.specific_price_save_button));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.virtual.name + date_time));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
    test('should check that the product price is equal to "€5.40"', () => client.checkTextValue(productPage.product_price, '€5.40', 'equal', 3000));
    test('should verify that the discount is equal to "SAVE €3.60"', () => client.checkTextValue(CheckoutOrderPage.product_discount_details, 'SAVE €3.60'));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Delete" icon from the specific price table', () => client.waitForExistAndClick(AddProductPage.specific_price_delete_icon, 2000));
    test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));

    test('should click on "Add a specific price" button', () => client.waitForExistAndClick(AddProductPage.pricing_add_specific_price_button, 2000));
    test('should set the "Date available from" input', () => client.waitAndSetValue(AddProductPage.specific_price_available_from_input, common.getCustomDate(-1), 2000));
    test('should set the "Date to" input', () => client.waitAndSetValue(AddProductPage.specific_price_to_input, common.getCustomDate(1)));
    test('should set the "Apply a discount of" input', () => client.waitAndSetValue(AddProductPage.specific_price_discount_input, '10'));
    test('should choose the "Percentage" from the specific price type', () => client.waitAndSelectByValue(AddProductPage.specific_price_reduction_type_select, 'percentage'));
    test('should click on "Apply" button', () => client.waitForExistAndClick(AddProductPage.specific_price_save_button));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should check that the product price is equal to "€8.10"', () => client.checkTextValue(productPage.product_price, '€8.10'));
    test('should verify that the discount is equal to "SAVE 10%"', () => client.checkTextValue(CheckoutOrderPage.product_discount_details, 'SAVE 10%'));
    test('should set the "Machine time" date', () => {
      return promise
      .then(() => client.setMachineDate(-2))
        .then(() => client.refresh());
    });
    test('should verify that the discount does not exist', () => client.isNotExisting(CheckoutOrderPage.product_discount_details, 7000));
    test('should go back to the Back Office', () => {
      return promise
        .then(() => client.switchWindow(0))
       .then(() => client.setMachineDate(2));
    });
    test('should click on "Delete" icon from the specific price table', () => client.waitForExistAndClick(AddProductPage.specific_price_delete_icon, 2000));
    test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));
    test('should set the "Price (tax excl.)"', () => client.waitAndSetValue(AddProductPage.pricing_wholesale, data.common.wholesale));
    test('should select the "Priority management"', () => client.selectPricingPriorities());
  }, 'product/product');

  scenario('Fill the SEO information form', client => {
    test('should click on "SEO"', () => client.scrollWaitForExistAndClick(AddProductPage.product_SEO_tab, 50, 2000));
    test('should set the "Meta title"', () => client.waitAndSetValue(AddProductPage.SEO_meta_title, data.common.metatitle));
    test('should set the "Meta description"', () => client.waitAndSetValue(AddProductPage.SEO_meta_description, data.common.metadesc));
    test('should set the "Friendly URL"', () => client.waitAndSetValue(AddProductPage.SEO_friendly_url, data.common.shortlink));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
  }, 'product/product');

  scenario('Fill the product options form', client => {
    test('should click on "Options"', () => client.scrollWaitForExistAndClick(AddProductPage.product_options_tab));
    test('should click on "Web only (not sold in your retail store)" checkbox', () => client.waitForExistAndClick(AddProductPage.options_online_only));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should check that the product online only flag does not exist', () => client.isNotExisting(productPage.product_online_only_flag, 2000));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Web only (not sold in your retail store)" checkbox', () => client.waitForExistAndClick(AddProductPage.options_online_only, 2000));
    test('should click on "Available for order" checkbox', () => client.waitForExistAndClick(AddProductPage.options_available_for_order_checkbox));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should check that the product online only flag does exist', () => client.isExisting(productPage.product_online_only_flag, 2000));
    test('should check that the product price well displayed', () => client.isExisting(productPage.product_price));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Show price" checkbox', () => client.waitForExistAndClick(AddProductPage.options_show_price_checkbox, 2000));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should check that the product price does not exist', () => client.isNotExisting(productPage.product_price));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Show price" checkbox', () => client.waitForExistAndClick(AddProductPage.options_show_price_checkbox, 2000));
    test('should click on "Available for order" checkbox', () => client.waitForExistAndClick(AddProductPage.options_available_for_order_checkbox));
    test('should choose the "Catalog only" from the visibility list', () => client.waitAndSelectByValue(AddProductPage.options_visibility, 'catalog'));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should go to the "Home" page', () => client.waitForExistAndClick(AccessPageFO.logo_home_page));
    test('should click on "SEE ALL PRODUCTS" link', () => client.scrollWaitForExistAndClick(productPage.see_all_products));
    test('should go to next page', () => {
      return promise
        .then(() => client.isVisible(productPage.pagination_next))
        .then(() => client.clickNextOrPrevious(productPage.pagination_next));
    });
    test('should check that the product is well displayed', () => client.isExisting(productPage.product_image.replace('%S', 'vrt' + date_time)));
    test('should go to the "Home" page', () => client.waitForExistAndClick(AccessPageFO.logo_home_page));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.virtual.name + date_time));
    test('should check that the product does not exist', () => client.isNotExisting(SearchProductPage.product_result_name));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should choose the "Search" from the visibility list', () => client.waitAndSelectByValue(AddProductPage.options_visibility, 'search'));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should go to the "Home" page', () => client.waitForExistAndClick(AccessPageFO.logo_home_page));
    test('should click on "SEE ALL PRODUCTS" link', () => client.scrollWaitForExistAndClick(productPage.see_all_products));
    test('should go to next page', () => {
      return promise
        .then(() => client.isVisible(productPage.pagination_next))
        .then(() => client.clickNextOrPrevious(productPage.pagination_next));
    });
    test('should check that the product does not exist', () => client.isNotExisting(productPage.product_image.replace('%S', 'vrt' + date_time)));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.virtual.name + date_time));
    test('should check that the product is well displayed', () => client.isExisting(SearchProductPage.product_result_name));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should choose the "Nowhere" from the visibility list', () => client.waitAndSelectByValue(AddProductPage.options_visibility, 'none'));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should go to the "Home" page', () => client.waitForExistAndClick(AccessPageFO.logo_home_page));
    test('should click on "SEE ALL PRODUCTS" link', () => client.scrollWaitForExistAndClick(productPage.see_all_products));
    test('should go to next page', () => {
      return promise
        .then(() => client.isVisible(productPage.pagination_next))
        .then(() => client.clickNextOrPrevious(productPage.pagination_next));
    });
    test('should check that the product does not exist', () => client.isNotExisting(productPage.product_image.replace('%S', 'vrt' + date_time)));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.virtual.name + date_time));
    test('should check that the product does not exist', () => client.isNotExisting(SearchProductPage.product_result_name));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should choose the "Everywhere" from the visibility list', () => client.waitAndSelectByValue(AddProductPage.options_visibility, 'both'));
    test('should click on "Display condition on product page" checkbox', () => client.waitForExistAndClick(AddProductPage.options_show_condition_checkbox));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should go to the "Home" page', () => client.waitForExistAndClick(AccessPageFO.logo_home_page));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.virtual.name + date_time));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
    test('should set the shop language to "English"', () => client.changeLanguage());
    test('should click on "Product Details" tab', () => client.waitForExistAndClick(productPage.product_tab_list.replace('%I', 2), 5000));
    test('should check that the "Product condition" is equal to "New product"', () => {
      return promise
        .then(() => client.scrollTo(productPage.product_condition))
        .then(() => client.checkTextValue(productPage.product_condition, 'New product', 'equal', 2000));
    });
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should choose the "Used" from the condition list', () => client.waitAndSelectByValue(AddProductPage.options_condition_select, 'used', 3000));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should click on "Product Details" tab', () => client.waitForExistAndClick(productPage.product_tab_list.replace('%I', 2), 5000));
    test('should check that the "Product condition" is equal to "Used"', () => {
      return promise
        .then(() => client.scrollTo(productPage.product_condition))
        .then(() => client.checkTextValue(productPage.product_condition, 'Used', 'equal', 2000));
    });
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "Display condition on product page" checkbox', () => client.waitForExistAndClick(AddProductPage.options_show_condition_checkbox));
    test('should set the "ISBN" input', () => client.waitAndSetValue(AddProductPage.options_isbn, '123456789'));
    test('should set the "EAN-13" input', () => client.waitAndSetValue(AddProductPage.options_ean13, '1234567891'));
    test('should set the "UPC" input', () => client.waitAndSetValue(AddProductPage.options_upc, '1234567891'));
    test('should click on "ADD A CUSTOMIZAITION FIELD" button', () => client.scrollWaitForExistAndClick(AddProductPage.options_add_customization_field_button, 50));
    test('should set the customization field "Label" input', () => client.waitAndSetValue(AddProductPage.options_first_custom_field_label, 'test'));
    test('should select the customization field "Type" Text', () => client.waitAndSelectByValue(AddProductPage.options_first_custom_field_type, '1'));
    test('should click on "Required" checkbox', () => client.waitForExistAndClick(AddProductPage.options_first_custom_field_require));
    test('should click on "ADD A CUSTOMIZAITION" button', () => client.scrollWaitForExistAndClick(AddProductPage.options_add_customization_field_button, 50));
    test('should set the second customization field "Label" input', () => client.waitAndSetValue(AddProductPage.options_second_custom_field_label, 'test'));
    test('should select the customization field "Type" File', () => client.waitAndSelectByValue(AddProductPage.options_second_custom_field_type, '0'));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should set the "Product message" textarea', () => client.waitAndSetValue(productPage.product_customization_message, 'plop'));
    test('should click on "Save customization" button', () => client.waitForExistAndClick(productPage.save_customization_button));
    test('should click on "ADD TO CART" button', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    test('should click on "Proceed to checkout" modal button', () => client.waitForVisibleAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button));
    test('should click on "Product customization" link', () => client.waitForExistAndClick(CheckoutOrderPage.product_customization_link.replace('%I', 1)));
    test('should check that the "Product customization" label is equal to "test"', () => client.checkTextValue(CheckoutOrderPage.product_customization_modal.replace('%I', 1).replace('%R', 1), 'test', 'equal', 2000));
    test('should check that the "Product customization" value is equal to "plop"', () => client.checkTextValue(CheckoutOrderPage.product_customization_modal.replace('%I', 1).replace('%R', 2), 'plop'));
    test('should close the "Product customization" modal', () => client.waitForVisibleAndClick(CheckoutOrderPage.product_customization_close_modal_button.replace('%I', 1)));
    test('should click on "Product name" link', () => client.waitForExistAndClick(CheckoutOrderPage.product_name_link, 2000));
    test('should set the "Product message" textarea', () => client.waitAndSetValue(productPage.product_customization_message, 'plopplop'));
    test('should upload a file for product customization', () => client.uploadPicture('image_test.jpg', productPage.product_customization_file, 'file11'));
    test('should click on "Save customization" button', () => client.waitForExistAndClick(productPage.save_customization_button));
    test('should click on "ADD TO CART" button', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
    test('should click on "Proceed to checkout" modal button', () => client.waitForVisibleAndClick(CheckoutOrderPage.proceed_to_checkout_modal_button));
    test('should click on "Product customization" link', () => client.waitForExistAndClick(CheckoutOrderPage.product_customization_link.replace('%I', 2)));
    test('should check that the "Product customization" label is equal to "test"', () => client.checkTextValue(CheckoutOrderPage.product_customization_modal.replace('%I', 2).replace('%R', 1), 'test', 'equal', 2000));
    test('should check that the "Product customization" image does exist', () => client.isVisible(CheckoutOrderPage.product_customization_modal_image));
    test('should check that the "Product customization" label is equal to "test"', () => client.checkTextValue(CheckoutOrderPage.product_customization_modal.replace('%I', 3).replace('%R', 1), 'test'));
    test('should check that the "Product customization" value is equal to "plop"', () => client.checkTextValue(CheckoutOrderPage.product_customization_modal.replace('%I', 3).replace('%R', 2), 'plopplop'));
    test('should close the "Product customization" modal', () => client.waitForVisibleAndClick(CheckoutOrderPage.product_customization_close_modal_button.replace('%I', 2)));
    test('should go back to the Back Office', () => client.switchWindow(0));
    test('should click on "ATTACH A NEW FILE"', () => client.scrollWaitForExistAndClick(AddProductPage.options_add_new_file_button, 50, 2000));
    test('should add a file', () => client.addFile(AddProductPage.options_select_file, 'image_test.jpg'), 50);
    test('should set the file "Title"', () => client.waitAndSetValue(AddProductPage.options_file_name, 'title'));
    test('should set the file "Description" ', () => client.waitAndSetValue(AddProductPage.options_file_description, 'description'));
    test('should add the previous added file', () => client.scrollWaitForExistAndClick(AddProductPage.options_file_add_button, 50));
    test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 5000));
    test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    test('should go to the Front Office', () => client.switchWindow(1));
    test('should click on "Delete" icon of the first item', () => client.waitForExistAndClick(productPage.delete_shopping_cart_item, 2000));
    test('should click on "Delete" icon of the second item', () => client.waitForExistAndClick(productPage.delete_shopping_cart_item, 2000));
    test('should search for the product', () => client.searchByValue(SearchProductPage.search_input, SearchProductPage.search_button, data.virtual.name + date_time));
    test('should go to the product page', () => client.waitForExistAndClick(SearchProductPage.product_result_name));
    test('should click on "Attachments" tab', () => client.waitForExistAndClick(productPage.product_tab_list.replace('%I', 3), 2000));
    test('should check that the "Attachment title" is equal to "title"', () => {
      return promise
        .then(() => client.scrollTo(productPage.attachment_title))
        .then(() => client.checkTextValue(productPage.attachment_title, 'title', 'equal', 2000));
    });
    test('should check that the "Attachment description" is equal to "description"', () => {
      return promise
        .then(() => client.scrollTo(productPage.attachment_description))
        .then(() => client.checkTextValue(productPage.attachment_description, 'description', 'equal', 2000));
    });
    scenario('Delete the customization field', client => {
      test('should go back to the Back Office', () => client.switchWindow(0));
      test('should click on "Delete" icon of the first customization field', () => {
        return promise
          .then(() => client.scrollTo(AddProductPage.options_add_customization_field_button))
          .then(() => client.waitForExistAndClick(AddProductPage.delete_customization_field_icon, 2000));
      });
      test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));
      test('should click on "Delete" icon of the second customization field', () => client.waitForExistAndClick(AddProductPage.delete_customization_field_icon, 2000));
      test('should click on "Yes" modal button', () => client.waitForVisibleAndClick(AddProductPage.delete_confirmation_button.replace('%BUTTON', 'Yes')));
      test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 5000));
      test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(AddProductPage.close_validation_button));
    }, "common_client");
  }, 'product/product');
  scenario('Disable the order of products out of stock', client => {
    test('should go to "Product settings" page', () => client.switchWindow(2));
    test('should switch "Allow ordering of out-of-stock products" to "No"', () => client.scrollWaitForExistAndClick(ProductSettings.allowOrderOutOfStock_button.replace('%I', '0')));
    test('should click on "Save" button', () => {
      return promise
        .then(() => client.isVisible(AddProductPage.symfony_toolbar, 3000))
        .then(() => {
          if (global.isVisible) {
            client.waitForExistAndClick(AddProductPage.symfony_toolbar)
          }
        })
        .then(() => client.scrollWaitForExistAndClick(ProductSettings.save_button.replace('%POS', '3')));
    });
    test('should verify the appearance of the green validation', () => client.checkTextValue(ShopParameters.success_box, "Update successful"));
  }, "common_client");
  scenario('Delete the created "Currency"', client => {
    test('should go to "Currencies" page', () => client.switchWindow(3));
    test('should search for the created currency', () => client.searchByValue(Localization.Currency.iso_code_filter_input, Localization.Currency.search_button, 'USD'));
    test('should click on "Dropdown toggle" button', () => client.waitForExistAndClick(Localization.Currency.dropdown_toggle_button));
    test('should click on "Delete" action', () => client.waitForExistAndClick(Localization.Currency.delete_button));
    test('should accept the currently displayed alert dialog', () => client.alertAccept());
    test('should verify the appearance of the green validation', () => client.checkTextValue(InternationalPage.success_panel, "×\nSuccessful deletion."));
    test('should go back to the Catalog page', () => client.switchWindow(0));
  }, 'common_client');
  scenario('Delete customer', client => {
    test('should go to the "Customers" page', () => client.goToSubtabMenuPage(Menu.Sell.Customers.customers_menu, Menu.Sell.Customers.customers_submenu));
    test('should search for the customer email in the "Customers list"', () => {
      return promise
        .then(() => client.isVisible(Customer.customer_filter_by_email_input))
        .then(() => client.search(Customer.customer_filter_by_email_input, customerData.email));
    });
    test('should click on "Delete" button', () => {
      return promise
        .then(() => client.waitForExistAndClick(Customer.dropdown_toggle))
        .then(() => client.waitForExistAndClick(Customer.delete_button, 1000));
    });
    test('should accept the currently displayed alert dialog', () => client.alertAccept());
    test('should choose the option that allows customers to register again with the same email address', () => client.waitForExistAndClick(Customer.delete_first_option));
    test('should click on "Delete" button', () => client.waitForExistAndClick(Customer.delete_confirmation_button.replace('%BUTTON', 'Yes')));
    test('should verify the appearance of the green validation', () => client.checkTextValue(BO.success_panel, '×\nSuccessful deletion.'));
  }, 'customer');
  scenario('Disable the "United States" country', client => {
    test('should go to the "Countries" page', () => client.switchWindow(4));
    test('should search for "United states" country', () => client.searchByValue(Locations.Countries.search_input, Locations.Countries.search_button, "United States"));
    test('should click on "Edit" button', () => client.waitForExistAndClick(Locations.Countries.edit_button.replace('%I', 1)));
    test('should click on "Status" button', () => client.waitForExistAndClick(Locations.Countries.active_button.replace('%ACTIVE', 'off')));
    test('should click on "Save" button', () => client.waitForExistAndClick(Locations.Countries.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(InternationalPage.success_panel, "×\nSuccessful update."));
  }, 'common_client');
}, 'product/product');
