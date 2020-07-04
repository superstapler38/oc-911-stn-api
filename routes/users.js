// express router
const router = require("express").Router();

// controllers
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/users");

// middleware
const { protect, authorize } = require("../middleware/auth");

// model
const User = require("../models/User");

router.use(protect);
router.use(authorize('admin'));

router.route('/')
    .get(getUsers)
    .post(createUser);
    
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;