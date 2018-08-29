module.exports = {
  Shop: {
    view_my_shop_button: '//*[@id="header_shopname"]',
    symfony_toolbar: '//*[contains (@id, "sfToolbarMainContent")]/a',
    all_shops_btn: '//*[@id="shop-list"]',
    all_shops_header: 'shop-list',
    view_button: '(//*[@id="shop-list"]//a[@class="link-shop"])[%INDEX]',
    footer: '#footer',
  },
  Multistore: {
    CreateShop: {
      shop_name_input: '//*[@id="name"]',
      save_button: '//*[@id="shop_form_submit_btn"]',
    },
    SetVirtualUrl: {
      virtual_url_input: '//*[@id="virtual_uri"]',
      save_button: '//*[@id="shop_url_form_submit_btn_1"]',
    },
    delete_link: '//*[@id="table-shop"]//a[contains(@class, "delete")]',
    shop_link: '//*[@id="shops-tree"]//a[contains(text(), "%SHOPTEXT")]',
    action_link: '//*[@id="table-shop"]//button[contains(@class, "dropdown-toggle")]',
    reset_button: '[name="submitResetshop"]',
    set_shop_url_link: '//*[@id="table-shop"]//a[@class="multishop_warning"]',
    shop_name_input: '[name="shopFilter_a!name"]',
    shop_search_button: '//*[@id="submitFilterButtonshop"]',
    add_new_shop_button: '//*[@id="page-header-desc-shop_group-new_2"]',
  }
};
