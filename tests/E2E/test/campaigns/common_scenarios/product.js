const {Menu} = require('../../selectors/BO/menu.js');
let promise = Promise.resolve();
const {ProductList} = require('../../selectors/BO/add_product_page');
const {AddProductPage} = require('../../selectors/BO/add_product_page');
const {Product} = require('../../selectors/BO/product_page');


/**** Example of product data ****
 * var productData = {
 *  name: 'product_name',
 *  reference: 'product_reference',
 *  quantity: 'product_quantity',
 *  price: 'product_price',
 *  image_name: 'picture_file_name',
 *  type: "product_type(standard, pack, virtual)",
 *  attribute: {
 *      name: 'attribute_name',
 *      variation_quantity: 'product_variation_quantity'
 *  },
 *  feature: {
 *      name: 'feature_name',
 *      value: 'feature_value'
 *  },
 *  pricing: {
 *      unitPrice: "product_unit_price",
 *      unity: "product_unity",
 *      wholesale: "product_wholesale",
 *      type: 'percentage',
 *      discount: 'product_discount'
 *  },
 *  categories :{
 *      0: {
 *          name:"name category",
 *          main_category: true/false
 *      }
 *  },
 *  options: {
 *      filename: "attached_filename"
 *  }
 * };
 */
module.exports = {
  createProduct: function (AddProductPage, productData) {
    scenario('Create a new product in the Back Office', client => {
      test('should go to "Products" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
      test('should click on "New Product" button', () => client.waitForExistAndClick(AddProductPage.new_product_button));
      test('should set the "Name" input', () => client.waitAndSetValue(AddProductPage.product_name_input, productData["name"] + date_time));
      test('should set the "Reference" input', () => client.waitAndSetValue(AddProductPage.product_reference, productData["reference"]));
      test('should set the "Quantity" input', () => client.waitAndSetValue(AddProductPage.quantity_shortcut_input, productData["quantity"]));
      test('should set the "Price" input', () => client.setPrice(AddProductPage.priceTE_shortcut, productData["price"]));
      test('should upload the first product picture', () => client.uploadPicture(productData["image_name"], AddProductPage.picture));

      if (productData.hasOwnProperty('type') && productData.type === 'pack') {
        scenario('Add the created product to pack', client => {
          test('should select the "Pack of products"', () => client.waitAndSelectByValue(AddProductPage.product_type, 1));
          test('should add products to the pack', () => client.addPackProduct(productData['product']['name'] + date_time, productData['product']['quantity']));
        }, 'product/product');
      }

      if (productData.hasOwnProperty('attribute')) {
        scenario('Add Attribute', client => {
          test('should select the "Product with combination" radio button', () => client.scrollWaitForExistAndClick(AddProductPage.variations_type_button));
          test('should go to "Combinations" tab', () => client.scrollWaitForExistAndClick(AddProductPage.variations_tab));
          test('should select the variation', () => {
            if (productData.type === 'combination') {
              return promise
                .then(() => client.createCombination(AddProductPage.combination_size_m, AddProductPage.combination_color_beige));
            } else {
              return promise
                .then(() => client.waitAndSetValue(AddProductPage.variations_input, productData['attribute']['name'] + date_time + " : All"))
                .then(() => client.waitForExistAndClick(AddProductPage.variations_select));
            }
          });
          test('should click on "Generate" button', () => {
            return promise
              .then(() => client.waitForExistAndClick(AddProductPage.variations_generate))
              .then(() => client.getCombinationData(1));
          });
          test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.validation_msg, 'Settings updated.'));
          test('should select all the generated variations', () => client.waitForVisibleAndClick(AddProductPage.var_selected));
          test('should set the "Variations quantity" input', () => client.setVariationsQuantity(AddProductPage, productData['attribute']['variation_quantity']));
        }, 'product/create_combinations');
      }

      if (productData.hasOwnProperty('feature')) {
        scenario('Add Feature', client => {
          test('should click on "Add feature" button', () => {
            return promise
              .then(() => client.scrollTo(AddProductPage.product_create_category_btn))
              .then(() => client.waitForExistAndClick(AddProductPage.add_feature_to_product_button));
          });
          test('should select the created feature', () => client.selectFeature(AddProductPage, productData['feature']['name'] + date_time, productData['feature']['value']));
        }, 'product/product');
      }

      if (productData.hasOwnProperty('pricing')) {
        scenario('Edit product pricing', client => {
          test('should click on "Pricing"', () => client.scrollWaitForExistAndClick(AddProductPage.product_pricing_tab, 50));
          test('should set the "Price per unit (tax excl.)"', () => client.waitAndSetValue(AddProductPage.unit_price, productData['pricing']['unitPrice']));
          test('should set the "Unit"', () => client.waitAndSetValue(AddProductPage.unity, productData['pricing']['unity']));
          test('should set the "Price (tax excl.)"', () => client.waitAndSetValue(AddProductPage.pricing_wholesale, productData['pricing']['wholesale']));
          test('should click on "Add specific price" button', () => client.waitForExistAndClick(AddProductPage.pricing_add_specific_price_button));
          test('should change the reduction type to "Percentage"', () => {
            return promise
              .then(() => client.pause(3000))
              .then(() => client.waitAndSelectByValue(AddProductPage.specific_price_reduction_type_select, productData['pricing']['type']));
          });
          test('should set the "Discount" input', () => client.waitAndSetValue(AddProductPage.specific_price_discount_input, productData['pricing']['discount']));
          test('should click on "Apply" button', () => client.waitForExistAndClick(AddProductPage.specific_price_save_button));
        }, 'product/product');
      }

      if (productData.hasOwnProperty('options')) {
        scenario('Edit product options', client => {
          test('should click on "Options"', () => client.scrollWaitForExistAndClick(AddProductPage.product_options_tab));
          test('should select the attached file to the product', () => {
            return promise
              .then(() => client.scrollTo(AddProductPage.options_add_new_file_button))
              .then(() => client.waitForExistAndClick(AddProductPage.attached_file_checkbox.replace('%FileName', productData.options.filename)))
          });
        }, 'product/product');
      }

      if (productData.hasOwnProperty('categories')) {
        scenario('Add category', client => {
          test('should search for the category', () => client.waitAndSetValue(AddProductPage.search_categories, productData.categories['1']['name'] + date_time));
          test('should select the category', () => client.waitForVisibleAndClick(AddProductPage.list_categories));
          test('should open all categories', () => client.openAllCategory());
          if (Object.keys(productData.categories).length > 1) {
            Object.keys(productData.categories).forEach(function (key) {
              if (productData.categories[key]["main_category"] && productData.categories[key]["name"] !== 'home') {
                test('should choose the created category as default', () => {
                  return promise
                    .then(() => client.scrollTo(AddProductPage.category_radio.replace('%S', productData.categories[key]["name"] + date_time)))
                    .then(() => client.waitForExistAndClick(AddProductPage.category_radio.replace('%S', productData.categories[key]["name"] + date_time), 4000));
                });
              }
            });
          } else {
            test('should delete the home category', () => client.waitForExistAndClick(AddProductPage.default_category));
          }
        }, 'product/product');
      }

      scenario('Save the created product', client => {
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
        test('should click on "Save" button', () => client.waitForExistAndClick(AddProductPage.save_product_button, 2000));
        test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.validation_msg, 'Settings updated.'));
      }, 'product/product');

    }, 'product/product');

  },

  checkProductBO(AddProductPage, productData) {
    scenario('Check the product creation in the Back Office', client => {
      test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
      test('should search for product by name', () => client.searchProductByName(productData.name + date_time));
      test('should check the existence of product name', () => client.checkTextValue(AddProductPage.catalog_product_name, productData.name + date_time));
      test('should check the existence of product reference', () => client.checkTextValue(AddProductPage.catalog_product_reference, productData.reference));
      test('should check the existence of product category', () => client.checkTextValue(AddProductPage.catalog_product_category, 'Home'));
      test('should check the existence of product price TE', () => client.checkProductPriceTE(productData.price));
      test('should check the existence of product quantity', () => client.checkTextValue(AddProductPage.catalog_product_quantity, productData.quantity));
      test('should check the existence of product status', () => client.checkTextValue(AddProductPage.catalog_product_online, 'check'));
      test('should click on "Reset button"', () => client.waitForExistAndClick(AddProductPage.catalog_reset_filter));
    }, 'product/check_product');
  },

  sortProduct: function (selector, sortBy) {
    scenario('Check the sort of products by "' + sortBy.toUpperCase() + '"', client => {
      test('should click on "Sort by ASC" icon', () => {
        let sortSelector = sortBy === 'name' || sortBy === 'reference' ? ProductList.sort_button.replace("%B", sortBy) : sortBy === 'id_product' ? ProductList.sort_by_icon.replace("%B", sortBy).replace("%W", "desc") : ProductList.sort_by_icon.replace("%B", sortBy).replace("%W", "asc");
        for (let j = 0; j < global.productsPageNumber; j++) {
          promise = client.getProductsInformation(selector, j);
        }
        return promise
          .then(() => client.moveToObject(sortSelector))
          .then(() => client.waitForExistAndClick(sortSelector));
      });
      test('should check that the products is well sorted by ASC', () => {
        for (let j = 0; j < global.productsPageNumber; j++) {
          promise = client.getProductsInformation(selector, j, true);
        }
        return promise
          .then(() => client.sortTable("ASC", sortBy))
          .then(() => client.checkSortProduct());
      });
      test('should click on "Sort by DESC" icon', () => {
        return promise
          .then(() => client.moveToObject(ProductList.sort_by_icon.replace("%B", sortBy).replace("%W", "asc")))
          .then(() => client.waitForExistAndClick(ProductList.sort_by_icon.replace("%B", sortBy).replace("%W", "asc")));
      });
      test('should check that the products is well sorted by DESC', () => {
        for (let j = 0; j < global.productsPageNumber; j++) {
          promise = client.getProductsInformation(selector, j, true);
        }
        return promise
          .then(() => client.sortTable("DESC", sortBy))
          .then(() => client.checkSortProduct());
      });
    }, 'product/product');
  },

  checkPaginationFO(client, productPage, buttonName, pageNumber) {
    let selectorButton = buttonName === 'Next' ? productPage.pagination_next : productPage.pagination_previous;
    test('should click on "' + buttonName + '" button', () => {
      return promise
        .then(() => client.isVisible(selectorButton))
        .then(() => client.clickNextOrPrevious(selectorButton));
    });
    test('should check that the current page number is equal to "' + pageNumber + '"', () => client.checkTextValue(productPage.current_page, pageNumber));
    test('should check that the page value in the URL is equal to "' + pageNumber + '"', () => client.checkParamFromURL('page', pageNumber));
  },


  checkPaginationBO(nextOrPrevious, pageNumber, itemPerPage, close = false, paginateBetweenPages = false) {
    scenario('Navigate between catalog pages and set the paginate limit equal to "' + itemPerPage + '"', client => {
      let selectorButton = nextOrPrevious === 'Next' ? ProductList.pagination_next : ProductList.pagination_previous;
      test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
      test('should set the "item per page" to "' + itemPerPage + '"', () => client.waitAndSelectByValue(ProductList.item_per_page, itemPerPage));
      test('should check that the current page is equal to "' + pageNumber + '"', () => client.checkAttributeValue(ProductList.page_active_number, 'value', pageNumber, 'contain', 3000));
      test('should check that the number of products is less or equal to "' + itemPerPage + '"', () => {
        return promise
          .then(() => client.getProductPageNumber('product_catalog_list'))
          .then(() => expect(global.productsPageNumber).to.be.at.most(itemPerPage));
      });
      if (paginateBetweenPages) {
        /** @todo to be removed when the PR that creates a global variable to determine if we are in the debug mode or not will be merged **/
        test('should close the symfony toolbar if exists', () => {
          return promise
            .then(() => client.isVisible(AddProductPage.symfony_toolbar))
            .then(() => {
              if (global.isVisible) {
                client.waitForExistAndClick(AddProductPage.symfony_toolbar);
              }
            });
        });
        test('should click on "' + nextOrPrevious + '" button', () => {
          return promise
            .then(() => client.isVisible(selectorButton))
            .then(() => client.clickNextOrPrevious(selectorButton));
        });
        test('should check that the current page is equal to 2', () => client.checkAttributeValue(ProductList.page_active_number, 'value', '2', 'contain', 3000));
        test('should set the "Page value" input to "' + pageNumber + '"', () => {
          return promise
            .then(() => client.waitAndSetValue(ProductList.page_active_number, pageNumber))
            .then(() => client.keys('Enter'))
        });
        test('should check that the current page is equal to "' + pageNumber + '"', () => client.checkAttributeValue(ProductList.page_active_number, 'value', pageNumber, 'contain', 3000));
      }

      if (close)
        test('should set the "item per page" to 20 (back to normal)', () => client.waitAndSelectByValue(ProductList.item_per_page, 20));
    }, 'product/product', close);
  },

  deleteProduct(AddProductPage, productData) {
    scenario('Delete the created product', client => {
      test('should go to "Catalog" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu));
      test('should search for the created product', () => client.searchProductByName(productData.name + date_time));
      test('should click on "Dropdown toggle" button', () => client.waitForExistAndClick(ProductList.dropdown_button.replace('%POS', '1')));
      test('should click on "Delete" action', () => client.waitForExistAndClick(ProductList.action_delete_button.replace('%POS', '1')));
      test('should click on "Delete now" modal button', () => client.waitForVisibleAndClick(ProductList.delete_now_modal_button, 1000));
      test('should verify the appearance of the green validation', () => client.checkTextValue(AddProductPage.success_panel, 'Product successfully deleted.'));
      test('should click on "Reset" button', () => client.waitForExistAndClick(AddProductPage.catalog_reset_filter));
    }, 'product/check_product');
  },


  filterProducts(filter, close) {
    switch (filter) {
      case "ID":
        this.filterByMinAndMaxFilters(filter, Product.id_input, Product.id_column, close, 5, 10);
        break;
      case "Name":
        this.filterByTextFilters(filter, Product.name_input, Product.name_column, 'Mug', close);
        break;
        break;
      case "Reference":
        this.filterByTextFilters(filter, Product.reference_input, Product.reference_category_column, 'demo', close);
        break;
        break;
      case "Category":
        this.filterByTextFilters(filter, Product.category_input, Product.reference_category_column, 'Art', close);
        break;
      case "Price":
        this.filterByMinAndMaxFilters(filter, Product.price_input, Product.price_column, close, 18, 25);
        break;
      case "Quantity-Max":
        this.filterByMinThenMaxFilters(filter, Product.quantity_input, Product.quantity_column, 'Quantity', close, 300, 1000);
        break;
      case "Quantity-Min":
        this.filterByMinThenMaxFilters(filter, Product.quantity_input, Product.quantity_column, 'Quantity', close, 300);
        break;
      case "Inactive-Status":
        this.filterBySelectFilters(filter, Product.status_select, Product.status_column.replace("%STATUS%", "action-enabled"), 0, close, "Status");
        break;
      case "Active-Status":
        this.filterBySelectFilters(filter, Product.status_select, Product.status_column.replace("%STATUS%", "action-enabled"), 1, close, "Status");
        break;
    }
  },
  filterByTextFilters(filter, inputSelector, filterSelector, filterValue, close){
    scenario('should filter products by "' + filter + '"', client => {
      test('should set "' + filter + '" input', () => client.waitAndSetValue(inputSelector, filterValue));
      test('should click on "Search" button', () => client.waitForExistAndClick(Product.search_button));
      test('should check the result of the filter: "' + filter + '"', () => {
        return promise
          .then(() => client.checkProductsNumber('product'))
          .then(() => {
            if (numberOfProducts !== 0) {
              for (let i = 1; i < numberOfProducts + 1; i++) {
                client.checkFilterResults(filterSelector.replace("%LOWERTEXT%", filterValue.charAt(0).toLowerCase() + filterValue.slice(1)).replace("%UPPERTEXT%", filterValue.charAt(0).toUpperCase() + filterValue.slice(1)), i, filter, Product.search_button);
              }
            }
          })
          .then(() => client.waitForExistAndClick(Product.reset_link, 2000));
      })
    }, 'product/product', close);
  },
  filterByMinAndMaxFilters(filter, inputSelector, filterSelector, close, minValue = 0, maxValue = 0){
    scenario('should filter products by "' + filter + '"', client => {
      test('should set "Price Min" input', () => client.waitAndSetValue(inputSelector.replace("%TYPE%", "min"), minValue));
      test('should set "Price Max" input', () => client.waitAndSetValue(inputSelector.replace("%TYPE%", "max"), maxValue));
      test('should click on "Search" button', () => client.waitForExistAndClick(Product.search_button));
      test('should check the result of the filter: "' + filter + '"', () => {
        return promise
          .then(() => client.checkProductsNumber('product'))
          .then(() => client.getProductsByFilter(filterSelector))
          .then(() => {
            if (numberOfProducts !== 0 && productsByFilter) {
              for (let i = 1; i < numberOfProducts + 1; i++) {
                client.checkFilterResults(filterSelector, i, filter, Product.search_button, minValue, maxValue);
              }
            }
          })
          .then(() => client.waitForExistAndClick(Product.reset_link, 2000));
      })
    }, 'product/product', close);
  },
  filterBySelectFilters(filter, inputSelector, filterSelector, filterValue, close, filterName){
    scenario('should filter products by "' + filter + '"', client => {
      test('should set "Status" select value', () => client.waitAndSelectByValue(inputSelector, filterValue));
      test('should click on "Search" button', () => client.waitForExistAndClick(Product.search_button));
      test('should check the result of the filter: "' + filter + '"', () => {
        return promise
          .then(() => client.checkProductsNumber('product'))
          .then(() => {
            if (numberOfProducts !== 0 && productsByFilter) {
              for (let i = 1; i < numberOfProducts + 1; i++) {
                client.checkFilterResults(filterSelector, i, filterName, Product.search_button);
              }
            }
          })
          .then(() => client.waitForExistAndClick(Product.reset_link, 2000));
      })
    }, 'product/product', close);
  },
  filterByMinThenMaxFilters(filter, inputSelector, filterSelector, filterName, close, minValue, maxValue = 0){
    if (maxValue === 0) {
      scenario('should filter products by "' + filter + '"', client => {
        test('should set "' + filter + '" input', () => client.waitAndSetValue(inputSelector.replace("%TYPE%", 'min'), minValue));
        test('should click on "Search" button', () => client.waitForExistAndClick(Product.search_button));
        test('should check the result of the filter: "' + filter + '"', () => {
          return promise
            .then(() => client.checkProductsNumber('product'))
            .then(() => client.getProductsByFilter(filterSelector))
            .then(() => {
              if (numberOfProducts !== 0 && productsByFilter) {
                for (let i = 1; i < numberOfProducts + 1; i++) {
                  client.checkFilterResults(filterSelector, i, filterName, Product.search_button, minValue);
                }
              }
            })
        })
      }, 'product/product', close);
    }
    else {
      scenario('should filter products by "' + filter + '"', client => {
        test('should set "' + filter + '" input', () => client.waitAndSetValue(inputSelector.replace("%TYPE%", 'max'), maxValue));
        test('should click on "Search" button', () => client.waitForExistAndClick(Product.search_button));
        test('should check the result of the filter: "' + filter + '"', () => {
          return promise
            .then(() => client.checkProductsNumber('product'))
            .then(() => client.getProductsByFilter(Product.quantity_column))
            .then(() => {
              if (numberOfProducts !== 0 && productsByFilter) {
                for (let i = 1; i < numberOfProducts + 1; i++) {
                  client.checkFilterResults(Product.quantity_column, i, filterName, Product.search_button, minValue, maxValue);
                }
              }
            })
            .then(() => client.waitForExistAndClick(Product.reset_link, 2000));
        })
      }, 'product/product', close);
    }
  },
};
