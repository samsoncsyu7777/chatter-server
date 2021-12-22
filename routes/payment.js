const express = require("express");
const router = express.Router();
const { confirmOrder, getSuccessOrder } = require("../controllers/payment");

router.route("/create-checkout-session").post(confirmOrder);

router.route("/success/:id").get(getSuccessOrder);

module.exports = router;
