const prisma = require("../config/prisma");

const setup = async (data) => {

    const {
        group,
        members,
        album,
        store
    } = data;

    if (!group?.name) {
        throw new Error("Group name is required.");
    }

    if (!Array.isArray(members) || members.length === 0) {
        throw new Error("Members are required.");
    }

    if (!album?.name) {
        throw new Error("Album name is required.");
    }

    if (!store?.name) {
        throw new Error("Store name is required.");
    }

    return await prisma.$transaction(async (tx) => {

        // Create Group
        const newGroup = await tx.kpopGroup.create({
            data: {
                name: group.name,
                memberCount: members.length
            }
        });

        // Create Members
        await tx.member.createMany({
            data: members.map(name => ({
                name,
                groupId: newGroup.id
            }))
        });

        // Create Album
        const newAlbum = await tx.album.create({
            data: {
                name: album.name,
                version: album.version,
                releaseDate: album.releaseDate
                    ? new Date(album.releaseDate)
                    : null,
                groupId: newGroup.id
            }
        });

        // Check if store exists
        let newStore = await tx.store.findUnique({
            where: {
                name: store.name
            }
        });

        if (!newStore) {
            newStore = await tx.store.create({
                data: {
                    name: store.name
                }
            });
        }

        return {
            group: newGroup,
            album: newAlbum,
            store: newStore
        };

    });

};

module.exports = {
    setup
};