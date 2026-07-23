const express = require("express");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

const groupController = require("../controllers/groupController");
const protect = require("../middleware/authMiddleware");

router.get("/", groupController.getGroups);

// Only logged-in ADMIN can create groups
router.post(
    "/",
    protect,
    adminOnly,
    groupController.createGroup
);

module.exports = router;