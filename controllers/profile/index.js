const Teacher = require("../../models/teacher");
const Student = require("../../models/student");
const Admin = require("../../models/admin");



const teacherProfile = async (req, res, next) => {
    try {
        const user = req.user;
        const data = await Teacher.findOne({ email: user.email }, { password: false });
        if (!data) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const adminProfile = async (req, res, next) => {
    try {
        const user = req.user;
        const data = await Admin.findOne({ email: user.email }, { password: false });
        if (!data) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const studentProfile = async (req, res, next) => {
    try {
        const user = req.user;
        const data = await Student.findOne({ email: user.email }, { password: false });
        if (!data) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};




module.exports = {
    teacherProfile,
    adminProfile,
    studentProfile,
}