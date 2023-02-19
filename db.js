const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("DataBase connecte successfuly");
  })
  .catch((error) => {
    console.log(`Fail to connect DataBase ${error}`);
  });

module.exports = {
  db: connection,
};
