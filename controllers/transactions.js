const Transaction = require("../models/Transactions");

//desc Get all trans
//route /api/v1/transactions
//access Public
exports.getTransactions = async (req, res, next) => {
  //res.send("Get Transactions");
  try {
    //connectDB();
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      count: transactions.count,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

//desc Add a trans
//route /api/v1/transactions
//access Public
exports.addTransaction = async (req, res, next) => {
  try {
    //res.send("Post Transactions");

    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      //console.log(err);
      //console.log(Object.values(err.errors));
      const messages = []; //err.errros.map((val) => val.message);
      for (field in err.errors) {
        //console.log(err.errors[field].message);
        messages.push(err.errors[field].message);
      }
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
};

//desc Delete a trans
//route /api/v1/transactions/:id
//access Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "no transaction found",
      });
    }

    await transaction.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    //console.log(err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
