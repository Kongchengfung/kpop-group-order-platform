const adminService = require("../services/adminService");

const setup = async (req, res) => {

    try {

        const result = await adminService.setup(req.body);

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

module.exports = {
    setup
};