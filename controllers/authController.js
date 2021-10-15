const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");
const Employee = require("../models/Employee");
const sendEmail = require("../utils/sendEmail");

/**
 * @descr Register as manager
 * @route POST /api/v1/auth/register/manager
 * @access Public
 */

exports.registerManager = asyncHandler(async (req, res) => {
  // ### TODO: AGE VALIDATION
  //  ### TODO: LOGS TRACKING

  const employeeExists = await Employee.findOne({ email: req.body.email });

  //   checking if employee already exists
  if (employeeExists) {
    res.status(400);
    throw new Error("Employee already exists");
  }

  req.body.position = "manager";
  const employee = await Employee.create(req.body);

  const confirmUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/confirm/${employee.confirmToken}`;

  const message = `
  Thank you for signing up at employee Management system. Click link below to confirm your email \n\n ${confirmUrl}
  `;

  //   sending confirmation email

  try {
    sendEmail({
      email: employee.email,
      subject: "Please confirm your email",
      message,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent");
  }
  res.status(201).json(employee);
});

/**
 * @descr Login as manager
 * @route POST /api/v1/auth/login/manager
 * @access Public
 */

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ email });

  if (employee && (await employee.matchPassword(password))) {
    res.json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      isEmailConfirmed: employee.isEmailConfirmed,
      token: generateToken(employee._id),
    });
  } else {
    res.status(401);
    throw Error("Invalid Email or Password");
  }
});

/**
 * @descr Confirm email after registration
 * @route POST /api/v1/auth/confirm/:confirmToken
 * @access Public
 */

exports.confirmEmail = asyncHandler(async (req, res) => {
  // Get hashed token

  const employee = await Employee.findOne({
    confirmToken: req.params.confirmToken,
  });

  if (!employee) {
    res.status(400);
    throw Error("Invalid token");
  }

  // Set new Password
  employee.isEmailConfirmed = true;
  employee.confirmToken = null;

  await employee.save();

  res.json({ employee });
});

/**
 * @descr Forgot password
 * @route POST /api/v1/auth/forgotpassword
 * @access Public
 */

exports.forgotPassword = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ email: req.body.email });

  if (!employee) {
    res.status(404);
    throw Error("there is no employee with that email");
  }

  const resetToken = employee.generateResetPasswordToken();

  await employee.save({ validateBeforeSave: false });

  // create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `you are receiving this email because you have request reset of  password . please click on below link : \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: employee.email,
      subject: "Password Reset",
      message,
    });
    res.json({ message: "Email sent" });
  } catch (error) {
    console.log(error);
    employee.confirmToken = undefined;

    await employee.save({ validateBeforeSave: false });
    res.status(500);
    throw Error("Email could not be sent");
  }
});

/**
 * @descr Reset password
 * @route POST /api/v1/auth/resetpassword/:resettoken
 * @access Public
 */

exports.resetPassword = asyncHandler(async (req, res) => {
  if (!req.body.password) {
    res.status(400);
    throw Error("new password is required");
  }

  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const employee = await Employee.findOne({
    resetToken,
  });

  if (!employee) {
    res.status(400);
    throw Error("Invalid  token");
  }

  // Set new Password
  employee.password = req.body.password;
  employee.resetToken = undefined;

  await employee.save();

  res.json({
    employee,
    token: generateToken(employee._id),
  });
});
