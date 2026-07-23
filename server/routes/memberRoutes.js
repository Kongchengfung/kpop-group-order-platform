const express = require("express");

const router = express.Router();

const memberController = require("../controllers/memberController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", memberController.getMembers);

router.post(
    "/",
    protect,
    adminOnly,
    memberController.createMember
);

router.post(
    "/group/:groupId",
    protect,
    adminOnly,
    memberController.createMembers
);

module.exports = router;