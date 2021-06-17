const LoanService = require('../services/LoanServices');

let apiCreateLoan = async (req, res) => {
  try {
    let newLoan = await LoanService.apiCreateLoan(req.body);
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

let apiGetAllLoan = async (req, res) => {
  try {
    let getAllLoan = await LoanService.apiGetAllLoan();
    res.status(200).json(getAllLoan);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

let apiTraSach = async (req, res) => {
  try {
    let UserId = req.params.Uid;
    let BookId = req.params.Bid;
    let result = await LoanService.apiTraSach(UserId, BookId, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error)
  }
}

module.exports = { apiCreateLoan, apiGetAllLoan, apiTraSach }
