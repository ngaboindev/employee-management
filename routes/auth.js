const express = require("express");

const {
  registerManager,
  login,
  confirmEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register/manager", registerManager);
router.post("/login/manager", login);
router.put("/confirm/:confirmToken", confirmEmail);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
