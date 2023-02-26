const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const db = require("./db");
const adminRoutes = require("./routes/admin");
const departmentRoutes = require("./routes/department");
const subjectRoutes = require("./routes/subject");
const teacherRoutes = require("./routes/teacher");
const studentRoutes = require("./routes/student");
const timeTableRoutes = require("./routes/timetable");
const attendanceRoutes = require("./routes/attendance");
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const internalMarksRoutes = require("./routes/internal-marks");
const announcementRoutes = require("./routes/announcement");
const semesterMarksRoutes = require("./routes/semester-marks");
const profileRoutes = require("./routes/profile");
const mentiesRoutes = require("./routes/menties");
const assignmentsRoutes = require("./routes/assignments");

const app = express();
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
const morgan = require("morgan");
app.use(morgan("tiny"));
app.use(express.json());

app.use(cors());
app.use("/static", express.static("uploads"));

adminRoutes(app);
departmentRoutes(app);
subjectRoutes(app);
teacherRoutes(app);
studentRoutes(app);
timeTableRoutes(app);
attendanceRoutes(app);
authRoutes(app);
notesRoutes(app);
internalMarksRoutes(app);
announcementRoutes(app);
semesterMarksRoutes(app);
profileRoutes(app);
mentiesRoutes(app);
assignmentsRoutes(app);

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
