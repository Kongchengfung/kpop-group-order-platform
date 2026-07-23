const prisma = require("../config/prisma");

const createMember = async ({ name, imageUrl, groupId }) => {

    if (!name || !groupId) {
        throw new Error("Name and groupId are required.");
    }

    const group = await prisma.kpopGroup.findUnique({
        where: {
            id: parseInt(groupId)
        }
    });

    if (!group) {
        throw new Error("Group not found.");
    }

    const member = await prisma.member.create({
        data: {
            name,
            imageUrl,
            groupId: parseInt(groupId)
        }
    });

    return member;
};

const createMembers = async (groupId, members) => {

    const id = parseInt(groupId);

    if (isNaN(id)) {
        throw new Error("Invalid group id.");
    }

    const group = await prisma.kpopGroup.findUnique({
        where: {
            id
        }
    });

    if (!group) {
        throw new Error("Group not found.");
    }

    if (!Array.isArray(members) || members.length === 0) {
        throw new Error("Members array is required.");
    }

    await prisma.$transaction(
        members.map(name =>
            prisma.member.create({
                data: {
                    name,
                    groupId: id
                }
            })
        )
    );

    return prisma.member.findMany({
        where: {
            groupId: id
        },
        orderBy: {
            id: "asc"
        }
    });

};

const getMembers = async () => {

    return await prisma.member.findMany({
        include: {
            group: true
        },
        orderBy: {
            name: "asc"
        }
    });

};

module.exports = {
    createMember,
    createMembers,
    getMembers
};