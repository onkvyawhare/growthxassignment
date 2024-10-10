const express = require('express');
const { registerUser, loginUser, uploadAssignment } = require('../controllers/Usercontroller');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', uploadAssignment);

module.exports = router;
