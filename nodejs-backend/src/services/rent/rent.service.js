const { Rent } = require('./rent.class');
const createModel = require('../../models/rent.model');
const hooks = require('./rent.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/rent', new Rent(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rent');

  service.hooks(hooks);
};