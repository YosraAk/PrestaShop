module.exports =Object.assign(
  {
    InternationalPage: {
      success_panel: '//div[@class="alert alert-success"]',
    }
  },
  require('./taxes'),
  require('./translations'),
  require('./localization'),
  require('./locations')
);
