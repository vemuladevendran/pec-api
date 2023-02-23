const Student = require("../../models/student");


const mentiesList = async (req, res, next) => {
    try {
        const user = req.user;
        const filters = {
            isDeleted: false,
            mentor: user.name
        }
        const data = await Student.find(filters);
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    mentiesList,
}