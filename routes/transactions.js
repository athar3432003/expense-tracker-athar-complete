const express = require("express");
const router = express.Router();

const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactions");

//router.get("/", (req, res) => res.send("Hello"));
//get all transactions route
router.route("/").get(getTransactions);

//add a transaction route
router.route("/").post(addTransaction);

//delete a transaction route
router.route("/:id").delete(deleteTransaction);

module.exports = router;
