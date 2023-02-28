const Department = require("../../models/department");
const Teacher = require("../../models/teacher");
const Student = require("../../models/student");
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

const checkTeacherEmail = async (req, res, next) => {
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

const setTeacherPassword = async (req, res, next) => {
    try {
        const doc = await Teacher.findOne({ isDeleted: false, email: req.body.email });
        if (!doc) return res.status(400).json({ message: 'Email is not found' });
        req.body.password = await hash(req.body.password);
        await Teacher.findOneAndUpdate({ id: doc.id }, req.body, { new: true });
        const tokenData = doc.toObject();
        delete tokenData.password;
        const token = await generate(tokenData);
        return res.status(200).json({ token: token })
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const teacherLogin = async (req, res, next) => {
    try {
        const doc = await Teacher.findOne({ isDeleted: false, email: req.body.email });
        if (!doc) return res.status(400).json({ message: 'Email is not found' });
        const isPasswordMatch = await verify(req.body.password, doc.password);
        if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid password' });
        const tokenData = doc.toObject();
        delete tokenData.password;

        // creating token
        const token = await generate(tokenData);
        return res.status(200).json({ token: token })
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const checkStudentEmail = async (req, res, next) => {
    try {
        const doc = await Student.findOne({ isDeleted: false, email: req.body.email });
        if (!doc) return res.status(400).json({ message: 'Email is not found' });
        if (doc.password === null) {
            return res.status(200).json({ message: 'setpassword' });
        };
        return res.status(200).json({ message: 'password' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const setStudentPassword = async (req, res, next) => {
    try {
        const doc = await Student.findOne({ isDeleted: false, email: req.body.email });
        if (!doc) return res.status(400).json({ message: 'Email is not found' });
        req.body.password = await hash(req.body.password);
        const data = await Student.findOneAndUpdate({ id: doc.id }, req.body, { new: true });
        const tokenData = data.toObject();
        delete tokenData.password;
        const token = await generate(tokenData);
        return res.status(200).json({ token: token })
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const studentLogin = async (req, res, next) => {
    try {
        const doc = await Student.findOne({ isDeleted: false, email: req.body.email });
        if (!doc) return res.status(400).json({ message: 'Email is not found' });
        const isPasswordMatch = await verify(req.body.password, doc.password);
        if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid password' });
        const tokenData = doc.toObject();
        delete tokenData.password;
        // creating token
        const token = await generate(tokenData);
        return res.status(200).json({ token: token })
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const resetStudentPassword = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== 'admin' || user.role !== 'hod') {
            return res.status(400).json("You Dont have permision to reset");
        };

        const student = await Student.findOne({ examNumber: req.query.examNumber });
        if (!student) return res.status(400).json("Student not found");
        const password = await hash('default');
        const data = await Student.findOneAndUpdate({ examNumber: req.query.examNumber }, { password: password }, { new: true });
        return res.status(200).json("Password successfully reset");
    } catch (error) {
        next(error);
    }
};

const resetStaffPassword = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== 'admin' || user.role !== 'hod') {
            return res.status(400).json("You Dont have permision to reset");
        };

        const teacher = await Teacher.findOne({ email: req.query.email });
        if (!teacher) return res.status(400).json("Teacher not found");
        const password = await hash('default');
        const data = await Teacher.findOneAndUpdate({ email: req.query.email }, { password: password }, { new: true });
        return res.status(200).json("Password successfully reset");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    adminLogin,
    checkTeacherEmail,
    setTeacherPassword,
    teacherLogin,
    checkStudentEmail,
    setStudentPassword,
    studentLogin,
    resetStudentPassword,
    resetStaffPassword,
}