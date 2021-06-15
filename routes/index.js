const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

const apiUserRoute = require('./api-user-route');
const apiBookRoute = require('./api-book-route');
const apiLoanRpute = require('./api-loan-route');

module.exports = (app) => {
  app.use("/api", router);
  router.post("/login", UserController.apiLoginUser);

  apiUserRoute(router);
  apiBookRoute(router);
  apiLoanRpute(router);
}