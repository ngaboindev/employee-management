const express = require("express");
const {
  createEmployee,
  updateEmployee,
  suspendEmployee,
  activateEmployee,
  deleteEmployee,
  getEmployees,
} = require("../controllers/employeeController");
const { protect, authorize } = require("../middlewares/authMiddleware");
const { getEmployeeById } = require("../middlewares/employeeMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, authorize("manager"), getEmployees)
  .post(protect, authorize("manager"), createEmployee);
router
  .route("/:id")
  .put(protect, authorize("manager"), getEmployeeById, updateEmployee)
  .delete(protect, authorize("manager"), getEmployeeById, deleteEmployee);

router.put(
  "/:id/suspend",
  protect,
  authorize("manager"),
  getEmployeeById,
  suspendEmployee
);
router.put(
  "/:id/activate",
  protect,
  authorize("manager"),
  getEmployeeById,
  activateEmployee
);
module.exports = router;
