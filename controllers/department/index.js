"use strict";

const Department = require("../../models/department");
const Admin = require("../../models/admin");
// create Department

const createDepartment = async (req, res, next) => {
  try {
    const filters = {
      $or: [
        {
          departmentCode: req.departmentCode,
        },
        {
          departmentName: req.departmentName,
        },
      ],
    };

    const doc = await Department.findOne(filters);
    if (doc) {
      return res.status(400).json("Department Code or Name is Already exist");
    }

    const result = await Department.create(req.boby);
    return res.status(201).json("Department Created");
  } catch (error) {
    next(error);
  }
};

// get department

const getDepartment = async (req, res, next) => {
  try {
    const result = await Department.find({
      years: false,
    });
    if (!result) {
      return res.status(400).json("Department details not found");
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

// get hod list

const getHods = async (req, res, next) => {
  try {
    const data = await Admin.find({
      role: "hod",
    }).select({ name: 1, id: 1 });
    console.log(data);
    return res.status(400).json(data);
  } catch (error) {
    next(error);
  }
};

// get department By Id

const getDepartmentById = async (req, res, next) => {
  try {
    const data = await Department.findOne({
      id: req.params.id,
    });
    return res.status(400).json(data);
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
};
