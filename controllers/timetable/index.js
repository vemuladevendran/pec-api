const timeTable = require("../../models/timetable");


// create new timetable 
const createTimeTable = async (req, res, next) => {
    try {
        // checking timetable already exist for that section
        const filters = {
            departmentName: req.body.departmentName,
            year: req.body.year,
            section: req.body.section,
        }
        const table = await timeTable.findOne(filters);
        if (table) return res.status(400).json({ message: 'TimeTable already exist in this section, try to delete existing or select different section' })
        await timeTable.create(req.body);
        return res.status(200).json({ message: 'successfully created' });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// get timetable 
const getTimeTables = async (req, res, next) => {
    try {
        const filters = {};

        if (req.query.departmentName) {
            filters.departmentName = req.query.departmentName;
        }

        if (req.query.year) {
            filters.year = req.query.year;
        }

        if (req.query.section) {
            filters.section = req.query.section;
        }

        const result = await timeTable.find(filters);
        if (req.query.day) {
            const data = result[0].timeTable[req.query.day]
            return res.status(200).json({ data: data });
        }
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports = {
    createTimeTable,
    getTimeTables
}