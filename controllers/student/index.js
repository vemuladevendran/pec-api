"use strict";

const Student = require("../../models/student");
const fs = require("fs/promises");

const createStudent = async (req, res, next) => {
  try {
    const filters = {
      $or: [
        {
          examNumber: req?.body.examNumber,
        },
        {
          rollNumber: req?.body.rollNumber,
        },
      ],
      isDeleted: false,
    };

    const doc = await Student.findOne(filters);
    //  checking student already exist or not
    if (doc) {
      return res
        .status(400)
        .json("Student RollNumber Or ExamNumber already exist");
    }
    // taking image file from the reqest
    if (req.file?.originalname) {
      const fileExt = req.file.originalname.split(".").pop();
      await fs.rename(req.file.path, `${req.file.path}.${fileExt}`);
      const staticHost = "http://localhost:3000";
      req.body.photo = `${staticHost}/static/students/${req.file.filename}.${fileExt}`;
    }
    const result = await Student.create(req.body);
    return res.status(201).json("created successfully");
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    // taking image file from the reqest
    if (req.file?.originalname) {
      const fileExt = req.file.originalname.split(".").pop();
      await fs.rename(req.file.path, `${req.file.path}.${fileExt}`);
      const staticHost = "http://localhost:3000";
      req.body.photo = `${staticHost}/static/students/${req.file.filename}.${fileExt}`;
    }

    const result = await Student.findOneAndUpdate(
      {
        id: req.params.id,
        isDeleted: false,
      },
      req.body,
      { new: true }
    );
    return res.status(200).json("Updated successfully");
  } catch (error) {
    next(error);
  }
};

const getStudents = async (req, res, next) => {
  try {
    const filters = {
      isDeleted: false,
    };

    if (req.query.department) {
      filters.department = req.query.department;
    }
    if (req.query.departmentName) {
      filters.department = req.query.departmentName;
    }

    if (req.query.year) {
      filters.year = req.query.year;
    }

    if (req.query.section) {
      filters.section = req.query.section;
    }

    if (req.query.rollNumber) {
      filters.rollNumber = new RegExp(req.query.rollNumber.toUpperCase());
    }
    if (req.query.examNumber) {
      filters.examNumber = new RegExp(req.query.examNumber.toUpperCase());
    }

    if (req.query.studentName) {
      filters.studentName = new RegExp(req.query.studentName);
    }
    const result = await Student.find(filters).sort({
      examNumber: "ascending",
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// get students by examnumbers;
const getStudentsByExamNumber = async(req, res, next) => {
  try {
    const numbers  = req.query.examNumber;
    const values = Object.values(numbers);
    const students = await Student.find({ examNumber: { $in: values } });
     // Sort the students by exam number
     const sortedStudents = students.sort((a, b) => {
      const aIndex = values.indexOf(a.examNumber);
      const bIndex = values.indexOf(b.examNumber);
      return aIndex - bIndex;
    });
    return res.status(200).json(sortedStudents);
  } catch (error) {
    next(error);
  }
}

// delete student
const deleteStudent = async (req, res, next) => {
  try {
    const doc = await Student.findOneAndUpdate(
      { id: req.params.id },
      { isDeleted: true }
    );
    return res.status(200).json("Student deleted");
  } catch (error) {
    next(error);
  }
};

// get student by id

const getStudentById = async (req, res, next) => {
  try {
    const result = await Student.findOne({
      isDeleted: false,
      id: req.params.id,
    });
    if (!result) {
      res.status(404).json("Student Not Found");
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  updateStudent,
  getStudents,
  deleteStudent,
  getStudentById,
  getStudentsByExamNumber
};
