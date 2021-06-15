const db = require('../models');
const { Op } = require('sequelize');

let apiCreateLoan = async (data) => {
  let checkUserBook = await db.Loan.findOne({where: {
    [Op.and]: [{UserId: data.UserId}, {BookId: data.BookId}]
  }});
  let findBook = await db.Book.findOne({where: {id: data.BookId}});
  if(findBook.quantity < data.quantity) {
    throw new Error(`Số quyển sách  - ${findBook.nameBook} - trong thư viện không đủ số lượng.`);
  }
  await db.Book.update({quantity: (findBook.quantity-data.quantity)}, {where: {id: data.BookId}})
  if(checkUserBook) {
    let updateLoanByUser = await db.Loan.update({quantity: (checkUserBook.quantity + data.quantity )}, {where: {[Op.and]: [{UserId: data.UserId}, {BookId: data.BookId}]}});
    return { message: "Đã tồn tại.", updateLoanByUser}
  }
  let newItem = {
    UserId: data.UserId,
    BookId: data.BookId,
    quantity: data.quantity
  } 
  let newLoan = await db.Loan.create(newItem);
  return {message: "Tạo mới thành công.", newLoan}
};

module.exports = { apiCreateLoan }
