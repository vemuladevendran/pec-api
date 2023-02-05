const Student = require("../../models/student");
const Admin = require("../../models/admin");
const { verify } = require("../../services/password");
const { generate } = require("../../services/token");



const adminLogin = async (req, res, next) => {
    try {
        const doc = await Admin.findOne({ isDeleted: false, email: req.body.email });
        if (!doc) return res.status(400).json({ message: 'Email is not found' });
        const isPasswordMatch = await verify(req.body.password, doc.password);
        if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid password' });
        const tokenData = {
            id: doc.id,
            name: doc.name,
            email: doc.email,
            role: doc.role,
        }
        // creating token
        const token = await generate(tokenData);
        return res.status(200).json({ token: token })
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    adminLogin
}