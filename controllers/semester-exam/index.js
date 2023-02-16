const SemesterExam = require("../../models/semester-exam");


const uploadSemesterMarks = async (req, res, next) => {
    try {
        const filters = {
            examNumber: req.body.examNumber,
            exam: req.body.exam,
        };
        const doc = await SemesterExam.findOne(filters);
        if (doc) return res.status(400).json({ message: 'Marks already added for this student' });
        await SemesterExam.create(req.body);
        return res.status(201).json({ message: 'Marks uploaded' });
    } catch (error) {
        next(error);
    }
};

const getSemesterMarks = async (req, res, next) => {
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

        const semesterMarks = await SemesterExam.find(filters);
        return res.status(200).json({ data: semesterMarks });
    } catch (error) {
        next(error);
    }
};

// delete marks
const deleteMarks = async (req, res, next) => {
    try {
        const doc = await SemesterExam.findOneAndDelete(
            { id: req.params.id },
        );
        return res.status(200).json({ message: "Marks deleted" });
    } catch (error) {
        next(error);
    }
}

module.exports = { uploadSemesterMarks, getSemesterMarks, deleteMarks }