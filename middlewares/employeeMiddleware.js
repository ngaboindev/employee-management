const asyncHandler = require("express-async-handler");
const Employee = require("../models/Employee");

exports.getEmployeeById = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    res.status(404);
    throw Error("Employee Not Found");
  }

  req.getEmployee = employee;
  next();
});
