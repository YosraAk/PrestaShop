const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Menu} = require('../../../selectors/BO/menu');
const {Profile} = require('../../../selectors/BO/profile');

scenario('Login in the Back Office', client => {
  test('should open the browser', () => client.open());
  test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
}, 'common_client');

scenario('Check your profile', client => {
  test('should go to the symfony page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should click on the profile icon', () => client.waitForExistAndClick(Profile.employee_info_icon, 5000));
  test('should click on "Your profile" link', () => client.waitForExistAndClick(Profile.your_profile_link));
  test('should check that the employee\'s email is equal to "' + global.adminEmail + '"', () => client.checkAttributeValue(Profile.email_input, 'value', global.adminEmail));
}, 'common_client');

scenario('Logout from the Back Office By clicking Sign out', client => {
  test('should go to the symfony page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
  test('should click on the profile icon', () => client.waitForExistAndClick(Profile.employee_info_icon));
  test('should click on "Sign out" link', () => client.waitForExistAndClick(Profile.sign_out_link));
  test('should check that the authentication page is well opened', () => client.isExisting(AccessPageBO.login_buttonBO,2000));
}, 'common_client', true);
