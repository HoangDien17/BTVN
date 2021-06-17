const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
let apiCreateUser = async (username, password) => {
  let checkUsernameExists = await db.User.findOne({ where: { username: username } });
  if (checkUsernameExists) {
    throw new Error("Username đã tồn tại.")
  }
  else {
    let salt = bcrypt.genSaltSync(saltRounds);
    let userItem = {
      username: username,
      password: bcrypt.hashSync(password, salt)
    }
    let user = await db.User.create(userItem);
    return { message: "Tạo tài khoản thành công.", user };
  }
}

let apiLoginUser = async (username, password) => {
  try {
    let user = await db.User.findOne({ where: { username: username } });
    if (!user) {
      throw new Error("Tên đăng nhập không tồn tại.")
    }
    else {
      let checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        throw new Error("Password nhập chưa chính xác.");
      }
      else {
        let tokenAccess = jwt.sign({ username }, process.env.ACCESS_TEXT_SECRET, { expiresIn: `${process.env.ACCESS_TOKEN_LIFE}` });
        console.log(tokenAccess);
        return { message: "Đăng nhập thành công.", tokenAccess, user };
      }
    }
  } catch (error) {
    throw error;
  }
}

let apiUpdateUser = async (username, newPassword) => {
  let user = await db.User.findOne({ where: { username: username } });
  if (!user) {
    throw new Error("Tài khoản không tồn tại.");
  }
  else {
    let userUpdate = await db.User.update(
      {
        password: newPassword
      },
      {
        where: { username: username }
      })
    return {
      message: "Cập nhật mật khẩu thành công.",
      userUpdate
    }
  }
}

let apiDeleteUser = async (confirmId) => {
  try {
    let checkDeleteUser = await db.User.destroy({ where: { id: confirmId } });
    if (checkDeleteUser === 1) {
      return { message: "Xóa tài khoản thành công.", checkDeleteUser };
    }
    throw new Error("Tài khoản đã bị xóa ra khỏi hệ thống.")
  } catch (error) {
    throw error;
  }
}

let apiGetAllUser = async (page) => {
  try {
    let limit = 2;
    let getAllUser = await db.User.findAll({ limit: limit, offset: limit * page });
    return { getAllUser };
  } catch (error) {
    throw error
  }
}


module.exports = { apiCreateUser, apiLoginUser, apiUpdateUser, apiDeleteUser, apiGetAllUser }
