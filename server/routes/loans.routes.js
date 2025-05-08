const express = require("express");
const loansController = require("../controllers/loans.controller")
const router = express.Router();

router.post("/", loansController.loanBookToMember);
router.patch("/", loansController.returnBook);

module.exports = router;