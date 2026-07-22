const express = require("express");

const router = express.Router();

const groupController = require("../controllers/groupController");
const protect = require("../middleware/authMiddleware");

router.get("/", groupController.getGroups);

// Only logged-in users can create groups
router.post("/", protect, groupController.createGroup);

module.exports = router;