const express = require("express");
const db = require("./db");
const adminRoutes = require("./routes/admin");
const departmentRoutes = require("./routes/department");
const app = express();
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
const morgan = require('morgan');
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));


app.use((error, req, res, next) => {
  res.status(400).json({
    message: error.message,
    error: "something went wrong please try again",
  });
});

adminRoutes(app);
departmentRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listering on the Prot ${PORT}`);
});
