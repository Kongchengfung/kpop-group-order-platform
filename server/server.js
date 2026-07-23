const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const memberRoutes = require("./routes/memberRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/members", memberRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "KPOP Group Order API is running!"
    });
});

app.get("/test-db", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.json({
            message: "Database Connected!"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err.message
        });
    }
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});