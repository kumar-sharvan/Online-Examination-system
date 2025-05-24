// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/admin/login", authController.adminLogin);
router.post("/student/login", authController.studentLogin);
router.post("/student/register", authController.studentRegister);
router.post("/logout", authController.logout);

module.exports = router;
