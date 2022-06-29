require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

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
const blogsRoutes = require("./routes/blogs");
const mainLeadersRoutes = require("./routes/mainLeaders");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set security http headers
app.use(helmet());

//  Body Parser  => reading data from body into req.body protect from scraping etc
app.use(express.json({ limit: "10kb" }));

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
app.use("/api/blogs", blogsRoutes);
app.use("/api/main-leaders", mainLeadersRoutes);

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
    res.status(404).send(`Can't find ${req.originalUrl} on the server`);
});

// Start server
const PORT = process.env.PORT || 5505;
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
