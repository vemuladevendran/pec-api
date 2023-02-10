const Notes = require("../../models/notes");


const uploadNotes = async (req, res, next) => {
    try {
        const filters = {
            departmentName: req.body.departmentName,
            year: req.body.year,
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
            const fileExt = req.file.originalname.split(".").pop();
            await fs.rename(req.file.path, `${req.file.path}.${fileExt}`);
            req.body.pdfFile = `${process.env.HOST}/static/notes/${req.file.filename}.${fileExt}`;
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
        if (req.query.department) {
            filters.department = req.query.department;
        }

        if (req.query.year) {
            filters.year = req.query.year;
        }
        if (req.query.subject) {
            filters.subject = req.query.subject;
        };

        const data = await Notes.find(filters);
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

// get notes by id

const getNotesByID = async (req, res, next) => {
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


module.exports = {
    uploadNotes,
    getNotes,
    getNotesByID,
}