const Attendance = require('../../models/attendance');


const markAttendance = async (req, res, next) => {
    try {

        const filters = {
            date: {
                $gte: req.body.date ? new Date(req.body.date).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0),
                $lte: req.body.date ? new Date(req.body.date).setHours(23, 59, 59, 999) : new Date().setHours(23, 59, 59, 999),
            },
            departmentName: req.body.departmentName,
            year: req.body.year,
            section: req.body.section,
            periodNumber: req.body.periodNumber
        };
        const data = await Attendance.findOne(filters);
        if (data) return res.status(400).json({ message: 'Attendance is already marked for this period' });
        let absentCount = 0;
        req.body.students.map((x) => {
            if (!x.attendance) absentCount += 1;
        });
        req.body.absentCount = absentCount;
        await Attendance.create(req.body);
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

        const data = await Attendance.find(filters);
        return res.status(200).json({ data: data.sort((a, b) => (a.periodNumber > b.periodNumber ? 1 : -1)) })
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// getting attendance report by numberof absent day count.
const attendanceReports = async (req, res, next) => {
    try {
        const department = req?.user.department;
        const { from, to, count, year } = req.query;
        console.log(req?.user, req.query);
        if (!from || !to) return res.status(400).json({ message: 'provide correct from and to date' })
        const absentsList = await Attendance.aggregate([
            {
                $match: {
                    date: { $gte: new Date(new Date(from).setHours(0, 0, 0, 0)), $lte: new Date(new Date(to).setHours(23, 59, 59, 999)) },
                    departmentName: department || '',
                    year: year,
                }
            },
            {
                $unwind: "$students"
            },
            {
                $group: {
                    _id: "$students.examNumber",
                    examNumber: { $first: "$students.examNumber" },
                    totalAbsentCount: {
                        $sum: {
                            $cond: ["$students.attendance", 0, 1]
                        }
                    }
                }
            },
            {
                $match: {
                    totalAbsentCount: { $gte: parseInt(count) || 0 },
                }
            }
        ]);
        const data = absentsList.sort((a, b) => (a.totalAbsentCount > b.totalAbsentCount ? -1 : 1))
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const attendanceReportByExamNumber = async (req, res, next) => {
    try {
        const examNumber = req.params.examnumber;
        const result = await Attendance.aggregate([
            {
                $match: { 'students.examNumber': examNumber } // match the attendance records with the given exam number
            },
            {
                $project: {
                    _id: 0,
                    date: 1,
                    periodNumber: 1,
                    absent: { $cond: [{ $eq: [{ $arrayElemAt: ['$students.attendance', { $indexOfArray: ['$students.examNumber', examNumber] }] }, false] }, 1, 0] },
                    present: { $cond: [{ $eq: [{ $arrayElemAt: ['$students.attendance', { $indexOfArray: ['$students.examNumber', examNumber] }] }, true] }, 1, 0] },
                }
            },
            {
                $group: {
                    _id: '$date',
                    date: { $first: "$date" },
                    periodNumber: { $first: "$periodNumber" },
                    present: { $sum: '$present' },
                    absent: { $sum: '$absent' },
                }
            },
            {
                $project: {
                    date: '$_id',
                    periodNumber: '$periodNumber',
                    present: 1,
                    absent: 1,
                    _id: 0,
                }
            }
        ]).sort({date: 1}).exec();
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
}




module.exports = {
    markAttendance,
    getAttendanceReport,
    attendanceReports,
    attendanceReportByExamNumber
}