const LoanService = require('../services/LoanServices');

let apiCreateLoan = async (req, res) => {
  try {
    let newLoan = await LoanService.apiCreateLoan(req.body);
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = { apiCreateLoan }
