const express = require('express');
const router = express.Router();

const LoanController = require('../controllers/LoanController');

module.exports = (fix) => {
  fix.use("/loans", router);
  router.post("/", LoanController.apiCreateLoan);
  router.get("/", LoanController.apiGetAllLoan);
  router.put("/:Uid/:Bid", LoanController.apiTraSach);
}
