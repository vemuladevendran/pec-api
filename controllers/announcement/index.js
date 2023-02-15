const Announcement = require("../../models/announcement");
const fs = require("fs/promises");


const createAnnouncement = async (req, res, next) => {
    try {
        console.log(req.file);
        if (req.file?.originalname) {
            const fileExt = req.file.originalname.split(".").pop();
            await fs.rename(req.file.path, `${req.file.path}.${fileExt}`);
            req.body.image = `${process.env.HOST}/static/announcement/${req.file.filename}.${fileExt}`;
        }
        await Announcement.create(req.body);
        return res.status(201).json("created successfully");
    } catch (error) {
        next(error)
    }
}

const getAnnouncement = async (req, res, next) => {
    try {
        const data = await Announcement.find({isDeleted: false});
        return res.status(200).json({ data: data });
    } catch (error) {
        next(error);
    }
}


const deleteAnnouncement = async (req, res, next) => {
    try {
        await Announcement.findOneAndUpdate(
            { id: req.params.id },
            { isDeleted: true }
        );
        return res.status(200).json("Announcement deleted");
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createAnnouncement,
    getAnnouncement,
    deleteAnnouncement,
}