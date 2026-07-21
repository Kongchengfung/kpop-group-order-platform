const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

const registerUser = async ({ username, email, password }) => {

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error("Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    });

    return user;
};

module.exports = {
    registerUser
};