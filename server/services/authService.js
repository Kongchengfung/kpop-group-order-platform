const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const generateToken = require("../utils/generateToken");

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

const loginUser = async ({ email, password }) => {

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error("Invalid email or password.");
    }

    const token = generateToken(user);

    return {
        token,
        user
    };
};

module.exports = {
    registerUser,
    loginUser
};