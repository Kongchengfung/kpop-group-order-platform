const prisma = require("../config/prisma");

const createGroup = async ({ name, memberCount }) => {

    const count = parseInt(memberCount);

    if (!name || isNaN(count)) {
        throw new Error("Name and valid member count are required.");
    }

    // Check duplicate group
    const existingGroup = await prisma.kpopGroup.findFirst({
        where: {
            name
        }
    });

    if (existingGroup) {
        throw new Error("Group already exists.");
    }

    const group = await prisma.kpopGroup.create({
        data: {
            name,
            memberCount: count
        }
    });

    return group;
};

const getGroups = async () => {

    return await prisma.kpopGroup.findMany({
        orderBy: {
            name: "asc"
        }
    });

};

module.exports = {
    createGroup,
    getGroups
};