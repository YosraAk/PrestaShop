module.exports = {
  ModulePage: {
    modules_tab: '#subtab-AdminModulesManage',
    upload_button: '//*[@id="page-header-desc-configuration-add_module"]',
    zip_file_input: '//*[@id="importDropzone"]/input',
    installed_message: '//*[@id="importDropzone"]/div[3]/p[1]',
    close_modal_button: '//*[@id="module-modal-import-closing-cross"]',
    search_input: 'div.pstaggerAddTagWrapper > input',
    search_button: '.btn.btn-primary.pull-right.search-button',
    page_loaded: '.module-search-result-title',
    modules_search_input: '.pstaggerAddTagInput',
    module_selection_input: 'input[class*=pstaggerAddTagInput ]',
    modules_search_button: '#main-div button[class*=search-button]',
    configure_module_button: '//form[contains(@action, "action/configure/%moduleTechName")]//button[@data-confirm_modal="module-modal-confirm-%moduleTechName-configure"]',
    configure_module_theme_button: '//*[@data-tech-name="%moduleTechName"]//a[contains(@href,"configure/%moduleTechName")]',
    success_install_message: '//*[@id="importDropzone"]/div[3]/i',
    action_dropdown: 'div[data-tech-name="%moduleTechName"] button[class*="dropdown-toggle"]',
    uninstall_button: 'form[action*="action/uninstall/%moduleTechName"] button[data-confirm_modal="module-modal-confirm-%moduleTechName-uninstall"]',
    uninstall_confirmation: '//*[@id="module-modal-confirm-prestafraud-uninstall"]//a[contains(@class,"module_action_modal_uninstall")]',
    built_in_module_span: '//*[@id="built-in_modules"]',
    installed_module_span: '//*[@id="installed_modules"]',
    theme_module_span: '//*[@id="theme_modules"]',
    selection_search_button: '#module-search-button',
    install_button: '#modules-list-container-all div[data-tech-name="%moduleTechName"] button',
    config_legend_adwords: '//*[@id="content"]//h4[contains(@class,"page-subtitle")]',
    uninstall_adwords_module: '//*[@id="module-modal-confirm-gadwords-uninstall"]//a[contains(@class,"module_action_modal_uninstall")]',
    more_option_button: '//*[@id="upgradeButtonBlock"]//input',
    channel_select: '//*[@id="advanced"]/select',
    archive_select: '//*[@id="for-useArchive"]//select',
    save_button: '//*[@id="advanced"]//input[contains(@class,"btn-primary")]',
    save_message: '//*[@id="configResult"]',
    version_number: '//*[@id="for-useArchive"]//input',
    upgrade_button: '//*[@id="upgradeNow"]',
    loader_tag: '//*[@id="pleaseWait" and contains(@style,"display: none;")]',
    upgrade_block: '//*[@id="upgradeButtonBlock"]',
    refresh_button: '(//*[@id="upgradeButtonBlock"]//a)[2]',
    module_import_success: '//*[@id="importDropzone"]/div[3]/p[1]',
    config_legend: '#content > div:nth-child(5) ul[class*="page-breadcrumb"] > li:nth-child(2)',
    uninstall_module_modal: 'a[class*="module_action_modal_uninstall"]',
    disable_module: 'form[action*="action/disable/%moduleTechName"] button[data-confirm_modal="module-modal-confirm-%moduleTechName-disable"]',
    confirmation_disable_module: 'a[class*="module_action_modal_disable"]',
    module_autoUpgrade_menu: '//*[@id="subtab-AdminSelfUpgrade"]/a',
    rollback_selection: '//*[@id="restoreBackupContainer"]//select',
    rollback_version: '//*[@id="restoreBackupContainer"]//option[2]',
    rollback_button: '//*[@id="rollback"]',
    success_msg: '(//p[contains(@class,"alert-success")])[1]/p',
    module_list: '//*[@id="modules-list-container-all"]/div[%I]',
    sort_select: '//select[contains(@class,"sort-component")]',
    maintenance_shop: '//*[@id="currentConfiguration"]//input[contains(@name,"putUnderMaintenance")]',
    confirm_maintenance_shop_icon: '(//*[@id="currentConfiguration"]//img)[5]',
    enable_module: 'form[action*="action/enable/%moduleTechName"] button[data-confirm_modal="module-modal-confirm-%moduleTechName-enable"]',
    reset_module: '//form[contains(@action, "action/reset/%moduleTechName")]//button[@data-confirm_modal="module-modal-confirm-%moduleTechName-reset"]',
    reset_button_modal: '//*[@id="module-modal-confirm-%moduleTechName-reset"]//a[contains(@class, "module_action_modal_reset")]',
    backdrop_modale:'#module-modal-confirm-statsnewsletter-uninstall',
    installed_module_div: 'div[data-tech-name=%moduleTechName]',
    module_action_href: 'div[data-tech-name="%moduleTechName"] div[class*="module-actions"] > a , div[data-tech-name="%moduleTechName"] form > button[data-confirm_modal="module-modal-confirm-%moduleTechName-enable"]',
    //List of modules after search
    list_module: '//*[@id="modules-list-container-all"]/div[%I]',
    modules_number: '[class="module-sorting-search-wording"]',
    discover_button: '//*[@id="modules-list-container-all"]/div[@data-tech-name="pm_advancedtopmenu"]//a[contains(text(),"Discover")]',
    //List of modules in notifications tab
    configure_module: '//*[@id="modules-list-container-notification"]//button[@data-confirm_modal="module-modal-confirm-%moduleTechName-configure"]',
    modules_number_to_configure: '//*[@id="module-short-list-configure"]/span[1]',
    notification_number: '//*[@id="subtab-AdminModulesNotifications"]//span[@class="notification-counter"]',
    selection_tab: '//*[@id="head_tabs"]/a[1]',
    ModuleBankTransferPage: {
      account_owner_input: '//*[@id="BANK_WIRE_OWNER"]',
      account_details_textarea: '//*[@id="BANK_WIRE_DETAILS"]',
      bank_address_textarea: '//*[@id="BANK_WIRE_ADDRESS"]',
      save_button: '//*[@id="module_form_submit_btn"]'
    },
    MainMenuPage: {
      available_item_list: '//*[@id="availableItems"]//option[@value="CAT%ID"]',
      add_item_button: '//*[@id="addItem"]',
      selected_item_list : '//*[@id="items"]//option[@value="CAT%ID"]',
      save_button: '//*[@id="module_form_submit_btn"]'
    },
    ReadMoreModal: {
      read_more_link: '//*[@id="modules-list-container-all"]/div[contains(@data-tech-name, "%moduleTechName")]//a[text()="Read more"]',
      overview_content: '//*[@id="overview-%moduleTechName"]/p',
      additional_content: '//*[@id="additional-%moduleTechName"]',
      features_content: '//*[@id="features-%moduleTechName"]',
      changelog_content: '//*[@id="changelog-%moduleTechName"]',
      module_readmore_tabs: '//*[@id="modules-list-container-all"]/div[contains(@data-tech-name, "%moduleTechName")]//a[contains(text(), "%NAME")]',
      close_modal_button: '//*[@id="module-modal-read-more-%moduleTechName"]//button[@class="close"]'
    },

    //Module name in "addons.prestashop.com" after clicking on "Dicover" button
    module_name: '//*[@id="product_content"]/div[@class="product_head"]//h1',
    ContactFormPage: {
      send_confirmation_email_button: '//*[@id="fieldset_0"]//label[@for="CONTACTFORM_SEND_CONFIRMATION_EMAIL_%S"]',
      receive_customers_messages_label: '//*[@id="fieldset_0"]//label[@for="CONTACTFORM_SEND_NOTIFICATION_EMAIL_%S"]',
      save_button: '//*[@id="module_form_submit_btn"]'
    },
    see_more_link: '#main-div button[class*="see-more"]',
    configure_link: '#main-div div[data-tech-name="%moduleTechName"] a[href*="/action/configure"]',
  }
};
