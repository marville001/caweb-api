require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("App running....");
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
