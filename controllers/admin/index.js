const Admin = require("../../models/admin");
const { hash, verify } = require("../../services/password");

// creating admin
const createAdmin = async (req, res, next) => {
  try {
    const filters = {
      $or: [
        {
          mobileNumber: req.body.mobileNumber,
        },
        {
          email: req.body.email,
        },
      ],
    };

    const doc = await Admin.findOne(filters);
    if (doc) {
      return res.status(400).json("Mobile Number OR Email Is Already Exist");
    }
    req.body[password] = await hash(req.body.mobileNumber);
    const data = await Admin.create(req.body);
    return res.status(201).json("Successfully Created");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// update Admin

const updateAdmin = async (req, res, next) => {
  try {
    //   filters
    const filters = {
      $or: [
        {
          mobileNumber: req.body.mobileNumber,
        },
        {
          email: req.body.email,
        },
      ],
    };

    const doc = await Admin.findOne(filters);
    if (doc) {
      return res.status(400).json("Mobile Number OR Email Is Already Exist");
    }

    const updateData = await Admin.findOneAndUpdate(
      {
        id: req.body.id,
        isDeleted: false,
      },
      req.body,
      { new: true }
    );
    return res.status(400).json("Updated Successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//   get admins
const getAdmins = async (req, res, next) => {
  try {
    const filters = {
      isDeleted: false,
    };
    if (req.query.branch) {
      filters.branch = req.query.branch;
    }

    if (req.query.currentStudingYear) {
      filters.currentStudingYear = req.query.currentStudingYear;
    }

    const result = await Admin.find(filters);
    if (!result) {
      return res.status(400).json("Details not found");
    }
    return res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAdminsById = async (req, res, next) => {
  try {
    const result = await Admin.findOne(
      // removing deleted Admin
      // filter the data mached with id
      // password field is removing in get data -- ( projection )
      {
        isDeleted: false,
        id: req.params.id,
      },
      { password: false }
    );
    if (!result) {
      res.status(500).json({ message: "Admin Not Found" });
      return;
    }
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    const doc = await Admin.findOneAndUpdate(
      { id: req.params.id },
      { isDeleted: true }
    );
    return res.json("Admin deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAdmin,
  updateAdmin,
  getAdmins,
  getAdminsById,
  deleteAdmin,
};
