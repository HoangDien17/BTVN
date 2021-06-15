const { check } = require('express-validator');

let register = [
  check('username', "Tài khoản không được chứa kí tự đặc biệt, dài từ 3 - 8 kí tự !")
    .trim()
    .isLength({min:3}, {max: 8})
    .matches(/[A-Za-z0-9]/),
  check('password', "Mật khẩu chứa kí tự viết hoa, viết thường, số, kí tự đặc biệt và có độ dài từ 6 kí tự trở lên.")
    .isLength({min: 6})
    .matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{6,}$/),
  check('repassword', "Mật khẩu nhập lại không khớp.")
    .custom((value, {req}) =>{
        return value === req.body.password
    })
]

module.exports = {register}