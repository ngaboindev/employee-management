const asyncHandler = require("express-async-handler");
const Employee = require("../models/Employee");
const sendEmail = require("../utils/sendEmail");

/**
 * @descr search for an employee based on his position, name, email, phone number or code.
 * @route GET /api/v1/employee/
 * @access Private (Managers only)
 */

exports.getEmployees = asyncHandler(async (req, res) => {
  const reqQuery = { ...req.query };

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  const employees = await Employee.find(JSON.parse(queryStr));
  res.json({ employees });
});

/**
 * @descr Register as manager
 * @route POST /api/v1/employee/
 * @access Private (Managers only)
 */

exports.createEmployee = asyncHandler(async (req, res) => {
  const employeeExists = await Employee.findOne({ email: req.body.email });

  //   checking if employee already exists
  if (employeeExists) {
    res.status(400);
    throw new Error("Employee already exists");
  }
  req.body.password = "taskforce";
  const employee = await Employee.create(req.body);

  const message = `
    Hi ${employee.name} \n
    you have now joined taskforce 4.0 head over to (Employee Management System) to check out your profile \n
    password:taskforce\n
    email: ${employee.email}
  `;

  //   sending confirmation email

  try {
    sendEmail({
      email: employee.email,
      subject: "Welcome to our Company (Taskforce)",
      message,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent");
  }
  res.status(201).json(employee);
});

/**
 * @descr Edit employee's details
 * @route PUT /api/v1/employee/:id
 * @access Private (Managers only)
 */

exports.updateEmployee = asyncHandler(async (req, res) => {
  const employee = req.getEmployee;

  employee.name = req.body.name || employee.name;
  employee.email = req.body.email || employee.email;
  employee.phone = req.body.phone || employee.phone;
  employee.nationalID = req.body.nationalID || employee.nationalID;
  employee.dob = req.body.dob || employee.dob;
  employee.position = req.body.position || employee.position;

  const updateEmployee = await employee.save();
  res.json({ employee: updateEmployee, message: "updated successful" });
});

/**
 * @descr suspend an employee
 * @route PUT /api/v1/employee/:id/suspend
 * @access Private (Managers only)
 */

exports.suspendEmployee = asyncHandler(async (req, res) => {
  const employee = req.getEmployee;
  employee.status = "inactive";
  const updateEmployee = await employee.save();
  res.json({ message: "employee suspended successful" });
});

exports.activateEmployee = asyncHandler(async (req, res) => {
  const employee = req.getEmployee;
  employee.status = "active";
  const updateEmployee = await employee.save();
  res.json({ message: "employee actived successful" });
});

exports.deleteEmployee = asyncHandler(async (req, res) => {
  const employee = req.getEmployee;
  await employee.remove();
  res.json({ message: "Employee remove successful" });
});
