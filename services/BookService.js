const db = require('../models');
const { Op } = require("sequelize");

let apiCreateBook = async (data) => {
  let checkBook = await db.Book.findOne({ where: { nameBook: data.nameBook } });
  if (checkBook) {
    throw new Error("Cuốn sách đã tồn tại trong thư viện.");
  }
  let newBookItem = {
    nameBook: data.nameBook,
    author: data.author,
    pageNumber: data.pageNumber,
    category: data.category,
    price: data.price,
    quantity: data.quantity,
    status: data.status
  }
  let createBook = await db.Book.create(newBookItem)
  return { message: "Thêm cuốn sách mới thành công.", createBook }
};

let apiGetAllBook = async (page) => {
  try {
    let limit = 2
    let getAllBook = await db.Book.findAll({limit: limit, offset: limit * page});
    return { getAllBook };
  } catch (error) {
    throw error;
  }
}

let apiUpdateBook = async (confirmId, data) => {
  try {
    let checkBook = await db.Book.findOne({ where: {[Op.and]: [{id: confirmId}, { nameBook: data.nameBook }] }});
    if (!checkBook) {
      throw new Error("Tên cuốn sách đã tồn tại trong thư viện, xin mời nhập tên khác.");
    }
    let updateItem = {
      nameBook: data.nameBook,
      author: data.author,
      pageNumber: data.pageNumber,
      category: data.category,
      price: data.price,
      quantity: data.quantity,
      status: data.status
    }
    let updateBook = await db.Book.update(updateItem, { where: { id: confirmId } });
    return { message: "Cập nhật thông tin cuốn sách thành công.", updateBook };
  } catch (error) {
    throw error;
  }
}

let apiDeleteBook = async (confirmId) => {
  try {
    let checkDelete = await db.Book.destroy({ where: { id: confirmId } });
    if (checkDelete === 1) {
      return { message: "Xóa cuốn sách thành công." }
    }
    return { mesage: "Cuốn sách đã bị xóa ra khỏi hệ thống quản lý." }
  } catch (error) {
    throw error;
  }
}

module.exports = { apiCreateBook, apiGetAllBook, apiUpdateBook, apiDeleteBook }
