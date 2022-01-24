require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const DbConnect = require("./utils/dbConnect");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("uploads"));

DbConnect();

app.get("/", (req, res) => {
  res.send("App running....");
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));

// handle Globaly  the unhandle Rejection Error which is  outside the express
// e.g database connection
process.on("unhandledRejection", (error) => {
  // it uses unhandledRejection event
  // using unhandledRejection event
  console.log(" Unhandled Rejection => shutting down..... ");
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1); //  emediatly exists all from all the requests sending OR pending
  });
});
