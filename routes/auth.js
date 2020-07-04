// express router
const router = require("express").Router();

// controllers
const {
    register,
    login,
    logout,
    getMe,
    // forgotPassword,
    // resetPassword,
    updatePassword
} = require("../controllers/auth");

// middleware
const { protect } = require("../middleware/auth");

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatepassword', protect, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;