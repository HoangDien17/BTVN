const BookService = require('../services/BookService');

let apiCreateBook = async (req, res) => {
  try {
    let newBook = await BookService.apiCreateBook(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

let apiGetAllBook = async (req, res) => {
  try {
    let limit = req.params.limit;
    let page = req.query.page;
    let getAllBook = await BookService.apiGetAllBook({limit: limit, offset: page});
    res.status(200).json(getAllBook);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

let apiUpdateBook = async (req, res) => {
  try {
    let confirmId = req.params.id;
    let updateBook = await BookService.apiUpdateBook(confirmId, req.body);
    res.status(200).json(updateBook);
  } catch (error) {
    res.status(500).json(error.message)
  }
}

let apiDeleteBook = async (req, res) => {
  try {
    let confirmId = req.params.id;
    let checkBook = await BookService.apiDeleteBook(confirmId);
    res.status(200).json(checkBook);
  } catch (error) {
    res.status(500).json(error.message)
  }
}
module.exports = { apiCreateBook, apiGetAllBook, apiUpdateBook, apiDeleteBook}
