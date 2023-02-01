const attendance = require('../../models/attendance');


const markAttendance = async (req, res, next) => {
    try {

        const filters = {
            data: req.body.date,
            departmentName: req.body.departmentName,
            year: req.body.year,
            section: req.body.section,
            periodNumber: req.body.periodNumber
        };
        const data = await attendance.find(filters);
        if (data.length > 0) return res.status(400).json({ message: 'Attendance is already marked for this period' });
        await attendance.create(req.body);
        return res.status(201).json({ message: `Attendance marked for ${req.body.periodNumber} period` })
    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports = {
    markAttendance
}