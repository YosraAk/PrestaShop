module.exports = {
  AccessPageFO: {
    sign_in_button: '//*[@id="_desktop_user_info"]/div/a',
    login_input: '//*[@id="login-form"]/section/div[1]/div[1]/input',
    password_inputFO: '//*[@id="login-form"]/section/div[2]/div[1]/div/input',
    login_button: '//*[@id="login-form"]/footer/button',
    sign_out_button: '//*[@id="_desktop_user_info"]/div/a[1]',
    logo_home_page: '//*[@id="_desktop_logo"]//a',
    product_list_button: '//*[@id="content"]/section/a',
    categories_list: '//*[@id="left-column"]/div[1]/ul/li[2]/ul',
    category_name: '//*[@id="left-column"]/div[contains(@class, "categories")]//a[text()="%NAME"]',
    shopping_cart_button: '//*[@id="_desktop_cart"]/div',
    top_sellers_block: '//h1[contains(text(), "Best Sellers")]',
    new_products_block: '//h1[contains(text(), "New products")]',
    sitemap: '//*[@id="link-static-page-sitemap-2"]',
    page_link: '//*[@id="main"]//a[@title="%pageName"]',
    page_content: '//*[@id="content"]/p',
    address_information_link: '//*[@id="addresses-link"]',
    address_information: '//*[@id="address-%ID"]//address',
    addresses_warning: '//*[@id="notifications"]//li',
    identity_link: '//*[@id="identity-link"]',
    create_account_button: '//*[@id="content"]/div[contains(@class,"no-account")]/a',
    page_category: '//*[@id="wrapper"]//a/span[contains(text(),"%CATEGORY")]',
    product_name_title: '//*[@id="main"]//h1',
    review_page_link: '//*[@id="content"]//a[contains(text(),"%PAGENAME")]',
    not_found_erreur_message: '//*[@id="main"]//h1',
    footer_block: '//*[@id="footer"]//p[contains(text(),"%FOOTERBLOCKNAME")]',
    second_footer_block: '//*[@id="footer"]//div[@class="col-md-6 wrapper"][2]/p',
    footer_block_link_widget: '//*[@class="footer-container"]//p[contains(text(),"%FOOTERBLOCKNAME")]',
    footer_block_second_link_widget: '//*[@class="footer-container"]//div[@class="col-md-6 wrapper"][2]/p',
    display_before_footer_linkwidget: '//*[@id="footer"]/div[1]/div/div[3]/div//p[contains(text(),"%NAME")]',
    display_before_footer_second_linkwidget: '//*[@id="footer"]/div[1]/div/div[3]/div/div[2]/p',
    home_link_widget: '//*[@id="content"]/div[3]/div//p[contains(text(),"%HOMELINKWIDGET")]',
    second_home_link_widget: '//*[@id="content"]/div[3]//div[2]//p',
    display_nav1_link_widget: '//*[@id="header"]/nav/div/div/div[1]/div[1]/div[2]/div//p[contains(text(),"%NAVLINKWIDGET")]',
    second_display_nav1_link_widget: '//*[@id="header"]/nav/div/div/div[1]/div[1]/div[2]/div/div[2]/p',
    display_nav2_link_widget: '//*[@id="header"]/nav/div/div/div[1]/div[2]/div[4]/div//p[contains(text(),"%NAVLINKWIDGET")]',
    second_display_nav2_link_widget: '//*[@id="header"]/nav/div/div/div[1]/div[2]/div[4]/div/div[2]/p',
    nav_full_width_link_widget: '//*[@id="header"]/div[3]/div//p[contains(text(),"%NAVFULLWIDTHLINKWIDGET")]',
    terms_and_conditions_input: '//*[@id="customer-form"]//input[contains(@name,"psgdpr")]',
    second_nav_full_width_link_widget: '//*[@id="header"]/div[3]/div/div[2]/p',
    nav_left_column_link_widget: '//*[@id="left-column"]//div[contains(@class,"links")]//p[contains(text(),"%NAVLEFTCOLUMNLINKWIDGET")]',
    second_nav_left_column_link_widget: '(//*[@id="left-column"]//div[contains(@class,"links")]//p)[2]',
    nav_shopping_cart_link_widget: '//*[@class="card cart-summary"]//div[contains(@class,"links")]//p[contains(text(),"%NAVSHOPPINGCARTLINKWIDGET")]',
    second_shopping_cart_link_widget: '(//*[@class="card cart-summary"]//div[contains(@class,"links")]//p)[2]',
    nav_shopping_cart_footer_link_widget: '//div[contains(@class,"cart-grid-body")]//p[contains(text(),"%NAVSHOPPINGCARTFOOTERLINKWIDGET")]',
    second_nav_shopping_cart_footer_link_widget: '//div[contains(@class,"cart-grid-body")]//div[2]/p',
    display_top_link_widget: '//*[@id="header"]/div[2]/div/div[1]/div[2]/div[3]/div//p[contains(text(),"%DISPLAYTOP")]',
    second_display_top_link_widget: '//*[@id="header"]/div[2]/div/div[1]/div[2]/div[3]/div/div[2]/p',
    not_found_error_message: '//*[@id="main"]//h1',
    product_name: '//*[@id="js-product-list"]//h2//a[contains(text(),"%PAGENAME")]',
    personal_info: '//*[@id="footer_account_list"]//a[@title="Personal info"]',
    currency_list_select: '//*[@id="_desktop_currency_selector"]//button',
    currency_list_element: '//*[@id="_desktop_currency_selector"]//li/a[contains(text(),"%NAME")]',
    selected_currency_option: '//*[@id="_desktop_currency_selector"]//select/option[@selected="selected" and (text()="%D")]',
    selected_language_option: '//*[@id="_desktop_language_selector"]//select/option[@selected="selected" and (text()="%D")]',
    account: '//*[@id="_desktop_user_info"]/div[@class="user-info"]/a[@class="account"]/span',
    selected_language_by_isocode_option: '//*[@id="_desktop_language_selector"]//select/option[@selected="selected" and @data-iso-code="%ID"]',
    language_bloc: '//*[@id="_desktop_language_selector"]',
    popular_products_block:'//*[@id="content-hook-order-confirmation-footer"]/section',
    category_title:'//*[@id="js-product-list-header"]//h1'
  }
};
