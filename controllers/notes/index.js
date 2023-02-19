const Notes = require("../../models/notes");
const fs = require("fs/promises");


const uploadNotes = async (req, res, next) => {
    try {
        const filters = {
            departmentName: req.body.departmentName,
            year: req.body.year,
            semester: req.body.semester,
            subject: req.body.subject,
            unit: req.body.unit,
            isDeleted: false,
        };

        const doc = await Notes.findOne(filters);
        if (doc) {
            return res.status(400).json({ message: 'Notes already exist for this subject' });
        }
        // taking file from the reqest
        if (req.file?.originalname) {
            const sanitize = (str) => {
                return str.replace(/[^\w\s.-]/gi, '');
            }
            const fileExt = req.file.originalname.split(".").pop();
            const newFileName = `${sanitize(req.body.subject)} - ${sanitize(req.body.unit)}.${fileExt}`;
            await fs.rename(req.file.path, `uploads/notes/${newFileName}`);
            req.body.pdfFile = `${process.env.HOST}/static/notes/${newFileName}`;
        }
        await Notes.create(req.body);
        return res.status(201).json({ message: "upload successfully" });
    } catch (error) {
        next(error);
    }
};

// get nodes

const getNotes = async (req, res, next) => {
    try {
        const filters = {
            isDeleted: false,
        }
        if (req.query.departmentName) {
            filters.departmentName = req.query.departmentName;
        }

        if (req.query.year) {
            filters.year = req.query.year;
        }
        if (req.query.subject) {
            filters.subject = req.query.subject;
        };
        if (req.query.semester) {
            filters.semester = req.query.semester;
        };
        const data = await Notes.find(filters);
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

// get notes by id

const getNotesById = async (req, res, next) => {
    try {
        const filters = {
            isDeleted: false,
            id: req.params.id,
        }
        const data = await Notes.findOne(filters);
        if (!data) return res.status(400).json({ message: 'Notes not found' });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

// delete notes
const deleteNotes = async (req, res, next) => {
    try {
        const doc = await Notes.findOneAndUpdate(
            { id: req.params.id },
            { isDeleted: true }
        );
        return res.status(200).json("Teacher deleted");
    } catch (error) {
        next(error);
    }
};


const getUnitWiseNotes = async (req, res, next) => {
    try {
        const filters = {
            isDeleted: false,
        }
        if (req.query.departmentName) {
            filters.departmentName = req.query.departmentName;
        }

        if (req.query.year) {
            filters.year = req.query.year;
        }
        if (req.query.subject) {
            filters.subject = req.query.subject;
        };
        if (req.query.semester) {
            filters.semester = req.query.semester;
        };
        const data = await Notes.aggregate([
            {
                $match: filters
            },
            {
                $group: {
                    _id: {
                        subject: "$subject",
                        unit: "$unit"
                    },
                    pdfFiles: {
                        $push: {
                            id: "$id",
                            pdfFile: "$pdfFile"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$_id.subject",
                    units: {
                        $push: {
                            unit: "$_id.unit",
                            pdfFiles: "$pdfFiles"
                        }
                    }
                }
            },
            {
                $project: {
                    subject: "$_id",
                    units: 1,
                    _id: 0
                }
            }
        ]);
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    uploadNotes,
    getNotes,
    getNotesById,
    deleteNotes,
    getUnitWiseNotes
}