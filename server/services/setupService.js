const prisma = require("../config/prisma");

const createGroupSetup = async ({ group, members, albums }) => {

    return await prisma.$transaction(async (tx) => {

        // Create group
        const newGroup = await tx.kpopGroup.create({
            data: {
                name: group.name,
                memberCount: members.length
            }
        });

        // Create members
        await tx.member.createMany({
            data: members.map(member => ({
                name: member,
                groupId: newGroup.id
            }))
        });

        // Create albums
        await tx.album.createMany({
            data: albums.map(album => ({
                name: album.name,
                groupId: newGroup.id
            }))
        });

        return newGroup;
    });

};

module.exports = {
    createGroupSetup
};