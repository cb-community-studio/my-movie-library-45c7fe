const users = require("./users/users.service.js");
const movies = require("./movies/movies.service.js");
const rent = require("./rent/rent.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(movies);
  app.configure(rent);
  // ~cb-add-configure-service-name~
};
