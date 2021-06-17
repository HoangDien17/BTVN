const express = require('express');
const router = express.Router();

const BookController = require('../controllers/BookController');

module.exports = (fix) => {
  fix.use("/books", router);
  router.post("/", BookController.apiCreateBook);
  router.get("/:limit?page", BookController.apiGetAllBook);
  router.put("/:id", BookController.apiUpdateBook);
  router.delete("/:id", BookController.apiDeleteBook);
}
