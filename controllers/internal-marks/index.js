const InternalExam = require('../../models/internal-marks');


const enterMarks = async (req, res, next) => {
    try {
        const filters = {
            departmentName: req.body.departmentName,
            year: req.body.year,
            exam: req?.body.exam,
            subject: req?.body.subject,
            semester: req?.body.semester,
        }
        const doc = await InternalExam.findOne(filters);
        if (doc) return res.status(400).json({ message: 'Marks already added for this students for this exam' });
        await InternalExam.create(req.body);
        return res.status(201).json({ message: 'marks entered' })
    } catch (error) {
        next(error)
    }
};

const getMarks = async (req, res, next) => {
    try {
        const filters = {}
        if (req.query.departmentName) {
            filters.departmentName = req.query.departmentName;
        }
        if (req.query.year) {
            filters.year = req.query.year;
        }
        if (req.query.exam) {
            filters.exam = req.query.exam;
        }
        if (req.query.semester) {
            filters.semester = req.query.semester;
        }
        if (req.query.subject) {
            filters.subject = req.query.subject;
        };
        const subjectMarks = await InternalExam.find(filters);
        return res.status(200).json({ data: subjectMarks })
    } catch (error) {
        next(error);
    }
};

const getMarksById = async(req, res, next) => {
    try {
        const result = await InternalExam.findOne({
            id: req.params.id,
          });
          if (!result) {
            res.status(404).json("Marks not found");
            return;
          }
          return res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}


module.exports = {
    enterMarks,
    getMarks,
    getMarksById,
}