const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const groupOrderController = require("../controllers/groupOrderController");

router.post(
    "/",
    protect,
    adminOnly,
    groupOrderController.createGroupOrder
);

router.get(
    "/",
    groupOrderController.getGroupOrders
);

router.get(
    "/:id",
    groupOrderController.getGroupOrder
);

module.exports = router;