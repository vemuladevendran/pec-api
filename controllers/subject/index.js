"use strict";

const Subject = require("../../models/subject");
const DepartmentSubjects = require("../../models/department-subject");

const createSubject = async (req, res, next) => {
  try {
    const filters = {
      subjectCode: req.body.subjectCode,
    };

    // checking subject code
    const doc = await Subject.findOne(filters);
    if (doc) {
      return res.status(400).json("Subject Code Already Exist");
    }

    // creating new subject
    const result = await Subject.create(req.body);
    return res.status(201).json("Created Successfully");
  } catch (error) {
    next(error);
  }
};

const getSubjects = async (req, res, next) => {
  try {
    const data = await Subject.find({});
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// delete subject
const deleteSubject = async (req, res, next) => {
  try {
    const doc = await Subject.findOneAndDelete({ id: req.params.id });
    if (!doc) {
      return res.status(404).json("Subject not found");
    }
    return res.status(200).json("Subject Deleted");
  } catch (error) {
    next(error);
  }
};

// create department subject

const createDepartmentSubject = async (req, res, next) => {
  try {

    const filters = {};
    if (req.body.departmentName) {
      filters.departmentName = req.body.departmentName;
    }

    if (req.body.year) {
      filters.year = req.body.year;
    }
    const doc = await DepartmentSubjects.findOne(filters);
    if (doc) return res.status(400).json("Already subjects add for this year in this department");
    await DepartmentSubjects.create(req.body);
    return res.status(201).json("Subjects created");
  } catch (error) {
    next(error);
  }
};

// get department subjects

const getDepartmentSubjects = async (req, res, next) => {
  try {
    const result = await DepartmentSubjects.find();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// delete department subject
const deleteDepartmentSubject = async (req, res, next) => {
  try {
    const doc = await departmentSubject.findOneAndDelete({ id: req.params.id });
    if (!doc) {
      return res.status(404).json("Subject not found");
    }
    return res.status(200).json("Subject Deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubject,
  getSubjects,
  deleteSubject,
  createDepartmentSubject,
  getDepartmentSubjects,
  deleteDepartmentSubject,
};
