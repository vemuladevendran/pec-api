"use strict";

const Teacher = require("../../models/teacher");
const fs = require("fs/promises");

const createTeacher = async (req, res, next) => {
  try {
    const filters = {
      email: req.body.email,
      isDeleted: false,
    };

    const doc = await Teacher.findOne(filters);
    if (doc) {
      return res.status(400).json("Email'id Already Exist");
    }

    // taking image file from the reqest

    if (req.file?.originalname) {
      const fileExt = req.file.originalname.split(".").pop();
      await fs.rename(req.file.path, `${req.file.path}.${fileExt}`);
      const staticHost = "http://localhost:3000";
      req.body.photo = `${staticHost}/static/teachers/${req.file.filename}.${fileExt}`;
    }
    const result = await Teacher.create(req.body);
    return res.status(201).json("created successfully");
  } catch (error) {
    next(error);
  }
};
// teachers list
const getTeachers = async (req, res, next) => {
  try {
    const filters = {
      isDeleted: false,
    };

    if (Object.keys(req.query).length !== 0) {
      if (req.query.subject !== (undefined || "all")) {
        filters.majorSubject = req?.query?.subject;
      }
    }
    const result = await Teacher.find(filters);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// delete teacher

const deleteTeacher = async (req, res, next) => {
  try {
    const doc = await Teacher.findOneAndUpdate(
      { id: req.params.id },
      { isDeleted: true }
    );
    return res.status(200).json("Teacher deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTeacher,
  getTeachers,
  deleteTeacher,
};
