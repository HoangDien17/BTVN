const UserService = require('../services/UserService');
const { validationResult } = require('express-validator');

let apiCreateUser = async (req, res) => {
  try {
    let validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      let { username, password} = req.body;
      let addUser = await UserService.apiCreateUser(username, password);
      res.status(201).json(addUser);
    }
    else {
      let errors = Object.values(validationErrors.mapped());
      let arrError = [];
      arrError = errors.map(item=>item.msg)
      res.status(400).json(arrError);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


let apiLoginUser = async (req, res) => {
  try {
    let { username, password } = req.body;
    let resultLogin = await UserService.apiLoginUser(username, password);
    res.status(200).json(resultLogin);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error);
  }
}

let apiUpdateUser = async (req, res) => {
  try {
    let username = req.body.username;
    let newPassword = req.body.newPassword;
    let userUpdate = await UserService.apiUpdateUser(username, newPassword);
    res.status(201).json(userUpdate);
  } catch (error) {
    res.status(500).json(error.message);
  }

}

let apiDeleteUser = async (req, res) => {
  try {
    let confirmId = req.params.id
    let resultDelete = await UserService.apiDeleteUser(confirmId);
    res.status(200).json(resultDelete);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = { apiCreateUser, apiLoginUser, apiUpdateUser, apiDeleteUser };
