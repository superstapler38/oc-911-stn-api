// express router
const router = require("express").Router();

// controllers
const {
    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
} = require("../controllers/departments");

// model
const Department = require("../models/Department");

// middleware
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize('admin'));

router.route('/')
    .get(advancedResults(Department),getDepartments)
    .post(createDepartment);

router.route('/:id')
    .get(getDepartment)
    .put(updateDepartment)
    .delete(deleteDepartment);

module.exports = router;