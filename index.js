require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
var path = require('path');

// App routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const prayersRoutes = require("./routes/prayers");
const imagesRoutes = require("./routes/images");
const sccsRoutes = require("./routes/sccs");
const eventsRoutes = require("./routes/events");
const leadersRoutes = require("./routes/leaders");
const positionsRoutes = require("./routes/positions");
const aboutRoutes = require("./routes/about");
const contactRoutes = require("./routes/contact");

// Db connection
const DbConnect = require("./utils/dbConnect");
DbConnect();

const app = express();

var dir = path.join(__dirname, 'uploads');

app.use("/static", express.static(dir));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set security http headers
app.use(helmet());

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
app.use("/api/prayers", prayersRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/sccs", sccsRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/leaders", leadersRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);

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

module.exports = app;