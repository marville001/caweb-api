const mongoose = require('mongoose');

let DB_URL = process.env.DB_URL;


console.log(`DB_URL`, DB_URL);

module.exports = () => {
  console.log('connecting to DB...');
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB connection successful!`))
    .catch((err) => {
      console.log('DB Connection Failed !');
      console.log(`err`, err);
    });
};