/**
 * This script is based on the scenario described in this test link
 * [id="PS-89"][Name="Generate a PDF by date"]
 * http://testlink.prestashop.net/linkto.php?tprojectPrefix=PS&item=testcase&id=PS-89
 **/
const {Menu} = require('../../../selectors/BO/menu.js');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {CustomerSettings} = require('../../../selectors/BO/shopParameters/customer_settings');
const {OrderPage} = require('../../../selectors/BO/order');
const {Invoices} = require('../../../selectors/BO/order');
const commonOrder = require('../../common_scenarios/order');
let promise = Promise.resolve();

global.orderInfo = [];

scenario('Generate a PDF by date', () => {
  scenario('Login in the Front Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
  }, 'order');

  scenario('Create order in front office', () => {
    commonOrder.createOrderFO();
    scenario('Go to the home page', client => {
      test('should go to the Home Page', () => client.waitForExistAndClick(AccessPageFO.logo_home_page));
    }, 'order');
    commonOrder.createOrderFO();
  }, 'order');

  scenario('Generate a PDF by date', () => {
    scenario('Change the Customer Group tax parameter', client => {
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
      test('should go to "Product settings" page', () => client.goToSubtabMenuPage(Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.customer_settings_submenu));
      test('should click on "Group" tab', () => client.waitForExistAndClick(CustomerSettings.groups.group_button));
      test('should click on customer "Edit" button', () => client.waitForExistAndClick(CustomerSettings.groups.customer_edit_button));
      test('should select "Tax excluded" option for "Price display method"', () => client.waitAndSelectByValue(CustomerSettings.groups.price_display_method, "1"));
      test('should click on "Save" button', () => client.waitForExistAndClick(CustomerSettings.groups.save_button));
    }, 'order');
    scenario('Get all Order information', client => {
      test('should go to "Product settings" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.orders_submenu));
      for (let i = 1; i <= 2; i++) {
        test('should go the order n°' + i, () => client.waitForExistAndClick(OrderPage.order_view_button.replace("%ORDERNumber", i)));
        test('should change order state to "payment accepted"', () => client.changeOrderState(OrderPage, 'Payment accepted'));
        test('should get all order information', () => {
          return promise
            .then(() => client.getTextInVar(OrderPage.order_date, "invoiceDate"))
            .then(() => client.getTextInVar(OrderPage.order_ref, "OrderRef"))
            .then(() => {
              client.getTextInVar(OrderPage.product_information, "ProductRef").then(() => {
                global.tab['ProductRef'] = global.tab['ProductRef'].split('\n')[1];
                global.tab['ProductRef'] = global.tab['ProductRef'].substring(18);
              })
            })
            .then(() => client.pause(2000))
            .then(() => {
              client.getTextInVar(OrderPage.product_information, "ProductCombination").then(() => {
                global.tab['ProductCombination'] = global.tab['ProductCombination'].split('\n')[0];
                global.tab['ProductCombination'] = global.tab['ProductCombination'].split(':')[1];
              })
            })
            .then(() => client.pause(2000))
            .then(() => client.getTextInVar(OrderPage.product_quantity, "ProductQuantity"))
            .then(() => client.getTextInVar(OrderPage.total_order_price, "TotalPrice"))
            .then(() => client.displayHiddenBlock('product_price_edit'))
            .then(() => client.getAttributeInVar(OrderPage.product_unit_price, "value", "ProductUnitPrice"))
            .then(() => client.getAttributeInVar(OrderPage.product_price, "value", "ProductPrice"))
            .then(() => {
              global.tab["ProductTaxRate"] = Math.round(((global.tab["ProductPrice"] - global.tab["ProductUnitPrice"]) / global.tab["ProductUnitPrice"]) * 100);
            })
            .then(() => client.getTextInVar(OrderPage.total_product, "TotalProduct"))
            .then(() => client.getTextInVar(OrderPage.shipping_cost_price, "ShippingCost"))
            .then(() => client.getTextInVar(OrderPage.total, "Total"))
            .then(() => client.getTextInVar(OrderPage.total_tax, "TotalTax"))
            .then(() => client.getTextInVar(OrderPage.carrier, "Carrier"))
            .then(() => client.getTextInVar(OrderPage.payment_method, "PaymentMethod"))
            .then(() => {
              global.orderInfo[i - 1] = {
                "invoiceDate": global.tab['invoiceDate'],
                "OrderRef": global.tab['OrderRef'],
                "ProductRef": global.tab['ProductRef'],
                "ProductCombination": global.tab['ProductCombination'],
                "ProductQuantity": global.tab['ProductQuantity'],
                "TotalPrice": global.tab['TotalPrice'],
                "ProductUnitPrice": global.tab['ProductUnitPrice'],
                "ProductPrice": global.tab['ProductPrice'],
                "ProductTaxRate": global.tab['ProductTaxRate'],
                "TotalProduct": global.tab['TotalProduct'],
                "ShippingCost": global.tab['ShippingCost'],
                "Total": global.tab['Total'],
                "TotalTax": global.tab['TotalTax'],
                "Carrier": global.tab['Carrier'],
                "PaymentMethod": global.tab['PaymentMethod']
              }
            });
        });
        test('should go to "Order settings" page', () => client.waitForExistAndClick(Menu.Sell.Orders.orders_submenu));
      }
    }, 'order');
    scenario('Generate then check a PDF by date', client => {
      test('should go to "Orders - Invoices" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.invoices_submenu));
      test('should click on "Generate PDF file by date"', () => client.waitForExistAndClick(Invoices.generate_pdf_button));
      test('should wait for the "invoice" to download', () => client.pause(5000));
      for (let i = 1; i <= 2; i++) {
        test('should check the Customer name of the ' + i + ' product', () => client.checkDocument(global.downloadsFolderPath, 'invoices', 'John DOE'));
        test('should check the "Delivery Address " of the product n°' + i, () => {
          return promise
            .then(() => client.checkDocument(global.downloadsFolderPath, 'invoices', 'My Company'))
            .then(() => client.checkDocument(global.downloadsFolderPath, 'invoices', '16, Main street'))
            .then(() => client.checkDocument(global.downloadsFolderPath, 'invoices', '75002 Paris'))
            .then(() => client.checkDocument(global.downloadsFolderPath, 'invoices', 'France'))
        });
        test('should check the "invoice Date" of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].invoiceDate));
        test('should check the "Order Reference" of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].OrderRef));
        test('should check the "Product Reference"of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].ProductRef));
        test('should check the "Product Combination" of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].ProductCombination));
        test('should check the "Product Quantity" of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].ProductQuantity));
        test('should check the "Total Price" of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].TotalPrice));
        test('should check the "Unit Price" of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].ProductUnitPrice));
        test('should check the "Tax Rate" of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].ProductTaxRate));
        test('should check the "Total Product" of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].TotalProduct));
        test('should check the "Shipping Cost" of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].ShippingCost));
        test('should check the "Total" of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].Total));
        test('should check the "Total Tax" of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].TotalTax));
        test('should check the "Carrier" name of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].Carrier));
        test('should check the "Payment Method" of the product n°' + i, () => client.checkDocument(global.downloadsFolderPath, 'invoices', global.orderInfo[i - 1].PaymentMethod));
      }
      test('should delete the invoice pdf file', () => client.deleteFile(global.downloadsFolderPath, 'invoices.pdf'));
    }, 'order');
  }, 'order');
  scenario('Change the date', client => {
    test('should set the "From" date', () => client.waitAndSetValue(Invoices.from_input, '2020-08-04'));
    test('should set the "To" date', () => client.waitAndSetValue(Invoices.from_input, '2020-08-10'));
    test('should click on "Generate PDF file by date"', () => client.waitForExistAndClick(Invoices.generate_pdf_button));
    test('should check that no invoice has been found', () => client.checkTextValue(Invoices.no_invoice_alert, 'No invoice has been found for this period.', 'contain'));
  }, 'order');
}, 'order', true);