const groupService = require("../services/groupService");

const getGroups = async (req, res) => {

    try {

        const groups = await groupService.getGroups();

        res.json(groups);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const createGroup = async (req, res) => {

    try {

        const group = await groupService.createGroup(req.body);

        res.status(201).json(group);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

module.exports = {
    getGroups,
    createGroup
};