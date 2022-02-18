const path = require("path");
const express = require("express");
const db = require("./db");
const adminRoutes = require("./routes/admin");
const departmentRoutes = require("./routes/department");
const subjectRoutes = require("./routes/subject");
const teacherRoutes = require("./routes/teacher");
const app = express();
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
const morgan = require("morgan");
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use('/static', express.static('uploads'))

adminRoutes(app);
departmentRoutes(app);
subjectRoutes(app);
teacherRoutes(app);

app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    error: "something went wrong please try again",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listering on the Prot ${PORT}`);
});
