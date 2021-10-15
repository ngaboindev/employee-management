const express = require("express");
const authRoutes = require("./auth");
const employeeRoutes = require("./employee");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to employee management API V1",
  });
});

router.use("/auth", authRoutes);
router.use("/employee", employeeRoutes);

module.exports = router;
