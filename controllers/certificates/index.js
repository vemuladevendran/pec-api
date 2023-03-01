const Certificates = require("../../models/certificates");


const uploadCertificate = async (req, res, next) => {
    try {
        const user = req.user;
        if (req.file?.originalname) {
            const sanitize = (str) => {
                return str.replace(/[^\w\s.-]/gi, '');
            }
            const fileExt = req.file.originalname.split(".").pop();
            const newFileName = `${sanitize(req.body.subject)} - ${sanitize(req.body.unit)}.${fileExt}`;
            await fs.rename(req.file.path, `uploads/certificates/${newFileName}`);
            req.body.document = `${process.env.HOST}/static/certificates/${newFileName}`;
            req.body.documentType = fileExt;
        }
        const data = { ...req.body, studentName: user.studentName, examNumber: user.examNumber };
        await Certificates.create(data);
        return res.status(200).json('upload successfull');
    } catch (error) {
        next(error);
    }
};


const getCertificates = async (req, res, next) => {
    try {
        const filters = {
            examNumber: req.query.examNumber,
        };
        const result = await Certificates.find(filters);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const deleteCertificate = async (req, res, next) => {
    try {
        const doc = await Certificates.findOneAndDelete(
            { id: req.params.id },
        );
        return res.json("Cetertifica deleted");
    } catch (error) {
        next(error);
    }
};


module.exports = {
    uploadCertificate,
    getCertificates,
    deleteCertificate
}