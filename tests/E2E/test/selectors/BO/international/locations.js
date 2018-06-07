module.exports = {
  Locations:{
    Countries: {
      search_input: '//*[@id="table-country"]//input[@name="countryFilter_b!name"]',
      search_button: '//*[@id="submitFilterButtoncountry"]',
      edit_button: '//*[@id="table-country"]//tr[%I]//a[@title="Edit"]',
      active_button: '//*[@id="fieldset_0"]//span/label[@for="active_%ACTIVE"]',
      save_button: '//*[@id="country_form_submit_btn"]'
    }
  }
};