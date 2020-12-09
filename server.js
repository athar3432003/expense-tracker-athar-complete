const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
// const bodyparser = require("body-parser");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });
const transactions = require("./routes/transactions");

//connect to mongo db
connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/transactions", transactions);

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("client/build"));
  console.log(
    "path " + path.join(__dirname.substr(0, 1), "client/build/index.html")
  );
  console.log("path " + path.join(__dirname, "client/build/index.html"));
  app.get("*", (req, res) => {
    //res.sendFile(path.resolve(__dirname.substr(0, 1), "client", "build", "index.html"));

    res.sendFile(path.join(__dirname.substr(0, 1), "client/build/index.html"));
    //console.log("working directory", __dirname);
    //const index = path.join(__dirname, "index.html");
    //res.sendFile(index);
  });
}
console.log("env " + process.env.NODE_ENV);
//app.get("/", (req, res) => res.send("Hello world"));
const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow
  )
);
