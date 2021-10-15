const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to employee management API V1",
  });
});

module.exports = router;
