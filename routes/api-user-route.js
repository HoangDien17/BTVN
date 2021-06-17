const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const Validation = require('../validation/user-validation')

module.exports = (fix) => {
  fix.use("/users", router);

  router.post("/", Validation.register, UserController.apiCreateUser);
  router.delete("/:id", UserController.apiDeleteUser);
  router.put("/", UserController.apiUpdateUser);
  router.get("/:limit?page", UserController.apiGetAllUser);
}

