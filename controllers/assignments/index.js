const Assignments = require("../../models/assignments");
const fs = require("fs/promises");


const uploadAssignments = async (req, res, next) => {
    try {
        const filters = {
            isDeleted: false,
            departmentName: req.body.departmentName,
            year: req.body.year,
            section: req.body.section,
            subject: req.body.subject,
            unit: req.body.unit,
        }
        // checking assignment already uploaded or not
        const doc = await Assignments.findOne(filters);
        if (doc) return res.status(400).json({ message: `Assignment ${doc.unit} already exist` });
        // taking file from the reqest
        if (req.file?.originalname) {
            const sanitize = (str) => {
                return str.replace(/[^\w\s.-]/gi, '');
            }
            const fileExt = req.file.originalname.split(".").pop();
            const newFileName = `${sanitize(req.body.subject)} - ${sanitize(req.body.unit)}.${fileExt}`;
            await fs.rename(req.file.path, `uploads/assignments/${newFileName}`);
            req.body.pdfFile = `${process.env.HOST}/static/assignments/${newFileName}`;
        }
        await Assignments.create(req.body);
        return res.status(201).json('Uploaded');
    } catch (error) {
        next(error);
    }
};


// get assignments

const getAssignments = async (req, res, next) => {
    try {
        const filters = {
            isDeleted: false,
        }
        if (req.query.studentName) {
            filters.studentName = new RegExp(`${req.query.studentName}`);;
        }
        if (req.query.examNumber) {
            filters.examNumber = new RegExp(`${req.query.examNumber}`);;
        }
        if (req.query.departmentName) {
            filters.departmentName = req.query.departmentName;
        }
        if (req.query.year) {
            filters.year = req.query.year;
        }
        if (req.query.section) {
            filters.section = req.query.section;
        }
        if (req.query.subject) {
            filters.subject = new RegExp(`${req.query.subject}`);
        };

        const result = await Assignments.aggregate([
            {
                $match: filters,
            },
            {
                $group: {
                    _id: {
                        studentName: "$studentName",
                        examNumber: "$examNumber",
                        id: "$id",
                        marks: "$marks",
                        subject: "$subject",
                        unit: "$unit"
                    },
                    pdfFiles: { $push: "$pdfFile" }
                }
            },
            {
                $group: {
                    _id: {
                        studentName: "$_id.studentName",
                        examNumber: "$_id.examNumber",
                        subject: "$_id.subject"
                    },
                    units: {
                        $push: {
                            unit: "$_id.unit",
                            pdfFiles: "$pdfFiles",
                            id: "$_id.id",
                            marks: "$_id.marks",
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        studentName: "$_id.studentName",
                        examNumber: "$_id.examNumber",
                    },
                    subjects: {
                        $push: {
                            subject: "$_id.subject",
                            units: "$units"
                        }
                    }
                }
            },
            { $sort: { "_id.examNumber": 1 } }
        ]);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    };
};


const deleteAssignment = async (req, res, next) => {
    try {
        await Assignments.findOneAndUpdate(
            { id: req.params.id },
            { isDeleted: true }
        );
        return res.status(200).json("Assignment deleted");
    } catch (error) {
        next(error);
    }
};


const assignMartks = async (req, res, next) => {
    try {
        await Assignments.findOneAndUpdate(
            { id: req.params.id, isDeleted: false },
            req.body,
            { new: true }
        );
        return res.status(200).json("Marks updated");
    } catch (error) {
        next(error);
    }
};


module.exports = {
    uploadAssignments,
    getAssignments,
    deleteAssignment,
    assignMartks,
}