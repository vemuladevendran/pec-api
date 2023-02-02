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
        let absentCount = 0;
        req.body.students.map((x) => {
            if (!x.attendance) absentCount += 1;
        });
        req.body.absentCount = absentCount;
        await attendance.create(req.body);
        return res.status(201).json({ message: `Attendance marked for ${req.body.periodNumber} period` })
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const getAttendanceReport = async (req, res, next) => {
    try {
        const filters = {
            date: {
                $gte: req.query.date ? new Date(req.query.date).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0),
                $lte: req.query.date ? new Date(req.query.date).setHours(23, 59, 59, 999) : new Date().setHours(23, 59, 59, 999),
            }
        };
        if (req.query.departmentName) {
            filters.departmentName = req.query.departmentName;
        }

        if (req.query.year) {
            filters.year = req.query.year;
        }

        const data = await attendance.find(filters);
        return res.status(200).json({ data: data })
    } catch (error) {
        console.log(error);
        next(error);
    }
}




module.exports = {
    markAttendance,
    getAttendanceReport
}