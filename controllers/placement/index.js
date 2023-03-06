const Placement = require("../../models/placement");


const createPlacement = async (req, res, next) => {
    try {
        const user = req.user;
        req['studentName'] = user.studentName;
        req['examNumber'] = user.examNumber;
        req['deparnmentName'] = user.department;
        await Placement.create(req.body);
        res.status(201).json('Successfull');
    } catch (error) {
        next(error);
    }
};


const getPlacementDetails = async (req, res, next) => {
    try {
        const filters = {}
        if (req.query.departmentName) {
            filters.departmentName = req.query.departmentName;
        }
        if (req.query.examNumber) {
            filters.examNumber = req.query.examNumber;
        };
        if (req.query.jobStatus) {
            filters.jobStatus = req.query.jobStatus;
        };

        const result = await Placement.find(filters);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


const updateStatus = async (req, res, next) => {
    try {
        await Placement.findOneAndUpdate(
            {
                id: req.params.id,
            },
            req.body,
            { new: true })
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createPlacement,
    getPlacementDetails,
    updateStatus,
}