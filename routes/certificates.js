const {
    uploadCertificate,
    getCertificates,
    deleteCertificate
} = require("../controllers/certificates/index");
const { checkToken } = require("../services/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/notes" });

module.exports = function certificatesRoutes(app) {
    app.post("/api/v1/certificate", upload.single("document"), checkToken, uploadCertificate);
    app.get("/api/v1/certificate", checkToken, getCertificates);
    app.delete("/api/v1/certificate/:id", checkToken, deleteCertificate);
};
