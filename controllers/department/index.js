"use strict";

const Department = require("../../models/department");
const Student = require("../../models/student");
const Admin = require("../../models/admin");
// create Department

const createDepartment = async (req, res, next) => {
  try {
    const filters = {
      $or: [
        {
          departmentName: req.body.departmentName,
        },
        {
          departmentCode: req.body.departmentCode,
        },
      ],
    };
    const doc = await Department.findOne(filters);
    if (doc) {
      return res.status(400).json("Department Code or Name is Already exist");
    }
    const result = await Department.create(req.body);
    return res.status(201).json("Department Created");
  } catch (error) {
    next(error);
  }
};

// get department

const getDepartment = async (req, res, next) => {
  try {
    const result = await Department.find({}, { years: false });
    if (!result) {
      return res.status(400).json("Department details not found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// get hod list

const getHods = async (req, res, next) => {
  try {
    const data = await Admin.find({
      role: "hod",
      isDeleted: false,
    }).select({ name: 1, id: 1 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// get department By Id

const getDepartmentById = async (req, res, next) => {
  try {
    const data = await Department.findOne({
      id: req.params.id,
    }).lean();
    // getting students count
    const departmentName = data?.departmentName;
    const years = ["firstYear", "secondYear", "thirdYear", "fourthYear"];
    const totalCount = await Student.countDocuments({
      department: departmentName,
    }).exec();
    const studentsCount = await Promise.all(
      years.map((x) => {
        return Student.countDocuments({
          department: departmentName,
          year: x,
        }).exec();
      })
    );

    // merging count to response
    data.studentsCount = studentsCount;
    data.totalCount = totalCount;
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};


const getSections = async (req, res, next) => {
  try {
    const data = await Department.findOne({
      departmentName: req.params.departmentName,
    });
    const result = data.years[req.params.year]
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// delete department

const deleteDepartment = async (req, res, next) => {
  try {
    const result = await Department.findOneAndDelete({ id: req.params.id });
    return res.status(200).json("Department deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDepartment,
  getDepartment,
  getHods,
  getDepartmentById,
  deleteDepartment,
  getSections
};
