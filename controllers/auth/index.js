const Department = require("../../models/department");
const Teacher = require("../../models/teacher");
const Admin = require("../../models/admin");
const { verify, hash } = require("../../services/password");
const { generate } = require("../../services/token");



const adminLogin = async (req, res, next) => {
    try {
        const doc = await Admin.findOne({ isDeleted: false, email: req.body.email });
        if (!doc) return res.status(400).json({ message: 'Email is not found' });
        const isPasswordMatch = await verify(req.body.password, doc.password);
        if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid password' });
        const department = await Department.findOne({ departmentHod: doc.name });
        let departmentName = department.departmentName;
        if (!department) {
            departmentName = '';
        }
        const tokenData = {
            id: doc.id,
            name: doc.name,
            email: doc.email,
            role: doc.role,
            department: department.departmentName,
        }
        // creating token
        const token = await generate(tokenData);
        return res.status(200).json({ token: token })
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const checkTeacherEmail = async (req, res) => {
    try {
        const doc = await Teacher.findOne({ isDeleted: false, email: req.body.email });
        if (!doc) return res.status(400).json({ message: 'Email is not found' });
        if (doc.password === null) {
            return res.status(200).json({ message: 'setpassword' });
        };
        return res.status(200).json({ message: 'password' });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const setTeacherPassword = async (req, res) => {
    try {
        const doc = await Teacher.findOne({ isDeleted: false, email: req.body.email });
        if (!doc) return res.status(400).json({ message: 'Email is not found' });
        req.body.password = await hash(req.body.password);
        await Teacher.findOneAndUpdate({ id: doc.id }, req.body, { new: true });
        const tokenData = {
            id: doc.id,
            name: doc.teacherName,
            email: doc.email,
            subject: doc.majorSubject,
            department: doc.department,
        }
        const token = await generate(tokenData);
        return res.status(200).json({ token: token })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const teacherLogin = async (req, res) => {
    try {
        const doc = await Teacher.findOne({ isDeleted: false, email: req.body.email });
        if (!doc) return res.status(400).json({ message: 'Email is not found' });
        const isPasswordMatch = await verify(req.body.password, doc.password);
        if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid password' });
        const tokenData = {
            id: doc.id,
            name: doc.teacherName,
            email: doc.email,
            subject: doc.majorSubject,
            department: doc.department,
        }
        // creating token
        const token = await generate(tokenData);
        return res.status(200).json({ token: token })
    } catch (error) {
        console.log(error);
        next(error);
    }
}



module.exports = {
    adminLogin,
    checkTeacherEmail,
    setTeacherPassword,
    teacherLogin,
}