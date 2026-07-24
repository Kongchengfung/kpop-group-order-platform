const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post(
    "/setup",
    protect,
    adminOnly,
    adminController.setup
);

module.exports = router;