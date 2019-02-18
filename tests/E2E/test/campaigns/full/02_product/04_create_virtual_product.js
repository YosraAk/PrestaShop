const {AccessPageBO} = require('../../../selectors/BO/access_page.js');
const {OnBoarding} = require('../../../selectors/BO/onboarding');
const commonProducts = require('../../common_scenarios/product');
let promise = Promise.resolve();

let supplierData = {
  name: 'First Supplier',
  description: 'description',
  address: 'address',
  city: 'city',
  picture: 'image_test.jpg',
  metaTitle: 'meta title',
  metaDescription: 'meta description',
};

scenario('Create product with options in the Back Office', client => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    test('should check and click on "Stop the OnBoarding" button', () => {
      return promise
        .then(() => client.isVisible(OnBoarding.stop_button))
        .then(() => client.stopOnBoarding(OnBoarding.stop_button))
    });
  }, 'onboarding');
  commonProducts.fillOptionsTab(supplierData);

}, 'product/product', false);