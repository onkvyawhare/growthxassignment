const express = require('express');
const { registerAdmin, loginAdmin, viewAssignments, acceptAssignment, rejectAssignment } = require('../controllers/Admincontroller');
const auth = require('../middlewares/Auth');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/assignments', auth, viewAssignments);
router.post('/assignments/:id/accept', auth, acceptAssignment);
router.post('/assignments/:id/reject', auth, rejectAssignment);

module.exports = router;
