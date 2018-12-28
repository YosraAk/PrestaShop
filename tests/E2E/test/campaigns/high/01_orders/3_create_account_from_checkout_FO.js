/**
 * This script is based on the scenario described in this video
 * https://drive.google.com/open?id=0BxY1cJAfxUUeSjc2bEl0TDNjcFU
 **/
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const common_scenarios = require('../../common_scenarios/order');

scenario('Create account from checkout in Front Office', () => {
  scenario('Open the browser and access to the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should access to the Front Office', () => client.accessToFO(AccessPageFO));
  }, 'order');
  common_scenarios.createOrderFO("create_account");
}, 'order', true);
