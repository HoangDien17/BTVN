const db = require('../models');
const { Op } = require('sequelize');

let apiCreateLoan = async (data) => {
  let checkUserBook = await db.Loan.findOne({
    where: {
      [Op.and]: [{ UserId: data.UserId }, { BookId: data.BookId }]
    }
  });
  let findBook = await db.Book.findOne({ where: { id: data.BookId } });
  if (findBook.quantity < data.quantity) {
    throw new Error(`Số quyển sách  - ${findBook.nameBook} - trong thư viện không đủ số lượng.`);
  }
  await db.Book.update({ quantity: (findBook.quantity - data.quantity) }, { where: { id: data.BookId } })
  if (checkUserBook) {
    let updateLoanByUser = await db.Loan.update({ quantity: (checkUserBook.quantity + data.quantity) }, { where: { [Op.and]: [{ UserId: data.UserId }, { BookId: data.BookId }] } });
    return { message: "Đã tồn tại.", updateLoanByUser }
  }
  let newItem = {
    UserId: data.UserId,
    BookId: data.BookId,
    quantity: data.quantity
  }
  let newLoan = await db.Loan.create(newItem);
  return { message: "Tạo mới thành công.", newLoan }
};

let apiGetAllLoan = async () => {
  try {
    let getAllLoan = await db.Loan.findAll({});
    return { getAllLoan };
  } catch (error) {
    throw error;
  }
}

let apiTraSach = async (UserId, BookId, data) => {
  // Trả sách
  let presentLoan = await db.Loan.findOne({where: {
    [Op.and]: [{UserId: UserId}, {BookId: BookId}]
  }});
  let presentBook = await db.Book.findOne({where: {id: BookId}});
  if(presentLoan) {
    if(presentLoan.quantity > data.quantity) {
      await db.Loan.update({quantity: (presentLoan.quantity - data.quantity)}, {where: {[Op.and]: [{UserId: UserId}, {BookId: BookId}]}});
      await db.Book.update({quantity: (presentBook.quantity + data.quantity)}, {where: {id: BookId}});
      return { message: `Còn lại ${presentLoan.quantity-data.quantity} quyển sách ${presentBook.nameBook} chưa trả lại.`};
    }
    await db.Book.update({quantity: (presentBook.quantity + data.quantity)}, {where: {id: BookId}});
    await db.Loan.destroy({where: {[Op.and]: [{UserId: UserId}, {BookId: BookId}]}});
    return { message: "Đã trả hết sách."}
  }
  let user = await db.User.findOne({where: {id: UserId}})
  return { message: `Không tồn tại thông tin mượn sách của người dùng - ${user.username} -`}
}

module.exports = { apiCreateLoan, apiGetAllLoan, apiTraSach }
