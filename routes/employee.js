const express = require("express");
const {
  createEmployee,
  updateEmployee,
  suspendEmployee,
  activateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const { protect, authorize } = require("../middlewares/authMiddleware");
const { getEmployeeById } = require("../middlewares/employeeMiddleware");

const router = express.Router();

router.use(protect);
router.use(authorize("manager"));

router.route("/").post(createEmployee);
router
  .route("/:id")
  .put(getEmployeeById, updateEmployee)
  .delete(getEmployeeById, deleteEmployee);

router.put("/:id/suspend", getEmployeeById, suspendEmployee);
router.put("/:id/activate", getEmployeeById, activateEmployee);
module.exports = router;
