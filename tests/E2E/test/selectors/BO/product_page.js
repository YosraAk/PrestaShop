module.exports = {
  Product: {
    sort_button: '//*[@id="product_catalog_list"]//div[@data-sort-col-name="%NAME%"]/span[@role="button"]',
    id_input: '//*[@id="filter_column_id_product_%TYPE%"]',
    name_input: '[name="filter_column_name"]',
    reference_input: '[name="filter_column_reference"]',
    category_input: '[name="filter_column_name_category"]',
    price_input: '//*[@id="filter_column_price_%TYPE%"]',
    quantity_input: '//*[@id="filter_column_sav_quantity_%TYPE%"]',
    status_select: '[name="filter_column_active"]',
    search_button: '[name="products_filter_submit"]',
    reset_link: '[name="products_filter_reset"]',
    paginator_select: '//*[@id="paginator_select_page_limit"]',
    name_column: '(//*[@id="product_catalog_list"]//tbody//tr[%INDEX%]//td[4]/a[contains(text(),"%UPPERTEXT%") or contains(text(),"%LOWERTEXT%")])',
    price_column: '(//*[@id="product_catalog_list"]//table/tbody/tr//td[7])',
    quantity_column: '(//*[@id="product_catalog_list"]//table/tbody/tr//td[8])',
    id_column: '(//*[@id="product_catalog_list"]//table/tbody/tr//td[2])',
    reference_category_column: '//*[@id="product_catalog_list"]//table//tr[%INDEX%]//td[contains(text(),"%UPPERTEXT%") or contains(text(),"%LOWERTEXT%")]',
    status_column: '//*[@id="product_catalog_list"]//table//tr[%INDEX%]//td//i[contains(@class,"%STATUS%")]',
    symfony_toolbar: '//*[contains (@id, "sfToolbarMainContent")]/a',
  }
};
