require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const fileUpload = require("express-fileupload");

// App routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");

// Db connection
const DbConnect = require("./utils/dbConnect");
DbConnect();

const app = express();

// Add headers
app.use(function (req, res, next) {
  res.setHeader("cross-origin-resource-policy", "same-origin");

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// set security http headers
app.use(helmet());

//
app.use("/static", express.static("uploads"));

//  set limit request from same API in timePeroid from same ip
const limiter = rateLimit({
  max: 1000, //   max number of limits
  windowMs: 60 * 60 * 1000, // hour
  message: " Too many req from this IP , please Try  again in an Hour ! ",
});

app.use("/api", limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

// Data sanitization against XSS
app.use(xss()); //    protect from molision code coming from html

app.get("/", (req, res) => {
  res.send("App running....");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  res.status(404).send(`Can't find ${req.originalUrl} on the server`);
});

// Start server
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
