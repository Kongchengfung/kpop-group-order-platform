const memberService = require("../services/memberService");

const createMember = async (req, res) => {

    try {

        const member = await memberService.createMember(req.body);

        res.status(201).json(member);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

const createMembers = async (req, res) => {

    try {

        const members = await memberService.createMembers(
            req.params.groupId,
            req.body.members
        );

        res.status(201).json(members);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

const getMembers = async (req, res) => {

    try {

        const members = await memberService.getMembers();

        res.json(members);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createMember,
    createMembers,
    getMembers
};